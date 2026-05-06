import Image from "next/image";
import Link from "next/link";

const dummy = (text: string, w: number = 600, h: number = 800) =>
  `https://placehold.co/${w}x${h}/0a0a0a/d4a853?text=${encodeURIComponent(text)}`;

interface CollectionBannerProps {
  image: string;
  title: string;
  products: {
    id: string;
    title: string;
    price: string;
    compareAtPrice?: string;
    images: string[];
    slug: string;
    onSale?: boolean;
  }[];
}

export default function CollectionBanner({ image, title, products }: CollectionBannerProps) {
  return (
    <section className="mb-16">
      <div className="relative h-64 md:h-80 mb-8 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-widest uppercase gold-text-gradient">
            {title}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`} className="group block">
            <div className="relative overflow-hidden bg-black-light aspect-[3/4] mb-3">
              <Image
                src={product.images[0] || dummy(product.title)}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.onSale && (
                <span className="absolute top-2 left-2 gold-gradient text-black text-xs font-semibold px-2 py-0.5 uppercase tracking-wider">
                  Sale
                </span>
              )}
            </div>
            <h3 className="text-white text-xs tracking-wide group-hover:text-gold transition-colors mb-1 line-clamp-1">
              {product.title}
            </h3>
            <div className="flex items-center gap-2">
              {product.compareAtPrice ? (
                <>
                  <span className="text-gold text-xs font-semibold">₹ {product.price}</span>
                  <span className="text-gray-500 text-xs line-through">₹ {product.compareAtPrice}</span>
                </>
              ) : (
                <span className="text-gold text-xs font-semibold">₹ {product.price}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
