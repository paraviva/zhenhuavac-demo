import { useCallback, useEffect, useMemo, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { ArchitectureView } from './components/ArchitectureView';
import { EquipmentCatalogSection } from './components/EquipmentCatalogSection';
import { EquipmentDetailView } from './components/EquipmentDetailView';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { InsightsSection } from './components/InsightsSection';
import { Navbar } from './components/Navbar';
import { RFQDrawer, RFQInlineSection } from './components/RFQComponents';
import {
  fetchApplications,
  fetchEquipment,
  fetchEquipmentBySlug,
  fetchPosts,
  fetchSiteMeta,
  updateDocumentSeo,
} from './lib/wpApi';
import type { WPApplication, WPEquipment, WPPost, WPSiteMeta } from './types/wp';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname || '/';
    return p === '/' ? '/' : p.replace(/\/+$/, '');
  });

  const [siteMeta, setSiteMeta] = useState<WPSiteMeta | null>(null);
  const [equipment, setEquipment] = useState<WPEquipment[]>([]);
  const [applications, setApplications] = useState<WPApplication[]>([]);
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeProcess, setActiveProcess] = useState<string>('all');
  const [activeIndustry, setActiveIndustry] = useState<string>('all');

  const [detailMachine, setDetailMachine] = useState<WPEquipment | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqModel, setRfqModel] = useState<string>('');
  const [rfqProcess, setRfqProcess] = useState<string>('continuous-coating-line');

  const navigate = useCallback((path: string) => {
    const normalized = path === '/' ? '/' : path.replace(/\/+$/, '');
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname || '/';
      setCurrentPath(p === '/' ? '/' : p.replace(/\/+$/, ''));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Load Headless WordPress CPTs on initial mount
  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([
      fetchSiteMeta(),
      fetchEquipment(),
      fetchApplications(),
      fetchPosts(),
    ])
      .then(([metaRes, equipRes, appRes, postRes]) => {
        if (!active) return;
        setSiteMeta(metaRes);
        setEquipment(equipRes);
        setApplications(appRes);
        setPosts(postRes);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load Headless WordPress catalog.',
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Resolve equipment detail route
  const equipmentSlug = useMemo(() => {
    if (currentPath.startsWith('/equipment/')) {
      return currentPath.replace('/equipment/', '').trim();
    }
    return null;
  }, [currentPath]);

  useEffect(() => {
    if (!equipmentSlug) {
      setDetailMachine(null);
      setDetailError(null);
      return;
    }

    const fromList = equipment.find((e) => e.slug === equipmentSlug);
    if (fromList) {
      setDetailMachine(fromList);
      setDetailError(null);
      return;
    }

    let active = true;
    fetchEquipmentBySlug(equipmentSlug)
      .then((item) => {
        if (!active) return;
        setDetailMachine(item);
        setDetailError(null);
      })
      .catch(() => {
        if (!active) return;
        setDetailMachine(null);
        setDetailError('The requested vacuum coating system could not be found.');
      });

    return () => {
      active = false;
    };
  }, [equipmentSlug, equipment]);

  // Synchronize Document Title, Meta Description, Canonical URL & JSON-LD per Route
  useEffect(() => {
    if (equipmentSlug && detailMachine) {
      updateDocumentSeo({
        title: detailMachine.yoast_head_json.title,
        description: detailMachine.yoast_head_json.description,
        canonicalPath: `/equipment/${detailMachine.slug}`,
        schema: detailMachine.yoast_head_json.schema,
      });
      return;
    }

    const routeMeta: Record<string, { title: string; description: string }> = {
      '/': {
        title: 'Zhenhua Vacuum – PVD Coating Equipment & Sputtering Systems',
        description:
          'Guangdong Zhenhua Technology (Est. 1992) engineers inline magnetron sputtering, cathodic arc, and optical PVD vacuum coating systems for global manufacturing.',
      },
      '/equipment': {
        title: 'PVD Equipment Catalog – Inline Sputtering & Arc Coaters | Zhenhua Vacuum',
        description:
          'Browse and compare Zhenhua Vacuum PVD coating machines by process architecture, base vacuum pressure, and substrate compatibility.',
      },
      '/applications': {
        title: 'Industry Applications – Semiconductor, Optics & Automotive | Zhenhua Vacuum',
        description:
          'Vacuum thin-film coating solutions for TGV semiconductor packaging, optical lenses, automotive headlamps, PCB micro-drills, and sanitary hardware.',
      },
      '/insights': {
        title: 'Technical Insights & Process Engineering Notes | Zhenhua Vacuum',
        description:
          'Engineering briefs, exhibition updates, and PVD process benchmarks from Guangdong Zhenhua Technology Co., Ltd.',
      },
      '/about': {
        title: 'About Zhenhua Vacuum – 67,000 m² Zhaoqing Manufacturing Bases',
        description:
          'Established in 1992, Zhenhua Vacuum operates three production bases in Zhaoqing and five technical service hubs worldwide.',
      },
      '/architecture': {
        title: 'Headless WordPress & SEO Architecture Blueprint | Zhenhua Vacuum',
        description:
          'Technical comparison and live REST API inspector demonstrating the migration from legacy SaaS bloat to Headless WordPress.',
      },
    };

    const meta = routeMeta[currentPath] || routeMeta['/'];
    updateDocumentSeo({
      title: meta.title,
      description: meta.description,
      canonicalPath: currentPath,
    });
  }, [currentPath, equipmentSlug, detailMachine]);

  const handleOpenRFQ = (modelCode = '', processSlug = 'continuous-coating-line') => {
    setRfqModel(modelCode);
    setRfqProcess(processSlug);
    setRfqOpen(true);
  };

  const handleFilterByIndustry = (industryTitle: string, primaryProcess?: string) => {
    setActiveIndustry(industryTitle);
    setActiveProcess(primaryProcess || 'all');
    if (currentPath !== '/' && currentPath !== '/equipment') {
      navigate('/equipment');
    } else {
      const target = document.getElementById('equipment-catalog');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderMainContent = () => {
    if (equipmentSlug) {
      if (detailError) {
        return (
          <div className="mx-auto max-w-3xl px-4 py-20 text-center">
            <h1 className="font-display text-2xl font-bold text-slate-950">
              Equipment System Not Found
            </h1>
            <p className="mt-2 text-sm text-slate-600">{detailError}</p>
            <button
              type="button"
              onClick={() => navigate('/equipment')}
              className="mt-6 rounded-md bg-slate-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700 cursor-pointer"
            >
              Return to Equipment Catalog
            </button>
          </div>
        );
      }

      if (!detailMachine) {
        return (
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="h-96 animate-pulse rounded-lg border border-slate-200 bg-white" />
          </div>
        );
      }

      return (
        <EquipmentDetailView
          equipment={detailMachine}
          onBack={() => navigate('/equipment')}
          onRequestQuote={(model, proc) => handleOpenRFQ(model, proc)}
        />
      );
    }

    if (currentPath === '/architecture') {
      return <ArchitectureView />;
    }

    if (currentPath === '/equipment') {
      return (
        <>
          <EquipmentCatalogSection
            equipment={equipment}
            loading={loading}
            error={error}
            activeProcess={activeProcess}
            activeIndustry={activeIndustry}
            onProcessChange={setActiveProcess}
            onClearIndustry={() => setActiveIndustry('all')}
            onSelectEquipment={(slug) => navigate(`/equipment/${slug}`)}
            onRequestQuoteForModel={(model, proc) => handleOpenRFQ(model, proc)}
            asPageHeading
          />
          <RFQInlineSection />
        </>
      );
    }

    if (currentPath === '/applications') {
      return (
        <>
          <ApplicationsSection
            applications={applications}
            onFilterByIndustry={handleFilterByIndustry}
            asPageHeading
          />
          <RFQInlineSection />
        </>
      );
    }

    if (currentPath === '/insights') {
      return (
        <>
          <InsightsSection posts={posts} asPageHeading />
          <RFQInlineSection />
        </>
      );
    }

    if (currentPath === '/about') {
      return (
        <>
          <AboutSection
            siteMeta={siteMeta}
            onRequestQuote={() => handleOpenRFQ()}
            asPageHeading
          />
          <RFQInlineSection />
        </>
      );
    }

    // Default canonical Home view (/)
    return (
      <>
        <HeroSection
          onExploreEquipment={() => {
            const el = document.getElementById('equipment-catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewArchitecture={() => navigate('/architecture')}
        />
        <EquipmentCatalogSection
          equipment={equipment}
          loading={loading}
          error={error}
          activeProcess={activeProcess}
          activeIndustry={activeIndustry}
          onProcessChange={setActiveProcess}
          onClearIndustry={() => setActiveIndustry('all')}
          onSelectEquipment={(slug) => navigate(`/equipment/${slug}`)}
          onRequestQuoteForModel={(model, proc) => handleOpenRFQ(model, proc)}
        />
        <ApplicationsSection
          applications={applications}
          onFilterByIndustry={handleFilterByIndustry}
        />
        <AboutSection siteMeta={siteMeta} onRequestQuote={() => handleOpenRFQ()} />
        <InsightsSection posts={posts} />
        <RFQInlineSection />
      </>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenRFQ={() => handleOpenRFQ()}
      />

      <main className="flex-1">{renderMainContent()}</main>

      <Footer
        siteMeta={siteMeta}
        onNavigate={navigate}
        onOpenRFQ={() => handleOpenRFQ()}
      />

      <RFQDrawer
        open={rfqOpen}
        initialModel={rfqModel}
        initialProcess={rfqProcess}
        onClose={() => setRfqOpen(false)}
      />
    </div>
  );
}
