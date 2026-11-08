import type {
  CatalogCategory,
  LandingContent,
  LandingFaq,
  ShopImage,
  ShopProduct,
  ShopVariant,
} from '#shared/types'

export const CATEGORY_META: CatalogCategory[] = [
  {
    id: 'lawn-mower',
    label: 'Lawn Mower',
    blurb: 'Remote-controlled and robotic mowers built for slopes, tall grass and commercial duty.',
    image: '/brand/media/categories-lawn-mower.webp',
  },
  {
    id: 'precision-agriculture',
    label: 'Precision Agriculture',
    blurb: 'Autosteering, ISOBUS terminals and guidance systems with centimetre-level accuracy.',
    image: '/brand/media/harvest-1543064.webp',
  },
  {
    id: 'precision-spraying',
    label: 'Precision Spraying',
    blurb: 'Section control and flow monitoring that cut chemical waste in the field.',
    image: '/brand/media/agriculture-6502282.webp',
  },
  {
    id: 'land-leveling',
    label: 'Land Leveling',
    blurb: 'GNSS land leveling that replaces manual grade checking with automated blade control.',
    image: '/brand/media/sunrise-8218442.webp',
  },
  {
    id: 'agricultural-robotics',
    label: 'Agricultural Robots',
    blurb: 'Autonomous orchard spraying and mowing platforms for labour-constrained operations.',
    image: '/brand/media/pexels-vladimirsrajber-18431208.webp',
  },
  {
    id: 'machine-control',
    label: 'Machine Control',
    blurb: 'Excavator guidance and grade control that reduce over-digging on every pass.',
    image: '/brand/media/vesper-local-repair.webp',
  },
]

interface Seed {
  handle: string
  code: string
  name: string
  category: string
  categoryLabel: string
  image: string
  tagline: string
  badges: string[]
  why: string[]
  features: string[]
  best?: boolean
  isNew?: boolean
  landing?: Partial<LandingContent>
}

