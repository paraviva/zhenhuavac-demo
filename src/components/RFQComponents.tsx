import { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { submitRFQ } from '../lib/wpApi';
import type { RFQResponse } from '../types/wp';

interface RFQFormProps {
  initialModel?: string;
  initialProcess?: string;
  onSuccess?: (res: RFQResponse) => void;
  compact?: boolean;
}

const INDUSTRY_OPTIONS = [
  'Semiconductor & TGV Packaging',
  'Precision Optics & Lenses',
  'Automotive Lighting & Interior',
  'PCB Micro-Drills & Tooling',
  '3C Electronics & Mobile Glass',
  'Architectural & Sanitary Hardware',
  'Academic / R&D Laboratory',
];

const PROCESS_OPTIONS = [
  { slug: 'continuous-coating-line', label: 'Continuous Inline Sputtering' },
  { slug: 'magnetron-sputtering', label: 'Magnetron Sputtering (MF / DC)' },
  { slug: 'cathodic-arc', label: 'Cathodic Arc Ion PVD' },
  { slug: 'electron-beam', label: 'Electron Beam Optical Evaporation' },
  { slug: 'hard-coating', label: 'Magnetic-Filtered Hard Coating' },
  { slug: 'evaporation-cvd', label: 'Thermal Evaporation & PECVD' },
];

export function RFQForm({
  initialModel = '',
  initialProcess = 'continuous-coating-line',
  onSuccess,
  compact = false,
}: RFQFormProps) {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0]);
  const [processSlug, setProcessSlug] = useState(initialProcess || 'continuous-coating-line');
  const [targetModel, setTargetModel] = useState(initialModel);
  const [substrateNotes, setSubstrateNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<RFQResponse | null>(null);

  useEffect(() => {
    if (initialModel) setTargetModel(initialModel);
    if (initialProcess && initialProcess !== 'all') setProcessSlug(initialProcess);
  }, [initialModel, initialProcess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (fullName.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (company.trim().length < 2) {
      setError('Please enter your company name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('Please enter a valid work email address.');
      return;
    }
    if (substrateNotes.trim().length < 8) {
      setError('Please specify substrate dimensions, target film, or required throughput.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitRFQ({
        fullName: fullName.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: phone.trim(),
        industry,
        processSlug,
        targetModel: targetModel.trim(),
        substrateNotes: substrateNotes.trim(),
      });
      setReceipt(res);
      onSuccess?.(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit request.');
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-slate-900">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
          <div className="space-y-2">
            <h3 className="font-display text-lg font-semibold text-slate-950">
              Engineering Consultation Logged
            </h3>
            <p className="text-sm text-slate-700">{receipt.summary}</p>
            <div className="font-mono text-xs text-emerald-900">
              Reference ID: {receipt.ticketId}
            </div>
            <button
              type="button"
              onClick={() => {
                setReceipt(null);
                setSubstrateNotes('');
              }}
              className="mt-2 rounded-md border border-emerald-300 bg-white px-3.5 py-1.5 text-xs font-medium text-emerald-900 hover:bg-emerald-100 cursor-pointer"
            >
              Submit Another Specification
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-800"
        >
          {error}
        </div>
      )}

      <div className={`grid grid-cols-1 gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="rfq-name" className="block text-xs font-medium text-slate-700">
            Full Name *
          </label>
          <input
            id="rfq-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Dr. Wei Chen"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-700"
          />
        </div>

        <div>
          <label htmlFor="rfq-company" className="block text-xs font-medium text-slate-700">
            Company / Facility *
          </label>
          <input
            id="rfq-company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Apex Microelectronics GmbH"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-700"
          />
        </div>

        <div>
          <label htmlFor="rfq-email" className="block text-xs font-medium text-slate-700">
            Work Email *
          </label>
          <input
            id="rfq-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="engineering@company.com"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-700"
          />
        </div>

        <div>
          <label htmlFor="rfq-phone" className="block text-xs font-medium text-slate-700">
            Phone / WhatsApp (Optional)
          </label>
          <input
            id="rfq-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+49 89 1234 5678"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-700"
          />
        </div>

        <div>
          <label htmlFor="rfq-industry" className="block text-xs font-medium text-slate-700">
            Industry Sector
          </label>
          <select
            id="rfq-industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-700"
          >
            {INDUSTRY_OPTIONS.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rfq-process" className="block text-xs font-medium text-slate-700">
            Target PVD Process
          </label>
          <select
            id="rfq-process"
            value={processSlug}
            onChange={(e) => setProcessSlug(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-700"
          >
            {PROCESS_OPTIONS.map((proc) => (
              <option key={proc.slug} value={proc.slug}>
                {proc.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="rfq-model" className="block text-xs font-medium text-slate-700">
          Reference Model (Optional)
        </label>
        <input
          id="rfq-model"
          type="text"
          value={targetModel}
          onChange={(e) => setTargetModel(e.target.value)}
          placeholder="e.g., TGV-1000, LPO-1400, MF-900"
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 focus:border-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-700"
        />
      </div>

      <div>
        <label htmlFor="rfq-notes" className="block text-xs font-medium text-slate-700">
          Substrate Material, Target Film Stack &amp; Throughput *
        </label>
        <textarea
          id="rfq-notes"
          rows={3}
          required
          value={substrateNotes}
          onChange={(e) => setSubstrateNotes(e.target.value)}
          placeholder="Example: 510 × 515 mm borosilicate glass, 30 μm TGV vias, Ti/Cu seed layer, target 60 panels/hr..."
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-700"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400 cursor-pointer"
      >
        {submitting ? 'Submitting Engineering Inquiry...' : 'Submit Technical RFQ'}
      </button>
    </form>
  );
}

interface RFQDrawerProps {
  open: boolean;
  initialModel?: string;
  initialProcess?: string;
  onClose: () => void;
}

export function RFQDrawer({
  open,
  initialModel,
  initialProcess,
  onClose,
}: RFQDrawerProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfq-drawer-title"
    >
      <div className="flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2
              id="rfq-drawer-title"
              className="font-display text-lg font-bold text-slate-950"
            >
              Request Technical Quotation
            </h2>
            <p className="text-xs text-slate-500">
              Direct engineering review · Zhaoqing Vacuum Process Team
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote drawer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-950 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <RFQForm
            compact
            initialModel={initialModel}
            initialProcess={initialProcess}
          />
        </div>
      </div>
    </div>
  );
}

export function RFQInlineSection() {
  return (
    <section
      id="rfq-section"
      aria-labelledby="rfq-inline-heading"
      className="border-t border-slate-200 bg-slate-100/70 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-medium tracking-wider text-sky-700 uppercase">
              05. Engineering Consultation
            </p>
            <h2
              id="rfq-inline-heading"
              className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
            >
              Specify Your Vacuum Coating Process Requirements
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Share your substrate geometry, film stack, and production takt time. Our
              process engineers respond with chamber sizing, target configuration, and
              sample coating schedules.
            </p>

            <dl className="space-y-2 border-t border-slate-200 pt-5 text-sm">
              <div>
                <dt className="text-xs text-slate-500">Direct Engineering Desk</dt>
                <dd className="font-medium text-slate-900">panyf@zhenhuavacuum.com</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Telephone &amp; WhatsApp</dt>
                <dd className="font-mono font-medium text-slate-900 tabular-nums">
                  +86-13826005301
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7 rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
            <RFQForm />
          </div>
        </div>
      </div>
    </section>
  );
}
