'use client';

import { Suspense } from 'react';
import ProductsContent from './ProductsContent';
import { Loader2 } from 'lucide-react';

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsPageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="mb-2 h-9 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-6 w-32 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      <div className="mb-8">
        <div className="h-5 w-32 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="aspect-square w-full bg-gray-200 rounded-xl animate-pulse mb-4" />
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
