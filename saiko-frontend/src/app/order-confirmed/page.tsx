'use client';

import Link from 'next/link';

export default function OrderConfirmedPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="mb-8">
        <svg
          className="w-20 h-20 mx-auto text-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-light text-gold mb-4 tracking-wider">ORDER CONFIRMED</h1>
      <p className="text-gray-400 mb-2">Thank you for your purchase!</p>
      <p className="text-gray-400 mb-8">
        Your order has been placed successfully. We&apos;ll send you a confirmation email shortly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/collections"
          className="inline-block border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-black transition-all duration-300 tracking-widest text-sm uppercase"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="inline-block bg-gold text-black px-8 py-3 hover:bg-gold/90 transition-colors tracking-widest text-sm uppercase font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
