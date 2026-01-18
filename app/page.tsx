import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import { fetchProducts } from '@/lib/api';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default async function Home() {
  // Fetch featured products (first 8)
  const { products } = await fetchProducts({ limit: 8 });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-gray-600">
            Hand-picked favorites from our collection
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-600">No products available at the moment.</p>
            <Link
              href="/products"
              className="mt-4 inline-block font-semibold text-black hover:underline"
            >
              View all products →
            </Link>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-black px-8 py-3 font-semibold text-white transition-all hover:bg-gray-800 active:scale-95"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Features Section */}

    </div>
  );
}
