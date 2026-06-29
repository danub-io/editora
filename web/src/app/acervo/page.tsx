import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Acervo — GospelReads.",
};

import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";
import { SafeImage } from "@/components/marketplace/SafeImage";

const trendingBooks = [
  {
    title: "Concrete Horizons",
    author: "Marcus Chen",
    price: "$18.00",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Ink & Water",
    author: "Sarah Jenkins",
    price: "Free",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "The Noise",
    author: "David Alarie",
    price: "$21.50",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Botanical Thoughts",
    author: "Elena Rostova",
    price: "$19.00",
    image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "The Glass Atrium",
    author: "Marcus Chen",
    price: "$16.50",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Quiet Rooms",
    author: "Isabel Farrow",
    price: "$22.00",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "After Midnight",
    author: "Thomas Hart",
    price: "$14.00",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "The Last Review",
    author: "Nina Okonkwo",
    price: "Free",
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600&auto=format&fit=crop",
  },
];

const newVoices = [
  {
    name: "Julian Thorne",
    role: "Debut Novelist",
    book: "Whispers in the Glass",
    description:
      "A haunting exploration of memory and identity set in a crumbling coastal town.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Maya Lin",
    role: "Short Story Writer",
    book: "Fragments of a Season",
    description:
      "Twelve interlinked stories tracing the quiet devastations of a single autumn.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Arthur Pendelton",
    role: "Essayist",
    book: "The Observer's Dilemma",
    description:
      "Essays on art, distance, and the ethics of looking from one of our sharpest cultural critics.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
  },
];

export default function AcervoPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HomeHeader />

      <main id="main-content" className="flex-1 max-w-container-max mx-auto px-edge-margin-mobile md:px-edge-margin-desktop py-section-gap">
        {/* Page header */}
        <header className="mb-section-gap border-b border-outline-variant pb-8">
          <h1 className="font-display-lg text-display-lg text-primary">
            The Marketplace
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl leading-relaxed">
            Curated selections from established masters and compelling new voices
            in contemporary literature.
          </p>
        </header>

        {/* Main + Sidebar grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-outline-variant">
          {/* Main (9 cols) */}
          <div className="lg:col-span-9 lg:border-r border-outline-variant lg:pr-gutter pb-section-gap lg:pb-0">
            {/* Editor's Choice */}
            <section className="mb-section-gap">
              <div className="border-b border-outline-variant pb-4 mb-8">
                <h2 className="font-headline-lg text-headline-lg text-primary">
                  Editor&apos;s Choice
                </h2>
                <p className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mt-2">
                  Issue No. 42
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-gutter">
                {/* Book cover */}
                <div className="md:w-5/12 relative">
                  <div className="aspect-[2/3] border border-outline-variant bg-surface-container-low overflow-hidden">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop"
                      alt="The Architecture of Silence"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute top-2 left-2 bg-primary text-surface font-label-md text-label-md px-2 py-1">
                    Featured
                  </span>
                </div>

                {/* Book details */}
                <div className="md:w-7/12 flex flex-col justify-center">
                  <h3 className="font-headline-md text-headline-md text-primary">
                    The Architecture of Silence
                  </h3>
                  <p className="font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant mb-6 border-b border-outline-variant pb-4">
                    By Eleanor Vance
                  </p>
                  <p className="font-body-lg text-body-lg text-primary leading-relaxed mb-4">
                    In the aftermath of a catastrophic event, a reclusive
                    architect retreats to a remote island where silence becomes
                    both sanctuary and prison. Through spare, luminous prose,
                    Eleanor Vance maps the architecture of grief — its
                    load-bearing walls, its hidden doors, its impossible
                    geometries.
                  </p>
                  <blockquote className="font-body-md text-body-md italic text-on-surface-variant mb-8 border-l-2 border-outline-variant pl-4">
                    &ldquo;A masterwork of restraint. Vance writes with the
                    precision of a seismograph, measuring tremors most novelists
                    cannot feel.&rdquo; — The New York Review of Books
                  </blockquote>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="bg-primary text-surface font-label-md text-label-md px-6 py-3 hover:bg-surface-tint transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Buy Now — $24.00
                    </button>
                    <button
                      type="button"
                      className="border border-primary text-primary font-label-md text-label-md px-6 py-3 hover:bg-primary hover:text-surface transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Read Sample
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Trending Fiction */}
            <section>
              <div className="border-b border-outline-variant pb-4 mb-8">
                <h2 className="font-headline-md text-headline-md text-primary">
                  Trending Fiction
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4">
                {trendingBooks.map((book, i) => {
                  const isLastCol = (i + 1) % 4 === 0;
                  const isBottomRow = i >= 4;
                  return (
                    <div
                      key={book.title}
                      className={`p-4 border-outline-variant hover:bg-surface transition-colors group cursor-pointer ${
                        !isLastCol ? "border-r" : ""
                      } ${!isBottomRow ? "border-b" : ""}`}
                    >
                      <div className="aspect-[2/3] mb-4 bg-surface-container-low relative overflow-hidden">
                        <SafeImage
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-label-lg text-label-lg text-primary mb-1 truncate">
                        {book.title}
                      </h4>
                      <p className="font-caption text-caption uppercase tracking-wider text-on-surface-variant mb-2">
                        {book.author}
                      </p>
                      <p className="font-label-md text-label-md text-primary">
                        {book.price}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar (3 cols) */}
          <aside className="lg:col-span-3 lg:pl-gutter pt-section-gap lg:pt-0">
            {/* New Voices */}
            <div className="sticky top-24">
              <section>
                <div className="border-b border-outline-variant pb-4 mb-8">
                  <h2 className="font-headline-md text-headline-md text-primary">
                    New Voices
                  </h2>
                </div>

                <div className="space-y-0">
                  {newVoices.map((author, i) => (
                    <div
                      key={author.name}
                      className={`pb-6 mb-6 ${
                        i < newVoices.length - 1
                          ? "border-b border-outline-variant"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden grayscale bg-surface-container-low shrink-0">
                          <img
                            src={author.image}
                            alt={author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-label-lg text-label-lg text-primary">
                            {author.name}
                          </h4>
                          <p className="font-caption text-caption uppercase tracking-wider text-on-surface-variant">
                            {author.role}
                          </p>
                        </div>
                      </div>
                      <h5 className="font-body-md font-bold mb-2">
                        {author.book}
                      </h5>
                      <p className="font-caption text-caption text-on-surface-variant mb-3 leading-relaxed">
                        {author.description}
                      </p>
                      <button
                        type="button"
                        className="font-label-md text-label-md uppercase tracking-widest text-primary border-b border-primary hover:text-on-surface-variant transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        Read Excerpt
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Subscribe */}
              <div className="mt-8 p-6 bg-primary text-surface">
                <h3 className="font-headline-md text-headline-md mb-2">
                  Subscribe
                </h3>
                <p className="font-caption text-caption opacity-80 mb-4">
                  Get weekly literary critiques, reading lists, and exclusive
                  early access to new releases.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-b border-surface/30 pb-2 text-surface font-label-md text-label-md placeholder-surface/50 focus:outline-none focus:border-surface mb-4"
                />
                <button
                  type="button"
                  className="w-full border border-surface text-surface py-2 font-label-md text-label-md uppercase tracking-widest hover:bg-surface hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
