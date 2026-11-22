import type {
  SEOAuditItem,
  WPApplication,
  WPEquipment,
  WPPost,
  WPSiteMeta,
} from '../src/types/wp.ts';

const SITE_BASE = process.env.WORDPRESS_SITE_URL || 'https://www.zhenhuavac.com';

export const wpEquipmentData: WPEquipment[] = [
  {
    id: 101,
    slug: 'tgv-glass-through-hole-coating-inline',
    type: 'equipment',
    status: 'publish',
    modified: '2026-10-28T09:00:00Z',
    title: { rendered: 'TGV-1000 Through-Glass-Via Inline Sputtering System' },
    excerpt: {
      rendered:
        'Modular inline magnetron sputtering line achieving 10:1 deep-hole aspect ratio metallization for 30 μm semiconductor glass interposers.',
    },
    content: {
      rendered:
        'Engineered for advanced semiconductor glass substrate packaging, the TGV-1000 combines pre-sputter degassing, RF plasma surface activation, and high-ionization Ti/Cu seed layer deposition in a continuous load-lock vacuum architecture.',
    },
    acf: {
      model_code: 'TGV-1000',
      process_category: 'continuous-coating-line',
      process_label: 'Continuous Inline Sputtering',
      substrate_compatibility: ['Borosilicate Glass', 'Quartz Wafer', 'Sapphire Panel'],
      target_films: ['Ti / Cu Seed Layer', 'Cr / Cu', 'Mo / Al'],
      industries: ['Semiconductor & TGV Packaging'],
      specs: {
        chamber_dimensions: '550 × 650 mm Carrier (Scalable Modular)',
        base_vacuum_pressure: '≤ 5.0 × 10⁻⁵ Pa',
        film_uniformity: '±2.0% across panel · ≥ 35% sidewall step coverage',
        cycle_time: '45–90 sec / tray (dual load-lock)',
        power_supply: 'HiPIMS + Pulsed DC Magnetron',
        control_architecture: 'PLC + SECS/GEM Ready Industrial HMI',
      },
      key_advantages: [
        'Achieves reliable 10:1 deep-via step coverage down to 30 μm apertures without void bridging.',
        'Modular multi-chamber layout allows independent expansion for degas, etch, and barrier/seed cathodes.',
        'Cleanroom Class 1000 compatible pass-through cassette handling eliminates particulate contamination.',
      ],
      featured_image: '/src/assets/images/equip_sputtering_inline_1795314228678.jpg',
      featured_image_alt: 'TGV-1000 modular inline magnetron sputtering production line',
      is_featured: true,
    },
    yoast_head_json: {
      title: 'TGV-1000 Through-Glass-Via Inline Sputtering | Zhenhua Vacuum',
      description:
        'Inline PVD sputtering system for 30 μm TGV semiconductor glass substrates with 10:1 aspect ratio step coverage.',
      canonical: `${SITE_BASE}/equipment/tgv-glass-through-hole-coating-inline/`,
      og_type: 'product',
      og_title: 'TGV-1000 Through-Glass-Via Inline Sputtering System',
      og_description:
        'Modular inline PVD sputtering line achieving 10:1 deep-hole aspect ratio metallization.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'TGV-1000 Through-Glass-Via Inline Sputtering System',
        sku: 'ZH-TGV-1000',
        brand: { '@type': 'Brand', name: 'Zhenhua Vacuum' },
        category: 'Semiconductor PVD Coating Equipment',
        description:
          'Modular inline magnetron sputtering line achieving 10:1 deep-hole aspect ratio metallization for 30 μm TGV substrates.',
      },
    },
  },
  {
    id: 102,
    slug: 'large-scale-plate-optical-coating-line',
    type: 'equipment',
    status: 'publish',
    modified: '2026-10-22T11:30:00Z',
    title: { rendered: 'LPO-1400 Large-Scale Plate Optical Coating Line' },
    excerpt: {
      rendered:
        'Up to 14-layer precision AR/AF optical thin-film inline production line engineered for large flat glass and automotive display panels.',
    },
    content: {
      rendered:
        'Designed for continuous high-throughput optical interference stacks, LPO-1400 integrates reactive mid-frequency twin cathodes with real-time optical monitoring to hold refractive index tolerances across large-format glass sheets.',
    },
    acf: {
      model_code: 'LPO-1400',
      process_category: 'continuous-coating-line',
      process_label: 'Continuous Inline Sputtering',
      substrate_compatibility: ['Aluminosilicate Cover Glass', 'Automotive Display Glass', 'Optical Quartz'],
      target_films: ['SiO₂ / Nb₂O₅ AR Stack', 'TiO₂', 'ITO Transparent Conductive'],
      industries: ['Precision Optics & Lenses', '3C Electronics & Mobile Glass'],
      specs: {
        chamber_dimensions: '1,400 × 1,600 mm Vertical/Horizontal Carrier',
        base_vacuum_pressure: '≤ 8.0 × 10⁻⁵ Pa',
        film_uniformity: '±1.5% optical thickness repeatability',
        cycle_time: '60 sec takt time per carrier',
        power_supply: '40 kHz Mid-Frequency AC + Closed-Loop PEM',
        control_architecture: 'Automated Optical Monitor + Closed-Loop Gas Control',
      },
      key_advantages: [
        'Supports up to 14 alternating high/low refractive index optical layers in a single inline pass.',
        'Closed-loop plasma emission monitoring maintains stoichiometric oxide stability at high deposition rates.',
        'Cryo-assisted water vapor pumping shortens pump-down recovery between production shifts.',
      ],
      featured_image: '/src/assets/images/hero_pvd_cleanroom_1795314229429.jpg',
      featured_image_alt: 'LPO-1400 large-scale plate optical inline vacuum coating cleanroom line',
      is_featured: true,
    },
    yoast_head_json: {
      title: 'LPO-1400 Large Plate Optical Coating Line | Zhenhua Vacuum',
      description:
        '14-layer precision AR and ITO optical coating production line with ±1.5% uniformity for display and automotive glass.',
      canonical: `${SITE_BASE}/equipment/large-scale-plate-optical-coating-line/`,
      og_type: 'product',
      og_title: 'LPO-1400 Large-Scale Plate Optical Coating Line',
      og_description: '14-layer inline optical thin-film coating equipment for large flat glass.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'LPO-1400 Large-Scale Plate Optical Coating Line',
        sku: 'ZH-LPO-1400',
        brand: { '@type': 'Brand', name: 'Zhenhua Vacuum' },
        category: 'Optical PVD Coating Line',
      },
    },
  },
  {
    id: 103,
    slug: 'horizontal-double-sided-semiconductor-line',
    type: 'equipment',
    status: 'publish',
    modified: '2026-10-30T08:15:00Z',
    title: { rendered: 'HDS-2200 Horizontal Double-Sided Semiconductor Line' },
    excerpt: {
      rendered:
        'Simultaneous dual-sided DC magnetron sputtering system for DPC ceramic substrates and advanced IC packaging panels.',
    },
    content: {
      rendered:
        'Recently delivered to advanced semiconductor packaging fabs, the HDS-2200 eliminates single-side flip handling by sputtering top and bottom surfaces in one vacuum pass with integrated ion cleaning and rapid thermal IR heating.',
    },
    acf: {
      model_code: 'HDS-2200',
      process_category: 'continuous-coating-line',
      process_label: 'Continuous Inline Sputtering',
      substrate_compatibility: ['AlN / Al₂O₃ DPC Ceramic', 'ABF Substrate', 'Copper Leadframe'],
      target_films: ['Ti / Cu', 'NiCr / Au', 'TiW / Cu'],
      industries: ['Semiconductor & TGV Packaging'],
      specs: {
        chamber_dimensions: '600 × 600 mm Dual-Side Carrier',
        base_vacuum_pressure: '≤ 4.0 × 10⁻⁵ Pa',
        film_uniformity: '±2.5% front-to-back symmetry',
        cycle_time: '50 sec continuous inline index',
        power_supply: 'Dual-Bank DC + RF Bias Cleaning',
        control_architecture: 'Modular Multi-Zone PLC with Recipe Traceability',
      },
      key_advantages: [
        'Simultaneous upper and lower cathode sputtering cuts handling yield loss by removing vacuum-break flipping.',
        'Integrated rapid heating and linear anode-layer ion etching deliver > 12 N/cm copper-to-ceramic peel strength.',
        'Expandable chamber blocks scale seamlessly from pilot R&D to 24/7 mass production.',
      ],
      featured_image: '/src/assets/images/equip_sputtering_inline_1795314228678.jpg',
      featured_image_alt: 'HDS-2200 horizontal double-sided semiconductor sputtering line',
      is_featured: false,
    },
    yoast_head_json: {
      title: 'HDS-2200 Double-Sided Semiconductor Sputtering Line | Zhenhua Vacuum',
      description:
        'Dual-sided magnetron sputtering production line for DPC ceramic substrates and advanced IC packaging.',
      canonical: `${SITE_BASE}/equipment/horizontal-double-sided-semiconductor-line/`,
      og_type: 'product',
      og_title: 'HDS-2200 Horizontal Double-Sided Semiconductor Line',
      og_description: 'Simultaneous dual-sided sputtering for DPC ceramic substrates.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'HDS-2200 Horizontal Double-Sided Semiconductor Line',
        sku: 'ZH-HDS-2200',
        brand: { '@type': 'Brand', name: 'Zhenhua Vacuum' },
        category: 'Semiconductor Packaging Equipment',
      },
    },
  },
  {
    id: 104,
    slug: 'cf1914-magnetron-optical-glass-color-coater',
    type: 'equipment',
    status: 'publish',
    modified: '2026-09-18T14:20:00Z',
    title: { rendered: 'CF-1914 Magnetron Optical & 3D Glass Color Coater' },
    excerpt: {
      rendered:
        'Closed-loop SPEEDFLO reactive magnetron system for iridescent NCVM, gradient smartphone cover glass, and optical dielectric filters.',
    },
    content: {
      rendered:
        'Combining medium-frequency reactive sputtering with an anode-layer ion source and crystal monitoring, the CF-1914 achieves vivid metallic-dielectric color consistency across curved 3D glass and polycarbonate housings.',
    },
    acf: {
      model_code: 'CF-1914',
      process_category: 'magnetron-sputtering',
      process_label: 'Magnetron Sputtering',
      substrate_compatibility: ['3D Curved Cover Glass', 'Sapphire Watch Crystal', 'PC/PMMA Housings'],
      target_films: ['TiO₂ / SiO₂ Color Stack', 'NCVM Non-Conductive', 'AF Hydrophobic Topcoat'],
      industries: ['3C Electronics & Mobile Glass', 'Precision Optics & Lenses'],
      specs: {
        chamber_dimensions: 'Ø1,900 × H1,400 mm Double-Door Cylindrical',
        base_vacuum_pressure: '≤ 6.6 × 10⁻⁴ Pa',
        film_uniformity: 'ΔE ≤ 0.5 color variance across drum',
        cycle_time: '18–28 min / batch (high-density planetary rack)',
        power_supply: 'MF Twin-Magnetron + SPEEDFLO Closed-Loop',
        control_architecture: 'Crystal Oscillation Thickness + Optical Endpoint',
      },
      key_advantages: [
        'SPEEDFLO closed-loop feedback maintains target poisoning transition point for 2.5× faster oxide deposition.',
        'Integrated AF (Anti-Fingerprint) evaporation stage achieves > 115° water contact angle in the same cycle.',
        'Double-door front/rear access enables continuous jig exchange with minimal cleanroom footprint.',
      ],
      featured_image: '/src/assets/images/equip_optical_ebeam_1795314229205.jpg',
      featured_image_alt: 'CF-1914 magnetron sputtering optical and glass color coating chamber',
      is_featured: true,
    },
    yoast_head_json: {
      title: 'CF-1914 Magnetron Glass & Optical Coater | Zhenhua Vacuum',
      description:
        'Reactive magnetron sputtering system with SPEEDFLO closed-loop control for 3C cover glass, NCVM, and AF coatings.',
      canonical: `${SITE_BASE}/equipment/cf1914-magnetron-optical-glass-color-coater/`,
      og_type: 'product',
      og_title: 'CF-1914 Magnetron Optical & 3D Glass Color Coater',
      og_description: 'Closed-loop reactive magnetron sputtering for 3D cover glass and optics.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'CF-1914 Magnetron Optical & 3D Glass Color Coater',
        sku: 'ZH-CF-1914',
        brand: { '@type': 'Brand', name: 'Zhenhua Vacuum' },
        category: 'Magnetron Sputtering Equipment',
      },
    },
  },
  {
    id: 105,
    slug: 'arc-1800-cathodic-arc-ion-coating-machine',
    type: 'equipment',
    status: 'publish',
    modified: '2026-09-12T10:00:00Z',
    title: { rendered: 'ARC-1800 Multi-Arc Ion & Anti-Fingerprint Coater' },
    excerpt: {
      rendered:
        'High-ionization cathodic arc PVD system with optional AF sealing for stainless steel sanitary ware, architectural hardware, and luxury watches.',
    },
    content: {
      rendered:
        'Equipped with multi-arc evaporators, medium-frequency sputtering cathodes, and an inline anti-fingerprint vapor source, ARC-1800 delivers scratch-resistant gold, rose gold, gunmetal, and DLC finishes with rapid batch turnaround.',
    },
    acf: {
      model_code: 'ARC-1800',
      process_category: 'cathodic-arc',
      process_label: 'Cathodic Arc Ion PVD',
      substrate_compatibility: ['304/316 Stainless Steel', 'Brass & Zinc Alloy', 'Ceramic Sanitary Fixtures'],
      target_films: ['TiN / ZrN Gold', 'TiCN Rose Gold', 'CrN / DLC Gunmetal + AF'],
      industries: ['Architectural & Sanitary Hardware'],
      specs: {
        chamber_dimensions: 'Ø1,800 × H2,000 mm Vertical Double-Door',
        base_vacuum_pressure: '≤ 5.0 × 10⁻³ Pa',
        film_uniformity: '±3.0% across 3D planetary fixtures',
        cycle_time: '35–50 min / batch (dual-station trolley)',
        power_supply: '12–24 Steered Arc Sources + Pulsed Bias',
        control_architecture: 'Automated Recipe Control + Arc Stabilization',
      },
      key_advantages: [
        'Dual movable workpiece trolleys allow offline loading/unloading while the chamber runs.',
        'High metal ionization rate yields dense, salt-spray-resistant (> 200 hr CASS) decorative and functional films.',
        'Integrated AF hydrophobic coating option resists fingerprints and water spotting on brushed metal.',
      ],
      featured_image: '/src/assets/images/equip_cathodic_arc_1795314229475.jpg',
      featured_image_alt: 'ARC-1800 vertical double-door cathodic arc ion PVD coating machine',
      is_featured: true,
    },
    yoast_head_json: {
      title: 'ARC-1800 Multi-Arc Ion PVD Coating Machine | Zhenhua Vacuum',
      description:
        'High-capacity cathodic arc ion coating system for sanitary hardware, watch cases, and architectural stainless steel.',
      canonical: `${SITE_BASE}/equipment/arc-1800-cathodic-arc-ion-coating-machine/`,
      og_type: 'product',
      og_title: 'ARC-1800 Multi-Arc Ion & Anti-Fingerprint Coater',
      og_description: 'Cathodic arc PVD + AF system for sanitary ware and luxury hardware.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'ARC-1800 Multi-Arc Ion & Anti-Fingerprint Coater',
        sku: 'ZH-ARC-1800',
        brand: { '@type': 'Brand', name: 'Zhenhua Vacuum' },
        category: 'Cathodic Arc PVD Equipment',
      },
    },
  },
  {
    id: 106,
    slug: 'mf-900-magnetic-filtering-hard-coating-system',
    type: 'equipment',
    status: 'publish',
    modified: '2026-10-29T16:45:00Z',
    title: { rendered: 'MF-900 Magnetic-Filtered Hard Film & Micro-Drill Coater' },
    excerpt: {
      rendered:
        '90° magnetic duct filtration + IET ion etching coater engineered for droplet-free TiAlN, AlCrN, and ta-C coatings on PCB micro-drills and precision molds.',
    },
    content: {
      rendered:
        'Built specifically for sub-0.2 mm PCB micro-drills cutting high-glass-transition M9 quartz-fiber laminates, MF-900 filters out macro-droplets via a 90° magnetic bend to achieve ultra-smooth cutting edges and lower cost per hole.',
    },
    acf: {
      model_code: 'MF-900',
      process_category: 'hard-coating',
      process_label: 'Hard & Tool Coating',
      substrate_compatibility: ['Tungsten Carbide Micro-Drills', 'HSS Cutting Tools', 'Precision Stamping Molds'],
      target_films: ['AlTiN / TiAlSiN', 'AlCrN', 'ta-C Tetrahedral Amorphous Carbon'],
      industries: ['PCB Micro-Drills & Tooling'],
      specs: {
        chamber_dimensions: 'Ø900 × H1,100 mm Compact Precision Chamber',
        base_vacuum_pressure: '≤ 4.0 × 10⁻⁴ Pa',
        film_uniformity: 'Ra < 0.02 μm droplet-free surface',
        cycle_time: '90–140 min (including IET plasma etching)',
        power_supply: '90° Filtered Cathodic Arc + High-Voltage Pulsed Bias',
        control_architecture: '3-Axis Planetary Spindle + Thermal Uniformity Control',
      },
      key_advantages: [
        '90° magnetic plasma filter removes macro-particles so cutting edges stay razor-sharp without post-polishing.',
        'Advanced IET etching enables direct hard-film adhesion without requiring a softer transition layer.',
        'Proven 2.4× tool life extension on M9 quartz-fiber and high-speed server PCB drilling lines.',
      ],
      featured_image: '/src/assets/images/equip_cathodic_arc_1795314229475.jpg',
      featured_image_alt: 'MF-900 magnetic filtering hard film PVD coating system',
      is_featured: true,
    },
    yoast_head_json: {
      title: 'MF-900 PCB Micro-Drill & Mold Hard Coating Machine | Zhenhua Vacuum',
      description:
        '90-degree magnetic-filtered cathodic arc PVD system for droplet-free TiAlN and ta-C coatings on PCB micro-drills and molds.',
      canonical: `${SITE_BASE}/equipment/mf-900-magnetic-filtering-hard-coating-system/`,
      og_type: 'product',
      og_title: 'MF-900 Magnetic-Filtered Hard Film & Micro-Drill Coater',
      og_description: 'Droplet-free hard coating PVD equipment for PCB micro-drills and precision molds.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'MF-900 Magnetic-Filtered Hard Film & Micro-Drill Coater',
        sku: 'ZH-MF-900',
        brand: { '@type': 'Brand', name: 'Zhenhua Vacuum' },
        category: 'Hard Coating PVD Equipment',
      },
    },
  },
  {
    id: 107,
    slug: 'gx2700-electron-beam-evaporation-optical-coater',
    type: 'equipment',
    status: 'publish',
    modified: '2026-08-25T13:10:00Z',
    title: { rendered: 'GX-2700 Electron Beam Optical & OVI Coater' },
    excerpt: {
      rendered:
        'Large-capacity e-beam evaporation system with ion-assisted deposition (IAD) for multi-layer AR lenses, IR cut filters, and optical variable ink.',
    },
    content: {
      rendered:
        'Focused high-energy electron beams evaporate high-melting-point oxides and fluorides under high vacuum while an end-Hall ion source densifies the growing film for zero thermal shift.',
    },
    acf: {
      model_code: 'GX-2700',
      process_category: 'electron-beam',
      process_label: 'Electron Beam Evaporation',
      substrate_compatibility: ['Optical Crown/Flint Glass', 'IR Germanium/Silicon', 'PET Release Film'],
      target_films: ['MgF₂ / TiO₂ / Ta₂O₅', 'OVI Optical Variable Flake', 'IR Bandpass Filters'],
      industries: ['Precision Optics & Lenses'],
      specs: {
        chamber_dimensions: 'Ø2,700 mm High-Capacity Optical Dome',
        base_vacuum_pressure: '≤ 3.0 × 10⁻⁴ Pa (Cryo + Diffusion/Turbo)',
        film_uniformity: '±1.0% spectral wavelength accuracy',
        cycle_time: '45–75 min depending on stack layer count',
        power_supply: 'Dual 12 kW E-Beam Guns + RF Ion Source',
        control_architecture: 'Direct Optical Monitoring + Quartz Crystal Dual Loop',
      },
      key_advantages: [
        'Dual 270° deflected electron guns handle refractory oxides (SiO₂, Ta₂O₅, HfO₂) with minimal crucible contamination.',
        'Ion-assisted deposition locks refractive index stability under 85°C / 85% RH environmental stress.',
        'High-capacity planetary dome maximizes batch yield for camera, LiDAR, and anti-counterfeit optical films.',
      ],
      featured_image: '/src/assets/images/equip_optical_ebeam_1795314229205.jpg',
      featured_image_alt: 'GX-2700 electron beam evaporation optical vacuum coating system',
      is_featured: false,
    },
    yoast_head_json: {
      title: 'GX-2700 Electron Beam Optical Coating Machine | Zhenhua Vacuum',
      description:
        'High-capacity e-beam evaporation and IAD optical coating machine for AR lenses, IR filters, and OVI films.',
      canonical: `${SITE_BASE}/equipment/gx2700-electron-beam-evaporation-optical-coater/`,
      og_type: 'product',
      og_title: 'GX-2700 Electron Beam Optical & OVI Coater',
      og_description: 'Electron beam optical vacuum coating equipment with ±1.0% spectral uniformity.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'GX-2700 Electron Beam Optical & OVI Coater',
        sku: 'ZH-GX-2700',
        brand: { '@type': 'Brand', name: 'Zhenhua Vacuum' },
        category: 'Optical Vacuum Coating Equipment',
      },
    },
  },
  {
    id: 108,
    slug: 'zbm1819-automotive-lighting-coating-system',
    type: 'equipment',
    status: 'publish',
    modified: '2026-10-30T11:00:00Z',
    title: { rendered: 'ZBM-1819 Integrated Automotive Lighting Coater' },
    excerpt: {
      rendered:
        'Eliminates wet primer and topcoat spray lines by integrating plasma activation, aluminum evaporation, and PECVD protective film in one vacuum cycle.',
    },
    content: {
      rendered:
        'Built for Tier-1 automotive headlamp reflector and bezel manufacturers, the ZBM-1819 processes raw injection-molded PC, ABS, and BMC parts directly into mirror-bright, corrosion-proof reflectors—cutting VOC emissions to zero.',
    },
    acf: {
      model_code: 'ZBM-1819',
      process_category: 'evaporation-cvd',
      process_label: 'Evaporation & PECVD',
      substrate_compatibility: ['PC / ABS Headlamp Bezels', 'BMC Reflectors', 'Automotive Interior Trim'],
      target_films: ['High-Reflectivity Al + SiOx PECVD Topcoat', 'NCVM Chrome Look'],
      industries: ['Automotive Lighting & Interior'],
      specs: {
        chamber_dimensions: 'Ø1,800 × H1,900 mm Horizontal Double-Door',
        base_vacuum_pressure: '≤ 6.0 × 10⁻³ Pa (Fast Roots + Diffusion)',
        film_uniformity: '≥ 92% specular reflectivity',
        cycle_time: '10–14 min total vacuum cycle',
        power_supply: 'Resistance Thermal Evaporation + HMDSO PECVD',
        control_architecture: 'Automated Mass Flow + Plasma Power Sequencing',
      },
      key_advantages: [
        'Replaces separate UV primer, aluminizing, and UV topcoat lines with a single dry vacuum process.',
        'Passes automotive thermal shock, humidity, and NaOH alkali resistance standards without wet paint.',
        'Reduces floor footprint by 45% and eliminates VOC solvent abatement costs.',
      ],
      featured_image: '/src/assets/images/equip_sputtering_inline_1795314228678.jpg',
      featured_image_alt: 'ZBM-1819 integrated automotive lighting evaporation and PECVD coater',
      is_featured: true,
    },
    yoast_head_json: {
      title: 'ZBM-1819 Automotive Lighting Vacuum Coater | Zhenhua Vacuum',
      description:
        'Integrated aluminum evaporation and PECVD protective coating system that eliminates primer and topcoat spray painting for automotive headlamps.',
      canonical: `${SITE_BASE}/equipment/zbm1819-automotive-lighting-coating-system/`,
      og_type: 'product',
      og_title: 'ZBM-1819 Integrated Automotive Lighting Coater',
      og_description: 'Zero-VOC single-cycle automotive lamp reflector vacuum coating system.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'ZBM-1819 Integrated Automotive Lighting Coater',
        sku: 'ZH-ZBM-1819',
        brand: { '@type': 'Brand', name: 'Zhenhua Vacuum' },
        category: 'Automotive Vacuum Coating Equipment',
      },
    },
  },
];

