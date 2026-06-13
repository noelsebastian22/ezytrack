type NavLink = {
  label: string;
  href: string;
};

type ProcessStep = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
};

type HardwareSpec = {
  title: string;
  description: string;
};

type SoftwareTab = {
  id: string;
  label: string;
  description: string;
  imageSrc: string;
};

type UseCaseTab = {
  id: string;
  label: string;
  headline: string;
  description: string;
  features: string[];
  ctaText: string;
  imageSrc: string;
};

type FeatureMockup = {
  id: string;
  label: string;
  value: string;
  iconName: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
};

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type SiteContent = {
  global: {
    companyName: string;
    companyGroup: string;
    loginUrl: string;
    contactEmail: string;
    contactPhone: string;
  };
  navigation: NavLink[];
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    backgroundImage: string;
  };
  process: {
    title: string;
    steps: ProcessStep[];
  };
  hardwareBar: {
    title: string;
    subtitle: string;
    specs: HardwareSpec[];
  };
  benefitsSplit: {
    title: string;
    paragraphs: string[];
    ctaText: string;
    imageSrc: string;
    imageAlt: string;
  };
  featuresChecklist: {
    title: string;
    subtitle: string;
    items: string[];
    ctaText: string;
    mockups: FeatureMockup[];
  };
  softwareShowcase: {
    title: string;
    description: string;
    tabs: SoftwareTab[];
  };
  useCases: {
    title: string;
    tabs: UseCaseTab[];
  };
  gallery: {
    title: string;
    subtitle: string;
    images: GalleryImage[];
  };
  footer: {
    description: string;
    columns: FooterColumn[];
    copyright: string;
  };
};

