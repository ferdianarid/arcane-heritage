export interface CarouselItem {
  image: string;
  title: string;
  description: string;
}

export interface Company {
  id?: number;
  name: string;
  image: string;
}

interface BlogSection {
  title: string;
  content: string;
}

export interface BuildingItem {
  id: string;
  name: string;
  image: string;
  location: string;
  description: string;
  panoramaImage: string;
  rating: number;
  reviews: number;
  category: string;
  blogSections?: BlogSection[];
}

interface FoodSection {
  title: string;
  content: string;
}

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  location: string;
  description: string;
  rating: number;
  reviews: number;
  category: string;
  foodSections?: FoodSection[];
}

export interface KesenianCategoryCardProps {
  id: string;
  title: string;
  description: string;
  href: string;
  coverImage: string;
}

export interface SeniPertunjukan {
  id: number;
  title: string;
  href: string;
  description: string;
  coverImage: string;
}

export interface DanceSection {
  title: string;
  content: string;
}

export interface DanceItem {
  id: string;
  name: string;
  image: string;
  location: string;
  description: string;
  duration: string;
  dancers: string;
  category: string;
  blogSections: DanceSection[];
}
