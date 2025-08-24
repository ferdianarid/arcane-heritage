import { KesenianCategoryCardProps } from "@/types";

export const kesenianCategories: Array<KesenianCategoryCardProps> = [
  {
    id: "1",
    title: "Seni Pertunjukan",
    description: "Jelajahi keindahan tari, musik, dan teater tradisional.",
    href: "/kesenian/pertunjukan",
    coverImage: "/assets/images/kesenian/pertunjukan/wayang.jpg",
  },
  {
    id: "2",
    title: "Seni Rupa",
    description: "Lihat mahakarya ukiran, lukisan, dan kain tradisional.",
    href: "/kesenian/seni-rupa",
    coverImage: "/assets/images/kesenian/senirupa/seni-rupa.avif",
  },
  {
    id: "3",
    title: "Seni Musik",
    description:
      "Seni musik seperti alat musik tradisional hingga musik tradisional",
    href: "/kesenian/seni-musik",
    coverImage: "/assets/images/kesenian/senimusik/seni-musik.jpg",
  },
];

export const seniPertunjukan = [
  {
    id: 1,
    title: "Tari Tradisional",
    href: "/kesenian/pertunjukan/tari-tradisional",
    description:
      "Seni pertunjukan yang lahir dan berkembang di suatu daerah, diwariskan secara turun-temurun, serta memiliki nilai-nilai filosofis dan simbolisme yang kaya",
    coverImage: "/assets/images/kesenian/pertunjukan/tari-tradisional.jpg",
  },
  {
    id: 2,
    title: "Teater dan Drama",
    href: "/kesenian/pertunjukan/teater-drama",
    description:
      "Seni pertunjukan yang lahir dan berkembang di suatu daerah, diwariskan secara turun-temurun, serta memiliki nilai-nilai filosofis dan simbolisme yang kaya",
    coverImage: "/assets/images/kesenian/pertunjukan/wayang.jpg",
  },
];
