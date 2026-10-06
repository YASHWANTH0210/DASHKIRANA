'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Phone, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { supabase } from '../../../lib/supabase/client';

export default function AdminLogin() {
  const router = useRouter();
  const [phone, setPhone] = useState('9999999999');
  const [pin, setPin] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Optional Supabase email login tab for production shop owners
  const [useEmail, setUseEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const configuredPhone = process.env.NEXT_PUBLIC_DEMO_ADMIN_PHONE || '9999999999';
  const configuredPin = process.env.NEXT_PUBLIC_DEMO_ADMIN_PIN || '123456';

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanPhone = phone.replace(/\D/g, '');
    const cleanPin = pin.trim();

    // Check credentials:
    // 1. Matches configured phone & PIN
    // 2. OR matches master PIN '123456' or 'admin123' with any 10-digit number
    const isConfigured = cleanPhone === configuredPhone && cleanPin === configuredPin;
    const isMasterPin = (cleanPin === '123456' || cleanPin === 'admin123') && cleanPhone.length >= 10;
    const isDefault = cleanPhone === '9999999999' && cleanPin === '123456';

    if (isConfigured || isMasterPin || isDefault) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'dashkirana_admin',
          JSON.stringify({
            phone: cleanPhone,
            role: 'admin',
            loggedInAt: new Date().toISOString(),
          })
        );
      }
      router.replace('/admin');
    } else {
      setError('Invalid admin credentials. Use PIN: 123456 or default phone 9999999999');
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: sbError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (sbError) {
        setError(sbError.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'dashkirana_admin',
            JSON.stringify({
              userId: data.user.id,
              email: data.user.email,
              role: 'admin',
              loggedInAt: new Date().toISOString(),
            })
          );
        }
        router.replace('/admin');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check credentials.');
      setLoading(false);
    }
  };

  const quickFillAdmin = () => {
    setPhone('9999999999');
    setPin('123456');
    setError('');
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'dashkirana_admin',
        JSON.stringify({
          phone: '9999999999',
          role: 'admin',
          loggedInAt: new Date().toISOString(),
        })
      );
    }
    router.replace('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-4 transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        <div className="bg-white rounded-3xl p-6 shadow-2xl space-y-5 border border-gray-100">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto text-2xl shadow-lg shadow-emerald-600/30">
              ⚡
            </div>
            <h1 className="text-xl font-black text-gray-900 mt-3 tracking-tight">
              Shop Admin Portal
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage products, inventory, orders & store settings
            </p>
          </div>

          {/* Quick Access Demo Button */}
          <button
            type="button"
            onClick={quickFillAdmin}
            className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>One-Click Instant Admin Access</span>
          </button>

          <div className="flex items-center gap-2 my-2">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Or Sign In
            </span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          {/* Tab Selector */}
          <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setUseEmail(false);
                setError('');
              }}
              className={`flex-1 py-1.5 rounded-lg transition ${
                !useEmail ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Mobile & PIN
            </button>
            <button
              type="button"
              onClick={() => {
                setUseEmail(true);
                setError('');
              }}
              className={`flex-1 py-1.5 rounded-lg transition ${
                useEmail ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Supabase Email
            </button>
          </div>

          {!useEmail ? (
            <form onSubmit={handlePinSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Admin Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9999999999"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Admin Security PIN
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter 6-digit PIN"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Default Demo PIN: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600 font-mono">123456</code>
                </p>
              </div>

              {error && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-black text-xs shadow-md transition disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Open Admin Panel →'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dashkirana.com"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              {error && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-black text-xs shadow-md transition disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In with Supabase →'}
              </button>
            </form>
          )}

          <div className="pt-2 text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5 border-t border-gray-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Authorized Shop Owners & Staff Only</span>
          </div>
        </div>
      </div>
    </div>
  );
}
