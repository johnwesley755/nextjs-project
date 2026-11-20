export interface ProjectItemData {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  aspectRatio: string;
  colSpanDesktop: string;
  tags: string[];
}

export const PORTFOLIO_HEADER = {
  metadata: "02 / Selected work",
  heading: "MADE TO STAND OUT.",
  description:
    "A collection of concepts exploring identity, interaction and the spaces where design meets technology.",
  projectCount: "04 Selected projects",
};

export const PROJECTS_DATA: ProjectItemData[] = [
  {
    id: "origin",
    number: "01",
    title: "ORIGIN",
    category: "Brand identity",
    year: "2026",
    description:
      "A visual identity concept exploring the relationship between nature, materiality and contemporary skincare.",
    imageSrc: "/images/projects/origin-cover.webp",
    imageAlt: "ORIGIN skincare packaging and brand identity editorial presentation",
    aspectRatio: "aspect-[16/11]",
    colSpanDesktop: "lg:col-span-7",
    tags: ["Packaging", "Identity System", "Art Direction"],
  },
  {
    id: "mono",
    number: "02",
    title: "MONO",
    category: "Digital commerce",
    year: "2026",
    description:
      "A fashion commerce concept where editorial presentation meets a clean, intuitive shopping experience.",
    imageSrc: "/images/projects/mono-cover.webp",
    imageAlt: "MONO digital commerce editorial layout and fashion presentation",
    aspectRatio: "aspect-[4/5]",
    colSpanDesktop: "lg:col-span-5",
    tags: ["E-Commerce", "Editorial UX", "Interaction"],
  },
  {
    id: "form",
    number: "03",
    title: "FORM",
    category: "Digital experience",
    year: "2026",
    description:
      "An architecture portfolio concept focused on spatial storytelling, visual rhythm and immersive presentation.",
    imageSrc: "/images/projects/form-cover.webp",
    imageAlt: "FORM architectural digital portfolio and brutalist spatial storytelling",
    aspectRatio: "aspect-[4/5]",
    colSpanDesktop: "lg:col-span-5",
    tags: ["Architecture", "Spatial Web", "Editorial"],
  },
  {
    id: "signal",
    number: "04",
    title: "SIGNAL",
    category: "Product design",
    year: "2026",
    description:
      "A digital product concept that transforms complex information into a clear and approachable interface.",
    imageSrc: "/images/projects/signal-cover.webp",
    imageAlt: "SIGNAL analytics dashboard and modern data interface design",
    aspectRatio: "aspect-[16/11]",
    colSpanDesktop: "lg:col-span-7",
    tags: ["Dashboard", "Data Visualisation", "Design System"],
  },
];
