import Link from 'next/link';
import { getCategories } from '@/lib/api';
import { FolderOpen } from 'lucide-react';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-600">Browse products by category</p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug}`}
              className="group overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 group-hover:bg-black transition-colors">
                  <FolderOpen className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-black transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {category.parentId ? 'Subcategory' : 'Category'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <FolderOpen className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <p className="text-lg text-gray-600">No categories available.</p>
        </div>
      )}
    </div>
  );
}
