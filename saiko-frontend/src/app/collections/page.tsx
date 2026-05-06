import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const img = (name: string) => `/images/${name}`;

const allProducts = [
  { id: "1", title: "Emerald Corset Belt", price: "1,500", compareAtPrice: "2,750", images: [img("EmeraldCORSETBELT.jpg.jpeg"), img("EmeraldCorsetbeltback.jpg.jpeg")], slug: "emerald-corset-belt", onSale: true },
  { id: "2", title: "GABBY Pink Corset", price: "5,550", images: [img("3aad94ac-bfc6-4ca1-a613-be095caad508.jpg.jpeg")], slug: "gabby-pink-corset" },
  { id: "3", title: "Celestial Long Dress", price: "8,400", images: [img("celestial.png"), img("celestial2.png")], slug: "celestial-long-dress" },
  { id: "4", title: "Baby J Unisex Shirt", price: "3,000", compareAtPrice: "4,000", images: [img("CopyofIMG_6808.jpg.jpeg"), img("CopyofIMG_6816.jpg.jpeg")], slug: "baby-j-unisex-shirt", onSale: true },
  { id: "5", title: "Scream Unisex Shirt", price: "3,000", compareAtPrice: "4,000", images: [img("IMG_6834.jpg.jpeg"), img("IMG_6838.jpg.jpeg")], slug: "scream-unisex-shirt", onSale: true },
  { id: "6", title: "Tiger Unisex Shirt", price: "3,000", compareAtPrice: "4,000", images: [img("IMG_6970.jpg.jpeg"), img("IMG_6974.jpg.jpeg")], slug: "tiger-unisex-shirt", onSale: true },
  { id: "7", title: "Lost Unisex Shirt", price: "3,000", compareAtPrice: "4,000", images: [img("IMG_6953.jpg.jpeg"), img("IMG_6957.jpg.jpeg")], slug: "lost-unisex-shirt", onSale: true },
  { id: "8", title: "Blue Electric halter neck corset", price: "5,250", images: [img("CORSET_38d42f33-d9b2-4e23-a91b-9caf1f2990ba.jpg.jpeg"), img("corswt2.jpg.jpeg")], slug: "blue-electric-halter-neck-corset" },
  { id: "9", title: "Brown Parachute trousers", price: "3,000", compareAtPrice: "4,250", images: [img("Untitled-1_7fe9da76-b82c-405b-8dd7-4e644f9c78ab.jpg.jpeg"), img("parachutebbrownpant2.jpg.jpeg")], slug: "brown-parachute-trousers", onSale: true },
  { id: "10", title: "Freddy coord set", price: "8,250", images: [img("new.jpg.jpeg"), img("NEW3.jpg.jpeg")], slug: "freddy-coord-set" },
  { id: "11", title: "Fleur corset", price: "5,250", images: [img("2_efb5b9ac-2fbe-4f6c-92b7-4c8750c03f9b.jpg.jpeg"), img("3.jpg.jpeg")], slug: "fleur-corset" },
  { id: "12", title: "knit Baby J coord set", price: "3,000", compareAtPrice: "3,150", images: [img("Untitled-2_14_55176c6b-e0f8-4322-998b-c036d230c584.jpg.jpeg"), img("Untitled-2_12_72bfd0ab-9b0c-4dcc-85b0-aa5858764cd5.jpg.jpeg")], slug: "knit-baby-j-coord-set", onSale: true },
  { id: "13", title: "Psych Underwire bralette top", price: "5,000", images: [img("Untitled-8_2.png")], slug: "psych-underwire-bralette-top" },
  { id: "14", title: "Baby J corset", price: "5,750", images: [img("Untitled-2_53.jpg.jpeg")], slug: "baby-j-corset" },
  { id: "15", title: "Violet mesh corset top", price: "6,000", images: [img("Untitled-2_52_copy_2.jpg.jpeg")], slug: "violet-mesh-corset-top" },
  { id: "16", title: "PINK CORSET TOP BACK TIE", price: "4,500", images: [img("pinkoffshoulder1.jpg.jpeg")], slug: "pink-corset-top-back-tie" },
];

const collections = [
  { label: "All", href: "/collections" },
  { label: "The (IN) Complete Illusion", href: "/collections/the-incomplete-illusion" },
  { label: "Corsets", href: "/collections/corsets" },
  { label: "Coord Sets", href: "/collections/coord-sets" },
  { label: "Dresses", href: "/collections/dresses" },
  { label: "Tops", href: "/collections/tops" },
  { label: "Bottoms", href: "/collections/bottoms" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Celebrity edit", href: "/collections/celebrity-edit" },
];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex flex-wrap gap-4 mb-12 justify-center">
          {collections.map((col) => (
            <Link
              key={col.label}
              href={col.href}
              className="text-gray-400 hover:text-gold text-sm tracking-wider uppercase transition-colors px-3 py-1 border-b border-transparent hover:border-gold"
            >
              {col.label}
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