const SEEDS: Seed[] = [
  {
    handle: 'vesper-s1-4wd-50',
    code: 'Mowrator S1 4WD',
    name: '119% Slope (50°)',
    category: 'lawn-mower',
    categoryLabel: 'Lawn Mower',
    image: '/brand/products/products-vesper-s1-4wd-50.webp',
    tagline:
      'Remember the joy of RC cars as a kid? We brought that feeling back to your lawn — with the climbing ability of a commercial slope mower.',
    badges: ['Collaborative', 'Efficient', 'Stable', 'Premium', 'Accurate', 'Upgradable'],
    why: [
      'All-Wheel Beast Drive tackles 50° (119% Grade) slopes — where other mowers stall, the S1 4WD keeps climbing',
      '10 cm obstacle clearance plus aggressive grip tread tires crush tree roots, exposed rocks, and uneven ground without losing momentum',
      '1985W peak cutting power with 8.13 N·m torque chews through 1.3 m tall, matted, wet grass without bogging down',
      'Multi-season yard care: discharge, mulch, bag, and a 931 CFM leaf-shredding vacuum — replaces mower, rake, and blower in one machine',
      'No RTK setup, no app pairing, no fuel — pick up the remote and mow in seconds, from up to 400 m away',
      'Engineered by former DJI experts, built with aircraft-grade aluminum body and DC06 deep-draw steel deck for years of heavy use',
    ],
    features: [
      '50° (119%) slope, 10 cm obstacle clearance',
      '53 cm deck, 1985W peak cutting power',
      '2000 ㎡/h coverage (3× faster)',
      'Runtime up to 2.25h (18Ah) / 1.5h (12Ah)',
      'Discharge, Mulch, Bag + Leaf-Shredding Vacuum',
      '4-Motor AWD, FOC torque control, 5ms response',
    ],
    best: true,
    isNew: true,
    landing: {
      lead: 'A 64 kg tracked mower that climbs a 50° bank, clears 10 cm obstacles and shreds leaves — driven by a DJI-grade remote with 5 ms response, no RTK base station required.',
      stats: [
        { value: '50°', label: 'Max slope (119% grade)' },
        { value: '53 cm', label: 'Cutting width' },
        { value: '1985 W', label: 'Peak cutting power' },
        { value: '2000 ㎡/h', label: 'Coverage (3× faster)' },
        { value: '2.25 h', label: 'Runtime (18Ah)' },
      ],
      highlights: [
        {
          title: 'All-Wheel Beast Drive',
          text: 'Four independent brushless motors deliver 1000W of traction output. Combined with 12 mm grip-tread tyres, the S1 4WD holds grip on 50° slopes, wet grass and loose soil — terrain that defeats walk-behind and ride-on mowers.',
          icon: 'wrench',
        },
        {
          title: '1985 W of cutting power',
          text: '8.13 N·m of torque chews through 1.3 m tall, matted, wet grass on the first pass, so overgrown blocks are cleared in one go rather than three.',
          icon: 'rocket',
        },
        {
          title: '10 cm obstacle clearance',
          text: 'Tree roots, exposed rocks and uneven ground pass underneath without the deck stalling. High-clearance aluminium chassis keeps the blade away from debris.',
          icon: 'shield',
        },
        {
          title: '4-in-1 yard care',
          text: 'Discharge, mulch, bag, or switch to the 931 CFM leaf-shredding vacuum with a 70 L collection bag — one machine replaces a mower, rake and blower.',
          icon: 'grid',
        },
        {
          title: 'No RTK, no app pairing',
          text: 'Pick up the remote and mow. No boundary wire, no base station, no satellite subscription — and a 400 m range so you can work the far paddock from the shed.',
          icon: 'headset',
        },
        {
          title: 'Aircraft-grade build',
          text: 'Aircraft-grade aluminium body and a DC06 deep-draw stamped steel deck. Modular, service-friendly design means blades, batteries and key parts swap in minutes.',
          icon: 'precision-agriculture',
        },
      ],
      metric: {
        value: '2000 ㎡/h',
        label: 'Coverage per hour',
        note: 'Three times the coverage of a comparable ride-on mower, with a 53 cm deck and 1.5 m/s top speed.',
      },
      dataRows: [
        { label: 'Runtime (12Ah / 18Ah)', value: '1.5 h / 2.25 h' },
        { label: 'Charging time', value: '70–90 min (600W)' },
        { label: 'Machine weight', value: '64 kg' },
        { label: 'Remote range', value: 'Up to 400 m' },
        { label: 'Battery', value: '56V LiFePO₄, 1500+ cycles' },
      ],
      gallery: [
        {
          image: '/brand/media/vesper-remote.webp',
          title: 'DJI-grade remote control',
          text: '5 ms response and 400 m range. No phone, no app, no account — the remote is the interface.',
        },
        {
          image: '/brand/media/vesper-aluminum.webp',
          title: 'Aircraft-grade aluminium',
          text: 'A high-clearance alloy chassis keeps the deck clear of roots and rocks while shaving weight.',
        },
        {
          image: '/brand/media/vesper-steel-deck.webp',
          title: 'DC06 deep-draw steel deck',
          text: 'A stamped steel deck that shrugs off stones and stays rigid after seasons of commercial use.',
        },
        {
          image: '/brand/media/vesper-no-rtk.webp',
          title: 'No RTK infrastructure',
          text: 'No base station, no boundary wire, no signal dropouts in shaded or enclosed areas.',
        },
      ],
      safety: [
        {
          title: 'Four ultrasonic sensors',
          text: 'A front sensor array plus a physical bumper stops the machine before it reaches an obstacle.',
        },
        {
          title: 'Tilt and roll auto-stop',
          text: 'If the chassis exceeds its safe angle, the blade and drive cut out immediately.',
        },
        {
          title: 'Remote failsafe',
          text: 'Loss of signal or a released trigger brings the mower to a controlled stop.',
        },
      ],
      compare: {
        head: ['Capability', 'Mowrator S1 4WD', 'Typical ride-on'],
        rows: [
          ['Maximum slope', '50° (119%)', '15–20°'],
          ['Obstacle clearance', '10 cm', '3–5 cm'],
          ['Setup', 'Remote out of the box', 'Fuel, service, storage'],
          ['Leaf handling', '931 CFM vacuum + 70 L bag', 'Not supported'],
          ['Operator exposure', 'Stand clear, up to 400 m', 'Sitting on the slope'],
        ],
      },
      scenarios: [
        {
          image: '/brand/media/categories-lawn-mower.webp',
          title: 'Steep residential banks',
          text: 'Slopes that push a ride-on to the edge get mown from the bottom of the hill.',
        },
        {
          image: '/brand/media/harvest-1543064.webp',
          title: 'Orchard inter-rows',
          text: 'Tall, matted grass between rows is cleared without strimming first.',
        },
        {
          image: '/brand/media/agriculture-6502282.webp',
          title: 'Rough paddocks',
          text: 'Roots, rocks and uneven ground pass under a 10 cm clearance deck.',
        },
        {
          image: '/brand/media/sunrise-8218442.webp',
          title: 'Large properties',
          text: '2000 ㎡/h turns a full-day job into a morning — including leaf cleanup in autumn.',
        },
      ],
      specs: [
        {
          title: 'Performance',
          items: [
            { label: 'Max slope', value: '50° (119% Grade)' },
            { label: 'Obstacle clearance', value: '10 cm' },
            { label: 'Cutting width', value: '53 cm (21")' },
            { label: 'Peak cutting power', value: '1985 W' },
            { label: 'Cutting torque', value: '8.13 N·m' },
            { label: 'Max tall grass cut', value: '130 cm' },
            { label: 'Top speed', value: '1.5 m/s' },
            { label: 'Cutting efficiency', value: '2000 ㎡/hr' },
          ],
        },
        {
          title: 'Battery & drive',
          items: [
            { label: 'Battery', value: '56V automotive-grade LiFePO₄' },
            { label: 'Capacity', value: '12Ah (3000 ㎡) / 18Ah (4500 ㎡)' },
            { label: 'Cycle life', value: '1500+ cycles' },
            { label: 'Runtime (12Ah)', value: 'Up to 1.5 hours' },
            { label: 'Runtime (18Ah)', value: 'Up to 2.25 hours' },
            { label: 'Charging (600W)', value: '~70 min (12Ah) / ~90 min (18Ah)' },
            { label: 'Drive', value: '4-motor AWD, 4× brushless, 1000W' },
            { label: 'Control', value: 'FOC torque control, 5 ms response' },
          ],
        },
        {
          title: 'Build & safety',
          items: [
            { label: 'Chassis', value: 'High-clearance aluminium alloy' },
            { label: 'Deck material', value: 'DC06 deep-draw stamped steel' },
            { label: 'Tyres', value: '12 mm tread teeth, semi-solid TPU' },
            { label: 'Weight', value: '64 kg' },
            { label: 'Remote control', value: '5 ms response, 400 m range' },
            { label: 'Safety', value: '4 ultrasonic sensors + bumper, tilt/roll auto-stop' },
            { label: 'Vacuum', value: '931 CFM, 70 L collection bag' },
            { label: 'Modes', value: 'Discharge, mulch, bag, leaf shredding' },
            { label: 'Warranty', value: '24 months (unit, remote, battery)' },
          ],
        },
      ],
      kit: [
        { label: 'Mowrator S1 4WD unit', qty: '1' },
        { label: 'Remote control', qty: '1' },
        { label: 'Battery pack', qty: '1' },
        { label: '600W charger', qty: '1' },
        { label: 'Collection bag (70 L)', qty: '1' },
        { label: 'Blade set', qty: '1' },
        { label: 'Tool kit', qty: '1' },
        { label: 'User manual', qty: '1' },
      ],
      overview: {
        heading: 'A slope mower that stays planted where ride-ons give up',
        paragraphs: [
          'The Mowrator S1 4WD is built around four independent brushless motors, a 53 cm stamped steel deck and a 56V LiFePO₄ pack. The result is a 64 kg machine that climbs a 50° bank, clears 10 cm obstacles and keeps cutting through 1.3 m grass.',
          'There is no RTK base station, no boundary wire and no app account. The DJI-grade remote responds in 5 ms from up to 400 m away, so the operator stands clear of the slope while the machine does the work.',
        ],
      },
      metrics: [
        { value: '50', unit: '°', label: 'Maximum slope' },
        { value: '53', unit: 'cm', label: 'Cutting width' },
        { value: '1985', unit: 'W', label: 'Peak cutting power' },
        { value: '2000', unit: '㎡/h', label: 'Coverage' },
      ],
      engineering: {
        image: '/brand/media/vesper-aluminum.webp',
        heading: 'Aircraft-grade chassis, serviceable by design',
        lead: 'Every wear part is reachable without specialist tools, so a blade or battery swap is a minutes-long job rather than a workshop booking.',
        items: [
          {
            name: 'Four-motor drive',
            value: '4× brushless, 1000W',
            detail: 'An independent motor per wheel keeps traction on wet grass and loose soil.',
          },
          {
            name: 'Deck',
            value: '53 cm, DC06 steel',
            detail: 'Deep-draw stamped steel resists stone damage and stays rigid after seasons of use.',
          },
          {
            name: 'Battery',
            value: '56V LiFePO₄',
            detail: '1500+ cycles, 12Ah or 18Ah, 70–90 minute charge on the 600W charger.',
          },
          {
            name: 'Obstacle clearance',
            value: '10 cm',
            detail: 'Roots and rocks pass under the deck without stalling the blade.',
          },
          {
            name: 'Tyres',
            value: '12 mm tread teeth',
            detail: 'Semi-solid TPU, puncture-free, with a wide contact patch for slope grip.',
          },
          {
            name: 'Remote control',
            value: '5 ms, 400 m',
            detail: 'DJI-grade controller — no phone, no app and no account required.',
          },
          {
            name: 'Safety',
            value: '4 sensors + bumper',
            detail: 'Ultrasonic array plus a physical bumper, with tilt and roll auto-stop.',
          },
          {
            name: 'Weight',
            value: '64 kg',
            detail: 'Heavy enough to hold a slope, light enough to load on a trailer ramp.',
          },
        ],
      },
      performance: {
        heading: 'Runtime that matches the size of the job',
        lead: 'Two battery capacities cover a suburban block or a paddock. Coverage figures are measured at the 53 cm deck width and 1.5 m/s top speed.',
        chartTitle: 'Cutting coverage per charge',
        note: 'Manufacturer estimates on level, dry grass. Slope, grass length and discharge mode change real-world coverage.',
        points: [
          { label: '12Ah', value: 3000, caption: '3000 ㎡' },
          { label: '18Ah', value: 4500, caption: '4500 ㎡' },
        ],
        figureImage: '/brand/media/vesper-remote.webp',
        figureTitle: 'Remote-only operation',
        figureText: 'No app pairing, no account setup and no RTK base station. The controller is the whole interface.',
      },
      applications: [
        {
          title: 'Steep residential banks',
          desc: 'Mow a 50° bank from the bottom of the hill, with the operator standing clear.',
        },
        {
          title: 'Orchard inter-rows',
          desc: 'Tall, matted grass between rows is cleared without a strimmer pass first.',
        },
        {
          title: 'Rough paddocks',
          desc: 'Roots, rocks and uneven ground pass under a 10 cm clearance deck.',
        },
        {
          title: 'Autumn leaf cleanup',
          desc: 'Switch to the 931 CFM vacuum and 70 L bag to clear leaves as well as grass.',
        },
      ],
      faq: [
        {
          q: 'Can it really mow a 50° slope?',
          a: 'Yes, on ground with reasonable grip. The four-motor drive and 12 mm tread tyres hold a 50° (119%) grade; wet clay or loose gravel will reduce that figure.',
        },
        {
          q: 'Do I need a base station or boundary wire?',
          a: 'No. The S1 4WD is remote controlled, so there is no RTK antenna, no boundary wire and no satellite subscription.',
        },
        {
          q: 'How long does the battery take to charge?',
          a: 'About 70 minutes for the 12Ah pack and 90 minutes for the 18Ah pack on the 600W charger.',
        },
        {
          q: 'What happens if it tips or loses signal?',
          a: 'Tilt and roll sensors cut the blade and drive immediately, and the remote failsafe stops the machine if the signal is lost.',
        },
        {
          q: 'Is freight included in the price?',
          a: 'Freight is quoted per order once we confirm your location and access. Add the machine to the cart and we will follow up with a delivered price.',
        },
      ],
      notes: [
        'Specifications are manufacturer figures and may change without notice.',
        'Coverage and runtime are estimates on level, dry grass at the stated deck width and speed.',
        'Operate only on ground within the rated slope, with people and animals clear of the deck.',
        'Displayed price includes GST. Freight is quoted separately.',
      ],
    },
  },
  {
    handle: 'vesper-s1-4wd-40',
    code: 'Mowrator S1 4WD',
    name: '85% Slope (40°)',
    category: 'lawn-mower',
    categoryLabel: 'Lawn Mower',
    image: '/brand/products/products-vesper-s1-4wd-40.webp',
    tagline:
      'The same all-wheel-drive platform with wide TPU tread tyres — built for 40° banks and rough ground.',
    badges: ['Collaborative', 'Efficient', 'Stable', 'Premium', 'Accurate', 'Upgradable'],
    why: [
      'Wide TPU tread tyres deliver a wider contact patch and puncture-free durability — added stability on 40° (85% Grade) slopes without sacrificing agility',
      '10 cm obstacle clearance plus 4-Motor AWD crushes exposed tree roots, rocks, and uneven ground without losing momentum',
      '1985W peak cutting power with 8.13 N·m torque chews through 1.3 m tall, matted, wet grass on the first pass',
      'Multi-season yard care: 4-in-1 mode (discharge, mulch, bag, vacuum) replaces the mower, rake, and blower in one machine',
      'No RTK setup, no app pairing, no fuel — pick up the DJI-grade remote and mow in seconds from up to 400 m away',
      'Aircraft-grade aluminum body, DC06 deep-draw steel deck, and modular design for years of commercial-duty mowing',
    ],
    features: [
      '40° (85%) slope, 10 cm obstacle clearance',
      '53 cm deck, 1985W peak cutting power',
      '2000 ㎡/h coverage, 3× faster',
      'Runtime up to 2.25h (18Ah) / 1.5h (12Ah)',
      'Wide TPU tread wheels for max grip',
      'Discharge, Mulch, Bag + Leaf-Shredding Vacuum',
    ],
    best: true,
    isNew: true,
    landing: {
      lead: 'A 40° version of the S1 4WD with wide TPU tread tyres — the same 53 cm deck, 1985 W of cutting power and remote-only setup, tuned for grip on rough ground.',
      stats: [
        { value: '40°', label: 'Max slope (85% grade)' },
        { value: '53 cm', label: 'Cutting width' },
        { value: '1985 W', label: 'Peak cutting power' },
        { value: '2000 ㎡/h', label: 'Coverage' },
        { value: '2.25 h', label: 'Runtime (18Ah)' },
      ],
    },
  },
  {
    handle: 'af718',
    code: 'AF718',
    name: 'Autosteering System',
    category: 'precision-agriculture',
    categoryLabel: 'Precision Agriculture',
    image: '/brand/products/products-af718.webp',
    tagline: 'Frontier — pioneering the future of smart farming with a full precision-agriculture ecosystem.',
    badges: [
      'Collaborative',
      'Efficient',
      'Stable',
      'Secure',
      'Accurate',
      'Compatible',
      'Upgradable',
    ],
    why: [
      'High-performance processor and robust motor system support heavy-duty work and long-duration continuous operation',
      'AI expansion interfaces enable seamless integration of advanced intelligent algorithms and modules',
      'High-precision navigation with automatic path planning and real-time obstacle adjustment',
      'Complete precision agriculture ecosystem supporting spraying, seeding, fertilizing, and more',
      'Multi-machine collaboration enables synchronized operations across multiple vehicles in the same field',
      'Centered on the AF718, supports diverse functions and flexible application across different farmland environments',
    ],
    features: [
      'High-precision GNSS autosteering',
      'Automatic path planning',
      'Real-time obstacle adjustment',
      'AI expansion interfaces',
      'Multi-machine collaboration',
      'Spraying / seeding / fertilizing ecosystem',
    ],
    best: true,
    isNew: true,
    landing: {
      lead: 'A high-precision autosteering platform with AI expansion interfaces, built to anchor a complete spraying, seeding and fertilising ecosystem.',
      stats: [
        { value: '±2.5 cm', label: 'Pass-to-pass accuracy' },
        { value: 'AI', label: 'Expansion interfaces' },
        { value: 'Multi', label: 'Machine collaboration' },
        { value: '24/7', label: 'Continuous operation' },
        { value: '4-in-1', label: 'Field operations' },
      ],
      highlights: [
        {
          title: 'Heavy-duty processing',
          text: 'A high-performance processor and robust motor system support long-duration continuous operation in the field.',
          icon: 'rocket',
        },
        {
          title: 'AI expansion interfaces',
          text: 'Add advanced intelligent algorithms and modules without replacing the base platform.',
          icon: 'grid',
        },
        {
          title: 'Automatic path planning',
          text: 'High-precision navigation plans the pass and adjusts in real time around obstacles.',
          icon: 'precision-agriculture',
        },
        {
          title: 'Multi-machine collaboration',
          text: 'Synchronised operations across several vehicles working the same field.',
          icon: 'users',
        },
      ],
      specs: [
        {
          title: 'Guidance',
          items: [
            { label: 'Positioning', value: 'High-precision GNSS' },
            { label: 'Path planning', value: 'Automatic, with obstacle adjustment' },
            { label: 'Collaboration', value: 'Multi-machine synchronised operation' },
            { label: 'Expansion', value: 'AI module interfaces' },
          ],
        },
      ],
    },
  },
  {
    handle: 'af305',
    code: 'AF305',
    name: 'Automated Steering System',
    category: 'precision-agriculture',
    categoryLabel: 'Precision Agriculture',
    image: '/brand/products/products-af305-main.png',
    tagline: 'An advanced steering solution for precision agriculture, installed in about 20 minutes.',
    badges: ['Efficient', 'Stable', 'Premium', 'Accurate', 'Upgradable'],
    why: [
      'The AF305 Automated Steering System uses a high-torque motor control design, combined with a self-developed control algorithm, achieving ±2.5 cm pass-to-pass accuracy',
      'Supports multiple vehicle types with easy 20-minute installation and setup',
      'ISOBUS-compatible for seamless integration with agricultural implements',
      'Advanced correction services provide reliable positioning even in challenging environments',
      'Worry-free autosteering with terrain compensation and intelligent path planning',
    ],
    features: [
      'Advanced GNSS positioning',
      'Auto-steering control',
      'Easy installation (20 min setup)',
      'ISOBUS compatible',
      'Terrain compensation',
      '±2.5 cm accuracy',
    ],
    best: true,
    landing: {
      stats: [
        { value: '±2.5 cm', label: 'Pass-to-pass accuracy' },
        { value: '20 min', label: 'Installation time' },
        { value: 'ISOBUS', label: 'Implement compatibility' },
        { value: 'Multi', label: 'Vehicle types' },
        { value: '2D/3D', label: 'Terrain compensation' },
      ],
    },
  },
  {
    handle: 'isobus',
    code: 'ISOBUS',
    name: 'Terminal',
    category: 'precision-agriculture',
    categoryLabel: 'Precision Agriculture',
    image: '/brand/products/products-isobus-main.png',
    tagline:
      'A one-stop ISOBUS solution for smart implements — fully compatible with mainstream agricultural equipment.',
    badges: ['Efficient', 'Stable', 'Accurate', 'Upgradable'],
    why: [
      'One-stop ISOBUS solution fully compatible with mainstream agricultural equipment, empowering universal terminal operations across mixed-brand fleets',
      '12.1-inch high-brightness touchscreen provides clear visibility even in direct sunlight, with intuitive interface for reduced operator training',
      'Built-in high-precision GNSS guidance eliminates the need for separate navigation displays',
      'AEF-certified ISOBUS compliance ensures reliable UT and TC functionality with any ISOBUS-compatible implement',
      'Highly expandable — supports future upgrades and integration with precision agriculture ecosystem',
    ],
    features: [
      'AEF certified',
      'ISOBUS compliant',
      'Multi-brand compatibility',
      'UT and TC support',
      'Built-in GNSS guidance',
      '12.1" sunlight-readable touchscreen',
    ],
    landing: {
      stats: [
        { value: '12.1"', label: 'Sunlight-readable display' },
        { value: 'AEF', label: 'Certified compliance' },
        { value: 'UT/TC', label: 'ISOBUS functions' },
        { value: 'GNSS', label: 'Built-in guidance' },
        { value: 'Multi', label: 'Brand compatibility' },
      ],
    },
  },
  {
    handle: 'vs100',
    code: 'VS100',
    name: 'Spray Control System',
    category: 'precision-spraying',
    categoryLabel: 'Precision Spraying',
    image: '/brand/products/products-vs100-main.png',
    tagline:
      'Satellite-guided spray control that cuts chemical waste by up to 15% with section-level precision.',
    badges: ['Efficient', 'Stable', 'Premium', 'Accurate', 'Upgradable'],
    why: [
      'Utilizes advanced satellite navigation and control technology to deliver precise pest and weed management, reducing chemical waste by up to 15%',
      'Section control with up to 16 individual sections ensures precise application, eliminating overlaps and skips even in irregularly shaped fields',
      'Visualized operation interface provides real-time spray data including pressure, flow rate, and coverage maps for complete traceability',
      'High compatibility with major sprayer brands and ISOBUS implements, with easy expansion for additional precision agriculture functions',
      'Reapplication control prevents double-spraying of treated areas, saving chemicals and protecting crop health',
    ],
    features: [
      'Precision spraying',
      'Section control (up to 16 sections)',
      'Flow rate monitoring',
      '98% accuracy',
      'Real-time monitoring',
      'ISOBUS support',
      'GNSS-based flow control',
    ],
    best: true,
    landing: {
      stats: [
        { value: '16', label: 'Section control zones' },
        { value: '15%', label: 'Chemical waste reduction' },
        { value: '98%', label: 'Application accuracy' },
        { value: 'Real-time', label: 'Pressure & flow data' },
        { value: 'ISOBUS', label: 'Implement support' },
      ],
    },
  },
  {
    handle: 'w20',
    code: 'W20',
    name: 'Land Leveling System',
    category: 'land-leveling',
    categoryLabel: 'Land Leveling',
    image: '/brand/products/products-w20-main.png',
    tagline:
      'A GNSS-based smart land leveling system designed to replace inefficient manual methods.',
    badges: [
      'Stable performance',
      'User-friendly design',
      'Upgraded algorithms',
      'Smart operation',
      'Quick height calibration',
      'Terrain survey & design',
    ],
    why: [
      'Developed by Vesper, the W20 Intelligent GNSS Land Leveling System is a high-precision alternative to traditional laser leveling',
      'Compatible with land levelers, scrapers, bulldozers, and graders, offering precise guidance and automated blade control for optimal performance',
      'Minimizes operator fatigue and skill requirements, ensuring accurate results in farmland leveling and paddy field transformation',
      'Ideal for land reclamation, site preparation, and roadbed work where high surface flatness is essential',
      'Improves soil moisture retention, enables precise irrigation, and reduces input waste for significantly enhanced field productivity',
    ],
    features: [
      'GNSS terrain survey',
      'Automated blade control',
      'Quick height calibration',
      'Works with levelers, scrapers, dozers, graders',
      'Precision irrigation support',
      'Upgraded leveling algorithms',
    ],
    landing: {
      stats: [
        { value: 'GNSS', label: 'Positioning' },
        { value: 'Auto', label: 'Blade control' },
        { value: '4', label: 'Machine types supported' },
        { value: 'Survey', label: 'Terrain design' },
        { value: 'Quick', label: 'Height calibration' },
      ],
    },
  },
  {
    handle: 'aries300n',
    code: 'Aries300N',
    name: 'Orchard Spraying Robot',
    category: 'agricultural-robotics',
    categoryLabel: 'Agricultural Robots',
    image: '/brand/products/products-aries300n-main.png',
    tagline:
      'A hybrid-powered orchard spraying robot combining GNSS navigation, autonomous driving and obstacle avoidance.',
    badges: ['Efficient', 'Stable', 'Premium', 'Accurate', 'Upgradable'],
    why: [
      'Combines GNSS navigation, autonomous driving, obstacle avoidance, and intelligent operation — goodbye to manual driving in orchards',
      'Robust design with stable performance in challenging terrain, slopes, and dense orchard environments',
      'Reliable operation with cost-effective efficiency — reduces labor costs by up to 60% compared to manual spraying',
      'Flexible mode switching between autonomous and manual operation for diverse orchard layouts and spray requirements',
      'Hybrid gasoline-electric power system enables extended runtime up to 8 hours with 300L tank capacity',
    ],
    features: [
      'Autonomous navigation',
      'Hybrid power (gasoline-electric)',
      'Air-assisted spraying',
      'Night mode operation',
      '3–10 m spray width',
      'GNSS-guided precision',
    ],
    best: true,
    landing: {
      stats: [
        { value: '300 L', label: 'Tank capacity' },
        { value: '8 h', label: 'Runtime (hybrid)' },
        { value: '60%', label: 'Labour cost reduction' },
        { value: '3–10 m', label: 'Spray width' },
        { value: 'Night', label: 'Operation mode' },
      ],
    },
  },
  {
    handle: 'taurus80e',
    code: 'Taurus80E',
    name: 'Smart Lawn Mowing Robot',
    category: 'agricultural-robotics',
    categoryLabel: 'Agricultural Robots',
    image: '/brand/products/products-80e-1.webp',
    tagline: 'Autonomous electric mowing for professional operations.',
    badges: ['Efficient', 'Stable', 'Premium', 'Accurate', 'Upgradable'],
    why: [
      'High-precision centimetre-level positioning for maximum field efficiency',
      'Robust hardware platform engineered for harsh agricultural environments',
      'Intelligent automation reduces operator fatigue and human errors',
      'Seamless OTA updates keep your system future-proof',
    ],
    features: [
      'Autonomous navigation',
      'Electric powered (48V lithium)',
      'Low noise operation',
      '24/7 working',
      'Slope capability',
    ],
    best: true,
    landing: {
      stats: [
        { value: '48 V', label: 'Lithium platform' },
        { value: '24/7', label: 'Working window' },
        { value: 'cm', label: 'Positioning accuracy' },
        { value: 'OTA', label: 'Remote updates' },
        { value: 'Low', label: 'Noise output' },
      ],
    },
  },
  {
    handle: 'egs101',
    code: 'EGS101',
    name: 'Intelligent Excavator Guidance System',
    category: 'machine-control',
    categoryLabel: 'Machine Control',
    image: '/brand/products/products-egs101-main.png',
    tagline:
      'Real-time bucket guidance for digging and grading, across a wide range of excavator models.',
    badges: ['Efficient', 'Stable', 'Accurate', 'Upgradable'],
    why: [
      'Works seamlessly with a wide range of excavator models, providing precise real-time guidance for digging depth control and slope matching',
      'Combines GNSS and laser sensors for accurate 2D and 3D grade control in all working conditions',
      'Reduces over-digging by up to 80%, saving time on backfill and material costs',
      'Intuitive 7-inch display shows real-time bucket position relative to target grade, eliminating the need for grade checkers',
      'Quick installation and calibration — move the system between machines in under 30 minutes',
    ],
    features: [
      'Grade control',
      'Depth display',
      'Slope matching',
      '2D/3D control',
      'GNSS + laser sensors',
      '±3 cm accuracy',
    ],
    landing: {
      stats: [
        { value: '80%', label: 'Less over-digging' },
        { value: '±3 cm', label: 'Guidance accuracy' },
        { value: '7"', label: 'In-cab display' },
        { value: '30 min', label: 'Machine transfer' },
        { value: '2D/3D', label: 'Grade control' },
      ],
    },
  },
  {
    handle: 'v600',
    code: 'TerraMow V600',
    name: 'Auto Mower',
    category: 'lawn-mower',
    categoryLabel: 'Lawn Mower',
    image: '/brand/media/categories-lawn-mower.webp',
    tagline:
      'Triple-camera AI vision mowing — no boundary wire, no RTK antenna, no signal dropouts.',
    badges: [
      'AI vision',
      'Triple camera',
      'Auto mapping',
      'App control',
      'Obstacle avoidance',
      'Edge cutting',
    ],
    why: [
      'A triple-camera AI vision system reads the lawn in real time, so the V600 navigates and mows without boundary wire, RTK antenna or satellite signal',
      'One tap in the app is all the setup it needs — the mower builds an accurate map of your lawn by itself',
      'AI vision and CMOS sensors spot toys, hoses, pets and other obstacles as they appear, then steer around them so a mowing session is never interrupted',
      'Cuts right along the border with roughly 15 cm of adjustable offset, leaving a finish that needs no tidying up afterwards',
      'Three mowing modes — a quick trim, a standard cut or an intensive mow — matched to how fast your lawn is growing',
      'Fully electric drive means no petrol, no emissions and far lower running costs than a ride-on mower',
    ],
    features: [
      'Triple-camera AI vision, 360° awareness',
      'Wire-free: no boundary wire, no RTK antenna',
      'One-tap app mapping and scheduling',
      'Real-time obstacle avoidance',
      'Cutting height 1"–3"',
      'Three mowing modes: trim, standard, intensive',
      'Edge cutting with about 15 cm adjustable offset',
    ],
    isNew: true,
    landing: {
      lead: 'A wire-free robotic mower that maps your lawn with three cameras, routes around obstacles in real time and cuts to within about 15 cm of the edge — no RTK, no boundary wire, no signal dropouts.',
      stats: [
        { value: '0 m', label: 'Boundary wire' },
        { value: '3', label: 'AI cameras' },
        { value: '1"–3"', label: 'Cutting height' },
        { value: '15 cm', label: 'Edge offset' },
        { value: '3', label: 'Mowing modes' },
      ],
      highlights: [
        {
          title: 'One-tap smart mapping',
          text: 'Tap once in the app and the mower maps the lawn on its own, then turns that map into an efficient mowing route. No boundary wire to lay, no zones to draw by hand.',
          icon: 'grid',
        },
        {
          title: 'Real-time obstacle avoidance',
          text: 'AI vision works alongside CMOS sensors to recognise toys, hoses and pets as they appear, and routes around them so a session is not interrupted.',
          icon: 'shield',
        },
        {
          title: 'Edge-to-edge precision',
          text: 'Every pass follows the boundary with roughly 15 cm of adjustable offset, so borders are clean from the centre of the lawn out to the fence.',
          icon: 'precision-agriculture',
        },
        {
          title: 'Built for complex gardens',
          text: 'Tight corners, heavy tree cover and criss-cross layouts are handled without extra setup, because the mower judges its surroundings directly.',
          icon: 'wrench',
        },
        {
          title: 'No signal, no limits',
          text: 'Navigation is camera-based rather than satellite-based, so shaded and enclosed areas are mown like open lawn — no antenna, no dropouts.',
          icon: 'headset',
        },
        {
          title: 'Adjustable cutting height',
          text: 'One inch to three inches copes with fine turf and dense, tough grasses such as Bermuda, Zoysia, Kentucky Bluegrass and St. Augustine.',
          icon: 'rocket',
        },
      ],
      metric: {
        value: '0',
        label: 'Metres of boundary wire',
        note: 'Camera-based navigation removes the base station, the antenna and the wire — the three things that fail most often on a robotic mower.',
      },
      dataRows: [
        { label: 'Navigation', value: 'Triple-camera AI vision' },
        { label: 'Mapping', value: 'One-tap, automatic' },
        { label: 'Obstacle handling', value: 'AI vision + CMOS sensors' },
        { label: 'Edge cutting', value: 'About 15 cm adjustable' },
        { label: 'Cutting height', value: '1"–3"' },
      ],
      gallery: [
        {
          image: '/brand/media/categories-lawn-mower.webp',
          title: 'Wire-free installation',
          text: 'There is no boundary wire to bury and no base station to site — the mower learns the lawn itself.',
        },
        {
          image: '/brand/media/sunrise-8218442.webp',
          title: 'Scheduled, quiet mowing',
          text: 'Electric drive runs quietly enough for early starts, on a schedule you set once in the app.',
        },
        {
          image: '/brand/media/harvest-1543064.webp',
          title: 'Dense grass capability',
          text: 'Cutting height from 1 to 3 inches handles fine turf and tough warm-season grasses alike.',
        },
      ],
      specs: [
        {
          title: 'Navigation & control',
          items: [
            { label: 'Navigation', value: 'Triple-camera AI vision' },
            { label: 'Mapping', value: 'One-tap automatic mapping from the app' },
            { label: 'Obstacle avoidance', value: 'AI vision + CMOS sensors, real time' },
            { label: 'Edge cutting', value: 'Ride-on edge cutting, ~15 cm adjustable' },
            { label: 'Mowing modes', value: '3 (quick trim / standard / intensive)' },
            { label: 'Cutting height', value: '1"–3"' },
            { label: 'Control', value: 'Mobile app: schedules, zones, live status' },
            { label: 'Drive', value: 'Fully electric, zero emissions' },
          ],
        },
        {
          title: 'In the box',
          items: [
            { label: 'Robotic mower', value: '1' },
            { label: 'Base station', value: '1' },
            { label: 'Base station garage', value: '1' },
            { label: 'Power adapter', value: '1' },
            { label: 'Blades', value: '9' },
            { label: 'Blade screws', value: '9' },
            { label: 'Hex key', value: '1' },
            { label: 'Documentation', value: 'User manual + quick guide' },
          ],
        },
      ],
      kit: [
        { label: 'Robotic mower', qty: '1' },
        { label: 'Base station', qty: '1' },
        { label: 'Base station garage', qty: '1' },
        { label: 'Power adapter', qty: '1' },
        { label: 'Blades', qty: '9' },
        { label: 'Blade screws', qty: '9' },
        { label: 'Garage screws', qty: '4' },
        { label: 'Base station screws', qty: '8' },
        { label: 'Hex key', qty: '1' },
        { label: 'User manual', qty: '1' },
        { label: 'Quick guide', qty: '1' },
      ],
      overview: {
        heading: 'A mower that reads the lawn instead of following a wire',
        paragraphs: [
          'Three cameras and an on-board vision system build the map as the V600 works, so there is no boundary wire to bury, no RTK antenna to site and no satellite subscription to renew.',
          'Obstacles are recognised as they appear — toys, hoses, pets — and the route adjusts in real time. Cutting height runs from 1 to 3 inches, with an edge pass that leaves about 15 cm of adjustable offset along borders.',
        ],
      },
      metrics: [
        { value: '0', unit: 'm', label: 'Boundary wire' },
        { value: '3', unit: 'cameras', label: 'AI vision array' },
        { value: '1–3', unit: 'in', label: 'Cutting height' },
        { value: '15', unit: 'cm', label: 'Edge offset' },
      ],
      engineering: {
        image: '/brand/media/categories-lawn-mower.webp',
        heading: 'Vision-first navigation, nothing to install',
        lead: 'Because the mower judges its surroundings directly, shaded, enclosed and signal-poor parts of the garden are mown like open lawn.',
        items: [
          {
            name: 'Navigation',
            value: 'Triple-camera AI vision',
            detail: 'No RTK antenna and no satellite fix required, so tree cover and buildings are not a problem.',
          },
          {
            name: 'Mapping',
            value: 'One-tap automatic',
            detail: 'A single tap in the app builds an accurate map and an efficient mowing route.',
          },
          {
            name: 'Obstacle handling',
            value: 'AI vision + CMOS',
            detail: 'Toys, hoses and pets are recognised as they appear and steered around in real time.',
          },
          {
            name: 'Edge cutting',
            value: '~15 cm adjustable',
            detail: 'A dedicated edge pass follows the border, so no trimming is needed afterwards.',
          },
          {
            name: 'Mowing modes',
            value: '3',
            detail: 'Quick trim, standard cut or intensive mow, matched to how fast the lawn is growing.',
          },
          {
            name: 'Cutting height',
            value: '1"–3"',
            detail: 'Copes with fine turf and dense warm-season grasses such as Bermuda and Zoysia.',
          },
          {
            name: 'Control',
            value: 'Mobile app',
            detail: 'Schedules, zones and live status, with no boundary wire to reconfigure.',
          },
          {
            name: 'Drive',
            value: 'Fully electric',
            detail: 'Zero emissions and far lower running costs than a petrol ride-on.',
          },
        ],
      },
      applications: [
        {
          title: 'Complex gardens',
          desc: 'Tight corners, heavy tree cover and criss-cross layouts, with no extra setup.',
        },
        {
          title: 'Shaded or enclosed lawns',
          desc: 'Camera navigation keeps working where satellite-based mowers lose position.',
        },
        {
          title: 'Scheduled quiet mowing',
          desc: 'Electric drive is quiet enough for early starts, on a schedule set once in the app.',
        },
        {
          title: 'Mixed grass types',
          desc: 'One inch to three inches covers fine turf and tough warm-season grasses.',
        },
      ],
      faq: [
        {
          q: 'Does it need a boundary wire or RTK antenna?',
          a: 'No. The V600 navigates with three cameras and on-board AI, so nothing is buried and no base station is required.',
        },
        {
          q: 'What happens in heavy shade?',
          a: 'Navigation is camera-based rather than satellite-based, so shaded and enclosed areas are mown the same way as open lawn.',
        },
        {
          q: 'How does it handle toys and pets?',
          a: 'AI vision and CMOS sensors recognise obstacles in real time and route around them, then resume the mowing pattern.',
        },
        {
          q: 'Can it cut right up to the fence?',
          a: 'An edge pass leaves roughly 15 cm of adjustable offset along borders, which removes the need for a trimmer pass.',
        },
      ],
      notes: [
        'Specifications are manufacturer figures and may change without notice.',
        'Mapping, cutting height and edge offset depend on lawn shape, grass type and app settings.',
        'Displayed price includes GST. Freight is quoted separately.',
      ],
    },
  },
  {
    handle: 'v1000',
    code: 'TerraMow V1000',
    name: 'Auto Mower',
    category: 'lawn-mower',
    categoryLabel: 'Lawn Mower',
    image: '/brand/media/categories-lawn-mower.webp',
    tagline:
      'Triple-camera AI vision mowing with a larger working area — no boundary wire, no RTK antenna, no signal dropouts.',
    badges: [
      'AI vision',
      'Triple camera',
      'Auto mapping',
      'App control',
      'Obstacle avoidance',
      'Edge cutting',
    ],
    why: [
      'A triple-camera AI vision system reads the lawn in real time, so the V1000 navigates and mows without boundary wire, RTK antenna or satellite signal',
      'One tap in the app is all the setup it needs — the mower builds an accurate map of your lawn by itself',
      'AI vision and CMOS sensors spot toys, hoses, pets and other obstacles as they appear, then steer around them so a mowing session is never interrupted',
      'Cuts right along the border with roughly 15 cm of adjustable offset, leaving a finish that needs no tidying up afterwards',
      'Three mowing modes — a quick trim, a standard cut or an intensive mow — matched to how fast your lawn is growing',
      'Fully electric drive means no petrol, no emissions and far lower running costs than a ride-on mower',
    ],
    features: [
      'Triple-camera AI vision, 360° awareness',
      'Wire-free: no boundary wire, no RTK antenna',
      'One-tap app mapping and scheduling',
      'Real-time obstacle avoidance',
      'Cutting height 1"–3"',
      'Three mowing modes: trim, standard, intensive',
      'Edge cutting with about 15 cm adjustable offset',
    ],
    isNew: true,
    landing: {
      lead: 'The larger V1000 keeps the wire-free triple-camera platform and adds headroom for bigger lawns, with the same one-tap mapping and real-time obstacle avoidance.',
      stats: [
        { value: '0 m', label: 'Boundary wire' },
        { value: '3', label: 'AI cameras' },
        { value: '1"–3"', label: 'Cutting height' },
        { value: '15 cm', label: 'Edge offset' },
        { value: 'Larger', label: 'Working area' },
      ],
    },
  },
]

