import type { WPSiteMeta } from '../types/wp';
import { ResilientImage } from './ResilientImage';

interface AboutSectionProps {
  siteMeta: WPSiteMeta | null;
  onRequestQuote: () => void;
  asPageHeading?: boolean;
}

export function AboutSection({
  siteMeta,
  onRequestQuote,
  asPageHeading = false,
}: AboutSectionProps) {
  const company = siteMeta?.company;
  const bases = company?.production_bases || [
    'Yungui Zhenhua Industrial Park (HQ)',
    'Beiling Production Base',
    'Lantang Production Base',
  ];
  const HeadingTag = asPageHeading ? 'h1' : 'h2';

  return (
    <section
      id="about-section"
      aria-labelledby="about-heading"
      className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-900">
            <ResilientImage
              src="/src/assets/images/app_semiconductor_optics_1795314228739.jpg"
              alt="Precision PVD coated optical lens, TGV glass interposer wafer, and TiN micro-drills"
              className="h-full min-h-[340px] w-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-medium tracking-wider text-sky-700 uppercase">
                03. Manufacturing &amp; R&amp;D
              </p>
              <HeadingTag
                id="about-heading"
                className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
              >
                Three Production Bases in Zhaoqing Since 1992
              </HeadingTag>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Founded as Zhaoqing Zhenhua Vacuum Machinery Co., Ltd. in 1992, Guangdong
                Zhenhua Technology Co., Ltd. designs, machines, and commissions custom PVD
                and PECVD vacuum coating lines across a 67,000 m² manufacturing footprint.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Production Facilities
                </h3>
                <ul className="mt-2.5 space-y-1.5 text-sm text-slate-800">
                  {bases.map((base) => (
                    <li key={base}>{base}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Engineering Capacity
                </h3>
                <dl className="mt-2.5 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-600">Facility Area</dt>
                    <dd className="font-mono font-medium text-slate-950 tabular-nums">
                      67,000 m²
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-600">Service Centers</dt>
                    <dd className="font-mono font-medium text-slate-950 tabular-nums">
                      {company?.service_centers_count || 5} Hubs
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-600">Process Patents</dt>
                    <dd className="font-mono font-medium text-slate-950 tabular-nums">
                      {company?.patents_count || 16}+ Granted
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={onRequestQuote}
                className="rounded-md bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 cursor-pointer"
              >
                Schedule Sample Coating Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
