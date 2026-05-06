import Image from "next/image";
import Link from "next/link";

const img = (name: string) => `/images/${name}`;

export default function AboutUs() {
  return (
    <div>
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={img("co_ordsets.jpg.jpeg")}
          alt="About Us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase gold-text-gradient">
            About Us
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Saiko Studio is a ready to wear, vibrant and trendy fashion brand based in Mumbai, India.
            The founders Saloni Mehta and Tejal Mehta, who by the way are a mother daughter duo,
            believe in the power of colors and its effect on the human psyche. The brand believes
            in spreading joy through unconventional eclectic color palettes with trendy silhouettes
            to STAND out of the crowd.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="text-center">
            <div className="relative w-64 h-64 mx-auto mb-6 overflow-hidden rounded-full border-2 border-gold/30 bg-black-light flex items-center justify-center">
              <span className="text-gold text-6xl font-light">SM</span>
            </div>
            <h3 className="text-gold text-xl tracking-wider uppercase mb-3">Saloni Mehta</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Saloni Mehta is a NIFT, Mumbai and University of Southampton, UK, graduate with
              specialization in B.Des and MA in Fashion Management respectively.
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-64 h-64 mx-auto mb-6 overflow-hidden rounded-full border-2 border-gold/30 bg-black-light flex items-center justify-center">
              <span className="text-gold text-6xl font-light">TM</span>
            </div>
            <h3 className="text-gold text-xl tracking-wider uppercase mb-3">Tejal Mehta</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Co-founder of The Saiko Studio, bringing creative vision and business acumen to the brand.
            </p>
          </div>
        </div>

        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 overflow-hidden">
              <Image
                src={img("dresses.jpg.jpeg")}
                alt="About Store"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div>
              <h2 className="text-gold text-2xl tracking-widest uppercase mb-4">About Store</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Every color has a different effect on every human, depending on their experiences
                with the colors. Hence the brand believes in spreading joy through an amalgamation
                of colors and fashion. The combination of two creative minds with different yet
                similar backgrounds. Also makes us a great team!
              </p>
              <Link
                href="/collections"
                className="inline-block gold-gradient text-black font-semibold tracking-widest uppercase text-sm px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Explore Shop
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2 relative h-80 overflow-hidden">
              <Image
                src={img("tops.jpg.jpeg")}
                alt="About Store"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="md:order-1">
              <h2 className="text-gold text-2xl tracking-widest uppercase mb-4">About Store</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                The aesthetics of the brand are for the ones who are experimental, bold and not
                afraid to stand out. A lot of attention is given to color palette selection and
                garment curation, following global standards for quality construction. The brand
                believes in having fit to size construction to endure all those curves!
              </p>
              <Link
                href="/collections"
                className="inline-block gold-gradient text-black font-semibold tracking-widest uppercase text-sm px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Explore Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
