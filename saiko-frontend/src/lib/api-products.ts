import { api, ApiResponse, PagedResult } from './api';

export interface ProductImage {
  id: string;
  imageUrl: string;
  sortOrder: number;
  productId: string;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  stock: number;
  productId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  bannerImage: string | null;
  createdAt: string;
}

export interface BackendProduct {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  category: Category | null;
  images: ProductImage[];
  variants: ProductVariant[];
}

export const productApi = {
  getAll: (page = 1, pageSize = 12, categoryId?: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(categoryId && { categoryId }),
    });
    return api.get<PagedResult<BackendProduct>>(`/products?${params}`);
  },

  getBySlug: (slug: string) =>
    api.get<BackendProduct>(`/products/slug/${slug}`),

  getById: (id: string) =>
    api.get<BackendProduct>(`/products/${id}`),

  getCategories: () =>
    api.get<Category[]>('/products/categories'),

  getCategoryBySlug: (slug: string) =>
    api.get<Category>(`/products/categories/${slug}`),
};