export const siteContent: SiteContent = {
  global: {
    companyName: "Ezytrack",
    companyGroup: "A Midas Touch Strategies Group Business",
    loginUrl: "https://ezytrackaus.telematics.guru/",
    contactEmail: "sales@ezytrack.com.au",
    contactPhone: "1300 000 000",
  },

  navigation: [
    { label: "Features", href: "#features" },
    { label: "Hardware", href: "#hardware" },
    { label: "Solutions", href: "#solutions" },
    { label: "Gallery", href: "#gallery" },
  ],

  hero: {
    headline: "Market-leading GPS fleet tracking for your business",
    subheadline:
      "Empower your operations with real-time visibility, advanced reporting, and integrated dashcam solutions. Backed by 25+ years of industry expertise.",
    primaryCta: "Get a quote",
    secondaryCta: "Login",
    backgroundImage:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80",
  },

  process: {
    title: "The step-by-step process behind our fleet tracking system",
    steps: [
      {
        id: "step-1",
        title: "Quick & easy installation",
        description:
          "Choose between simple plug-and-play OBD devices or discreet hardwired installations handled by our nationwide network of professionals.",
        imageSrc:
          "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "step-2",
        title: "Instant monitoring",
        description:
          "Access your fleet's live data immediately via our intuitive web platform and mobile app. No complex training required.",
        imageSrc:
          "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "step-3",
        title: "Optimise & scale operations",
        description:
          "Use powerful reporting tools to cut fuel costs, improve driver safety, and ensure compliance across your entire fleet.",
        imageSrc:
          "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  hardwareBar: {
    title: "Our core GPS fleet tracker",
    subtitle: "Built for Australian conditions. Reliable, precise, and secure.",
    specs: [
      { title: "4G/5G Connectivity", description: "Lightning-fast data transfer" },
      { title: "Rugged Design", description: "IP67 water and dust resistant" },
      { title: "Battery Backup", description: "Internal power for tamper alerts" },
      { title: "Driver ID", description: "Compatible with RFID and iButton" },
    ],
  },

  benefitsSplit: {
    title: "How our fleet tracking can help your business",
    paragraphs: [
      "Whether you manage five vans or a heavy haulage fleet of fifty, Ezytrack provides the critical data you need to make informed decisions and protect your assets.",
      "Our system tracks vehicle location, speed, harsh braking, and idling times. This allows you to identify inefficiencies, reduce fuel consumption, and coach your drivers to operate more safely.",
      "Integrated directly with Telematics Guru, our solution offers unparalleled reliability and uptime, ensuring you are never left in the dark about your fleet's performance.",
    ],
    ctaText: "Discover the benefits",
    imageSrc:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Fleet vehicle equipped with GPS tracking technology",
  },

  featuresChecklist: {
    title: "Market-leading features built for growth",
    subtitle: "Everything you need to manage your vehicles efficiently.",
    items: [
      "Real-time visibility: See your vehicles moving live on the map.",
      "Route replay & history: Review up to 12 months of detailed trip data.",
      "Custom geofencing: Get instant alerts when vehicles enter or exit specific zones.",
      "Driver behaviour scoring: Identify harsh acceleration, braking, and cornering.",
      "Automated maintenance: Schedule servicing based on actual engine hours or mileage.",
      "Integrated Dashcams: High-definition video evidence for accident resolution.",
    ],
    ctaText: "Get a quote",
    mockups: [
      { id: "mockup-1", label: "Vehicles online", value: "42", iconName: "MapPin", position: { top: "0.75rem", left: "0.75rem" } },
      { id: "mockup-2", label: "Avg speed", value: "87 km/h", iconName: "Gauge", position: { top: "0.75rem", right: "0.75rem" } },
      { id: "mockup-3", label: "Active alerts", value: "3", iconName: "Bell", position: { bottom: "0.75rem", left: "0.75rem" } },
    ],
  },

  softwareShowcase: {
    title: "Simple to use fleet tracking software",
    description:
      "Our platform is designed for clarity. Access powerful analytics without the steep learning curve.",
    tabs: [
      {
        id: "tab-live-map",
        label: "Live Map",
        description:
          "Pinpoint your entire fleet in real-time. View current speeds, ignition status, and driver details at a glance.",
        imageSrc:
          "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "tab-reports",
        label: "Automated Reports",
        description:
          "Generate comprehensive reports on fuel usage, timesheets, and vehicle utilization. Export to PDF or Excel instantly.",
        imageSrc:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "tab-alerts",
        label: "Custom Alerts",
        description:
          "Stay informed with instant SMS or email notifications for speeding, out-of-hours usage, or device tampering.",
        imageSrc:
          "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },

  useCases: {
    title: "Telematics for all businesses",
    tabs: [
      {
        id: "usecase-fleet",
        label: "Fleet Tracking",
        headline: "Complete control over your vehicles",
        description:
          "From tradesmen vans to heavy haulage, monitor your assets to improve routing, reduce unauthorized usage, and streamline dispatching.",
        features: ["Live location tracking", "Route optimization", "Driver identification"],
        ctaText: "Explore Fleet Tracking",
        imageSrc:
          "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "usecase-asset",
        label: "Asset Tracking",
        headline: "Protect your high-value equipment",
        description:
          "Keep tabs on non-powered assets like trailers, generators, and yellow iron. Our battery-powered trackers offer years of life on a single charge.",
        features: ["Geofence alerts", "Long battery life", "Rugged enclosures"],
        ctaText: "Explore Asset Tracking",
        imageSrc:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "usecase-dashcam",
        label: "Dashcams",
        headline: "See exactly what happened",
        description:
          "Protect your drivers and your business from false claims. Our connected dashcams automatically upload harsh events to the cloud.",
        features: ["HD video recording", "Harsh event triggers", "In-cab coaching"],
        ctaText: "Explore Dashcams",
        imageSrc:
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  gallery: {
    title: "Explore our GPS tracking solutions",
    subtitle: "See Ezytrack technology in action across Australian roads and industries.",
    images: [
      {
        id: "gal-1",
        src: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80",
        alt: "Commercial bus fleet parked",
      },
      {
        id: "gal-2",
        src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80",
        alt: "Semi-trucks driving on highway",
      },
      {
        id: "gal-3",
        src: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=80",
        alt: "Logistics warehouse loading dock",
      },
      {
        id: "gal-4",
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
        alt: "Construction site equipment",
      },
      {
        id: "gal-5",
        src: "https://images.unsplash.com/photo-1554744512-d6c603f27c54?auto=format&fit=crop&w=1000&q=80",
        alt: "Dashboard analytics screen",
      },
      {
        id: "gal-6",
        src: "https://images.unsplash.com/photo-1482029255085-35a4a48b7084?auto=format&fit=crop&w=1000&q=80",
        alt: "Driver navigating with GPS",
      },
    ],
  },

  footer: {
    description:
      "Ezytrack, part of the Midas Touch Strategies Group, delivers premium GPS tracking and dashcam solutions to businesses across Australia. Backed by 25+ years of experience.",
    columns: [
      {
        title: "Products",
        links: [
          { label: "Fleet Tracking", href: "#" },
          { label: "Asset Tracking", href: "#" },
          { label: "Dashcams", href: "#" },
          { label: "Software Platform", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "#" },
          { label: "Contact", href: "#" },
          { label: "Partner Program", href: "#" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Customer Login", href: "https://ezytrackaus.telematics.guru/" },
          { label: "Help Centre", href: "#" },
          { label: "Installation Guides", href: "#" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Ezytrack. All rights reserved.`,
  },
};