export const wpApplicationsData: WPApplication[] = [
  {
    id: 201,
    slug: 'semiconductor-tgv-packaging',
    type: 'application',
    title: { rendered: 'Semiconductor & TGV Packaging' },
    excerpt: {
      rendered:
        'Through-Glass-Via (TGV) copper seed metallization and dual-sided DPC ceramic substrate sputtering for AI servers and RF modules.',
    },
    acf: {
      sector_code: '01',
      headline_metric: '10:1 Aspect Ratio on 30 μm Vias',
      substrate_examples: ['TGV Glass Interposers', 'AlN DPC Ceramics', 'Power IC Leadframes'],
      recommended_processes: ['continuous-coating-line'],
      recommended_models: ['TGV-1000', 'HDS-2200'],
      image: '/src/assets/images/app_semiconductor_optics_1795314228739.jpg',
      image_alt: 'TGV glass wafer and semiconductor metallization components',
    },
    yoast_head_json: {
      title: 'Semiconductor & TGV PVD Coating Solutions | Zhenhua Vacuum',
      description: 'Inline magnetron sputtering systems for TGV glass interposers and DPC ceramic substrates.',
      canonical: `${SITE_BASE}/applications/semiconductor-tgv-packaging/`,
      og_type: 'website',
      og_title: 'Semiconductor & TGV Packaging Coating Solutions',
      og_description: '10:1 deep-hole aspect ratio metallization down to 30 μm.',
      schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Semiconductor & TGV Packaging' },
    },
  },
  {
    id: 202,
    slug: 'precision-optics-lenses',
    type: 'application',
    title: { rendered: 'Precision Optics & Lenses' },
    excerpt: {
      rendered:
        'Multi-layer anti-reflective (AR), infrared bandpass, and anti-fog optical stacks with ±1.0% spectral repeatability.',
    },
    acf: {
      sector_code: '02',
      headline_metric: '14-Layer Optical Stack · ±1.0% Uniformity',
      substrate_examples: ['Camera & LiDAR Lenses', 'Display Cover Glass', 'OVI Security Films'],
      recommended_processes: ['electron-beam', 'continuous-coating-line', 'magnetron-sputtering'],
      recommended_models: ['GX-2700', 'LPO-1400', 'CF-1914'],
      image: '/src/assets/images/app_semiconductor_optics_1795314228739.jpg',
      image_alt: 'AR coated optical camera lens and precision glass substrates',
    },
    yoast_head_json: {
      title: 'Optical & Lens Vacuum Coating Equipment | Zhenhua Vacuum',
      description: 'Electron beam and magnetron sputtering optical coaters for AR lenses and 14-layer display glass.',
      canonical: `${SITE_BASE}/applications/precision-optics-lenses/`,
      og_type: 'website',
      og_title: 'Precision Optics & Lenses Coating Solutions',
      og_description: 'High-uniformity AR, IR, and AF optical thin-film systems.',
      schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Precision Optics & Lenses' },
    },
  },
  {
    id: 203,
    slug: 'automotive-lighting-interior',
    type: 'application',
    title: { rendered: 'Automotive Lighting & Interior' },
    excerpt: {
      rendered:
        'Single-cycle vacuum aluminizing + PECVD topcoat eliminating wet primer spraying on headlamp reflectors and interior trim.',
    },
    acf: {
      sector_code: '03',
      headline_metric: 'Zero Wet Primer · 12-Min Cycle',
      substrate_examples: ['PC/ABS Lamp Bezels', 'BMC Reflectors', 'Radar-Transparent Emblems'],
      recommended_processes: ['evaporation-cvd', 'magnetron-sputtering'],
      recommended_models: ['ZBM-1819', 'CF-1914'],
      image: '/src/assets/images/equip_sputtering_inline_1795314228678.jpg',
      image_alt: 'Automated automotive lighting vacuum coating line',
    },
    yoast_head_json: {
      title: 'Automotive Lighting & Interior PVD Solutions | Zhenhua Vacuum',
      description: 'VOC-free vacuum metallizing and PECVD protective coating for automotive headlamps and interior trim.',
      canonical: `${SITE_BASE}/applications/automotive-lighting-interior/`,
      og_type: 'website',
      og_title: 'Automotive Lighting & Interior PVD Solutions',
      og_description: 'Eliminate primer & topcoat spray lines with integrated PECVD vacuum coating.',
      schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Automotive Lighting & Interior' },
    },
  },
  {
    id: 204,
    slug: 'pcb-micro-drills-tooling',
    type: 'application',
    title: { rendered: 'PCB Micro-Drills & Tooling' },
    excerpt: {
      rendered:
        'Droplet-free magnetic-filtered TiAlN and ta-C hard films designed for high-aspect-ratio M9 quartz-fiber PCB drilling.',
    },
    acf: {
      sector_code: '04',
      headline_metric: '2.4× Tool Life on M9 Laminates',
      substrate_examples: ['Sub-0.2 mm PCB Micro-Drills', 'Carbide End Mills', 'Precision Stamping Dies'],
      recommended_processes: ['hard-coating'],
      recommended_models: ['MF-900'],
      image: '/src/assets/images/app_semiconductor_optics_1795314228739.jpg',
      image_alt: 'Titanium-nitride coated precision carbide micro-drills',
    },
    yoast_head_json: {
      title: 'PCB Micro-Drill & Cutting Tool Hard Coating | Zhenhua Vacuum',
      description: '90-degree magnetic-filtered PVD hard coating systems for PCB micro-drills and precision molds.',
      canonical: `${SITE_BASE}/applications/pcb-micro-drills-tooling/`,
      og_type: 'website',
      og_title: 'PCB Micro-Drills & Precision Tooling PVD Solutions',
      og_description: 'Lower cost per hole on AI-server M9 PCB laminates.',
      schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'PCB Micro-Drills & Tooling' },
    },
  },
  {
    id: 205,
    slug: '3c-electronics-mobile-glass',
    type: 'application',
    title: { rendered: '3C Electronics & Mobile Glass' },
    excerpt: {
      rendered:
        'High-throughput NCVM, gradient color dielectric stacks, and >115° anti-fingerprint coatings for smartphone and wearable housings.',
    },
    acf: {
      sector_code: '05',
      headline_metric: '>115° Water Contact Angle AF',
      substrate_examples: ['3D Smartphone Back Covers', 'Smartwatch Bezel & Sapphire', 'RF-Transparent Cases'],
      recommended_processes: ['magnetron-sputtering', 'continuous-coating-line'],
      recommended_models: ['CF-1914', 'LPO-1400'],
      image: '/src/assets/images/hero_pvd_cleanroom_1795314229429.jpg',
      image_alt: 'Cleanroom 3C glass PVD coating line',
    },
    yoast_head_json: {
      title: '3C Electronics & Mobile Glass PVD Coating | Zhenhua Vacuum',
      description: 'NCVM and anti-fingerprint sputtering systems for mobile glass and wearable consumer electronics.',
      canonical: `${SITE_BASE}/applications/3c-electronics-mobile-glass/`,
      og_type: 'website',
      og_title: '3C Electronics & Mobile Glass PVD Solutions',
      og_description: 'Closed-loop NCVM and hydrophobic AF thin-film production.',
      schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: '3C Electronics & Mobile Glass' },
    },
  },
  {
    id: 206,
    slug: 'architectural-sanitary-hardware',
    type: 'application',
    title: { rendered: 'Architectural & Sanitary Hardware' },
    excerpt: {
      rendered:
        'Durable decorative cathodic arc PVD finishes paired with oleophobic sealing for faucets, door hardware, and luxury watch components.',
    },
    acf: {
      sector_code: '06',
      headline_metric: '>200 hr CASS Corrosion Resistance',
      substrate_examples: ['Brass & Steel Faucets', 'Architectural Profiles', 'Watch Cases & Jewelry'],
      recommended_processes: ['cathodic-arc'],
      recommended_models: ['ARC-1800'],
      image: '/src/assets/images/equip_cathodic_arc_1795314229475.jpg',
      image_alt: 'ARC-1800 multi-arc ion PVD machine for sanitary and architectural hardware',
    },
    yoast_head_json: {
      title: 'Sanitary & Architectural Hardware PVD Coating | Zhenhua Vacuum',
      description: 'Multi-arc ion PVD coating equipment for corrosion-resistant sanitary fixtures and luxury hardware.',
      canonical: `${SITE_BASE}/applications/architectural-sanitary-hardware/`,
      og_type: 'website',
      og_title: 'Architectural & Sanitary Hardware PVD Solutions',
      og_description: 'Durable decorative PVD + AF sealing systems.',
      schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Architectural & Sanitary Hardware' },
    },
  },
];

