'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getOrderStatus } from '@/lib/api';
import { Order } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Package, Search, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const orderNumberParam = searchParams.get('order');

  const [orderNumber, setOrderNumber] = useState(orderNumberParam || '');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderNumber.trim() || !email.trim()) {
      setError('Please enter both order number and email');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const orderData = await getOrderStatus(orderNumber, email);
      setOrder(orderData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Order not found');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill order number from URL
  useEffect(() => {
    if (orderNumberParam && !orderNumber) {
      setOrderNumber(orderNumberParam);
    }
  }, [orderNumberParam, orderNumber]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Track Your Order</h1>
        <p className="text-gray-600">Enter your order number and email to check the status</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Order Number
            </label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g., ORD-2026-001"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? (
              'Searching...'
            ) : (
              <>
                <Search className="h-5 w-5" />
                Track Order
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && searched && (
        <div className="mb-8 rounded-lg bg-red-50 p-6 text-center">
          <XCircle className="mx-auto mb-3 h-12 w-12 text-red-600" />
          <p className="font-semibold text-red-900">Order Not Found</p>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Order Details */}
      {order && !error && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          {/* Order Header */}
          <div className="mb-6 border-b border-gray-200 pb-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h2>
                <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
              </div>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Payment Status</p>
                <p className="font-semibold text-gray-900">
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Amount</p>
                <p className="font-semibold text-gray-900">{formatCurrency(order.totalAmount)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Items</p>
                <p className="font-semibold text-gray-900">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Updated</p>
                <p className="font-semibold text-gray-900">{formatDate(order.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.productName}</p>
                    <p className="text-sm text-gray-600">{item.variantName}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(item.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Total Paid</span>
              <span className="text-2xl font-bold text-black">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
