export type ProductType = 'car' | 'mobile' | 'apartment' | 'electronics' | 'furniture';

export interface BaseProduct {
  id: number;
  type: ProductType;
  image: string;
  price: number;
  discountPrice?: number;
  description: string;
  location: string;
  isVerified: boolean;
  timePosted: string;
  isFavorite?: boolean;
}

export interface CarProduct extends BaseProduct {
  type: 'car';
  mileage: number;
  year: number;
  fuelType?: string;
  transmission?: string;
  color?: string;
}

export interface MobileProduct extends BaseProduct {
  type: 'mobile';
  storage: string;
  ram: string;
  brand?: string;
  model?: string;
  condition?: string;
}

export interface ApartmentProduct extends BaseProduct {
  type: 'apartment';
  bedrooms: number;
  sqm: number;
  bathrooms: number;
  floor?: number;
  furnished?: boolean;
}

export type Product = CarProduct | MobileProduct | ApartmentProduct | BaseProduct;

export interface ProductCardProps {
  product: Product;
  language?: 'en' | 'ar';
}