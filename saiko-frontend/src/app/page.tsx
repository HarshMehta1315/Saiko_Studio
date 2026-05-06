import Image from "next/image";
import Link from "next/link";
import CollectionBanner from "@/components/CollectionBanner";
import ProductCard from "@/components/ProductCard";

const img = (name: string) => `/images/${name}`;

const corsetProducts = [
  { id: "1", title: "Emerald Corset Belt", price: "1,500", compareAtPrice: "2,750", images: [img("EmeraldCORSETBELT.jpg.jpeg"), img("EmeraldCorsetbeltback.jpg.jpeg")], slug: "emerald-corset-belt", onSale: true },
  { id: "2", title: "GABBY Pink Corset", price: "5,550", images: [img("3aad94ac-bfc6-4ca1-a613-be095caad508.jpg.jpeg")], slug: "gabby-pink-corset" },
  { id: "3", title: "Psych Underwire bralette top", price: "5,000", images: [img("Untitled-8_2.png")], slug: "psych-underwire-bralette-top" },
  { id: "4", title: "Baby J corset", price: "5,750", images: [img("Untitled-2_53.jpg.jpeg")], slug: "baby-j-corset" },
  { id: "5", title: "Violet mesh corset top", price: "6,000", images: [img("Untitled-2_52_copy_2.jpg.jpeg")], slug: "violet-mesh-corset-top" },
  { id: "6", title: "PINK CORSET TOP BACK TIE", price: "4,500", images: [img("pinkoffshoulder1.jpg.jpeg")], slug: "pink-corset-top-back-tie" },
  { id: "7", title: "CORSET BELT", price: "1,500", compareAtPrice: "2,750", images: [img("corsetbelt1.jpg.jpeg")], slug: "corset-belt", onSale: true },
  { id: "8", title: "NEWSPAPER SCRIBBLE CORSET", price: "5,250", images: [img("C6935C1F-E469-4571-AF28-950E6BEBD3B6.jpg.jpeg")], slug: "newspaper-scribble-corset" },
  { id: "9", title: "KISS AND TELL HANDKERCHIEF CORSET TOP", price: "5,000", images: [img("C5579E87-810A-4C2E-AEF1-6E3DE6BD84CF.jpg.jpeg")], slug: "kiss-and-tell-handkerchief-corset-top" },
  { id: "10", title: "ALL EYES ON YOU VELVET CORSET", price: "5,250", images: [img("printcorset.jpg.jpeg")], slug: "all-eyes-on-you-velvet-corset" },
  { id: "11", title: "SUNSET BLOCK CORSET", price: "4,750", images: [img("IMG_2280_bf8fc5f2-0434-4e2b-8e8d-3f12da1bd9d0.jpg.jpeg")], slug: "sunset-block-corset" },
  { id: "12", title: "MOTION THROUGH COLOUR BLOCKED CORSET", price: "5,250", images: [img("e23f1f_16e9551cfb9149ccae571d12298af0ba_mv2.jpg.jpeg")], slug: "motion-through-colour-blocked-corset" },
];

const coordProducts = [
  { id: "13", title: "COLOUR ME WITH EVERYTHING COORD", price: "4,000", compareAtPrice: "5,500", images: [img("IMG_4346-min.webp.jpeg")], slug: "colour-me-with-everything-coord", onSale: true },
  { id: "14", title: "Freddy coord set", price: "8,250", images: [img("new.jpg.jpeg"), img("NEW3.jpg.jpeg")], slug: "freddy-coord-set" },
  { id: "15", title: "knit Baby J coord set", price: "3,000", compareAtPrice: "3,150", images: [img("Untitled-2_14_55176c6b-e0f8-4322-998b-c036d230c584.jpg.jpeg"), img("Untitled-2_12_72bfd0ab-9b0c-4dcc-85b0-aa5858764cd5.jpg.jpeg")], slug: "knit-baby-j-coord-set", onSale: true },
  { id: "16", title: "Baby J denim coord set", price: "9,750", images: [img("coordset.jpg.jpeg")], slug: "baby-j-coord-set" },
  { id: "17", title: "MIRCHI COORD SET", price: "4,250", images: [img("mirchi1.jpg.jpeg")], slug: "mirchi-coord-set" },
  { id: "18", title: "CERULEAN PLAID COORD SET", price: "6,750", images: [img("Plaidcoordset7.jpg.jpeg")], slug: "plaid-coord-set" },
  { id: "19", title: "ZUMMER BREEZE COORD SET", price: "4,000", images: [img("zummerbreeze4.jpg.jpeg")], slug: "zummer-breeze-coord-set" },
  { id: "20", title: "MOTION THROUGH ORANGE AND RED COORD SET", price: "7,000", images: [img("IMG_0306-min.jpg.jpeg")], slug: "motion-through-orange-and-red-coord-set" },
  { id: "21", title: "MOTION THROUGH COLOUR BLOCKED COORD SET", price: "9,000", images: [img("e23f1f_16e9551cfb9149ccae571d12298af0ba_mv2.webp.jpeg")], slug: "motion-through-colour-blocked-coord-set" },
  { id: "22", title: "SUNSET BLOCK COORD SET", price: "7,250", images: [img("IMG_2280.jpg.jpeg")], slug: "sunset-block-coord-set" },
  { id: "23", title: "TRIP OVER ME COORD SET BLUE", price: "7,750", images: [img("IMG_1573-min.jpg.jpeg")], slug: "trip-over-me-coord-set-blue" },
  { id: "24", title: "COROLLA THREE PIECE COORD", price: "8,750", images: [img("F79B3249-9C4B-427C-A240-D770E302709F-min.jpg.jpeg")], slug: "corolla-three-piece-coord" },
];

