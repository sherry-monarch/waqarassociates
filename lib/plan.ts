// Timeline (seconds) shared by the 3D master-plan scene and the hero UI.
export const T = { survey: 0, roads: 0.05, zoning: 1.1, build: 1.9, end: 5.5 };
export const PHASES = [
  { name: "Survey", at: T.survey },
  { name: "Road network", at: T.roads },
  { name: "Zoning", at: T.zoning },
  { name: "Development", at: T.build },
];
export const ZONES = [
  { key: "res", name: "Residential", color: "#2C44A6" },
  { key: "com", name: "Commercial", color: "#C29412" },
  { key: "green", name: "Parks and open space", color: "#A9BDF0" },
  { key: "pub", name: "Public and civic", color: "#FFFFFF" },
] as const;