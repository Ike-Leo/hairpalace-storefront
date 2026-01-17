'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { checkout } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { Loader2, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartId, items, totalAmount, totalItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      router.push('/cart');
    }
  }, [items.length, orderComplete, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !cartId) return;

    setLoading(true);

    try {
      const response = await checkout({
        cartId,
        customerInfo: formData,
      });

      if (response.success && response.orderNumber) {
        setOrderNumber(response.orderNumber);
        clearCart();
        setOrderComplete(true);
      } else {
        setErrors({ form: response.error || 'Checkout failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="mb-2 text-gray-600">Thank you for your purchase.</p>
          <p className="mb-8 text-lg">
            Order Number: <span className="font-bold text-black">{orderNumber}</span>
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={`/orders?order=${orderNumber}`}
              className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              View Order Status
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center rounded-lg border-2 border-black px-6 py-3 font-semibold text-black hover:bg-gray-50"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Customer Information */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Customer Information</h2>

            {errors.form && (
              <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">
                {errors.form}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Shipping Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123 Main St, City, State, ZIP"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Order Summary</h2>

            <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item._id} className="flex gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                    <Image
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="line-clamp-1 text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(item.total)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="mb-2 flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="mb-4 flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="mb-6 flex justify-between border-t border-gray-200 pt-4">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">{formatCurrency(totalAmount)}</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white transition-all hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
