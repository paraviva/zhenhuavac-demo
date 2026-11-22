import { useMemo, useState } from 'react';
import { ArrowRight, Check, Scale, Search, X } from 'lucide-react';
import type { ProcessCategorySlug, WPEquipment } from '../types/wp';
import { ResilientImage } from './ResilientImage';

interface EquipmentCatalogSectionProps {
  equipment: WPEquipment[];
  loading: boolean;
  error: string | null;
  activeProcess: string;
  activeIndustry: string;
  onProcessChange: (process: string) => void;
  onClearIndustry: () => void;
  onSelectEquipment: (slug: string) => void;
  onRequestQuoteForModel: (modelCode: string, processSlug: string) => void;
  asPageHeading?: boolean;
}

const PROCESS_TABS: Array<{ slug: 'all' | ProcessCategorySlug; label: string }> = [
  { slug: 'all', label: 'All Systems' },
  { slug: 'continuous-coating-line', label: 'Inline Sputtering' },
  { slug: 'magnetron-sputtering', label: 'Magnetron' },
  { slug: 'cathodic-arc', label: 'Cathodic Arc' },
  { slug: 'electron-beam', label: 'Optical E-Beam' },
  { slug: 'hard-coating', label: 'Hard Coating' },
  { slug: 'evaporation-cvd', label: 'Evaporation & CVD' },
];

