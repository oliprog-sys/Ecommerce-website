export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  sku: string;
  stockQuantity: number;
  isPublished: boolean;
  images: ImageType[];
  categoryId: string | null;
  category?: Category | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ImageType {
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number | string;
  compareAtPrice?: number | string | null;
  sku: string;
  stockQuantity: number | string;
  isPublished: boolean;
  categoryId: string;
  images: ImageType[];
}