const dressProducts = [
  { id: "25", title: "PINK FOLIO ONE SHOULDER RUFFLE DRESS", price: "5,250", images: [img("3BE77CE8-F42B-4FAA-B9D8-A16026E7AFB5-min.jpg.jpeg")], slug: "pink-folio-one-shoulder-ruffle-dress" },
  { id: "26", title: "Celestial Long Dress", price: "8,400", images: [img("celestial.png"), img("celestial2.png")], slug: "celestial-long-dress" },
  { id: "27", title: "Tiger cut out bodycon dress", price: "4,500", images: [img("Untitled-2_25.jpg.jpeg")], slug: "tiger-cut-out-bodycon-dress" },
  { id: "28", title: "KISS AND TELL DRESS", price: "2,500", images: [img("dress1.jpg.jpeg")], slug: "kiss-and-tell-dress" },
  { id: "29", title: "PINK SWIRL BARBIE DRESS", price: "4,000", images: [img("52CCDE87-C7A7-414F-BC44-3AA24BB555D8.jpg.jpeg")], slug: "pink-swirl-barbie-dress" },
  { id: "30", title: "MOTION THROUGH MAGENTA PINK", price: "5,750", images: [img("60ffb270cfdbaf00011b9c80.webp.jpeg")], slug: "motion-through-magenta-pink" },
  { id: "31", title: "MOTION THROUGH DIRTY PINK DRESS", price: "5,550", images: [img("62A377B4-D450-4DB2-A4A7-DDD35D95BEF7-min.jpg.jpeg")], slug: "motion-through-dirty-pink-dress" },
  { id: "32", title: "MOTION THROUGH BROWN DRESS", price: "6,050", images: [img("D02336E6-6508-4322-8CA2-8DE42669A952.jpg.jpeg")], slug: "motion-through-brown-dress" },
  { id: "33", title: "TRIP OVER MY DRESS", price: "5,250", images: [img("8BDF8DF7-369C-4669-B59A-A6A2A96DC761-min.jpg.jpeg")], slug: "trip-over-my-dres" },
  { id: "34", title: "EXTRA RED HOT MINI DRESS", price: "4,250", images: [img("IMG_1589.jpg.jpeg")], slug: "extra-red-hot-mini-dress" },
  { id: "35", title: "ALL OVER GREEN SWIRL RUFFLE DRESS", price: "5,250", images: [img("IMG_1612.jpg.jpeg")], slug: "all-over-green-swirl-ruffle-dress" },
];

const topProducts = [
  { id: "36", title: "Lost bodysuit", price: "2,000", compareAtPrice: "3,000", images: [img("Untitled-2_52_copy_3_1f5a72a3-9dfe-4d59-bbbf-134d30010951.jpg.jpeg")], slug: "lost-bodysuit", onSale: true },
  { id: "37", title: "Monologo Neon cropped Top", price: "2,000", compareAtPrice: "2,750", images: [img("Untitled-2_43_b4a551be-92ad-4e17-84f0-146a884c4650.jpg.jpeg")], slug: "monologo-neon-cropped-top", onSale: true },
  { id: "38", title: "Magenta cut out corset top", price: "4,500", images: [img("edit1_8b0789a0-1c6e-46b3-99e1-309537e6018f.jpg.jpeg")], slug: "magenta-cut-out-corset-top" },
  { id: "39", title: "KISS AND TELL HANDKERCHIEF CORSET TOP", price: "5,000", images: [img("C5579E87-810A-4C2E-AEF1-6E3DE6BD84CF.jpg.jpeg")], slug: "kiss-and-tell-handkerchief-corset-top" },
  { id: "40", title: "MONOLOGO ARABELLA TOP", price: "3,500", images: [img("D9165B09-87B4-4047-B438-D0BEB6DDA684.jpg.jpeg")], slug: "monologo-arabella-top" },
  { id: "41", title: "LAVA RED HALTER TOP", price: "6,000", images: [img("9D0B9988-0E11-45A9-B4D4-C2EA02C6BE48.jpg.jpeg")], slug: "lava-red-halter-top" },
  { id: "42", title: "COLOUR ME WITH EVERYTHING SHIRT", price: "2,250", images: [img("25B3C7AA-D028-4CBF-87C7-7A3A814ED183-min_a94b4e57-81e8-4f8f-bd50-8ee3290a3a16.jpg.jpeg")], slug: "colour-me-with-everything-shirt" },
  { id: "43", title: "MOTION THROUGH EMRALD TOP", price: "2,500", images: [img("IMG_7670_76e9a5c5-9ec8-4c3c-addf-64e80a4e3cb4.jpg.jpeg")], slug: "motion-through-emrald-top" },
  { id: "44", title: "PINK AND PURPLE UNIVERSE TOP", price: "2,500", images: [img("0F6B1CDB-A3FA-4E4E-A31B-95229E2A4C28-min_5f365e22-6454-49a8-bb91-dffd93207cc8.jpg.jpeg")], slug: "pink-and-purple-universe-top" },
  { id: "45", title: "FALLEN FLORET TOP", price: "4,250", images: [img("5834CEA9-D3E6-4C6C-A6C5-D4459A8CC6C6-min_d9d36048-f98d-40c6-93a9-0c24578bb52a.jpg.jpeg")], slug: "fallen-floret-top" },
  { id: "46", title: "ITS RAINING NEUTRONS TOP", price: "3,250", images: [img("D73A4B09-FE05-41E9-BE69-61531B99C4B9-min_3d094828-e27e-4e82-b945-6fc0a3ef5f3f.jpg.jpeg")], slug: "its-raining-neutrons-top" },
  { id: "47", title: "COROLLA CAPE JACKET", price: "3,250", images: [img("F79B3249-9C4B-427C-A240-D770E302709F-min_ef0741eb-bd2f-42ff-8e43-1cd28a6ee549.jpg.jpeg")], slug: "corolla-cape-jacket" },
];