export const wpPostsData: WPPost[] = [
  {
    id: 301,
    slug: 'zhenhua-cpca-show-plus-2026-pcb-micro-drill-dpc-ceramic',
    type: 'post',
    date: '2026-10-30',
    category: 'Exhibition & Events',
    read_time: '4 min read',
    title: {
      rendered:
        'Zhenhua Vacuum Showcases PCB Micro-Drill & DPC Ceramic Metallization at CPCA Show Plus 2026',
    },
    excerpt: {
      rendered:
        'At the International Electronics and Circuits Exhibition in Shenzhen, Zhenhua demonstrated droplet-free magnetic-filtered drill coatings and dual-sided DPC ceramic sputtering.',
    },
    content: {
      rendered:
        'From October 27 to 29 in Shenzhen, Guangdong Zhenhua Technology presented live process samples for AI-server PCB micro-drills and Direct Plated Copper (DPC) ceramic substrates. Engineering teams highlighted how 90° filtered cathodic arc plasma eliminates surface macro-droplets while maintaining uniform edge coverage on sub-0.15 mm carbide flutes.',
    },
    featured_image: '/src/assets/images/app_semiconductor_optics_1795314228739.jpg',
    featured_image_alt: 'Coated PCB micro-drills and ceramic substrates displayed at CPCA Show Plus 2026',
    yoast_head_json: {
      title: 'CPCA Show Plus 2026: PCB Micro-Drill & DPC Ceramic Coating | Zhenhua Vacuum',
      description:
        'Highlights from Shenzhen CPCA Show Plus 2026 covering PCB micro-drill hard films and DPC ceramic metallization.',
      canonical: `${SITE_BASE}/insights/zhenhua-cpca-show-plus-2026-pcb-micro-drill-dpc-ceramic/`,
      og_type: 'article',
      og_title: 'Zhenhua Vacuum at CPCA Show Plus 2026',
      og_description: 'PCB micro-drill hard coating and DPC ceramic substrate metallization.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline:
          'Zhenhua Vacuum Showcases PCB Micro-Drill & DPC Ceramic Metallization at CPCA Show Plus 2026',
        datePublished: '2026-10-30',
      },
    },
  },
  {
    id: 302,
    slug: 'eliminating-primer-topcoat-zbm1819-automotive-lighting',
    type: 'post',
    date: '2026-10-30',
    category: 'Process Engineering',
    read_time: '5 min read',
    title: {
      rendered:
        'Eliminating Wet Primer & Topcoat Spraying: ZBM-1819 Automotive Lighting Solution',
    },
    excerpt: {
      rendered:
        'How integrated plasma activation, aluminum evaporation, and HMDSO PECVD topcoat cut cycle cost and VOC emissions for Tier-1 headlamp suppliers.',
    },
    content: {
      rendered:
        'Conventional automotive reflector manufacturing requires separate wet primer spraying, thermal curing, aluminum metallizing, and protective topcoat spraying. By consolidating surface activation, thermal evaporation, and PECVD SiOx topcoating into the ZBM-1819 vacuum chamber, suppliers remove two wet paint lines and improve adhesion stability under thermal cycling.',
    },
    featured_image: '/src/assets/images/equip_sputtering_inline_1795314228678.jpg',
    featured_image_alt: 'ZBM-1819 integrated vacuum coating machine for automotive lighting',
    yoast_head_json: {
      title: 'Eliminating Primer & Topcoat in Automotive Lighting | Zhenhua Vacuum',
      description:
        'Engineering overview of the ZBM-1819 single-cycle aluminum evaporation and PECVD protective coating process.',
      canonical: `${SITE_BASE}/insights/eliminating-primer-topcoat-zbm1819-automotive-lighting/`,
      og_type: 'article',
      og_title: 'Eliminating Wet Primer & Topcoat Spraying: ZBM-1819',
      og_description: 'Single-cycle vacuum metallization and PECVD topcoat for automotive headlamps.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Eliminating Wet Primer & Topcoat Spraying: ZBM-1819 Automotive Lighting Solution',
        datePublished: '2026-10-30',
      },
    },
  },
  {
    id: 303,
    slug: 'horizontal-sputtering-line-advanced-semiconductor-packaging',
    type: 'post',
    date: '2026-10-29',
    category: 'Product Release',
    read_time: '4 min read',
    title: {
      rendered:
        'Zhenhua Delivers Modular Horizontal Sputtering Line for Advanced Semiconductor Packaging',
    },
    excerpt: {
      rendered:
        'Dual-sided continuous vacuum sputtering architecture passes customer acceptance for high-density interconnect and glass-core packaging.',
    },
    content: {
      rendered:
        'Zhenhua Vacuum completed factory acceptance and delivery of its latest horizontal double-sided magnetron sputtering line. Designed with modular load-lock, ion cleaning, and multi-target sputtering zones, the line delivers consistent barrier and copper seed adhesion for next-generation panel-level packaging.',
    },
    featured_image: '/src/assets/images/hero_pvd_cleanroom_1795314229429.jpg',
    featured_image_alt: 'Cleanroom horizontal inline sputtering line ready for semiconductor packaging delivery',
    yoast_head_json: {
      title: 'Horizontal Sputtering Line for Advanced Packaging | Zhenhua Vacuum',
      description:
        'Delivery report on Zhenhua Vacuum modular horizontal sputtering production line for semiconductor packaging.',
      canonical: `${SITE_BASE}/insights/horizontal-sputtering-line-advanced-semiconductor-packaging/`,
      og_type: 'article',
      og_title: 'Modular Horizontal Sputtering Line for Advanced Packaging',
      og_description: 'Dual-sided barrier and copper seed sputtering production line.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Zhenhua Delivers Modular Horizontal Sputtering Line for Advanced Semiconductor Packaging',
        datePublished: '2026-10-29',
      },
    },
  },
  {
    id: 304,
    slug: 'm9-quartz-fiber-laminates-pcb-micro-drill-coating-selection',
    type: 'post',
    date: '2026-10-21',
    category: 'Process Engineering',
    read_time: '6 min read',
    title: {
      rendered:
        'M9 Quartz-Fiber Laminates Are Here: Coating Selection for High-Aspect-Ratio PCB Micro-Drills',
    },
    excerpt: {
      rendered:
        'Why abrasive quartz-fiber AI server boards demand ultra-smooth filtered PVD hard films to prevent flute clogging and reduce cost per hole.',
    },
    content: {
      rendered:
        'As high-frequency AI server PCBs adopt M9 quartz-fiber laminates, abrasive silica content rapidly wears conventional TiN-coated carbide drills. Switching to magnetic-filtered TiAlSiN and ta-C multilayer architectures reduces friction torque while preserving tip concentricity across 3,000+ hits.',
    },
    featured_image: '/src/assets/images/equip_cathodic_arc_1795314229475.jpg',
    featured_image_alt: 'MF-900 precision hard film PVD system for PCB micro-drills',
    yoast_head_json: {
      title: 'M9 Laminates & PCB Micro-Drill PVD Coating Selection | Zhenhua Vacuum',
      description:
        'Technical guide to selecting filtered TiAlSiN and ta-C PVD coatings for drilling abrasive M9 quartz-fiber PCBs.',
      canonical: `${SITE_BASE}/insights/m9-quartz-fiber-laminates-pcb-micro-drill-coating-selection/`,
      og_type: 'article',
      og_title: 'Coating Selection for M9 Quartz-Fiber PCB Micro-Drills',
      og_description: 'Lowering cost per hole on abrasive AI server PCB laminates.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'M9 Quartz-Fiber Laminates Are Here: Coating Selection for High-Aspect-Ratio PCB Micro-Drills',
        datePublished: '2026-10-21',
      },
    },
  },
];

