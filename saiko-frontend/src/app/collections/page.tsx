"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/lib/products";

const collections = [
  { label: "All", key: "all" },
  { label: "The (IN) Complete Illusion", key: "incomplete-illusion" },
  { label: "Corsets", key: "corsets" },
  { label: "Coord Sets", key: "coord-sets" },
  { label: "Dresses", key: "dresses" },
  { label: "Tops", key: "tops" },
  { label: "Bottoms", key: "bottoms" },
  { label: "Accessories", key: "accessories" },
  { label: "Celebrity Edit", key: "celebrity-edit" },
];

const getCategoryProducts = (key: string) => {
  switch (key) {
    case "corsets":
      return allProducts.filter((p) =>
        p.title.toLowerCase().includes("corset") || p.slug.includes("corset")
      );
    case "coord-sets":
      return allProducts.filter((p) => p.slug.includes("coord"));
    case "dresses":
      return allProducts.filter((p) =>
        p.title.toLowerCase().includes("dress") || p.slug.includes("dress")
      );
    case "tops":
      return allProducts.filter((p) =>
        p.title.toLowerCase().includes("top") || p.title.toLowerCase().includes("shirt") || p.title.toLowerCase().includes("bodysuit")
      );
    case "celebrity-edit":
      return allProducts.filter((p) =>
        p.slug.includes("celebrity") || [47, 48, 49, 50, 51].includes(Number(p.id))
      );
    case "incomplete-illusion":
      return allProducts.slice(0, 20);
    case "bottoms":
      return allProducts.filter((p) =>
        p.title.toLowerCase().includes("trouser") || p.title.toLowerCase().includes("skirt") || p.title.toLowerCase().includes("pant")
      );
    case "accessories":
      return allProducts.filter((p) =>
        p.title.toLowerCase().includes("belt")
      );
    default:
      return allProducts;
  }
};

function CollectionsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("cat") || "all";
  const products = getCategoryProducts(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex flex-wrap gap-4 mb-12 justify-center">
        {collections.map((col) => (
          <Link
            key={col.key}
            href={`/collections?cat=${col.key}`}
            className={`text-sm tracking-wider uppercase transition-colors px-3 py-1 border-b ${
              category === col.key
                ? "text-gold border-gold"
                : "text-gray-400 border-transparent hover:text-gold hover:border-gold"
            }`}
          >
            {col.label}
          </Link>
        ))}
      </nav>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Collections() {
  return (
    <div>
      <div className="bg-black-light border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase gold-text-gradient text-center">
            Shop
          </h1>
        </div>
      </div>

      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-400">Loading...</div>}>
        <CollectionsContent />
      </Suspense>
    </div>
  );
}
