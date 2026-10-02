'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('9999999999');
  const [otp, setOtp] = useState('123456');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('dashkirana_user', JSON.stringify({ phone, name: 'Rahul Sharma' }));
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 max-w-md mx-auto flex flex-col justify-between shadow-xl">
      <div>
        <button onClick={() => router.back()} className="p-1 rounded-full text-gray-600 hover:bg-gray-100 mb-6">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto mb-3 shadow-md">
            ⚡
          </div>
          <h1 className="text-xl font-extrabold text-gray-900">Login to DashKirana</h1>
          <p className="text-xs text-gray-500 mt-1">Get 10-minute grocery delivery in Kurnool</p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Mobile Number</label>
              <div className="flex items-center gap-2 border border-gray-300 bg-white rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-500">
                <span className="text-xs font-bold text-gray-500">+91</span>
                <input
                  required
                  type="text"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm font-bold text-gray-900 focus:outline-none"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-emerald-600 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md hover:bg-emerald-700 transition">
              Get OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Enter OTP (Demo: 123456)</label>
              <input
                required
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-bold border border-gray-300 bg-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button type="submit" className="w-full bg-emerald-600 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md hover:bg-emerald-700 transition">
              Verify & Continue
            </button>
          </form>
        )}
      </div>

      <div className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Demo Auth Mode • No real SMS required</span>
      </div>
    </div>
  );
}
