"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const img = (name: string) => `/images/${name}`;

const products: Record<
  string,
  {
    title: string;
    price: string;
    compareAtPrice?: string;
    images: string[];
    description: string;
    material: string;
    sizes: string[];
    badge?: string;
  }
> = {
  "monologo-neon-cropped-top": {
    title: "Monologo Neon cropped Top",
    price: "2,000",
    compareAtPrice: "2,750",
    images: [
      img("IMG_6974.jpg.jpeg"),
      img("IMG_6970.jpg.jpeg"),
      img("IMG_6957.jpg.jpeg"),
      img("IMG_6953.jpg.jpeg"),
    ],
    description:
      "High round closed neck top with side/back zipper. A bold statement piece from The (IN) Complete Illusion collection.",
    material: "100% POLYESTER",
    sizes: ["XS", "S", "M", "L"],
    badge: "Sale",
  },
  "emerald-corset-belt": {
    title: "Emerald Corset Belt",
    price: "1,500",
    compareAtPrice: "2,750",
    images: [
      img("EmeraldCORSETBELT.jpg.jpeg"),
      img("EmeraldCorsetbeltback.jpg.jpeg"),
    ],
    description:
      "A stunning emerald green corset belt that adds a pop of color to any outfit.",
    material: "POLYESTER BLEND",
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Sale",
  },
  "gabby-pink-corset": {
    title: "GABBY Pink Corset",
    price: "5,550",
    images: [img("C6935C1F-E469-4571-AF28-950E6BEBD3B6.jpg.jpeg")],
    description:
      "A beautiful pink corset that exudes elegance and confidence.",
    material: "COTTON BLEND",
    sizes: ["XS", "S", "M", "L"],
  },
  "celestial-long-dress": {
    title: "Celestial Long Dress",
    price: "8,400",
    images: [img("celebrity_1.jpg.jpeg"), img("celebrity_1.jpg_1.jpeg")],
    description:
      "A celestial-inspired long dress perfect for making a statement.",
    material: "CHIFFON",
    sizes: ["S", "M", "L", "XL"],
  },
  "corset-top": {
    title: "Corset Top",
    price: "3,500",
    images: [img("corset.jpg.jpeg")],
    description: "Classic corset top for a structured look.",
    material: "POLYESTER",
    sizes: ["XS", "S", "M", "L"],
  },
  "coord-set": {
    title: "Co-ord Set",
    price: "4,200",
    images: [
      img("co_ordsets.jpg.jpeg"),
      img("co_ordsets.jpg_1.jpeg"),
      img("co_ordsets.jpg_2.jpeg"),
    ],
    description: "Stylish co-ord set for effortless dressing.",
    material: "COTTON",
    sizes: ["S", "M", "L"],
  },
  "dresses": {
    title: "Dress Collection",
    price: "6,000",
    images: [
      img("dresses.jpg.jpeg"),
      img("dresses.jpg_1.jpeg"),
      img("dresses.jpg_2.jpeg"),
    ],
    description: "Elegant dresses for every occasion.",
    material: "MIXED",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  "tops": {
    title: "Tops Collection",
    price: "2,500",
    images: [
      img("tops.jpg.jpeg"),
      img("tops.jpg_1.jpeg"),
      img("tops.jpg_2.jpeg"),
    ],
    description: "Trendy tops for your wardrobe.",
    material: "POLYESTER",
    sizes: ["S", "M", "L"],
  },
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const product = products[resolvedParams.slug];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(false);

  if (!product) {
    notFound();
  }

  const handleQty = (delta: number) => {
    setQuantity((q) => Math.max(1, q + delta));
  };

  return (
    <div className="bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-3">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-x-visible lg:w-[80px] flex-shrink-0">
              {product.images.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-[60px] h-[80px] lg:w-[80px] lg:h-[100px] flex-shrink-0 border-2 transition-colors ${
                    selectedImage === idx
                      ? "border-[#d4a853]"
                      : "border-transparent hover:border-[#d4a853]/50"
                  }`}
                >
                  <Image
                    src={imgSrc}
                    alt={`${product.title} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative aspect-[3/4] bg-[#0a0a0a] overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-wide mb-3" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              {product.compareAtPrice && (
                <span className="text-gray-500 text-lg line-through">
                  ₹ {product.compareAtPrice}
                </span>
              )}
              <span className="text-[#d4a853] text-xl font-semibold">
                ₹ {product.price}
              </span>
              {product.badge && (
                <span className="bg-[#d4a853] text-black text-xs font-semibold px-2 py-1 uppercase tracking-wide">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-6" />

            {/* Description Accordion */}
            <details
              open={descOpen}
              onToggle={(e) => setDescOpen((e.target as HTMLDetailsElement).open)}
              className="border-b border-white/10 mb-2"
            >
              <summary
                className="cursor-pointer py-4 text-sm tracking-widest uppercase font-medium flex justify-between items-center select-none"
                onClick={(e) => e.preventDefault()}
              >
                Description
                <svg
                  className={`w-5 h-5 transition-transform ${descOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="pb-4 text-gray-400 text-sm leading-relaxed">
                {product.description}
                <p className="mt-2 text-xs uppercase tracking-wide">
                  Material: {product.material}
                </p>
              </div>
            </details>

            {/* Size Selector */}
            <div className="mb-6 pt-2">
              <p className="text-sm tracking-widest uppercase mb-3">
                Size{selectedSize && <span className="text-[#d4a853]"> — {selectedSize}</span>}
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-[48px] px-3 border text-sm transition-colors uppercase tracking-wide ${
                      selectedSize === size
                        ? "border-[#d4a853] bg-[#d4a853] text-black"
                        : "border-white/30 text-white hover:border-[#d4a853]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm tracking-widest uppercase mb-3">Quantity</p>
              <div className="inline-flex items-center border border-white/30">
                <button
                  onClick={() => handleQty(-1)}
                  className="w-12 h-12 text-white hover:text-[#d4a853] transition-colors flex items-center justify-center text-lg"
                >
                  −
                </button>
                <span className="w-12 h-12 flex items-center justify-center text-sm border-x border-white/30">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQty(1)}
                  className="w-12 h-12 text-white hover:text-[#d4a853] transition-colors flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-[#121212] text-white border border-white/30 font-semibold tracking-widest uppercase text-sm py-4 hover:bg-[#d4a853] hover:text-black hover:border-[#d4a853] transition-colors mb-3">
              Add to Cart
            </button>

            {/* Shipping Countdown */}
            <div className="text-xs text-gray-400 mb-6">
              Order within <span className="text-[#d4a853]">03 Hrs 25 Mins 00 Secs</span> to ensure delivery by{" "}
              <span className="text-white">May 10</span>
            </div>

            {/* Shipping & Returns Accordion */}
            <details
              open={shippingOpen}
              onToggle={(e) => setShippingOpen((e.target as HTMLDetailsElement).open)}
              className="border-t border-b border-white/10 mb-6"
            >
              <summary
                className="cursor-pointer py-4 text-sm tracking-widest uppercase font-medium flex justify-between items-center select-none"
                onClick={(e) => e.preventDefault()}
              >
                Shipping & Returns
                <svg
                  className={`w-5 h-5 transition-transform ${shippingOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="pb-4 space-y-4 text-gray-400 text-sm leading-relaxed">
                <div>
                  <h3 className="text-white font-medium mb-1 uppercase text-xs tracking-wide">Returns Policy</h3>
                  <p>
                    We accept returns within 7 days of delivery. Items must be unused, unwashed, and in original packaging with tags attached. Sale items are final sale and cannot be returned.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1 uppercase text-xs tracking-wide">Shipping</h3>
                  <p>
                    Free shipping on orders above ₹999. Standard delivery takes 5-7 business days. Express delivery available at checkout for ₹199.
                  </p>
                </div>
              </div>
            </details>

            {/* Promo Features */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-white/10 p-4 text-center">
                <svg className="w-6 h-6 mx-auto mb-2 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <p className="text-xs tracking-widest uppercase">Free Shipping</p>
              </div>
              <div className="border border-white/10 p-4 text-center">
                <svg className="w-6 h-6 mx-auto mb-2 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <p className="text-xs tracking-widest uppercase">Hassle-Free Exchanges</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
