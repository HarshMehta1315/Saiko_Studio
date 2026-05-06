import Image from "next/image";
import Link from "next/link";

const dummy = (text: string, w: number = 600, h: number = 800) =>
  `https://placehold.co/${w}x${h}/0a0a0a/d4a853?text=${encodeURIComponent(text)}`;

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: string;
    compareAtPrice?: string;
    images: string[];
    slug: string;
    onSale?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-black-light aspect-[3/4] mb-4">
        <Image
          src={product.images[0] || dummy(product.title)}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.title}
            fill
            className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          />
        )}
        {product.onSale && (
          <span className="absolute top-3 left-3 gold-gradient text-black text-xs font-semibold px-3 py-1 uppercase tracking-wider">
            Sale
          </span>
        )}
      </div>
      <h3 className="text-white text-sm tracking-wide group-hover:text-gold transition-colors mb-2">
        {product.title}
      </h3>
      <div className="flex items-center gap-2">
        {product.compareAtPrice ? (
          <>
            <span className="text-gold text-sm font-semibold">₹ {product.price}</span>
            <span className="text-gray-500 text-sm line-through">₹ {product.compareAtPrice}</span>
          </>
        ) : (
          <span className="text-gold text-sm font-semibold">₹ {product.price}</span>
        )}
      </div>
    </Link>
  );
}