/* -------------------------------------------------------------------------- */
/* Shaping                                                                    */
/* -------------------------------------------------------------------------- */

function toImage(url: string, alt: string): ShopImage {
  return { url, altText: alt, width: 1200, height: 1200 }
}

/**
 * Seeds are marketing content only — pricing and purchasability always come
 * from Shopify. Preview products are therefore not sellable and carry no
 * price, so the storefront renders a "request a quote" state instead of ever
 * showing a stale number.
 */
function toProduct(seed: Seed): ShopProduct {
  const image = toImage(seed.image, `${seed.code} ${seed.name}`)
  const variantId = `gid://shopify/ProductVariant/fallback-${seed.handle}`

  const variant: ShopVariant = {
    id: variantId,
    title: 'Default Title',
    availableForSale: false,
    quantityAvailable: null,
    price: null,
    compareAtPrice: null,
    selectedOptions: [{ name: 'Title', value: 'Default Title' }],
    image,
  }

  const tags: string[] = [seed.category]
  if (seed.best) tags.push('Best Seller')
  if (seed.isNew) tags.push('New Release')

  return {
    id: `gid://shopify/Product/fallback-${seed.handle}`,
    handle: seed.handle,
    title: `${seed.code} — ${seed.name}`,
    description: seed.tagline,
    descriptionHtml: `<p>${seed.tagline}</p>`,
    productType: seed.categoryLabel,
    vendor: 'Vesper',
    tags,
    availableForSale: false,
    featuredImage: image,
    images: [image],
    priceRange: null,
    compareAtPrice: null,
    variants: [variant],
  }
}

