'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api-auth';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-4xl font-light text-gold mb-8 tracking-wider text-center">REGISTER</h1>

      {success && (
        <div className="bg-green-900/30 border border-green-500/50 text-green-300 px-4 py-3 mb-6 text-sm">
          Registration successful! Redirecting to login...
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            className="w-full bg-black-light border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
          />
        </div>

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

        <div>
          <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            required
            className="w-full bg-black-light border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className="w-full bg-gold text-black py-3 hover:bg-gold/90 transition-colors tracking-widest text-sm uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-gray-400 text-center mt-8">
        Already have an account?{' '}
        <Link href="/login" className="text-gold hover:text-gold/70 transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  );
}
