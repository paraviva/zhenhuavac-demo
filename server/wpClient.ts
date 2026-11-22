import type {
  WPApplication,
  WPEquipment,
  WPPost,
  WPSiteMeta,
} from '../src/types/wp.ts';
import {
  wpApplicationsData,
  wpEquipmentData,
  wpPostsData,
  wpSiteMetaBase,
} from './wpData.ts';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL_MS = 60_000;

function isPrivateOrLoopbackHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (
    lower === 'localhost' ||
    lower === '127.0.0.1' ||
    lower === '::1' ||
    lower === '0.0.0.0' ||
    lower.endsWith('.local') ||
    lower.endsWith('.internal')
  ) {
    return true;
  }
  // IPv4 private / link-local blocks
  const ipv4Match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(lower);
  if (ipv4Match) {
    const [, aStr, bStr] = ipv4Match;
    const a = Number(aStr);
    const b = Number(bStr);
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }
  return false;
}

export function getValidatedWordPressBaseUrl(): string | null {
  const raw = process.env.WORDPRESS_API_URL?.trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }
    if (isPrivateOrLoopbackHost(parsed.hostname)) {
      return null;
    }
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return null;
  }
}

async function fetchFromLiveWP<T>(path: string): Promise<T | null> {
  const baseUrl = getValidatedWordPressBaseUrl();
  if (!baseUrl) return null;

  const cacheKey = `${baseUrl}${path}`;
  const now = Date.now();
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return cached.value as T;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const response = await fetch(`${baseUrl}${path}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timer);
    if (!response.ok) return null;
    const json = (await response.json()) as T;
    cache.set(cacheKey, { value: json, expiresAt: now + CACHE_TTL_MS });
    return json;
  } catch {
    return null;
  }
}

export async function getEquipmentList(filters?: {
  process?: string;
  industry?: string;
  search?: string;
}): Promise<WPEquipment[]> {
  const live = await fetchFromLiveWP<WPEquipment[]>('/wp/v2/equipment?per_page=50');
  const source = Array.isArray(live) && live.length > 0 ? live : wpEquipmentData;

  return source.filter((item) => {
    if (filters?.process && filters.process !== 'all') {
      if (item.acf.process_category !== filters.process) return false;
    }
    if (filters?.industry && filters.industry !== 'all') {
      const target = filters.industry.toLowerCase();
      const matchesIndustry = item.acf.industries.some((ind) =>
        ind.toLowerCase().includes(target),
      );
      if (!matchesIndustry) return false;
    }
    if (filters?.search && filters.search.trim().length > 0) {
      const q = filters.search.trim().toLowerCase();
      const haystack = [
        item.title.rendered,
        item.excerpt.rendered,
        item.acf.model_code,
        item.acf.process_label,
        ...item.acf.substrate_compatibility,
        ...item.acf.target_films,
        ...item.acf.industries,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export async function getEquipmentBySlug(slug: string): Promise<WPEquipment | null> {
  const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '');
  if (!safeSlug) return null;

  const live = await fetchFromLiveWP<WPEquipment[]>(
    `/wp/v2/equipment?slug=${encodeURIComponent(safeSlug)}`,
  );
  if (Array.isArray(live) && live.length > 0) {
    return live[0];
  }
  return wpEquipmentData.find((item) => item.slug === safeSlug) || null;
}

export async function getApplications(): Promise<WPApplication[]> {
  const live = await fetchFromLiveWP<WPApplication[]>('/wp/v2/applications?per_page=50');
  return Array.isArray(live) && live.length > 0 ? live : wpApplicationsData;
}

export async function getPosts(): Promise<WPPost[]> {
  const live = await fetchFromLiveWP<WPPost[]>('/wp/v2/posts?per_page=20');
  return Array.isArray(live) && live.length > 0 ? live : wpPostsData;
}

export function getSiteMeta(): WPSiteMeta {
  const liveBase = getValidatedWordPressBaseUrl();
  return {
    ...wpSiteMetaBase,
    source_mode: liveBase ? 'live-wordpress-rest' : 'headless-local-adapter',
    wordpress_endpoint_configured: Boolean(liveBase),
  };
}
