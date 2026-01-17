import { notFound } from 'next/navigation';
import { getCategory, getCategoryProducts } from '@/lib/api';
import { getCategory as getCategories } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const category = await getCategory(params.slug);
    const products = await getCategoryProducts(params.slug);

    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/categories"
          className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-gray-600">
            {category.productCount || 0} {category.productCount === 1 ? 'product' : 'products'}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-600">No products in this category yet.</p>
            <Link
              href="/products"
              className="mt-4 inline-block font-semibold text-black hover:underline"
            >
              Browse all products →
            </Link>
          </div>
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}
