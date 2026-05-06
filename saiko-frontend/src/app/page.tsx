"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { corsetProducts, coordProducts, dressProducts, topProducts, celebrityProducts } from "@/lib/products";

const img = (name: string) => `/images/${name}`;

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

function Marquee({ text }: { text: string }) {
  return (
    <div className="marquee-container py-6 border-y border-gold/10">
      <div className="marquee-content">
        {[...Array(2)].map((_, i) => (
          <span key={i} className="text-gold/20 text-sm md:text-base tracking-[0.3em] uppercase mx-8">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, revealed } = useScrollReveal();

  useEffect(() => {
    if (!revealed) return;
    let start = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [revealed, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl gold-text-gradient font-light">{count}{suffix}</div>
    </div>
  );
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const heroReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const statsReveal = useScrollReveal();

  const collections = [
    { title: "Corsets", image: img("corset.jpg.jpeg"), products: corsetProducts, href: "/collections?cat=corsets" },
    { title: "Coord Sets", image: img("co_ordsets.jpg.jpeg"), products: coordProducts, href: "/collections?cat=coord-sets" },
    { title: "Dresses", image: img("dresses.jpg.jpeg"), products: dressProducts, href: "/collections?cat=dresses" },
    { title: "Tops", image: img("tops.jpg.jpeg"), products: topProducts, href: "/collections?cat=tops" },
    { title: "Celebrity Edit", image: img("celebrity_1.jpg.jpeg"), products: celebrityProducts, href: "/collections?cat=celebrity-edit" },
  ];

  useEffect(() => {
    setHeroLoaded(true);
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Custom Cursor */}
      <div
        className="cursor-dot hidden lg:block"
        style={{ transform: `translate(${mousePos.x - 4}px, ${mousePos.y - 4}px)` }}
      />
      <div
        className="cursor-outline hidden lg:block"
        style={{ transform: `translate(${mousePos.x - 20}px, ${mousePos.y - 20}px)` }}
      />

      {/* Grain Overlay */}
      <div className="grain" />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Dark Background */}
        <div className="absolute inset-0 bg-black" />

        {/* Animated Gold Grid Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
          <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/5 to-transparent" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
          <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/5 to-transparent" />
        </div>

        {/* Rotating Gold Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] border border-gold/10 rounded-full"
            style={{ animation: "spin 30s linear infinite" }}
          />
          <div
            className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] border border-gold/5 rounded-full"
            style={{ animation: "spin 20s linear infinite reverse" }}
          />
          <div
            className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] border border-gold/15 rounded-full"
            style={{ animation: "spin 15s linear infinite" }}
          />
        </div>

        {/* Diamond Shapes */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] border border-gold/5"
            style={{ animation: "spin 25s linear infinite", transform: "rotate(45deg)" }}
          />
          <div
            className="absolute w-[150px] h-[150px] md:w-[200px] md:h-[200px] border border-gold/10"
            style={{ animation: "spin 18s linear infinite reverse", transform: "rotate(45deg)" }}
          />
        </div>

        {/* Gold Particles */}
        {heroLoaded && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="gold-particle"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}

        {/* Radial Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div
            className={`transition-all duration-[2000ms] ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            {/* Decorative Line Above */}
            <div className="flex items-center gap-4 mb-8 justify-center">
              <div className="w-12 h-[1px] bg-gold/40" />
              <div className="w-2 h-2 bg-gold/60 rotate-45" />
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>

            <p className="text-gold/60 text-xs md:text-sm tracking-[0.8em] uppercase text-center mb-6">
              Est. 2024 — Luxury Fashion House
            </p>

            <h1
              className="text-6xl md:text-8xl lg:text-[10rem] font-extralight tracking-[0.2em] gold-text-gradient text-center leading-none"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              SAIKO
            </h1>
            <h1
              className="text-6xl md:text-8xl lg:text-[10rem] font-extralight tracking-[0.4em] text-white/90 text-center leading-none mt-2"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              STUDIO
            </h1>

            {/* Decorative Line Below */}
            <div className="flex items-center gap-4 mt-8 justify-center">
              <div className="w-12 h-[1px] bg-gold/40" />
              <div className="w-2 h-2 bg-gold/60 rotate-45" />
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>
          </div>

          <div
            className={`transition-all duration-[1500ms] delay-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-gray-400/80 text-sm md:text-base tracking-[0.3em] max-w-xl mx-auto text-center mb-12 font-light">
              Where bold meets beautiful
            </p>
          </div>

          <div
            className={`transition-all duration-[1500ms] delay-[1000ms] ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Link
              href="/collections"
              className="group relative inline-block px-16 py-5 overflow-hidden"
            >
              <span className="absolute inset-0 border border-gold/30 transition-all duration-700 group-hover:border-gold group-hover:rotate-1" />
              <span className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transition: "all 0.7s ease" }} />
              <span className="relative text-gold text-xs tracking-[0.4em] uppercase group-hover:text-white transition-colors duration-500 font-light">
                Explore Collection
              </span>
              <span className="absolute bottom-0 left-0 h-[1px] bg-gold w-0 group-hover:w-full transition-all duration-1000" />
              <span className="absolute top-0 right-0 w-[1px] bg-gold h-0 group-hover:h-full transition-all duration-1000 delay-100" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-gold/30 text-[10px] tracking-[0.5em] uppercase">Scroll to Discover</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold/40 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gold animate-bounce" />
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-gold/20" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-gold/20" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-gold/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-gold/20" />
      </section>

      {/* Marquee */}
      <Marquee text="✦ SALES ✦ CORSETS ✦ COORD SETS ✦ DRESSES ✦ TOPS ✦ CELEBRITY EDIT ✦ BOLD ✦ BEAUTIFUL ✦" />

      {/* Featured Collections */}
      <section className="py-24 md:py-32">
        <div ref={heroReveal.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 transition-all duration-1000 ${heroReveal.revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="text-gold/60 text-xs tracking-[0.5em] uppercase text-center mb-4">Discover</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase gold-text-gradient text-center">
            Our Collections
          </h2>
          <div className={`line-draw mx-auto mt-6 max-w-[200px] ${heroReveal.revealed ? "revealed" : ""}`} />
        </div>

        {collections.map((col, idx) => {
          const reveal = useScrollReveal();
          const isEven = idx % 2 === 0;
          const featuredProduct = col.products[0];

          return (
            <div
              key={col.title}
              ref={reveal.ref}
              className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32 transition-all duration-1000 ${reveal.revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? "lg:direction-rtl" : ""}`}>
                {/* Image Side */}
                <div className={`relative group ${!isEven ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={col.image}
                      alt={col.title}
                      fill
                      className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-700 m-4" />
                  </div>

                  {/* Floating Tag */}
                  <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-sm px-4 py-2 border border-gold/30">
                    <span className="text-gold text-xs tracking-[0.3em] uppercase">{col.products.length} Products</span>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`py-8 lg:py-0 ${!isEven ? "lg:order-1 lg:text-right" : ""}`}>
                  <p className="text-gold/40 text-xs tracking-[0.5em] uppercase mb-4">Collection {String(idx + 1).padStart(2, "0")}</p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-widest uppercase mb-6">
                    {col.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
                    Discover our curated selection of {col.title.toLowerCase()}, crafted for those who dare to stand out. Each piece tells a story of bold design and uncompromising quality.
                  </p>

                  {/* Featured Product Preview */}
                  {featuredProduct && (
                    <div
                      className="mb-8 cursor-pointer"
                      onMouseEnter={() => setHoveredProduct(featuredProduct.slug)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <Link href={`/products/${featuredProduct.slug}`} className="block">
                        <div className="relative aspect-[3/4] overflow-hidden mb-4 max-w-[200px]">
                          <Image
                            src={featuredProduct.images[0]}
                            alt={featuredProduct.title}
                            fill
                            className={`object-cover transition-all duration-700 ${hoveredProduct === featuredProduct.slug ? "scale-110" : "scale-100"}`}
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-500" />
                        </div>
                        <p className="text-white text-sm tracking-wide">{featuredProduct.title}</p>
                        <p className="text-gold text-sm">₹ {featuredProduct.price}</p>
                      </Link>
                    </div>
                  )}

                  <Link
                    href={col.href}
                    className="group inline-flex items-center gap-3 text-gold text-sm tracking-[0.3em] uppercase"
                  >
                    <span className="relative">
                      View Collection
                      <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gold transition-all duration-500" />
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Marquee */}
      <Marquee text="✦ THE SAIKO STUDIO ✦ BOLD FASHION ✦ LUXURY REDEFINED ✦ CRAFTED FOR THE FEARLESS ✦" />

      {/* Stats Section */}
      <section ref={statsReveal.ref} className="py-24 md:py-32 border-t border-b border-gold/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <AnimatedCounter target={500} suffix="+" />
            <AnimatedCounter target={50} suffix="+" />
            <AnimatedCounter target={15} suffix="K+" />
            <AnimatedCounter target={100} suffix="%" />
          </div>
          <div className="flex justify-center gap-8 md:gap-16 mt-8 text-center">
            {["Happy Clients", "Unique Pieces", "Social Following", "Satisfaction"].map((label) => (
              <span key={label} className="text-gray-500 text-xs tracking-[0.2em] uppercase">
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section ref={aboutReveal.ref} className={`py-24 md:py-32 transition-all duration-1000 ${aboutReveal.revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold/60 text-xs tracking-[0.5em] uppercase mb-6">Join the Movement</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase mb-6">
            Stay <span className="gold-text-gradient">Connected</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-12 max-w-md mx-auto">
            Be the first to know about new drops, exclusive offers, and behind-the-scenes content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent border border-gold/30 px-6 py-4 text-white text-sm tracking-wider placeholder:text-gray-600 focus:outline-none focus:border-gold transition-colors"
            />
            <button className="gold-gradient text-black font-semibold tracking-[0.2em] uppercase text-sm px-8 py-4 hover:opacity-90 transition-opacity whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Final Marquee */}
      <Marquee text="✦ SALES ✦ CORSETS ✦ COORD SETS ✦ DRESSES ✦ TOPS ✦ CELEBRITY EDIT ✦ BOLD ✦ BEAUTIFUL ✦" />
    </div>
  );
}
