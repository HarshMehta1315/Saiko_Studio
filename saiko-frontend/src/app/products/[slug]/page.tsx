"use client";

import { useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { allProducts, getProductBySlug } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const product = getProductBySlug(resolvedParams.slug);
  const { addToCart } = useCart();
  const router = useRouter();

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const sizes = ["XS", "S", "M", "L", "XL"];
  const handleQty = (delta: number) => setQuantity((q) => Math.max(1, q + delta));

  const handleAddToCart = () => {
    addToCart({
      title: product.title,
      slug: product.slug,
      price: parseInt(product.price.replace(/,/g, '')),
      compareAtPrice: product.compareAtPrice ? parseInt(product.compareAtPrice.replace(/,/g, '')) : undefined,
      image: product.images[0],
      quantity,
      size: selectedSize || undefined,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <div className="bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-3">
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
                  <Image src={imgSrc} alt={`${product.title} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 relative aspect-[3/4] bg-[#0a0a0a] overflow-hidden">
              <Image src={product.images[selectedImage]} alt={product.title} fill className="object-contain" priority />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-wide mb-3" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              {product.compareAtPrice && (
                <span className="text-gray-500 text-lg line-through">₹ {product.compareAtPrice}</span>
              )}
              <span className="text-[#d4a853] text-xl font-semibold">₹ {product.price}</span>
              {product.onSale && (
                <span className="bg-[#d4a853] text-black text-xs font-semibold px-2 py-1 uppercase tracking-wide">Sale</span>
              )}
            </div>

            <div className="h-px bg-white/10 mb-6" />

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
                <svg className={`w-5 h-5 transition-transform ${descOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="pb-4 text-gray-400 text-sm leading-relaxed">
                {product.description || "Premium quality piece from The Saiko Studio collection."}
                {product.material && <p className="mt-2 text-xs uppercase tracking-wide">Material: {product.material}</p>}
              </div>
            </details>

            <div className="mb-6 pt-2">
              <p className="text-sm tracking-widest uppercase mb-3">
                Size{selectedSize && <span className="text-[#d4a853]"> — {selectedSize}</span>}
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
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

            <div className="mb-6">
              <p className="text-sm tracking-widest uppercase mb-3">Quantity</p>
              <div className="inline-flex items-center border border-white/30">
                <button onClick={() => handleQty(-1)} className="w-12 h-12 text-white hover:text-[#d4a853] transition-colors flex items-center justify-center text-lg">−</button>
                <span className="w-12 h-12 flex items-center justify-center text-sm border-x border-white/30">{quantity}</span>
                <button onClick={() => handleQty(1)} className="w-12 h-12 text-white hover:text-[#d4a853] transition-colors flex items-center justify-center text-lg">+</button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full font-semibold tracking-widest uppercase text-sm py-4 transition-all duration-300 mb-3 ${
                addedToCart
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-[#121212] text-white border border-white/30 hover:bg-[#d4a853] hover:text-black hover:border-[#d4a853]'
              }`}
            >
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>

            <div className="text-xs text-gray-400 mb-6">
              Order within <span className="text-[#d4a853]">03 Hrs 25 Mins 00 Secs</span> to ensure delivery by <span className="text-white">May 10</span>
            </div>

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
                <svg className={`w-5 h-5 transition-transform ${shippingOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="pb-4 space-y-4 text-gray-400 text-sm leading-relaxed">
                <div>
                  <h3 className="text-white font-medium mb-1 uppercase text-xs tracking-wide">Returns Policy</h3>
                  <p>We accept returns within 7 days of delivery. Items must be unused, unwashed, and in original packaging with tags attached. Sale items are final sale and cannot be returned.</p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1 uppercase text-xs tracking-wide">Shipping</h3>
                  <p>Free shipping on orders above ₹999. Standard delivery takes 5-7 business days. Express delivery available at checkout for ₹199.</p>
                </div>
              </div>
            </details>

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

        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-semibold tracking-widest uppercase mb-8" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/products/${rp.slug}`} className="group block">
                  <div className="relative overflow-hidden bg-[#0a0a0a] aspect-[3/4] mb-3">
                    <Image src={rp.images[0]} alt={rp.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    {rp.onSale && (
                      <span className="absolute top-2 left-2 bg-[#d4a853] text-black text-xs font-semibold px-2 py-0.5 uppercase tracking-wider">Sale</span>
                    )}
                  </div>
                  <h3 className="text-white text-xs tracking-wide group-hover:text-[#d4a853] transition-colors mb-1 line-clamp-1">{rp.title}</h3>
                  <div className="flex items-center gap-2">
                    {rp.compareAtPrice ? (
                      <>
                        <span className="text-[#d4a853] text-xs font-semibold">₹ {rp.price}</span>
                        <span className="text-gray-500 text-xs line-through">₹ {rp.compareAtPrice}</span>
                      </>
                    ) : (
                      <span className="text-[#d4a853] text-xs font-semibold">₹ {rp.price}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
