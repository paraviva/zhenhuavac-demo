import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Code2 } from 'lucide-react';
import type { WPEquipment } from '../types/wp';
import { ResilientImage } from './ResilientImage';

interface EquipmentDetailViewProps {
  equipment: WPEquipment;
  onBack: () => void;
  onRequestQuote: (modelCode: string, processSlug: string) => void;
}

export function EquipmentDetailView({
  equipment,
  onBack,
  onRequestQuote,
}: EquipmentDetailViewProps) {
  const [inspectorTab, setInspectorTab] = useState<'specs' | 'wp-json' | 'schema'>('specs');
  const { acf, yoast_head_json } = equipment;

  const specRows = [
    { label: 'Model Designation', value: acf.model_code },
    { label: 'Coating Architecture', value: acf.process_label },
    { label: 'Chamber Dimensions', value: acf.specs.chamber_dimensions },
    { label: 'Base Vacuum Pressure', value: acf.specs.base_vacuum_pressure },
    { label: 'Film Uniformity', value: acf.specs.film_uniformity },
    { label: 'Typical Cycle Time', value: acf.specs.cycle_time },
    { label: 'Power & Plasma Source', value: acf.specs.power_supply },
    { label: 'Control System', value: acf.specs.control_architecture },
  ];

  return (
    <div className="bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-500">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-sky-700 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Equipment Catalog
          </button>
          <span aria-hidden="true">/</span>
          <span className="font-mono text-slate-900">{acf.model_code}</span>
        </nav>

        {/* Hero 2-column detail split */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <ResilientImage
              src={acf.featured_image}
              alt={acf.featured_image_alt}
              className="h-full min-h-[320px] w-full object-cover"
              priority
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-mono font-semibold text-sky-700">{acf.model_code}</span>
                <span aria-hidden="true">·</span>
                <span>{acf.process_label}</span>
                <span aria-hidden="true">·</span>
                <span>{acf.industries.join(' / ')}</span>
              </div>

              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl [text-wrap:balance]">
                {equipment.title.rendered}
              </h1>

              <p className="text-base leading-relaxed text-slate-600">{equipment.content.rendered}</p>

              <div className="border-t border-slate-200 pt-4">
                <h2 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Engineering Advantages
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {acf.key_advantages.map((adv) => (
                    <li key={adv} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-sky-700"
                        aria-hidden="true"
                      />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={() => onRequestQuote(acf.model_code, acf.process_category)}
                className="rounded-md bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 cursor-pointer whitespace-nowrap"
              >
                Request Engineering Quote for {acf.model_code}
              </button>
              <span className="text-xs text-slate-500">
                Includes substrate sample trial &amp; cleanroom footprint layout
              </span>
            </div>
          </div>
        </div>

        {/* Tabbed Technical Specification & Headless WP Payload Inspector */}
        <div className="mt-12 rounded-lg border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setInspectorTab('specs')}
                className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  inspectorTab === 'specs'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Technical Specifications
              </button>
              <button
                type="button"
                onClick={() => setInspectorTab('wp-json')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  inspectorTab === 'wp-json'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                WP REST / ACF Payload
              </button>
              <button
                type="button"
                onClick={() => setInspectorTab('schema')}
                className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  inspectorTab === 'schema'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Yoast &amp; Schema.org JSON-LD
              </button>
            </div>

            <span className="font-mono text-xs text-slate-500">
              Canonical: /equipment/{equipment.slug}
            </span>
          </div>

          {inspectorTab === 'specs' && (
            <div className="grid grid-cols-1 divide-y divide-slate-200 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
              <div className="lg:col-span-8 divide-y divide-slate-100">
                {specRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4"
                  >
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      {row.label}
                    </div>
                    <div className="sm:col-span-2 font-mono text-sm text-slate-900 tabular-nums">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 space-y-6 p-6 bg-slate-50/50">
                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    Compatible Substrates
                  </h3>
                  <ul className="mt-2.5 space-y-1.5 text-sm text-slate-800">
                    {acf.substrate_compatibility.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-5">
                  <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    Supported Thin Films
                  </h3>
                  <ul className="mt-2.5 space-y-1.5 text-sm text-slate-800">
                    {acf.target_films.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {inspectorTab === 'wp-json' && (
            <div className="p-6">
              <p className="mb-3 text-xs text-slate-600">
                Live structured JSON returned by{' '}
                <code className="font-mono text-slate-900">
                  GET /api/wp/v2/equipment/{equipment.slug}
                </code>
              </p>
              <pre className="max-h-96 overflow-auto rounded-md bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200">
                {JSON.stringify(equipment, null, 2)}
              </pre>
            </div>
          )}

          {inspectorTab === 'schema' && (
            <div className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-medium text-slate-500">SEO Title Tag</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {yoast_head_json.title}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500">Canonical URL</div>
                  <div className="mt-1 font-mono text-xs text-sky-700 break-all">
                    {yoast_head_json.canonical}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-xs font-medium text-slate-500">Meta Description</div>
                  <div className="mt-1 text-sm text-slate-700">
                    {yoast_head_json.description}
                  </div>
                </div>
              </div>

              <pre className="max-h-80 overflow-auto rounded-md bg-slate-950 p-4 font-mono text-xs leading-relaxed text-emerald-300">
                {JSON.stringify(yoast_head_json.schema, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
