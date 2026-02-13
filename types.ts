
export interface PortfolioItem {
  id: string;
  title: string;
  category: '아파트' | '상가' | '가구';
  thumbnail: string;
  images: string[];
  beforeImage?: string;
  summary: string;
  description: string;
  productInfo?: string; // New field for film/product info
  isPublic: boolean;
  date: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  content: string;
  parts: string[];
  estimateType: string;
  budget?: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface SiteSettings {
  brandName: string;
  heroText: string;
  pointColor: string;
  pointFont: string;
}

export type Page = 'home' | 'about' | 'portfolio' | 'contact' | 'admin-login' | 'admin-dashboard' | 'admin-portfolio' | 'admin-quotes' | 'admin-settings';
