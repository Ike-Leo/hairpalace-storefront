import {
  Product,
  ProductsResponse,
  Category,
  CategoryDetail,
  Cart,
  CartItem,
  Order,
  CheckoutRequest,
  CheckoutResponse,
  ProductFilters,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_STORE_API_URL || 'https://acoustic-seahorse-440.convex.site/api/store/hair-palace';

// Helper function for API calls
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

// ==================== Products ====================

export async function fetchProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
  const params = new URLSearchParams();

  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.cursor) params.append('cursor', filters.cursor);
  if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
  if (filters.inStockOnly !== undefined) params.append('inStockOnly', filters.inStockOnly.toString());

  const queryString = params.toString();
  const endpoint = `/products${queryString ? `?${queryString}` : ''}`;

  return fetchAPI<ProductsResponse>(endpoint);
}

export async function searchProducts(query: string, limit: number = 20): Promise<Product[]> {
  if (!query.trim()) return [];

  return fetchAPI<Product[]>(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}`);
}

export async function getProduct(slug: string): Promise<Product> {
  return fetchAPI<Product>(`/products/${slug}`);
}

export async function getRelatedProducts(slug: string, limit: number = 4): Promise<Product[]> {
  return fetchAPI<Product[]>(`/products/${slug}/related?limit=${limit}`);
}

// ==================== Categories ====================

export async function getCategories(): Promise<Category[]> {
  return fetchAPI<Category[]>('/categories');
}

export async function getCategory(slug: string): Promise<CategoryDetail> {
  return fetchAPI<CategoryDetail>(`/categories/${slug}`);
}

export async function getCategoryProducts(slug: string, limit: number = 20): Promise<Product[]> {
  return fetchAPI<Product[]>(`/categories/${slug}/products?limit=${limit}`);
}

// ==================== Cart ====================

export async function getCart(sessionId: string): Promise<Cart> {
  return fetchAPI<Cart>(`/cart?sessionId=${sessionId}`);
}

export async function addToCart(
  sessionId: string,
  productId: string,
  variantId: string,
  quantity: number = 1
): Promise<{ success: boolean }> {
  return fetchAPI<{ success: boolean }>('/cart/items', {
    method: 'POST',
    body: JSON.stringify({
      sessionId,
      productId,
      variantId,
      quantity,
    }),
  });
}

export async function updateCartItem(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<{ success: boolean }> {
  return fetchAPI<{ success: boolean }>(`/cart/items/${variantId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      cartId,
      quantity,
    }),
  });
}

export async function removeFromCart(
  cartId: string,
  variantId: string
): Promise<{ success: boolean }> {
  return fetchAPI<{ success: boolean }>(`/cart/items/${variantId}?cartId=${cartId}`, {
    method: 'DELETE',
  });
}

// ==================== Orders ====================

export async function checkout(data: CheckoutRequest): Promise<CheckoutResponse> {
  return fetchAPI<CheckoutResponse>('/checkout', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getOrderStatus(orderNumber: string, email: string): Promise<Order> {
  return fetchAPI<Order>(`/orders/${orderNumber}?email=${encodeURIComponent(email)}`);
}

// ==================== Utility Functions ====================

export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}

export function getThumbnailUrl(images: string[], index: number = 0): string {
  return images[index] || '/placeholder-product.png';
}
