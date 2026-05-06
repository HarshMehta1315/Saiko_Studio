'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-light text-gold mb-4 tracking-wider">CHECKOUT</h1>
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderData = {
        userId: null,
        totalAmount: totalPrice,
        taxAmount: 0,
        shippingAmount: 0,
        paymentMethod: paymentMethod.toUpperCase(),
        shippingAddress: `${formData.firstName} ${formData.lastName}, ${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
        notes: formData.notes,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      await new Promise(resolve => setTimeout(resolve, 1500));

      clearCart();
      router.push('/order-confirmed');
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-light text-gold mb-12 tracking-wider">CHECKOUT</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-black-light border border-gold/10 p-6">
            <h2 className="text-xl text-gold mb-6 tracking-wider uppercase">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>
          </section>

          <section className="bg-black-light border border-gold/10 p-6">
            <h2 className="text-xl text-gold mb-6 tracking-wider uppercase">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-300 text-sm mb-2 tracking-wider uppercase">Order Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-black border border-gold/30 text-white px-4 py-3 focus:border-gold focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-black-light border border-gold/10 p-6">
            <h2 className="text-xl text-gold mb-6 tracking-wider uppercase">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-gold"
                />
                <span className="text-white">Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="accent-gold"
                />
                <span className="text-white">UPI</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="banktransfer"
                  checked={paymentMethod === 'banktransfer'}
                  onChange={() => setPaymentMethod('banktransfer')}
                  className="accent-gold"
                />
                <span className="text-white">Bank Transfer</span>
              </label>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-black-light border border-gold/10 p-6 sticky top-24">
            <h2 className="text-xl text-gold mb-6 tracking-wider uppercase">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <span className="text-gold text-sm font-semibold">{item.quantity}x</span>
                  <div className="flex-1">
                    <p className="text-white text-sm">{item.title}</p>
                    {item.size && <p className="text-gray-400 text-xs">Size: {item.size}</p>}
                  </div>
                  <span className="text-white text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gold/20 pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="border-t border-gold/20 pt-2 flex justify-between text-gold text-lg">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gold text-black py-3 hover:bg-gold/90 transition-colors tracking-widest text-sm uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
