'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-light text-gold mb-4 tracking-wider">YOUR CART</h1>
        <p className="text-gray-400 mb-8">Your cart is empty</p>
        <Link
          href="/collections"
          className="inline-block border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-black transition-all duration-300 tracking-widest text-sm uppercase"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-light text-gold mb-12 tracking-wider">YOUR CART ({totalItems})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 bg-black-light border border-gold/10 p-4"
            >
              <div className="relative w-32 h-40 flex-shrink-0 bg-black">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-white hover:text-gold transition-colors tracking-wide text-sm uppercase">
                      {item.title}
                    </h3>
                  </Link>
                  {item.size && (
                    <p className="text-gray-400 text-sm mt-1">Size: {item.size}</p>
                  )}
                  <p className="text-gold mt-2">₹{item.price.toLocaleString()}</p>
                  {item.compareAtPrice && (
                    <p className="text-gray-500 line-through text-sm">
                      ₹{item.compareAtPrice.toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gold/30">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gold hover:bg-gold/10 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 text-white min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gold hover:bg-gold/10 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors text-sm uppercase tracking-wider"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-gray-400 hover:text-red-400 transition-colors text-sm uppercase tracking-wider"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-black-light border border-gold/10 p-6 sticky top-24">
            <h2 className="text-xl text-gold mb-6 tracking-wider uppercase">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="border-t border-gold/20 pt-3 flex justify-between text-gold text-lg">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full block text-center bg-gold text-black py-3 hover:bg-gold/90 transition-colors tracking-widest text-sm uppercase font-semibold"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/collections"
              className="w-full block text-center mt-3 text-gold hover:text-gold/70 transition-colors text-sm tracking-wider"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
