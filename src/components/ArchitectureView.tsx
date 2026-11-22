import { useEffect, useState } from 'react';
import { CheckCircle2, Database, ExternalLink, Globe, RefreshCw } from 'lucide-react';
import { fetchSeoAudit } from '../lib/wpApi';
import type { SEOAuditItem, WPSiteMeta } from '../types/wp';

const ENDPOINTS = [
  { label: 'GET /api/wp/v2/site-meta', path: '/api/wp/v2/site-meta', format: 'json' },
  { label: 'GET /api/wp/v2/equipment', path: '/api/wp/v2/equipment', format: 'json' },
  { label: 'GET /api/wp/v2/applications', path: '/api/wp/v2/applications', format: 'json' },
  { label: 'GET /api/wp/v2/posts', path: '/api/wp/v2/posts', format: 'json' },
  { label: 'GET /sitemap.xml', path: '/sitemap.xml', format: 'xml' },
];

export function ArchitectureView() {
  const [auditItems, setAuditItems] = useState<SEOAuditItem[]>([]);
  const [meta, setMeta] = useState<WPSiteMeta | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[0]);
  const [payloadPreview, setPayloadPreview] = useState<string>('Loading endpoint payload...');
  const [fetchingPayload, setFetchingPayload] = useState(false);

  useEffect(() => {
    fetchSeoAudit()
      .then((res) => {
        setAuditItems(res.comparison);
        setMeta(res.meta);
      })
      .catch(() => {
        setAuditItems([]);
      });
  }, []);

  useEffect(() => {
    let active = true;
    setFetchingPayload(true);
    fetch(selectedEndpoint.path)
      .then(async (res) => {
        const text = await res.text();
        if (!active) return;
        if (selectedEndpoint.format === 'json') {
          try {
            const parsed = JSON.parse(text);
            setPayloadPreview(JSON.stringify(parsed, null, 2));
          } catch {
            setPayloadPreview(text);
          }
        } else {
          setPayloadPreview(text);
        }
      })
      .catch(() => {
        if (active) setPayloadPreview('Unable to load endpoint response.');
      })
      .finally(() => {
        if (active) setFetchingPayload(false);
      });
    return () => {
      active = false;
    };
  }, [selectedEndpoint]);

  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-medium tracking-wider text-sky-700 uppercase">
              Headless WordPress MVP Architecture
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl [text-wrap:balance]">
              Replacing Legacy Globalso SaaS Bloat with Headless WordPress
            </h1>
            <p className="text-base leading-relaxed text-slate-600">
              Decoupled React storefront consuming WordPress REST API v2 Custom Post Types
              (Equipment, Applications, Insights) and Yoast SEO metadata—eliminating the
              98+ auto-translated language spam pages and broken template scripts.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-5 py-4 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-950">
              <Database className="h-4 w-4 text-sky-700" aria-hidden="true" />
              <span>CMS Connection Mode</span>
            </div>
            <div className="mt-1.5 font-mono text-slate-700">
              {meta?.wordpress_endpoint_configured
                ? 'Live WORDPRESS_API_URL Connected'
                : 'Express Headless WP Adapter (Ready for WORDPRESS_API_URL)'}
            </div>
          </div>
        </div>

        {/* Before vs After SEO & Architecture Table */}
        <section aria-labelledby="audit-heading" className="space-y-4">
          <div>
            <h2
              id="audit-heading"
              className="font-display text-xl font-bold text-slate-950 sm:text-2xl"
            >
              01. Legacy SaaS vs. Headless WordPress Audit
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Direct remediation of technical SEO, DOM hygiene, and interaction defects
              observed in the legacy zhenhuavac.com HTML.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                  <th className="px-5 py-3.5 w-48">Dimension</th>
                  <th className="px-5 py-3.5">Legacy Globalso SaaS Site</th>
                  <th className="px-5 py-3.5">Headless WordPress MVP</th>
                  <th className="px-5 py-3.5 w-52">Measurable Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {auditItems.map((row) => (
                  <tr key={row.dimension} className="align-top">
                    <td className="px-5 py-4 font-semibold text-slate-950">
                      {row.dimension}
                    </td>
                    <td className="px-5 py-4 text-slate-600 leading-relaxed">
                      {row.legacy_globalso}
                    </td>
                    <td className="px-5 py-4 text-slate-800 leading-relaxed">
                      {row.headless_wp_mvp}
                    </td>
                    <td className="px-5 py-4 font-medium text-sky-800">
                      <span className="inline-flex items-start gap-1.5">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-sky-700"
                          aria-hidden="true"
                        />
                        <span>{row.impact}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Clean hreflang Localization Governance */}
        <section aria-labelledby="hreflang-heading" className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="hreflang-heading"
                className="font-display text-xl font-bold text-slate-950 sm:text-2xl"
              >
                02. Clean Multilingual &amp; Hreflang Governance
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Replaced {meta?.hreflang_policy.deprecated_spam_locales_removed ?? 98}{' '}
                unvetted machine-translated spam directories with 4 intentional B2B
                market locales managed via WPML / Polylang.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(meta?.hreflang_policy.active_locales || []).map((loc) => (
              <div
                key={loc.code}
                className="rounded-lg border border-slate-200 bg-white p-5 space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono font-semibold text-sky-700">
                    hreflang=&quot;{loc.code}&quot;
                  </span>
                  <Globe className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                </div>
                <div className="font-display text-sm font-semibold text-slate-950">
                  {loc.label}
                </div>
                <div className="font-mono text-xs text-slate-500">
                  Prefix: {loc.canonical_prefix}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Headless WordPress Endpoint Explorer */}
        <section aria-labelledby="api-explorer-heading" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2
                id="api-explorer-heading"
                className="font-display text-xl font-bold text-slate-950 sm:text-2xl"
              >
                03. Live Headless WordPress REST &amp; Sitemap Inspector
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Test the live JSON/XML payloads served by the Express Headless WP adapter.
              </p>
            </div>

            <a
              href={selectedEndpoint.path}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900"
            >
              Open Raw Endpoint
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex flex-wrap gap-1.5">
                {ENDPOINTS.map((ep) => {
                  const active = ep.path === selectedEndpoint.path;
                  return (
                    <button
                      key={ep.path}
                      type="button"
                      onClick={() => setSelectedEndpoint(ep)}
                      className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-slate-950 text-white'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {ep.label}
                    </button>
                  );
                })}
              </div>

              {fetchingPayload && (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  Fetching
                </span>
              )}
            </div>

            <pre className="max-h-[440px] overflow-auto bg-slate-950 p-5 font-mono text-xs leading-relaxed text-slate-200">
              {payloadPreview}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
