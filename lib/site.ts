// All copy lives here. Items marked PLACEHOLDER are invented and should be replaced.
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
    { name: "ZabiUllah Cheema", role: "Managing Director", photo: "/md.png", bio: "As Managing Director, ZabiUllah Cheema runs the company's day-to-day operations, from planning and site execution to scheduling, budgets and client relationships. He makes sure every project, from roads and utilities to commercial buildings, is delivered on time and to specification." },
    { name: "NajeebUllah Cheema", role: "Chief Executive Officer", photo: "/ceo.png", bio: "As Chief Executive Officer, NajeebUllah Cheema sets the direction of Waqar Associates and leads its growth across Pakistan. He oversees the company's major town development and infrastructure projects, and keeps the company to the standard of quality and honest dealing it has worked by since 1991." },
    { name: "Ali Hamza Cheema", role: "Director Finance", photo: "/fm.png", bio: "Responsible for the company's accounts, budgeting and financial planning, the Director Finance keeps project costs under control, manages payments to suppliers and subcontractors, and makes sure every project is financially sound from the first estimate to final handover." },
  ],
  email: "zabiullahcheema00@gmail.com",
  phone: "+92 300 2179167 / +92 335 0888999",
  address: "Plot 12 A, First Floor, Monarch Heights, Jinnah Garden, Islamabad",
};
export const nav = [
  { href: "/about", label: "Company" }, { href: "/expertise", label: "Expertise" },
  { href: "/projects", label: "Projects" }, { href: "/contact", label: "Contact" },
];
// Only slug, name, sector and location are required. Optional fields appear on the
// project page when filled in, e.g.  status: "Completed", year: "2024",
// area: "18 km", units: "Two lanes", blurb: "A short description.",
// image: "/projects/mohmand-dam/cover.jpg",
// gallery: ["/projects/mohmand-dam/1.jpg", "/projects/mohmand-dam/2.jpg"]
export type Project = {
  slug: string;
  name: string;
  sector: string;
  location: string;
  status?: "Under construction" | "Completed";
  year?: string;
  area?: string;
  units?: string;
  blurb?: string;
  description?: string;
  image?: string;
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "mangla-dam-capacity-increment",
    name: "Mangla Dam Capacity Increment",
    sector: "Dams",
    location: "Mangla",
    description:
      "A major water infrastructure project focused on increasing the storage capacity of Mangla Dam. The project represents an important contribution to water resource management, reservoir optimization, and Pakistan's long-term irrigation and water supply needs.",
    image: "/projects/mangla/cover.jpg",
    gallery: []
  },
  {
    slug: "park-view-city-downtown",
    name: "Park View City Downtown",
    sector: "Town Development",
    location: "Park View City",
    description:
      "A planned urban development project designed to support a modern community environment. Park View City Downtown emphasizes organized development, accessibility, and the integration of essential infrastructure to facilitate residential and commercial growth.",
    image: "/projects/pvcdt/cover.jpeg",
    gallery: []
  },
  {
    slug: "park-view-city-sector-f-sector-d",
    name: "Park View City Sector F Sector D",
    sector: "Town Development",
    location: "Park View City",
    description:
      "An urban development project focused on the planning and development of designated sectors within Park View City. The project contributes to an organized community layout, supporting infrastructure, and a structured environment for future residential development.",
    image: "/projects/pvcsf/cover.jpg",
    gallery: []
  },
  {
    slug: "park-view-city-main-boulevard",
    name: "Park View City Main Boulevard",
    sector: "Roads & Infrastructure",
    location: "Park View City",
    description:
      "A key road infrastructure project supporting connectivity within Park View City. The Main Boulevard serves as an important circulation corridor, helping improve accessibility between development areas and supporting the efficient movement of residents and visitors.",
    image: "/projects/pvc/cover.jpg",
    gallery: []
  },
  {
    slug: "dha-phase-4-gate-rvs",
    name: "DHA Phase 4 Gate RVS",
    sector: "Society Gates",
    location: "DHA Phase 4",
    description:
      "A community entrance development project at DHA Phase 4, focused on creating a defined and visually distinctive entry point. The project reflects the importance of entrance infrastructure in establishing a welcoming identity while supporting organized access to the surrounding community.",
    image: "/projects/rvs/cover.jpg",
    gallery: []
  },
  {
    slug: "bwc-infrastructure",
    name: "BWC Infrastructure",
    sector: "Roads & Infrastructure",
    location: "Pakistan",
    description:
      "An infrastructure development project focused on supporting planned growth through essential civil works. The project highlights the role of reliable infrastructure in improving accessibility, strengthening connectivity, and creating a foundation for sustainable community development.",
    image: "/projects/bwc/cover.jpg",
    gallery: []
  },
  {
    slug: "jinnah-garden-executive-block",
    name: "Jinnah Garden Executive Block",
    sector: "Roads & Infrastructure",
    location: "Jinnah Garden, Islamabad",
    description:
      "An infrastructure project serving the Executive Block of Jinnah Garden, Islamabad. Focused on supporting an organized residential environment, the project contributes to the development of essential road networks and improved connectivity within the community.",
    image: "/projects/jinnah/cover.png",
    gallery: []
  },
  {
    slug: "al-shifa-eye-trust-hospital-lahore",
    name: "Al Shifa Eye Trust Hospital Lahore",
    sector: "Buildings",
    location: "Lahore",
    description:
      "A healthcare building project associated with Al-Shifa Eye Trust Hospital in Lahore. The development reflects the importance of purpose-oriented healthcare facilities designed to support medical services, patient accessibility, and an environment dedicated to specialized eye care.",
    image: "/projects/shifalhr/cover.jpg",
    gallery: []
  },
  {
    slug: "al-shifa-eye-trust-hospital-rawalpindi-renovation",
    name: "Al Shifa Eye Trust Hospital Rawalpindi Renovation",
    sector: "Buildings",
    location: "Rawalpindi",
    description:
      "A renovation project at Al-Shifa Eye Trust Hospital in Rawalpindi, focused on the improvement and modernization of an existing healthcare facility. The project underscores the value of upgrading building infrastructure to support functional requirements and the continued delivery of healthcare services.",
    image: "/projects/shifaisb/cover.jpg",
    gallery: []
  },
  {
    slug: "mohmand-dam",
    name: "Mohmand Dam",
    sector: "Dams",
    location: "Mohmand",
    description:
      "A significant water infrastructure project in Mohmand, contributing to Pakistan's efforts to strengthen water storage and resource management. Mohmand Dam is associated with key national priorities, including irrigation support, flood mitigation, and hydropower generation.",
    image: "/projects/mohmand/cover.jpg",
    gallery: []
  },
  {
    slug: "interior-sindh",
    name: "Interior Sindh",
    sector: "Roads & Infrastructure",
    location: "Sindh",
    description:
      "A regional infrastructure project in Interior Sindh focused on improving transportation connectivity and supporting local development. Road infrastructure plays an important role in connecting communities, facilitating mobility, and improving access to economic and social opportunities.",
    image: "/projects/sindh/cover.jpg",
    gallery: []
  },
  {
    slug: "karachi-airport-runway",
    name: "Karachi Airport Runway",
    sector: "Airfields",
    location: "Karachi",
    description:
      "An aviation infrastructure project associated with runway development at Karachi Airport. Runway infrastructure is essential to safe and efficient aircraft operations, requiring careful attention to engineering standards, pavement performance, and the operational needs of airport facilities.",
    image: "/projects/airport/cover.jpg",
    gallery: []
  },
  {
    slug: "fatehjung-airbase",
    name: "Fatehjung Airbase",
    sector: "Airfields",
    location: "Fateh Jang",
    description:
      "An airfield infrastructure project in Fateh Jang, reflecting the specialized engineering requirements of aviation facilities. Airbase development involves infrastructure designed around operational functionality, durable construction, and the specific requirements of airfield environments.",
    image: "/projects/airbase/cover.jpeg",
    gallery: []
  },
  {
    slug: "monarch-heights-jinnah-garden",
    name: "Monarch Heights Jinnah Garden",
    sector: "Buildings",
    location: "Jinnah Garden, Islamabad",
    description:
      "A building development project in Jinnah Garden, Islamabad, representing the integration of contemporary architecture and urban construction. Monarch Heights contributes to the area's built environment, with an emphasis on functional building design and the development of modern urban spaces.",
    image: "/projects/monarch/cover.png",
    gallery: []
  }
];