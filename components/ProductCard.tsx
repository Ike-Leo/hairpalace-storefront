'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (adding || !product.inStock) return;

    setAdding(true);
    try {
      // Get the default variant or first variant
      const variant = product.variants.find((v) => v.isDefault) || product.variants[0];
      if (!variant) return;

      await addItem(product._id, variant._id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  const imageUrl = product.images?.[0] || '/placeholder-product.png';

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="text-lg font-semibold text-white">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="mb-2 text-base font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>

          <div className="mb-3 flex items-center justify-between">
            <span className="text-xl font-bold text-black">
              {formatCurrency(product.price)}
            </span>
            {product.totalStock > 0 && product.totalStock <= 5 && (
              <span className="text-xs text-orange-600">
                Only {product.totalStock} left
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={adding || !product.inStock}
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
              added
                ? 'bg-green-600 text-white'
                : product.inStock
                ? 'bg-black text-white hover:bg-gray-800 active:scale-95'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {adding ? 'Adding...' : added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