export const wpSiteMetaBase: Omit<WPSiteMeta, 'source_mode' | 'wordpress_endpoint_configured'> = {
  canonical_base_url: SITE_BASE,
  company: {
    legal_name: 'Guangdong Zhenhua Technology Co., Ltd.',
    brand_name: 'Zhenhua Vacuum',
    founded_year: 1992,
    campus_area_sqm: 67000,
    production_bases: [
      'Yungui Zhenhua Industrial Park (HQ)',
      'Beiling Production Base',
      'Lantang Production Base',
    ],
    service_centers_count: 5,
    patents_count: 16,
    headquarters: 'Yungui Rd, Zhaoqing Avenue West Block, Zhaoqing, Guangdong, China',
    email: 'panyf@zhenhuavacuum.com',
    phone: '+86-13826005301',
  },
  hreflang_policy: {
    active_locales: [
      { code: 'en', label: 'English (Global Canonical)', canonical_prefix: '/' },
      { code: 'zh-CN', label: '简体中文 (Planned WPML/Polylang)', canonical_prefix: '/zh/' },
      { code: 'de', label: 'Deutsch (DACH Industrial)', canonical_prefix: '/de/' },
      { code: 'ja', label: '日本語 (Precision Optics)', canonical_prefix: '/ja/' },
    ],
    deprecated_spam_locales_removed: 98,
  },
  counts: {
    equipment: wpEquipmentData.length,
    applications: wpApplicationsData.length,
    posts: wpPostsData.length,
  },
};

