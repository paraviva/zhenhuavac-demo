import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExploreEquipment: () => void;
  onViewArchitecture: () => void;
}

const PROOF_METRICS = [
  { value: '1992', label: 'Vacuum Engineering Heritage', detail: 'Zhaoqing HQ & 3 Production Bases' },
  { value: '67,000 m²', label: 'Manufacturing Campus', detail: 'Full cleanroom assembly & testing' },
  { value: '10:1', label: 'TGV Aspect Ratio', detail: 'Down to 30 μm through-glass vias' },
  { value: '±1.0%', label: 'Optical Uniformity', detail: 'Up to 14-layer inline stacks' },
];

type CoatingModeId = 'sputter' | 'hard' | 'optical';

interface CoatingLayer {
  name: string;
  thickness: string;
  colorClass: string;
}

const COATING_MODES: Array<{
  id: CoatingModeId;
  label: string;
  substrate: string;
  fluxColor: string;
  sheenColor: string;
  layers: CoatingLayer[];
}> = [
  {
    id: 'sputter',
    label: 'PVD Sputtering',
    substrate: 'TGV Glass / 3C Substrate',
    fluxColor: 'from-sky-400/0 via-sky-400/70 to-sky-300/0',
    sheenColor: 'via-sky-300/35',
    layers: [
      { name: 'Hydrophobic AF Topcoat', thickness: '15 nm', colorClass: 'bg-sky-300/80' },
      { name: 'Ti / Cu Conductive Seed', thickness: '180 nm', colorClass: 'bg-amber-400/80' },
      { name: 'Plasma-Activated Surface', thickness: '20 nm', colorClass: 'bg-sky-500/70' },
    ],
  },
  {
    id: 'hard',
    label: 'Hard Coating',
    substrate: 'Carbide Micro-Drill / Mold',
    fluxColor: 'from-amber-400/0 via-amber-300/75 to-amber-400/0',
    sheenColor: 'via-amber-200/40',
    layers: [
      { name: 'ta-C Low-Friction Shell', thickness: '0.8 μm', colorClass: 'bg-slate-300/90' },
      { name: 'TiAlSiN Wear Barrier', thickness: '2.2 μm', colorClass: 'bg-amber-500/85' },
      { name: 'IET Ion-Etched Interface', thickness: '50 nm', colorClass: 'bg-amber-700/80' },
    ],
  },
  {
    id: 'optical',
    label: 'Optical AR',
    substrate: 'Camera Lens / Cover Glass',
    fluxColor: 'from-indigo-400/0 via-cyan-300/70 to-indigo-400/0',
    sheenColor: 'via-cyan-200/35',
    layers: [
      { name: 'SiO₂ Low-Index Cap', thickness: '92 nm', colorClass: 'bg-cyan-300/75' },
      { name: 'Nb₂O₅ High-Index Stack', thickness: '115 nm', colorClass: 'bg-indigo-400/80' },
      { name: 'IAD Dense Oxide Base', thickness: '45 nm', colorClass: 'bg-sky-600/80' },
    ],
  },
];

const FLUX_STREAMS = [12, 26, 40, 54, 68, 82, 90];

