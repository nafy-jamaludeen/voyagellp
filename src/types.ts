export interface TravelPackage {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  tags: string[];
  highlights: string[];
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  cols: number; // For grid layout column span
}

export interface StatItem {
  id: string;
  label: string;
  targetValue: number;
  suffix: string;
}
