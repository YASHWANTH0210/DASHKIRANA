'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BottomNav } from '../../components/BottomNav';
import { User, MapPin, ShoppingBag, ShieldAlert, LogOut } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto shadow-xl">
      <div className="bg-white p-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
          RS
        </div>
        <div>
          <h1 className="font-extrabold text-base text-gray-900">Rahul Sharma</h1>
          <span className="text-xs text-gray-500">+91 9999999999</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden text-xs font-bold text-gray-800">
          <Link href="/orders" className="p-3.5 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4 text-emerald-600" /> My Orders
            </div>
            <span>→</span>
          </Link>
          <div className="p-3.5 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-emerald-600" /> Delivery Address (Park Road, Kurnool)
            </div>
            <span>→</span>
          </div>
          <Link href="/admin" className="p-3.5 flex items-center justify-between bg-emerald-50/50 text-emerald-900 hover:bg-emerald-50">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 text-emerald-600" /> Switch to Shop Admin Panel
            </div>
            <span>→</span>
          </Link>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('dashkirana_user');
            router.push('/login');
          }}
          className="w-full bg-red-50 text-red-600 font-bold text-xs p-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