export function HeroSection({
  onExploreEquipment,
  onViewArchitecture,
}: HeroSectionProps) {
  const [coatingMode, setCoatingMode] = useState<CoatingModeId>('sputter');
  const activeMode = COATING_MODES.find((m) => m.id === coatingMode) || COATING_MODES[0];

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="hero-heading" className="bg-slate-950 text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <ResilientImage
              src="/src/assets/images/hero_pvd_cleanroom_1795314229429.jpg"
              alt="Zhenhua Vacuum inline magnetron sputtering production line inside cleanroom facility"
              className="h-full w-full object-cover object-center opacity-50"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/55"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Left Column: Core Proposition */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-xs font-medium tracking-wider text-sky-400 uppercase">
                  Guangdong Zhenhua Technology · Established 1992
                </p>

                <h1
                  id="hero-heading"
                  className="font-display font-bold tracking-tight text-white [text-wrap:balance]"
                  style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', lineHeight: 1.08 }}
                >
                  Precision PVD &amp; Inline Vacuum Coating Systems
                </h1>

                <p className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
                  Engineered for semiconductor TGV metallization, 14-layer optical thin
                  films, VOC-free automotive lighting, and droplet-free PCB micro-drill
                  hard coatings.
                </p>

                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <button
                    type="button"
                    onClick={onExploreEquipment}
                    className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-sky-500 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  >
                    Explore PVD Systems
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={onViewArchitecture}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-200 underline decoration-slate-500 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-white whitespace-nowrap cursor-pointer"
                  >
                    Inspect Headless WP &amp; SEO Architecture
                  </button>
                </div>
              </div>

              {/* Right Column: Subtle PVD Surface Treatment Deposition Animation */}
              <div className="lg:col-span-5">
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
                    <div>
                      <div className="text-xs font-medium text-slate-400">
                        PVD Surface Treatment Cycle
                      </div>
                      <div className="mt-0.5 font-display text-sm font-semibold text-white">
                        Thin-Film Ion Deposition
                      </div>
                    </div>

                    <div
                      role="tablist"
                      aria-label="Select PVD surface treatment process"
                      className="flex items-center gap-1 rounded-md bg-slate-950/80 p-1"
                    >
                      {COATING_MODES.map((mode) => {
                        const selected = mode.id === coatingMode;
                        return (
                          <button
                            key={mode.id}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            onClick={() => setCoatingMode(mode.id)}
                            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                              selected
                                ? 'bg-sky-600 text-white'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {mode.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Vacuum Chamber Deposition Stage */}
                  <div className="mt-4 rounded-md border border-slate-800 bg-slate-950/90 p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Target Cathode &amp; Plasma Flux</span>
                      <span className="font-mono text-slate-300">10⁻⁴ Pa</span>
                    </div>

                    {/* Ion / Sputtered Flux Streams */}
                    <div
                      aria-hidden="true"
                      className="relative mt-3 h-20 overflow-hidden rounded border border-slate-800/80 bg-slate-900/50"
                    >
                      {/* Top target bar */}
                      <div className="h-1.5 w-full bg-gradient-to-r from-slate-700 via-slate-400 to-slate-700" />

                      {FLUX_STREAMS.map((leftPct, idx) => (
                        <motion.div
                          key={`${activeMode.id}-${leftPct}`}
                          style={{ left: `${leftPct}%` }}
                          className={`absolute top-1.5 h-10 w-0.5 bg-gradient-to-b ${activeMode.fluxColor}`}
                          initial={{ y: -12, opacity: 0 }}
                          animate={{ y: [0, 52], opacity: [0, 0.95, 0] }}
                          transition={{
                            duration: 2.1,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: idx * 0.24,
                          }}
                        />
                      ))}

                      {/* Surface sheen sweep across top of coating */}
                      <motion.div
                        key={`sheen-${activeMode.id}`}
                        className={`pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent ${activeMode.sheenColor} to-transparent`}
                        initial={{ x: '-30%' }}
                        animate={{ x: '460%' }}
                        transition={{
                          duration: 3.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          repeatDelay: 0.8,
                        }}
                      />
                    </div>

                    {/* Deposited Nanometer Film Stack */}
                    <div className="mt-3 space-y-1.5">
                      {activeMode.layers.map((layer, idx) => (
                        <motion.div
                          key={`${activeMode.id}-${layer.name}`}
                          initial={{ opacity: 0.35, scaleX: 0.72 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{
                            duration: 0.55,
                            delay: idx * 0.1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{ transformOrigin: 'left' }}
                          className="flex items-center justify-between rounded-sm bg-slate-900 px-3 py-1.5 text-xs border border-slate-800/80"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              aria-hidden="true"
                              className={`h-2.5 w-6 shrink-0 rounded-xs ${layer.colorClass}`}
                            />
                            <span className="truncate font-medium text-slate-200">
                              {layer.name}
                            </span>
                          </div>
                          <span className="font-mono text-slate-400 tabular-nums shrink-0 ml-2">
                            {layer.thickness}
                          </span>
                        </motion.div>
                      ))}

                      {/* Base Substrate */}
                      <div className="flex items-center justify-between rounded-sm border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs">
                        <span className="font-medium text-slate-300">
                          Base Substrate: {activeMode.substrate}
                        </span>
                        <span className="font-mono text-slate-400">Uncoated Core</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column quantitative proof strip */}
        <div className="border-t border-slate-800/90 bg-slate-900/90">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-800 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
            {PROOF_METRICS.map((metric) => (
              <div key={metric.label} className="px-6 py-6 sm:px-8">
                <div className="font-mono text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
                  {metric.value}
                </div>
                <div className="mt-1 text-sm font-medium text-slate-200">{metric.label}</div>
                <div className="mt-0.5 text-xs text-slate-400">{metric.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
