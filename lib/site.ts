export const FOUNDED = 1991;
export const site = {
  name: "Waqar Associates",
  tagline: "Planning the city before it's built",
  intro: "Since 1991, Waqar Associates has turned raw land into developed towns. From our base in Islamabad we work across Pakistan: town planning, asphalt roads, underground utilities, street lighting, society gates, bridges and modern commercial buildings.",
  stats: [
    { label: "Established", value: FOUNDED, plain: true },
    { label: "Years in business", value: new Date().getFullYear() - FOUNDED },
    { label: "Projects delivered", value: 40, suffix: "+" }, // PLACEHOLDER
    { label: "Acres developed", value: 1200, suffix: "+" }, // PLACEHOLDER
  ],
  expertise: [
    { title: "Land Development", body: "Raw land turned into serviced, ready-to-build plots: grading, access, boundaries and approvals." },
    { title: "Town Planning", body: "Sector layouts, road hierarchies and land-use plans for new towns and housing societies." },
    { title: "Asphalt & Roadworks", body: "Arterial roads and internal streets, laid on a proper base with drainage." },
    { title: "Underground Utilities", body: "Water, sewerage, storm drainage and electrical ducts, laid before the roads go down." },
    { title: "Street Lighting", body: "Light poles, fixtures and power feeds for roads, parks and entrances." },
    { title: "Society Gates", body: "Design and construction of society entrances, with security, signage and landscaping." },
    { title: "Bridges", body: "Bridges and crossings that connect developments to the wider road network." },
    { title: "Commercial Buildings", body: "Modern commercial buildings and units, currently under construction." },
  ],
  sectors: ["Town Development", "Roads & Infrastructure", "Dams", "Buildings", "Airfields", "Society Gates"],
  leadership: [
    { name: "NajeebUllah Cheema", role: "Chief Executive Officer", photo: "/ceo.png", bio: "As Chief Executive Officer, NajeebUllah Cheema sets the direction of Waqar Associates and leads its growth across Pakistan. He oversees the company's major town development and infrastructure projects, and keeps the company to the standard of quality and honest dealing it has worked by since 1991." },
    { name: "ZabiUllah Cheema", role: "Managing Director", photo: "/md.png", bio: "As Managing Director, ZabiUllah Cheema runs the company's day-to-day operations, from planning and site execution to scheduling, budgets and client relationships. He makes sure every project, from roads and utilities to commercial buildings, is delivered on time and to specification." },
  ],
  email: "zabiullahcheema00@gmail.com",
  phone: "0300 2179167 / 0335 0888999",
  address: "Plot 12 A, First Floor, Monarch Heights, Jinnah Garden, Islamabad",
};
export const nav = [
  { href: "/about", label: "Company" }, { href: "/expertise", label: "Expertise" },
  { href: "/projects", label: "Projects" }, { href: "/contact", label: "Contact" },
];
export type Project = {
  slug: string; name: string; sector: string; location: string;
  status?: "Under construction" | "Completed"; year?: string; area?: string; units?: string; blurb?: string;
  image?: string;      // cover photo, shown on cards and at the top of the project page
  gallery?: string[];  // extra photos, shown in a grid on the project page
};
export const projects: Project[] = [
  { slug: "motorway-sialkot-lahore", name: "Motorway Sialkot-Lahore", sector: "Roads & Infrastructure", location: "Sialkot to Lahore", 
    image: "/projects/motorway/cover.jpg", gallery: [] },
  { slug: "mangla-dam-capacity-increment", name: "Mangla Dam Capacity Increment", sector: "Dams", location: "Mangla" ,
    image: "/projects/mangla/cover.jpg", gallery: []
  },
  { slug: "park-view-city-downtown", name: "Park View City Downtown", sector: "Town Development", location: "Park View City" ,
    image: "/projects/pvcdt/cover.jpeg", gallery: []
  },
  { slug: "park-view-city-sector-f-sector-d", name: "Park View City Sector F Sector D", sector: "Town Development", location: "Park View City",
    image: "/projects/pvcsf/cover.jpg", gallery: []
   },
  { slug: "park-view-city-main-boulevard", name: "Park View City Main Boulevard", sector: "Roads & Infrastructure", location: "Park View City", 
    image: "/projects/pvc/cover.jpg", gallery: []
  },
  { slug: "dha-phase-4-gate-rvs", name: "DHA Phase 4 Gate RVS", sector: "Society Gates", location: "DHA Phase 4",
    image: "/projects/rvs/cover.jpg", gallery: []
   },
  { slug: "bwc-infrastructure", name: "BWC Infrastructure", sector: "Roads & Infrastructure", location: "Pakistan",
    image: "/projects/bwc/cover.jpg", gallery: []
   },
  { slug: "jinnah-garden-executive-block", name: "Jinnah Garden Executive Block", sector: "Roads & Infrastructure ", location: "Jinnah Garden, Islamabad",
    image: "/projects/jinnah/cover.png", gallery: []
   },
  { slug: "al-shifa-eye-trust-hospital-lahore", name: "Al Shifa Eye Trust Hospital Lahore", sector: "Buildings", location: "Lahore" ,
    image: "/projects/shifalhr/cover.jpg", gallery: []
  },
  { slug: "al-shifa-eye-trust-hospital-rawalpindi-renovation", name: "Al Shifa Eye Trust Hospital Rawalpindi Renovation", sector: "Buildings", location: "Rawalpindi",
    image: "/projects/shifaisb/cover.jpg", gallery: []
   },
  { slug: "mohmand-dam", name: "Mohmand Dam", sector: "Dams", location: "Mohmand",
    image: "/projects/mohmand/cover.jpg", gallery: []
   },
  { slug: "interior-sindh", name: "Interior Sindh", sector: "Roads & Infrastructure", location: "Sindh",
    image: "/projects/sindh/cover.jpg", gallery: []
   },
  { slug: "karachi-airport-runway", name: "Karachi Airport Runway", sector: "Airfields", location: "Karachi",
    image: "/projects/airport/cover.jpg", gallery: []
   },
  { slug: "fatehjung-airbase", name: "Fatehjung Airbase", sector: "Airfields", location: "Fateh Jang",
    image: "/projects/airbase/cover.jpeg", gallery: []
   },
  { slug: "monarch-heights-jinnah-garden", name: "Monarch Heights Jinnah Garden", sector: "Buildings", location: "Jinnah Garden, Islamabad",
    image: "/projects/monarch/cover.png", gallery: []
   },
];