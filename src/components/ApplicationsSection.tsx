import { ArrowRight } from 'lucide-react';
import type { WPApplication } from '../types/wp';

interface ApplicationsSectionProps {
  applications: WPApplication[];
  onFilterByIndustry: (industryTitle: string, primaryProcess?: string) => void;
  asPageHeading?: boolean;
}

export function ApplicationsSection({
  applications,
  onFilterByIndustry,
  asPageHeading = false,
}: ApplicationsSectionProps) {
  const HeadingTag = asPageHeading ? 'h1' : 'h2';
  return (
    <section
      id="applications-section"
      aria-labelledby="applications-heading"
      className="border-t border-slate-200 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-medium tracking-wider text-sky-700 uppercase">
            02. Industry Applications
          </p>
          <HeadingTag
            id="applications-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
          >
            Process Outcomes Across Six Core Manufacturing Sectors
          </HeadingTag>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Select an industry vertical to filter compatible Zhenhua vacuum coating lines
            and substrate specifications.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="flex flex-col justify-between bg-white p-6 transition-colors duration-150 hover:bg-slate-50"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-mono font-semibold text-slate-400">
                    {app.acf.sector_code}
                  </span>
                  <span className="font-mono text-sky-700">{app.acf.headline_metric}</span>
                </div>

                <h3 className="mt-3 font-display text-lg font-semibold text-slate-950">
                  {app.title.rendered}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {app.excerpt.rendered}
                </p>

                <div className="mt-4 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">Substrates: </span>
                  {app.acf.substrate_examples.join(' · ')}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="font-mono text-xs text-slate-500">
                  {app.acf.recommended_models.join(', ')}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    onFilterByIndustry(
                      app.title.rendered.split('&')[0].trim(),
                      app.acf.recommended_processes[0],
                    )
                  }
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-950 hover:text-sky-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Match Systems
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