export function EquipmentCatalogSection({
  equipment,
  loading,
  error,
  activeProcess,
  activeIndustry,
  onProcessChange,
  onClearIndustry,
  onSelectEquipment,
  onRequestQuoteForModel,
  asPageHeading = false,
}: EquipmentCatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [showComparePanel, setShowComparePanel] = useState(false);

  const HeadingTag = asPageHeading ? 'h1' : 'h2';

  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      if (activeProcess !== 'all' && item.acf.process_category !== activeProcess) {
        return false;
      }
      if (activeIndustry !== 'all') {
        const matches = item.acf.industries.some((ind) =>
          ind.toLowerCase().includes(activeIndustry.toLowerCase()),
        );
        if (!matches) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const hay = [
          item.title.rendered,
          item.acf.model_code,
          item.acf.process_label,
          item.excerpt.rendered,
          ...item.acf.target_films,
          ...item.acf.substrate_compatibility,
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [equipment, activeProcess, activeIndustry, searchQuery]);

  const compareItems = useMemo(
    () => equipment.filter((item) => compareSlugs.includes(item.slug)),
    [equipment, compareSlugs],
  );

  const toggleCompare = (slug: string) => {
    setCompareSlugs((prev) => {
      if (prev.includes(slug)) {
        const next = prev.filter((s) => s !== slug);
        if (next.length < 2) setShowComparePanel(false);
        return next;
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), slug];
      }
      return [...prev, slug];
    });
  };

  return (
    <section
      id="equipment-catalog"
      aria-labelledby="catalog-heading"
      className="bg-slate-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Search */}
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-medium tracking-wider text-sky-700 uppercase">
              01. Equipment Catalog
            </p>
            <HeadingTag
              id="catalog-heading"
              className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
            >
              Vacuum Coating Systems by Process Architecture
            </HeadingTag>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Structured WordPress Custom Post Types with verified chamber geometry, base
              vacuum ratings, and deposition tolerances.
            </p>
          </div>

          <div className="w-full lg:w-80">
            <label htmlFor="equipment-search" className="sr-only">
              Search equipment by model, substrate, or target film
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="equipment-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search model, TiN, TGV, AR..."
                className="w-full rounded-md border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-700"
              />
            </div>
          </div>
        </div>

        {/* Process Filter Segmented Bar */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Filter equipment by coating process"
            className="flex flex-wrap items-center gap-1.5 rounded-lg bg-slate-200/70 p-1"
          >
            {PROCESS_TABS.map((tab) => {
              const selected = activeProcess === tab.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => onProcessChange(tab.slug)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    selected
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-600">
            {activeIndustry !== 'all' && (
              <button
                type="button"
                onClick={onClearIndustry}
                className="inline-flex items-center gap-1.5 font-medium text-sky-700 hover:text-sky-900 cursor-pointer"
              >
                <span>Sector: {activeIndustry}</span>
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}

            <span className="font-mono tabular-nums">
              {filteredEquipment.length} {filteredEquipment.length === 1 ? 'system' : 'systems'}
            </span>
          </div>
        </div>

        {/* Compare Sticky Bar (inline below controls when >= 1 selected) */}
        {compareItems.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-300 bg-white px-4 py-3">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Scale className="h-4 w-4 text-sky-700 shrink-0" aria-hidden="true" />
              <span className="font-medium text-slate-900">
                Compare Specifications ({compareItems.length}/3):
              </span>
              <span className="font-mono text-xs text-slate-600">
                {compareItems.map((i) => i.acf.model_code).join(' · ')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCompareSlugs([])}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                disabled={compareItems.length < 2}
                onClick={() => setShowComparePanel((prev) => !prev)}
                className="rounded-md bg-slate-950 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300 cursor-pointer whitespace-nowrap"
              >
                {showComparePanel
                  ? 'Hide Matrix'
                  : compareItems.length < 2
                    ? 'Select 1 More'
                    : 'Compare Matrix'}
              </button>
            </div>
          </div>
        )}

        {/* Side-by-side Technical Spec Comparison Matrix */}
        {showComparePanel && compareItems.length >= 2 && (
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">
                    Parameter
                  </th>
                  {compareItems.map((item) => (
                    <th key={item.slug} className="px-4 py-3 font-display font-semibold text-slate-950">
                      {item.acf.model_code}
                      <div className="mt-0.5 font-sans text-xs font-normal text-slate-500">
                        {item.acf.process_label}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-700">Chamber Dimensions</td>
                  {compareItems.map((item) => (
                    <td key={item.slug} className="px-4 py-3 font-mono text-slate-800 tabular-nums">
                      {item.acf.specs.chamber_dimensions}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-700">Base Vacuum</td>
                  {compareItems.map((item) => (
                    <td key={item.slug} className="px-4 py-3 font-mono text-slate-800 tabular-nums">
                      {item.acf.specs.base_vacuum_pressure}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-700">Film Uniformity</td>
                  {compareItems.map((item) => (
                    <td key={item.slug} className="px-4 py-3 font-mono text-slate-800 tabular-nums">
                      {item.acf.specs.film_uniformity}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-700">Cycle Time</td>
                  {compareItems.map((item) => (
                    <td key={item.slug} className="px-4 py-3 font-mono text-slate-800 tabular-nums">
                      {item.acf.specs.cycle_time}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-700">Power Source</td>
                  {compareItems.map((item) => (
                    <td key={item.slug} className="px-4 py-3 text-slate-700">
                      {item.acf.specs.power_supply}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-700">Target Films</td>
                  {compareItems.map((item) => (
                    <td key={item.slug} className="px-4 py-3 text-slate-700">
                      {item.acf.target_films.join(' · ')}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Loading / Error / Empty States */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 animate-pulse rounded-lg border border-slate-200 bg-white p-5"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
            {error}
          </div>
        )}

        {!loading && !error && filteredEquipment.length === 0 && (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white px-6 py-12 text-center">
            <p className="text-base font-medium text-slate-900">
              No vacuum coating systems match the current filters.
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Reset the process tab or search query to inspect all 8 equipment architectures.
            </p>
            <button
              type="button"
              onClick={() => {
                onProcessChange('all');
                onClearIndustry();
                setSearchQuery('');
              }}
              className="mt-4 rounded-md bg-slate-950 px-4 py-2 text-xs font-medium text-white hover:bg-sky-700 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Equipment Grid */}
        {!loading && !error && filteredEquipment.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEquipment.map((item) => {
              const isCompared = compareSlugs.includes(item.slug);
              return (
                <article
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors duration-150 hover:border-slate-300"
                >
                  <button
                    type="button"
                    onClick={() => onSelectEquipment(item.slug)}
                    className="group relative aspect-[4/3] w-full overflow-hidden bg-slate-100 text-left cursor-pointer"
                  >
                    <ResilientImage
                      src={item.acf.featured_image}
                      alt={item.acf.featured_image_alt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </button>

                  <div className="flex flex-1 flex-col p-5">
                    {/* Zero-pill quiet metadata line */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono font-semibold text-sky-700">
                        {item.acf.model_code}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{item.acf.process_label}</span>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-slate-950">
                      <button
                        type="button"
                        onClick={() => onSelectEquipment(item.slug)}
                        className="text-left hover:text-sky-700 transition-colors cursor-pointer"
                      >
                        {item.title.rendered}
                      </button>
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {item.excerpt.rendered}
                    </p>

                    {/* Key tabular metrics */}
                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs">
                      <div>
                        <dt className="text-slate-500">Base Vacuum</dt>
                        <dd className="mt-0.5 font-mono font-medium text-slate-900 tabular-nums">
                          {item.acf.specs.base_vacuum_pressure}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Cycle Time</dt>
                        <dd className="mt-0.5 font-mono font-medium text-slate-900 tabular-nums truncate">
                          {item.acf.specs.cycle_time}
                        </dd>
                      </div>
                    </dl>

                    {/* Action footer */}
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        onClick={() => onSelectEquipment(item.slug)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-950 hover:text-sky-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        View Specs
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleCompare(item.slug)}
                          aria-pressed={isCompared}
                          className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                            isCompared
                              ? 'border-sky-700 bg-sky-50 text-sky-800'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                          }`}
                        >
                          {isCompared && <Check className="h-3 w-3" aria-hidden="true" />}
                          {isCompared ? 'Selected' : 'Compare'}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onRequestQuoteForModel(item.acf.model_code, item.acf.process_category)
                          }
                          className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-900 transition-colors hover:bg-slate-200 cursor-pointer whitespace-nowrap"
                        >
                          Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
