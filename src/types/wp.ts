export type ProcessCategorySlug =
  | 'continuous-coating-line'
  | 'magnetron-sputtering'
  | 'cathodic-arc'
  | 'electron-beam'
  | 'hard-coating'
  | 'evaporation-cvd';

export interface YoastHeadJson {
  title: string;
  description: string;
  canonical: string;
  og_type: 'website' | 'article' | 'product';
  og_title: string;
  og_description: string;
  schema: Record<string, unknown>;
}

export interface WPEquipmentACF {
  model_code: string;
  process_category: ProcessCategorySlug;
  process_label: string;
  substrate_compatibility: string[];
  target_films: string[];
  industries: string[];
  specs: {
    chamber_dimensions: string;
    base_vacuum_pressure: string;
    film_uniformity: string;
    cycle_time: string;
    power_supply: string;
    control_architecture: string;
  };
  key_advantages: string[];
  featured_image: string;
  featured_image_alt: string;
  is_featured: boolean;
}

export interface WPEquipment {
  id: number;
  slug: string;
  type: 'equipment';
  status: 'publish';
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  acf: WPEquipmentACF;
  yoast_head_json: YoastHeadJson;
}

export interface WPApplication {
  id: number;
  slug: string;
  type: 'application';
  title: { rendered: string };
  excerpt: { rendered: string };
  acf: {
    sector_code: string;
    headline_metric: string;
    substrate_examples: string[];
    recommended_processes: ProcessCategorySlug[];
    recommended_models: string[];
    image: string;
    image_alt: string;
  };
  yoast_head_json: YoastHeadJson;
}

export interface WPPost {
  id: number;
  slug: string;
  type: 'post';
  date: string;
  category: 'Exhibition & Events' | 'Process Engineering' | 'Product Release';
  read_time: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_image: string;
  featured_image_alt: string;
  yoast_head_json: YoastHeadJson;
}

export interface WPSiteMeta {
  source_mode: 'headless-local-adapter' | 'live-wordpress-rest';
  wordpress_endpoint_configured: boolean;
  canonical_base_url: string;
  company: {
    legal_name: string;
    brand_name: string;
    founded_year: number;
    campus_area_sqm: number;
    production_bases: string[];
    service_centers_count: number;
    patents_count: number;
    headquarters: string;
    email: string;
    phone: string;
  };
  hreflang_policy: {
    active_locales: Array<{ code: string; label: string; canonical_prefix: string }>;
    deprecated_spam_locales_removed: number;
  };
  counts: {
    equipment: number;
    applications: number;
    posts: number;
  };
}

export interface SEOAuditItem {
  dimension: string;
  legacy_globalso: string;
  headless_wp_mvp: string;
  impact: string;
}

export interface RFQPayload {
  fullName: string;
  company: string;
  email: string;
  phone?: string;
  industry: string;
  processSlug: string;
  targetModel?: string;
  substrateNotes: string;
}

export interface RFQResponse {
  ticketId: string;
  receivedAt: string;
  status: 'received';
  summary: string;
}
