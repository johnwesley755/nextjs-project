export interface ServiceItemData {
  id: string;
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  imageSrc: string;
  imageAlt: string;
  aspectRatio: string;
  layout: "image-left" | "image-right";
}

export const SERVICES_SECTION_HEADER = {
  metadata: "01 / What we do",
  heading: "THINK. DESIGN. BUILD.",
  description:
    "We combine strategy, design and technology to create work that connects with people and moves ideas forward.",
};

export const SERVICES_DATA: ServiceItemData[] = [
  {
    id: "brand-identity",
    number: "01",
    title: "BRAND IDENTITY",
    description:
      "We create distinctive identities that give ambitious ideas a recognisable voice, character and visual presence.",
    capabilities: [
      "Strategy",
      "Visual Identity",
      "Typography",
      "Art Direction",
    ],
    imageSrc: "/images/services/brand-identity.webp",
    imageAlt: "Editorial brand identity, stationery and packaging design",
    aspectRatio: "aspect-[4/3] sm:aspect-[16/11]",
    layout: "image-left",
  },
  {
    id: "digital-experiences",
    number: "02",
    title: "DIGITAL EXPERIENCES",
    description:
      "We design engaging digital experiences that combine expressive visuals with intuitive interactions.",
    capabilities: [
      "Web Design",
      "UI Design",
      "UX Design",
      "Interaction",
    ],
    imageSrc: "/images/services/digital-experiences.webp",
    imageAlt: "Editorial website design mockup on desktop and mobile displays",
    aspectRatio: "aspect-[4/3] sm:aspect-[16/10]",
    layout: "image-right",
  },
  {
    id: "product-design",
    number: "03",
    title: "PRODUCT DESIGN",
    description:
      "From early ideas to polished interfaces, we shape products around the people who use them.",
    capabilities: [
      "Research",
      "Prototyping",
      "Design Systems",
      "Product Thinking",
    ],
    imageSrc: "/images/services/product-design.webp",
    imageAlt: "Product design wireframe sketchbook and digital interface prototype",
    aspectRatio: "aspect-[4/3] sm:aspect-[5/4]",
    layout: "image-left",
  },
  {
    id: "creative-development",
    number: "04",
    title: "CREATIVE DEVELOPMENT",
    description:
      "We turn ambitious designs into responsive, accessible and performance-conscious digital experiences.",
    capabilities: [
      "Frontend",
      "Development",
      "Motion",
      "Performance",
    ],
    imageSrc: "/images/services/creative-development.webp",
    imageAlt: "Creative coding, generative design, and high-performance digital craftsmanship",
    aspectRatio: "aspect-[4/3] sm:aspect-[16/10]",
    layout: "image-right",
  },
];
