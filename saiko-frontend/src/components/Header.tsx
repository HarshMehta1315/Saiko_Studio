"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface User {
  id: string;
  name: string;
  email: string;
}

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "FAQs", href: "/faqs" },
  { label: "CONTACT", href: "/contact" },
];

const shopLinks = [
  { label: "The (IN) Complete Illusion", href: "/collections?cat=incomplete-illusion" },
  { label: "Corsets", href: "/collections?cat=corsets" },
  { label: "Coord Sets", href: "/collections?cat=coord-sets" },
  { label: "Dresses", href: "/collections?cat=dresses" },
  { label: "Tops", href: "/collections?cat=tops" },
  { label: "Bottoms", href: "/collections?cat=bottoms" },
  { label: "Accessories", href: "/collections?cat=accessories" },
  { label: "Celebrity edit", href: "/collections?cat=celebrity-edit" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const { totalItems } = useCart();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="bg-black border-b border-gold/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <span className="text-gold text-xl font-semibold tracking-[0.2em]" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              SAIKO STUDIO
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white hover:text-gold transition-colors duration-300 text-sm tracking-widest uppercase"
              >
                {link.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <Link
                href="/collections"
                className="text-white hover:text-gold transition-colors duration-300 text-sm tracking-widest uppercase flex items-center gap-1"
              >
                SHOP
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {shopDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-black-light border border-gold/20 rounded-sm shadow-xl animate-fade-in">
                  {shopLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block px-4 py-3 text-white hover:text-gold hover:bg-black-lighter transition-colors text-sm tracking-wide"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button className="text-white hover:text-gold transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/cart" className="text-white hover:text-gold transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative group">
                <button className="text-white hover:text-gold transition-colors text-sm tracking-widest uppercase">
                  {user.name.split(' ')[0]}
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-black border border-gold/20 rounded-sm shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    href="/account"
                    className="block px-4 py-3 text-white hover:text-gold hover:bg-black-lighter transition-colors text-sm"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-white hover:text-gold hover:bg-black-lighter transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="text-white hover:text-gold transition-colors text-sm tracking-widest uppercase">
                Login
              </Link>
            )}
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-black-light border-t border-gold/20 animate-fade-in">
          <nav className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-white hover:text-gold transition-colors text-sm tracking-widest uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gold/20">
              <p className="text-gold text-sm tracking-widest uppercase mb-3">SHOP</p>
              {shopLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-white hover:text-gold transition-colors text-sm py-2 pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-gold/20">
              {user ? (
                <>
                  <p className="text-gold text-sm tracking-widest uppercase mb-3">{user.name}</p>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="block text-white hover:text-gold transition-colors text-sm py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block text-white hover:text-gold transition-colors text-sm py-2 tracking-widest uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
