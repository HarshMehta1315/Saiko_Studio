import { api, ApiResponse } from './api';
import { BackendProduct } from './api-products';

export interface CartItem {
  id: string;
  quantity: number;
  sessionId: string;
  userId: string | null;
  productId: string;
  product: BackendProduct;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export const cartApi = {
  get: (sessionId: string, userId?: string) => {
    const params = new URLSearchParams({ sessionId });
    if (userId) params.append('userId', userId);
    return api.get<CartItem[]>(`/cart?${params}`);
  },

  add: (sessionId: string, body: AddToCartRequest, userId?: string) => {
    const params = new URLSearchParams({ sessionId });
    if (userId) params.append('userId', userId);
    return api.post<CartItem>(`/cart?${params}`, body);
  },

  update: (id: string, quantity: number) =>
    api.put<boolean>(`/cart/${id}`, { quantity }),

  remove: (id: string) =>
    api.delete<boolean>(`/cart/${id}`),

  clear: (sessionId: string, userId?: string) => {
    const params = new URLSearchParams({ sessionId });
    if (userId) params.append('userId', userId);
    return api.delete<boolean>(`/cart/clear?${params}`);
  },
};
