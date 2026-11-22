import type { WPSiteMeta } from '../types/wp';

interface FooterProps {
  siteMeta: WPSiteMeta | null;
  onNavigate: (path: string) => void;
  onOpenRFQ: () => void;
}

export function Footer({ siteMeta, onNavigate, onOpenRFQ }: FooterProps) {
  const company = siteMeta?.company;

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-4">
            <div className="font-display text-lg font-bold tracking-tight text-white">
              ZHENHUA VACUUM
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              {company?.legal_name || 'Guangdong Zhenhua Technology Co., Ltd.'} — Vacuum
              coating equipment engineering, process integration, and turnkey PVD systems
              since {company?.founded_year || 1992}.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p>{company?.headquarters || 'Yungui Rd, Zhaoqing Avenue West Block, Zhaoqing, Guangdong, China'}</p>
              <p>
                <a
                  href={`mailto:${company?.email || 'panyf@zhenhuavacuum.com'}`}
                  className="text-slate-200 hover:text-sky-400 transition-colors"
                >
                  {company?.email || 'panyf@zhenhuavacuum.com'}
                </a>
                <span className="mx-2 text-slate-600" aria-hidden="true">
                  ·
                </span>
                <span className="font-mono tabular-nums">
                  {company?.phone || '+86-13826005301'}
                </span>
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Equipment
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/equipment"
                  onClick={(e) => handleNav(e, '/equipment')}
                  className="hover:text-white transition-colors"
                >
                  All Coating Systems
                </a>
              </li>
              <li>
                <a
                  href="/applications"
                  onClick={(e) => handleNav(e, '/applications')}
                  className="hover:text-white transition-colors"
                >
                  Industry Applications
                </a>
              </li>
              <li>
                <a
                  href="/insights"
                  onClick={(e) => handleNav(e, '/insights')}
                  className="hover:text-white transition-colors"
                >
                  Technical Insights
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNav(e, '/about')}
                  className="hover:text-white transition-colors"
                >
                  Zhaoqing Facilities
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Headless WP &amp; SEO
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/architecture"
                  onClick={(e) => handleNav(e, '/architecture')}
                  className="hover:text-white transition-colors"
                >
                  Architecture &amp; SEO Audit
                </a>
              </li>
              <li>
                <a
                  href="/api/wp/v2/equipment"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WP REST: /wp/v2/equipment
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Dynamic XML Sitemap
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  robots.txt Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Engineering
            </h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Share your substrate dimensions and target film stack for process cycle evaluation.
            </p>
            <button
              type="button"
              onClick={onOpenRFQ}
              className="w-full rounded-md bg-sky-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600 cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Guangdong Zhenhua Technology Co., Ltd. All rights reserved.</p>
          <p>
            Canonical Markets: English · 中文 · Deutsch · 日本語 (Clean hreflang governance)
          </p>
        </div>
      </div>
    </footer>
  );
}