export function fallbackProducts(): ShopProduct[] {
  return SEEDS.map(toProduct)
}

export function fallbackProduct(handle: string): ShopProduct | null {
  const seed = SEEDS.find((item) => item.handle === handle)
  return seed ? toProduct(seed) : null
}

export function fallbackCategories(): CatalogCategory[] {
  return CATEGORY_META
}

/**
 * Landing content is assembled from the seed so that every product renders a
 * coherent page even when only the basics are known. Rich sections are skipped
 * by the page whenever their array is empty.
 */
const DEFAULT_NOTES = [
  'Specifications are manufacturer figures and may change without notice.',
  'Images are indicative; final configuration may vary.',
  'Displayed price includes GST. Freight is quoted separately.',
]

/** "50°" → { value: "50", unit: "°" }, "1–3 in" → { value: "1–3", unit: "in" } */
function splitStat(raw: string): { value: string; unit: string } {
  const match = raw.trim().match(/^([\d.,/\u2013-]+)\s*(.*)$/)
  if (!match) return { value: raw.trim(), unit: '' }
  return { value: (match[1] ?? raw.trim()).trim(), unit: (match[2] ?? '').trim() }
}

function buildFaq(landing: LandingContent): LandingFaq[] {
  const items: LandingFaq[] = []

  if (landing.features.length) {
    items.push({
      q: `What does the ${landing.code} include?`,
      a: `Standard scope covers ${landing.features.slice(0, 4).join('; ')}. Contact us for the exact configuration quoted.`,
    })
  }

  items.push({
    q: 'Is freight included?',
    a: 'Freight is quoted per order once we confirm your location and access requirements.',
  })

  items.push({
    q: 'What warranty applies?',
    a: 'All Vesper equipment carries a standard 12-month warranty, with extended options available. Spare parts typically ship within 3–7 business days in Australia.',
  })

  if (landing.specs.length) {
    items.push({
      q: 'Where can I see the full specification?',
      a: `The complete ${landing.code} specification is listed in the specifications section on this page.`,
    })
  }

  return items
}

