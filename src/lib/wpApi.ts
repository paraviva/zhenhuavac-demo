import type {
  RFQPayload,
  RFQResponse,
  SEOAuditItem,
  WPApplication,
  WPEquipment,
  WPPost,
  WPSiteMeta,
} from '../types/wp';

export async function fetchSiteMeta(): Promise<WPSiteMeta> {
  const res = await fetch('/api/wp/v2/site-meta');
  if (!res.ok) throw new Error('Failed to load site metadata');
  return res.json();
}

export async function fetchEquipment(params?: {
  process?: string;
  industry?: string;
  search?: string;
}): Promise<WPEquipment[]> {
  const qs = new URLSearchParams();
  if (params?.process && params.process !== 'all') qs.set('process', params.process);
  if (params?.industry && params.industry !== 'all') qs.set('industry', params.industry);
  if (params?.search && params.search.trim()) qs.set('search', params.search.trim());

  const query = qs.toString();
  const res = await fetch(`/api/wp/v2/equipment${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to load equipment catalog');
  return res.json();
}

export async function fetchEquipmentBySlug(slug: string): Promise<WPEquipment> {
  const res = await fetch(`/api/wp/v2/equipment/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error('Equipment system not found');
  return res.json();
}

export async function fetchApplications(): Promise<WPApplication[]> {
  const res = await fetch('/api/wp/v2/applications');
  if (!res.ok) throw new Error('Failed to load industry applications');
  return res.json();
}

export async function fetchPosts(): Promise<WPPost[]> {
  const res = await fetch('/api/wp/v2/posts');
  if (!res.ok) throw new Error('Failed to load technical insights');
  return res.json();
}

export async function fetchSeoAudit(): Promise<{
  generatedAt: string;
  meta: WPSiteMeta;
  comparison: SEOAuditItem[];
}> {
  const res = await fetch('/api/seo/audit');
  if (!res.ok) throw new Error('Failed to load SEO audit data');
  return res.json();
}

export async function submitRFQ(payload: RFQPayload): Promise<RFQResponse> {
  const res = await fetch('/api/rfq', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to submit inquiry');
  }
  return data;
}

export function updateDocumentSeo(opts: {
  title: string;
  description: string;
  canonicalPath: string;
  schema?: Record<string, unknown>;
}): void {
  document.title = opts.title;

  const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector<HTMLMetaElement>(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('meta[name="description"]', 'name', 'description', opts.description);
  setMeta('meta[property="og:title"]', 'property', 'og:title', opts.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', opts.description);
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', opts.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', opts.description);

  const canonicalUrl = `${window.location.origin}${opts.canonicalPath}`;
  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  const existingRouteLd = document.getElementById('route-jsonld');
  if (opts.schema) {
    const scriptEl =
      existingRouteLd ||
      Object.assign(document.createElement('script'), {
        id: 'route-jsonld',
        type: 'application/ld+json',
      });
    scriptEl.textContent = JSON.stringify(opts.schema);
    if (!existingRouteLd) {
      document.head.appendChild(scriptEl);
    }
  } else if (existingRouteLd) {
    existingRouteLd.remove();
  }
}