const celebrityProducts = [
  { id: "48", title: "PINK FOLIO ONE SHOULDER RUFFLE DRESS", price: "5,250", images: [img("3BE77CE8-F42B-4FAA-B9D8-A16026E7AFB5-min.jpg.jpeg")], slug: "pink-folio-one-shoulder-ruffle-dress" },
  { id: "49", title: "UMBER CORSET", price: "5,250", images: [img("IMG_2029.jpg.jpeg")], slug: "umber-corset" },
  { id: "50", title: "SKITTLE BLUE CORSET", price: "5,500", images: [img("85B07E16-B592-459C-8875-A9431BFEC0C4-min.jpg.jpeg")], slug: "skittle-blue-corset" },
  { id: "51", title: "MOTION THROUGH ORANGE AND RED COORD SET", price: "7,000", images: [img("IMG_0306-min.jpg.jpeg")], slug: "motion-through-orange-and-red-coord-set" },
  { id: "52", title: "MOTION THROUGH COLOUR BLOCKED COORD SET", price: "9,000", images: [img("e23f1f_16e9551cfb9149ccae571d12298af0ba_mv2.webp.jpeg")], slug: "motion-through-colour-blocked-coord-set" },
  { id: "53", title: "ELECTRIC GREEN CORSET WITH DRAPED DRAWSTRING SKIRT", price: "8,750", images: [img("8CAA258F-3AC0-4B5D-BBD6-92FEAE81E297-min.jpg.jpeg")], slug: "electric-green-corset-with-draped-drawstring-skirt" },
  { id: "54", title: "BROWN TRIBAL VELVET CORSET", price: "5,400", images: [img("IMG_2468.jpg.jpeg")], slug: "brown-tribal-velvet-corset" },
  { id: "55", title: "HOT PINK SWIRL HALTER CROPPED TOP", price: "5,250", images: [img("F01D9466-4C3D-4C7C-9E3A-99DE88200E55.jpg.jpeg")], slug: "hot-pink-swirl-halter-cropped-top" },
  { id: "56", title: "KALEIDOSCOPIC GREEN TROUSER SUIT", price: "8,750", images: [img("IMG_1954.jpg.jpeg")], slug: "kaleidoscopic-green-trouser-suit" },
];

export default function Home() {
  return (
    <div>
      <section className="relative h-[70vh] md:h-[90vh] overflow-hidden">
        <Image
          src={img("web_banner_f_1.png")}
          alt="The Saiko Studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-widest uppercase gold-text-gradient mb-4">
            </h1>
            <p className="text-gray-300 text-sm md:text-base tracking-wider max-w-xl mx-auto px-4">
            </p>
            <Link
              href="/collections"
              // className="mt-8 inline-block gold-gradient text-black font-semibold tracking-widest uppercase text-sm px-8 py-3 hover:opacity-90 transition-opacity"
            >
              {/* Explore Shop */}
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CollectionBanner
          image={img("corset.jpg.jpeg")}
          title="Corsets"
          products={corsetProducts}
        />

        <CollectionBanner
          image={img("co_ordsets.jpg.jpeg")}
          title="Coord Sets"
          products={coordProducts}
        />

        <CollectionBanner
          image={img("dresses.jpg.jpeg")}
          title="Dresses"
          products={dressProducts}
        />

        <CollectionBanner
          image={img("tops.jpg.jpeg")}
          title="Tops"
          products={topProducts}
        />

        <CollectionBanner
          image={img("celebrity_1.jpg.jpeg")}
          title="Celebrity Edit"
          products={celebrityProducts}
        />
      </div>
    </div>
  );
}
