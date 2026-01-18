import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#8a5e3f] text-white border-t border-[#E5E5E5]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="mb-4 text-xl font-bold font-serif drop-shadow-md text-white">Hair Palace</h3>
            <p className="text-sm text-white drop-shadow-md">
              Your premium destination for quality hair products.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white drop-shadow-md">Shop</h4>
            <ul className="space-y-2 text-sm text-white drop-shadow-md">
              <li>
                <Link href="/products" className="hover:text-gray-200 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-gray-200 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gray-200 transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white drop-shadow-md">Support</h4>
            <ul className="space-y-2 text-sm text-white drop-shadow-md">
              <li>
                <Link href="/orders" className="hover:text-gray-200 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white drop-shadow-md">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-gray-200 transition-colors drop-shadow-md"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-200 transition-colors drop-shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-200 transition-colors drop-shadow-md"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E5E5E5] pt-8 text-center text-sm text-white drop-shadow-md">
          <p>&copy; {currentYear} Hair Palace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
