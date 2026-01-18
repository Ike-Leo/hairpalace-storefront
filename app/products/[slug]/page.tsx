'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct, getRelatedProducts } from '@/lib/api';
import { Product, ProductVariant } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency, getStockStatusText } from '@/lib/utils';
import { Minus, Plus, ShoppingCart, Loader2, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const productData = await getProduct(slug);
        setProduct(productData);

        // Set default variant
        const defaultVariant = productData.variants.find((v) => v.isDefault) || productData.variants[0];
        setSelectedVariant(defaultVariant || null);

        // Load related products
        const related = await getRelatedProducts(slug);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product || !selectedVariant || adding) return;

    setAdding(true);
    try {
      await addItem(product._id, selectedVariant._id, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-black" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-gray-600">Product not found.</p>
        <Link href="/products" className="mt-4 inline-block font-semibold text-black hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Link href="/products" className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-black">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      {/* Product Details */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          {product.images && product.images.length > 0 ? (
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-gray-100">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mb-4 text-sm text-gray-500">{product.categoryName}</p>

          <div className="mb-6">
            <span className="text-3xl font-bold text-black">
              {formatCurrency(product.price)}
            </span>
          </div>

          {product.description && (
            <p className="mb-6 text-gray-700">{product.description}</p>
          )}

          {/* Stock Status */}
          <div className="mb-6">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
            >
              {getStockStatusText(product.totalStock)}
            </span>
          </div>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Select Variant
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant._id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.stockQuantity === 0}
                    className={`rounded-lg border p-3 text-left text-sm transition-all ${selectedVariant?._id === variant._id
                        ? 'border-black bg-black text-white'
                        : variant.stockQuantity === 0
                          ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                  >
                    <div className="font-medium">{variant.name}</div>
                    {variant.options.size && (
                      <div className="text-xs opacity-70">
                        Size: {variant.options.size}
                        {variant.options.color && ` - ${variant.options.color}`}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={!selectedVariant || quantity >= (selectedVariant?.stockQuantity || 0)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || !selectedVariant || adding}
            className={`flex items-center justify-center gap-2 rounded-lg px-8 py-4 font-semibold transition-all ${added
                ? 'bg-green-600 text-white'
                : product.inStock
                  ? 'bg-black text-white hover:bg-gray-800 active:scale-95'
                  : 'cursor-not-allowed bg-gray-300 text-gray-500'
              }`}
          >
            <ShoppingCart className="h-5 w-5" />
            {adding ? 'Adding...' : added ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Products</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct._id} href={`/products/${relatedProduct.slug}`}>
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={relatedProduct.images[0] || '/placeholder.png'}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-black">
                      {formatCurrency(relatedProduct.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
