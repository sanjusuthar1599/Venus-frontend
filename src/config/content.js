import {
  UserGroupIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  HeartIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

export const processSteps = [
  {
    num: "01",
    title: "Consultation",
    desc: "We listen to your vision, lifestyle, and budget to understand your needs and aspirations for the space.",
    icon: UserGroupIcon,
  },
  {
    num: "02",
    title: "Concept & Design",
    desc: "Mood boards, 3D renders, and material selections brought to life so you can see your space before we build.",
    icon: PaintBrushIcon,
  },
  {
    num: "03",
    title: "Planning & Execution",
    desc: "Detailed planning, vendor coordination, and on-site supervision ensure quality at every stage.",
    icon: WrenchScrewdriverIcon,
  },
  {
    num: "04",
    title: "Handover",
    desc: "Final styling, walkthrough, and support for a seamless move-in experience you'll love.",
    icon: SparklesIcon,
  },
];

export const coreValues = [
  { title: "Creativity", body: "Fresh ideas tailored to how you live and work.", icon: LightBulbIcon },
  { title: "Quality", body: "Materials and craftsmanship that stand the test of time.", icon: ShieldCheckIcon },
  { title: "Integrity", body: "Honest timelines, transparent pricing, no surprises.", icon: HandRaisedIcon },
  { title: "Client-First", body: "Your brief guides every decision we make.", icon: HeartIcon },
];

export const teamMembers = [
  {
    name: "Mr. Prakash Tarpasha",
    role: "Founder",
    image: "/venus_founder.png",
  },
  {
    name: "Mr. Mukesh Tarpasha",
    role: "Interior Designer and Project Manager",
    image: "/mukesh.png", 
  },
  {
    name: "Design Consultant",
    role: "Commercial Projects",
    image: "/service.jpg",
  },
];

export const blogPosts = [
  {
    slug: "interior-design-trends-2024",
    title: "Top 10 Interior Design Trends For 2024",
    excerpt:
      "From warm neutrals to biophilic accents — discover the trends shaping homes and offices this year.",
    image: "/about.png",
    date: "March 12, 2024",
  },
  {
    slug: "modular-kitchen-guide",
    title: "The Complete Guide To Modular Kitchens",
    excerpt:
      "Layout, storage, finishes, and workflow — everything you need before your kitchen renovation begins.",
    image: "/MODULAR_KITCHEN.avif",
    date: "February 8, 2024",
  },
  {
    slug: "small-space-design",
    title: "Maximizing Small Spaces With Smart Design",
    excerpt:
      "Clever storage, light, and furniture choices that make compact homes feel open and luxurious.",
    image: "/Living-room.avif",
    date: "January 22, 2024",
  },
  {
    slug: "office-interior-tips",
    title: "Creating Productive Office Interiors",
    excerpt:
      "Acoustics, lighting, and layout principles for workspaces that inspire focus and collaboration.",
    image: "/EXECUTIVE_CABINS.jpg",
    date: "December 5, 2023",
  },
];

export const serviceDetails = [
  {
    title: "Residential Design",
    desc: "Full-home and room-by-room interiors — kitchens, bedrooms, living spaces, and wardrobes designed around how you live.",
    image: "/Living-room.avif",
  },
  {
    title: "Commercial Design",
    desc: "Offices, retail, and hospitality spaces with practical timelines, premium finishes, and brand-aligned aesthetics.",
    image: "/EXECUTIVE_CABINS.jpg",
  },
  {
    title: "Modular & Custom",
    desc: "Modular kitchens, wardrobes, and custom cabinetry with ergonomic layouts and durable hardware.",
    image: "/MODULAR_KITCHEN.avif",
  },
  {
    title: "Styling & Decor",
    desc: "Finishing touches — furniture, art, lighting, and accessories that complete your space with personality.",
    image: "/Bedroom.avif",
  },
  {
    title: "Turnkey Projects",
    desc: "End-to-end design and execution with vendor coordination, site supervision, and final styling.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  },
];

export const fallbackProjects = [
  {
    id: "luxury-villa",
    title: "Luxury Villa",
    tag: "Modern Design",
    category: "residential",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "penthouse",
    title: "Penthouse Interior",
    tag: "Living & Lounge",
    category: "residential",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "corporate-office",
    title: "Corporate Office",
    tag: "Minimal & Functional",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "elegant-apartment",
    title: "Elegant Apartment",
    tag: "Bedroom Suite",
    category: "residential",
    image: "https://images.unsplash.com/photo-1600210492493-0946911128ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "retail-space",
    title: "Retail Space",
    tag: "Modern & Welcoming",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "modular-kitchen",
    title: "Modular Kitchen",
    tag: "Smart & Functional",
    category: "modular",
    image: "/MODULAR_KITCHEN.avif",
  },
];

export const portfolioFilters = ["All", "Residential", "Commercial", "Modular"];

export const portfolioFilterMap = {
  All: null,
  Residential: "residential",
  Commercial: "commercial",
  Modular: "modular",
};

export const budgetFilters = [
  "Under 10 Lacs",
  "10–20 Lacs",
  "20–30 Lacs",
  "Above 30 Lacs",
];

export const budgetFilterMap = {
  "Under 10 Lacs": "under-10",
  "10–20 Lacs": "10-20",
  "20–30 Lacs": "20-30",
  "Above 30 Lacs": "above-30",
};

export const budgetProjects = [
  {
    id: "luxury-3bhk",
    title: "Luxury 3BHK Apartment",
    tag: "Modern & Cozy",
    budget: "under-10",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "modern-white-apartment",
    title: "Modern White Apartment",
    tag: "Modern & Cozy",
    budget: "under-10",
    image: "https://img.magnific.com/free-photo/modern-luxury-bedroom-suite-bathroom-with-working-table_105762-1788.jpg?t=st=1782216088~exp=1782219688~hmac=01627aabcfe9584ae9059a72c2cc98a08a796e2bf7855450805646fcdb6f0b3a&w=1480",
  },
  {
    id: "elegant-interiors",
    title: "Elegant Interiors",
    tag: "Modern & Sophisticated",
    budget: "under-10",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "premium-client",
    title: "Premium Client Interior",
    tag: "Modern & Luxurious",
    budget: "under-10",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2bhk-apartment",
    title: "2BHK Apartment",
    tag: "Warm & Cozy",
    budget: "under-10",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "duplex-interior",
    title: "Duplex Interior",
    tag: "Warm & Cozy",
    budget: "under-10",
    image: "/Living-room.avif",
  },
  {
    id: "dining-room",
    title: "Dining Room",
    tag: "Elegant & Timeless",
    budget: "under-10",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "luxury-modern-home",
    title: "Luxury Modern Home",
    tag: "Elegant & Sophisticated",
    budget: "10-20",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "modular-kitchen-pack",
    title: "Modular Kitchen",
    tag: "Smart & Functional",
    budget: "10-20",
    image: "/MODULAR_KITCHEN.avif",
  },
  {
    id: "master-bedroom",
    title: "Master Bedroom Suite",
    tag: "Calm & Restful",
    budget: "10-20",
    image: "/Bedroom.avif",
  },
  {
    id: "corporate-cabin",
    title: "Executive Cabin",
    tag: "Premium Workspace",
    budget: "20-30",
    image: "/EXECUTIVE_CABINS.jpg",
  },
  {
    id: "retail-fitout",
    title: "Retail Space",
    tag: "Modern & Welcoming",
    budget: "20-30",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "penthouse-luxury",
    title: "Luxury Penthouse",
    tag: "Elegant & Sophisticated",
    budget: "above-30",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "villa-interior",
    title: "Luxury Villa",
    tag: "Modern Design",
    budget: "above-30",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
];