export const seoAuditComparison: SEOAuditItem[] = [
  {
    dimension: 'Multilingual & Indexing Hygiene',
    legacy_globalso:
      'Injected 100+ machine-translated prisna-wp-translate-seo links (/fr/, /ceb/, /hmn/, /haw/) directly in DOM footer, diluting crawl budget and triggering thin-content penalties.',
    headless_wp_mvp:
      'Clean canonical English root with strict hreflang governance limited to vetted B2B markets (EN / ZH / DE / JA) managed via WPML/Polylang REST endpoints.',
    impact: 'Eliminates 98+ thin/duplicate indexable URLs',
  },
  {
    dimension: 'Heading Hierarchy & Semantic HTML',
    legacy_globalso:
      'Buried single <h1>About us</h1> halfway down the page; hero relied on unindexed JPEG banners (BANNER102.jpg) with zero descriptive text.',
    headless_wp_mvp:
      'Primary <h1> anchors the Hero value proposition ("Precision PVD & Inline Vacuum Coating Systems"), followed by strict H2/H3 outline and indexable engineering copy.',
    impact: 'Immediate semantic clarity for search crawlers',
  },
  {
    dimension: 'Structured Data (Schema.org JSON-LD)',
    legacy_globalso:
      'Zero JSON-LD markup; product pages lacked SKU, brand, technical specs, and Organization entity linkage.',
    headless_wp_mvp:
      'Dynamic Organization, Product, and Article JSON-LD injected per route directly from WordPress Yoast/RankMath REST fields.',
    impact: 'Rich snippet eligibility for industrial equipment SKUs',
  },
  {
    dimension: 'Content & Spec Modeling (CMS)',
    legacy_globalso:
      'Truncated paragraph blobs ("meeting the stringent requ...") and mistranslations ("67,000 Acres of land" instead of 67,000 m²).',
    headless_wp_mvp:
      'Typed WordPress Custom Post Types (equipment, application, post) + ACF structured fields for chamber dimensions, base vacuum, uniformity, and cycle time.',
    impact: 'Enables live multi-machine comparison & filtering',
  },
  {
    dimension: 'Frontend Runtime & Lead Capture',
    legacy_globalso:
      'Heavy jQuery + Swiper + AOS + external third-party form.js/livechat.js scripts blocking main thread and failing inside modern sandboxes.',
    headless_wp_mvp:
      'Decoupled React + Tailwind SPA backed by Express Headless WP adapter (/api/wp/v2/*), dynamic /sitemap.xml, and validated server-side RFQ submission.',
    impact: 'Sub-200ms filter interaction & reliable conversion tracking',
  },
];