/**
 * Fills the dedicated-landing blocks for products that only have the shorter
 * seed data, so every product renders the same page structure without
 * inventing numbers it does not have.
 */
export function withDedicatedDefaults(landing: LandingContent, fallbackImage: string): LandingContent {
  const overview =
    landing.overview ??
    (landing.why.length
      ? { heading: `${landing.code} ${landing.name}`, paragraphs: landing.why.slice(0, 2) }
      : { heading: `${landing.code} ${landing.name}`, paragraphs: [landing.tagline] })

  const metrics =
    landing.metrics && landing.metrics.length
      ? landing.metrics
      : landing.stats.slice(0, 4).map((stat) => {
          const parts = splitStat(stat.value)
          return { value: parts.value, unit: parts.unit, label: stat.label }
        })

  const engineering =
    landing.engineering ??
    (landing.specs[0]
      ? {
          image: landing.gallery[0]?.image || landing.heroImage || fallbackImage,
          heading: `${landing.code} engineering`,
          lead: landing.tagline,
          items: landing.specs[0].items.slice(0, 6).map((item) => ({
            name: item.label,
            value: item.value,
            detail: '',
          })),
        }
      : null)

  const applications =
    landing.applications && landing.applications.length
      ? landing.applications
      : landing.scenarios.length
        ? landing.scenarios.map((item) => ({ title: item.title, desc: item.text }))
        : landing.highlights.length
          ? landing.highlights.map((item) => ({ title: item.title, desc: item.text }))
          : landing.features.slice(0, 4).map((item) => ({ title: item, desc: '' }))

  return {
    ...landing,
    overview,
    metrics,
    engineering,
    applications,
    faq: landing.faq && landing.faq.length ? landing.faq : buildFaq(landing),
    notes: landing.notes && landing.notes.length ? landing.notes : DEFAULT_NOTES,
    performance: landing.performance ?? null,
  }
}

export function fallbackLanding(handle: string): LandingContent | null {
  const seed = SEEDS.find((item) => item.handle === handle)
  if (!seed) return null

  const base: LandingContent = {
    code: seed.code,
    name: seed.name,
    category: seed.category,
    categoryLabel: seed.categoryLabel,
    tagline: seed.tagline,
    lead: seed.tagline,
    badges: seed.badges,
    stats: [],
    highlights: [],
    why: seed.why,
    features: seed.features,
    metric: null,
    dataRows: [],
    gallery: [],
    safety: [],
    compare: null,
    scenarios: [],
    specs: [],
    kit: [],
    video: null,
    heroImage: seed.image,
    galleryImages: [seed.image],
  }

  return withDedicatedDefaults({ ...base, ...seed.landing }, seed.image)
}
