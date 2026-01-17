'use client';

import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from 'lucide-react';

export default function CartPage() {
  const { items, totalAmount, totalItems, loading, updateItemQuantity, removeItem } = useCart();

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-black" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Your Cart is Empty</h1>
          <p className="mb-8 text-gray-600">Add some products to get started!</p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-black px-8 py-3 font-semibold text-white transition-all hover:bg-gray-800"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row"
              >
                {/* Product Image */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.image || '/placeholder.png'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateItemQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.variantId, Math.min(item.maxStock, item.quantity + 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="text-red-600 hover:text-red-700"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatCurrency(item.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Order Summary</h2>

            <div className="space-y-3 border-b border-gray-200 pb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Items</span>
                <span className="font-semibold text-gray-900">{totalItems}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between border-b border-gray-200 pb-4">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">{formatCurrency(totalAmount)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 font-semibold text-white transition-all hover:bg-gray-800"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/products"
              className="mt-3 block text-center text-sm font-medium text-gray-600 hover:text-black"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
