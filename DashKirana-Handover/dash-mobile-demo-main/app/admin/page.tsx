'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, DollarSign, Package, AlertTriangle, ArrowRight } from 'lucide-react';
import { Order, Product } from '../../lib/types';
import { getOrders, getProducts } from '../../lib/services/store';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadAdminData() {
      const o = await getOrders();
      const p = await getProducts();
      setOrders(o);
      setProducts(p);
    }
    loadAdminData();
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Admin Navigation Bar */}
        <header className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black text-gray-900">DASHKIRANA ADMIN</h1>
            <p className="text-xs text-gray-500">Kurnool Store Control Center</p>
          </div>

          <nav className="flex items-center gap-2 text-xs font-bold">
            <Link href="/admin" className="px-3 py-2 bg-emerald-600 text-white rounded-xl">
              Dashboard
            </Link>
            <Link href="/admin/orders" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-xl">
              Orders
            </Link>
            <Link href="/admin/products" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-xl">
              Products
            </Link>
            <Link href="/admin/inventory" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-xl">
              Inventory
            </Link>
          </nav>
        </header>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <DollarSign className="w-5 h-5" />
              <span className="text-xs font-bold text-gray-500">Total Sales</span>
            </div>
            <span className="text-xl font-black text-gray-900">₹{totalSales}</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-bold text-gray-500">Pending Orders</span>
            </div>
            <span className="text-xl font-black text-gray-900">{pendingOrders.length}</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-purple-600 mb-1">
              <Package className="w-5 h-5" />
              <span className="text-xs font-bold text-gray-500">Total Products</span>
            </div>
            <span className="text-xl font-black text-gray-900">{products.length}</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-xs font-bold text-gray-500">Low Stock</span>
            </div>
            <span className="text-xl font-black text-amber-600">{lowStockProducts.length}</span>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-extrabold text-base text-gray-900">Recent Customer Orders</h2>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 uppercase">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="py-3 font-bold text-gray-900">{o.id}</td>
                    <td className="py-3">{o.customerName}</td>
                    <td className="py-3 font-bold">₹{o.total}</td>
                    <td className="py-3">{o.paymentMethod}</td>
                    <td className="py-3">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
