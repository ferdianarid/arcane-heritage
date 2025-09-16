/* eslint-disable @typescript-eslint/no-explicit-any */
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
  description: string | any;
  rating: number | any;
  reviews: number | any;
  category: string | any;
  foodSections?: FoodSection[];
}

export interface KesenianCategoryCardProps {
  id: string;
  title: string;
  description: string;
  href: string;
  coverImage: string;
}

export interface QuizCategoryCardProps {
  id: string;
  name: string;
  href?: string;
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

// types.ts

/**
 * Interface untuk status notifikasi pengguna.
 */
export interface NotificationsState {
  email: boolean;
  push: boolean;
  sound: boolean;
}

/**
 * Interface untuk data pengaturan utama.
 */
export interface SettingsState {
  darkMode: boolean;
  notifications: NotificationsState;
  language: string;
}

/**
 * Interface untuk data navigasi sidebar.
 */
export interface SettingsSectionData {
  id: string;
  label: string;
  // Di sini kita bisa menggunakan tipe React.ElementType atau React.ComponentType
  // untuk properti 'icon' agar dapat di-render sebagai komponen.
  icon: React.ElementType;
}
