'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api-auth';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login(formData);

      if (response.success && response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-4xl font-light text-gold mb-8 tracking-wider text-center">LOGIN</h1>

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="w-full bg-black-light border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            required
            className="w-full bg-black-light border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-black py-3 hover:bg-gold/90 transition-colors tracking-widest text-sm uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-gray-400 text-center mt-8">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-gold hover:text-gold/70 transition-colors">
          Register
        </Link>
      </p>
    </div>
  );
}
