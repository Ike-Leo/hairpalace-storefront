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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      <section className="bg-gray-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Premium Quality</h3>
              <p className="text-gray-400">
                Only the finest products from trusted brands
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <ShoppingBag className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fast Shipping</h3>
              <p className="text-gray-400">
                Quick delivery right to your doorstep
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure Checkout</h3>
              <p className="text-gray-400">
                Safe and secure payment processing
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
