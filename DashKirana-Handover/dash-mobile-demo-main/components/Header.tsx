'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, MapPin, User } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  searchQuery = '',
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-2.5">
      <div className="max-w-md mx-auto flex flex-col gap-2">
        {/* Top Row: Logo, Location, Profile, Cart */}
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              ⚡
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-gray-900 block leading-none">
                DASH<span className="text-emerald-600">KIRANA</span>
              </span>
              <span className="text-[9px] text-gray-500 font-medium tracking-wide">
                Your Local Kirana, Online.
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="p-2 text-gray-600 hover:text-emerald-600 transition"
              aria-label="Account Login"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1.5 rounded-full font-semibold text-xs shadow-sm hover:bg-emerald-700 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-orange-500 text-white font-bold rounded-full w-4 h-4 text-[10px] flex items-center justify-center ml-0.5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Location Banner */}
        <div className="flex items-center gap-1 text-xs text-gray-600 bg-emerald-50 px-2.5 py-1 rounded-md">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-semibold text-gray-900">Delivering in 10 mins</span>
          <span className="text-gray-400">•</span>
          <span className="truncate">Park Road, Kurnool, AP</span>
        </div>

        {/* Search Bar */}
        {onSearchChange && (
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search atta, rice, oil, milk, maggi..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white transition"
            />
          </div>
        )}
      </div>
    </header>
  );
};
