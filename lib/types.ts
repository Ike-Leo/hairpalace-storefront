// Product Types
export interface ProductVariant {
  _id: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  options: {
    size?: string;
    color?: string;
    [key: string]: string | undefined;
  };
  isDefault: boolean;
}

export interface Product {
  _id: string;
  orgId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  categoryName: string;
  inStock: boolean;
  totalStock: number;
  variants: ProductVariant[];
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  slug: string;
  parentId: string | null;
  position: number;
}

export interface CategoryDetail extends Category {
  productCount?: number;
}

// Cart Types
export interface CartItem {
  _id: string;
  productId: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  maxStock: number;
  total: number;
}

export interface Cart {
  _id: string;
  totalAmount: number;
  totalItems: number;
  items: CartItem[];
}

// Order Types
export interface OrderItem {
  productName: string;
  variantName: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  totalAmount: number;
  createdAt: number;
  updatedAt: number;
  items: OrderItem[];
}

export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  phone?: string;
}

export interface CheckoutRequest {
  cartId: string;
  customerInfo: CustomerInfo;
}

export interface CheckoutResponse {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  error?: string;
}

// API Response Types
export interface ProductsResponse {
  products: Product[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Filter Types
export interface ProductFilters {
  limit?: number;
  cursor?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  categoryId?: string;
}

// Search Type
export interface SearchResult {
  query: string;
  products: Product[];
}
