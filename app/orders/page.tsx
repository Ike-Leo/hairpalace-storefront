'use client';

import { Suspense } from 'react';
import OrderTracker from './OrderTracker';

export default function OrdersPage() {
  return (
    <Suspense fallback={<OrdersPageSkeleton />}>
      <OrderTracker />
    </Suspense>
  );
}

function OrdersPageSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mb-2 h-9 w-64 mx-auto bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-5 w-96 mx-auto bg-gray-200 rounded-lg animate-pulse" />
      </div>

      <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <div className="mb-1 h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-11 w-full bg-gray-100 rounded-lg animate-pulse" />
          </div>
          <div>
            <div className="mb-1 h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-11 w-full bg-gray-100 rounded-lg animate-pulse" />
          </div>
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
