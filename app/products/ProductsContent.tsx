'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { fetchProducts, searchProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function ProductsContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [inStockOnly, setInStockOnly] = useState(false);

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            try {
                if (query) {
                    const results = await searchProducts(query);
                    setProducts(results);
                    setHasMore(false);
                } else {
                    const data = await fetchProducts({
                        limit: 12,
                        inStockOnly,
                    });
                    setProducts(data.products);
                    setHasMore(data.hasMore);
                    setNextCursor(data.nextCursor);
                }
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, [query, inStockOnly]);

    async function loadMore() {
        if (!nextCursor || loading) return;

        setLoading(true);
        try {
            const data = await fetchProducts({
                limit: 12,
                cursor: nextCursor,
                inStockOnly,
            });
            setProducts((prev) => [...prev, ...data.products]);
            setHasMore(data.hasMore);
            setNextCursor(data.nextCursor);
        } catch (error) {
            console.error('Failed to load more products:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    {query ? `Search: "${query}"` : 'All Products'}
                </h1>
                <p className="text-gray-600">
                    {products.length} {products.length === 1 ? 'product' : 'products'} found
                </p>
            </div>

            {/* Filters */}
            <div className="mb-8 flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span className="text-sm font-medium text-gray-700">In Stock Only</span>
                </label>
            </div>

            {/* Products Grid */}
            {loading && products.length === 0 ? (
                <div className="flex min-h-[400px] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-black" />
                </div>
            ) : products.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {hasMore && (
                        <div className="mt-12 text-center">
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className="inline-flex items-center gap-2 rounded-lg bg-black px-8 py-3 font-semibold text-white transition-all hover:bg-gray-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    'Load More Products'
                                )}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="py-16 text-center">
                    <p className="text-lg text-gray-600">
                        {query ? 'No products found matching your search.' : 'No products available.'}
                    </p>
                </div>
            )}
        </div>
    );
}
