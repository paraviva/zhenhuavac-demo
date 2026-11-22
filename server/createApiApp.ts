import express, { type Express } from 'express';
import {
  getApplications,
  getEquipmentBySlug,
  getEquipmentList,
  getPosts,
  getSiteMeta,
} from './wpClient';
import { seoAuditComparison } from './wpData';
import type { RFQPayload, RFQResponse } from '../src/types/wp';

const rfqSubmissions: Array<RFQResponse & RFQPayload> = [];

function sanitizeText(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[<>]/g, '').trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function createApiApp(): Express {
  const app = express();
  app.use(express.json({ limit: '256kb' }));

  // Headless WordPress REST API v2 Adapter Routes
  app.get('/api/wp/v2/site-meta', (_req, res) => {
    res.json(getSiteMeta());
  });

  app.get('/api/wp/v2/equipment', async (req, res) => {
    const processFilter =
      typeof req.query.process === 'string' ? req.query.process : undefined;
    const industryFilter =
      typeof req.query.industry === 'string' ? req.query.industry : undefined;
    const searchFilter =
      typeof req.query.search === 'string' ? req.query.search : undefined;

    const items = await getEquipmentList({
      process: processFilter,
      industry: industryFilter,
      search: searchFilter,
    });
    res.setHeader('X-WP-Total', String(items.length));
    res.json(items);
  });

  app.get('/api/wp/v2/equipment/:slug', async (req, res) => {
    const item = await getEquipmentBySlug(req.params.slug);
    if (!item) {
      res.status(404).json({ code: 'rest_post_invalid_slug', message: 'Equipment not found.' });
      return;
    }
    res.json(item);
  });

  app.get('/api/wp/v2/applications', async (_req, res) => {
    const items = await getApplications();
    res.setHeader('X-WP-Total', String(items.length));
    res.json(items);
  });

  app.get('/api/wp/v2/posts', async (_req, res) => {
    const items = await getPosts();
    res.setHeader('X-WP-Total', String(items.length));
    res.json(items);
  });

  // SEO Audit & Architecture Endpoint
  app.get('/api/seo/audit', (_req, res) => {
    res.json({
      generatedAt: new Date().toISOString(),
      meta: getSiteMeta(),
      comparison: seoAuditComparison,
    });
  });

  // Validated Technical RFQ Submission Route
  app.post('/api/rfq', (req, res) => {
    const body = (req.body || {}) as Partial<RFQPayload>;
    const fullName = sanitizeText(body.fullName, 120);
    const company = sanitizeText(body.company, 160);
    const email = sanitizeText(body.email, 160);
    const phone = sanitizeText(body.phone, 60);
    const industry = sanitizeText(body.industry, 120) || 'General PVD Coating';
    const processSlug = sanitizeText(body.processSlug, 80) || 'all';
    const targetModel = sanitizeText(body.targetModel, 80);
    const substrateNotes = sanitizeText(body.substrateNotes, 1500);

    if (fullName.length < 2) {
      res.status(400).json({ error: 'Please provide your full name (minimum 2 characters).' });
      return;
    }
    if (company.length < 2) {
      res.status(400).json({ error: 'Please provide your company or organization name.' });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please enter a valid corporate or work email address.' });
      return;
    }
    if (substrateNotes.length < 8) {
      res.status(400).json({
        error: 'Please describe your substrate material, target film, or throughput requirements.',
      });
      return;
    }

    const ticketId = `ZH-RFQ-${Date.now().toString(36).toUpperCase()}`;
    const receivedAt = new Date().toISOString();
    const record: RFQResponse & RFQPayload = {
      ticketId,
      receivedAt,
      status: 'received',
      summary: `Technical consultation logged for ${company}${targetModel ? ` (${targetModel})` : ''}.`,
      fullName,
      company,
      email,
      phone,
      industry,
      processSlug,
      targetModel,
      substrateNotes,
    };

    rfqSubmissions.unshift(record);
    if (rfqSubmissions.length > 100) {
      rfqSubmissions.pop();
    }

    res.status(201).json({
      ticketId: record.ticketId,
      receivedAt: record.receivedAt,
      status: record.status,
      summary: record.summary,
    });
  });

  // Dynamic XML Sitemap generated from Headless WordPress CPTs
  app.get('/sitemap.xml', async (req, res) => {
    const baseUrl =
      process.env.APP_URL?.replace(/\/+$/, '') ||
      `${req.protocol}://${req.get('host')}`;
    const [equipment, applications, posts] = await Promise.all([
      getEquipmentList(),
      getApplications(),
      getPosts(),
    ]);

    const urls: Array<{ loc: string; lastmod: string; priority: string }> = [
      { loc: `${baseUrl}/`, lastmod: '2026-11-01', priority: '1.0' },
      { loc: `${baseUrl}/equipment`, lastmod: '2026-11-01', priority: '0.9' },
      { loc: `${baseUrl}/applications`, lastmod: '2026-11-01', priority: '0.9' },
      { loc: `${baseUrl}/insights`, lastmod: '2026-11-01', priority: '0.8' },
      { loc: `${baseUrl}/about`, lastmod: '2026-11-01', priority: '0.7' },
      { loc: `${baseUrl}/architecture`, lastmod: '2026-11-01', priority: '0.6' },
      ...equipment.map((item) => ({
        loc: `${baseUrl}/equipment/${item.slug}`,
        lastmod: item.modified.slice(0, 10),
        priority: '0.8',
      })),
      ...applications.map((appItem) => ({
        loc: `${baseUrl}/applications#${appItem.slug}`,
        lastmod: '2026-11-01',
        priority: '0.7',
      })),
      ...posts.map((post) => ({
        loc: `${baseUrl}/insights#${post.slug}`,
        lastmod: post.date,
        priority: '0.7',
      })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${escapeXml(u.lastmod)}</lastmod>
    <priority>${escapeXml(u.priority)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(xml);
  });

  app.get('/robots.txt', (req, res) => {
    const baseUrl =
      process.env.APP_URL?.replace(/\/+$/, '') ||
      `${req.protocol}://${req.get('host')}`;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
  });

  return app;
}
