import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Julian Vance — Aura Editorial",
};

import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/footer/Footer";
import { SafeImage } from "@/components/marketplace/SafeImage";
import { ArrowRight } from "lucide-react";

const books = [
  {
    title: "The Concrete Horizon",
    subtitle: "Novel • 2023",
    image:
      "https://books.google.com/books/content?id=port1&printsec=frontcover&img=1&zoom=1",
  },
  {
    title: "Echoes in the Grid",
    subtitle: "Essay Collection • 2020",
    image:
      "https://books.google.com/books/content?id=port2&printsec=frontcover&img=1&zoom=1",
  },
  {
    title: "Structures of Silence",
    subtitle: "Novel • 2017",
    image:
      "https://books.google.com/books/content?id=port3&printsec=frontcover&img=1&zoom=1",
  },
  {
    title: "The Glass Atrium",
    subtitle: "Novella • 2014",
    image:
      "https://books.google.com/books/content?id=port4&printsec=frontcover&img=1&zoom=1",
  },
];

const timelineItems = [
  {
    date: "Fall 2024",
    title: "Residency: The Foundation",
    description:
      "A six-month research residency focusing on brutalist civic structures in Eastern Europe.",
    active: true,
  },
  {
    date: "Spring 2025",
    title: "New Manuscript Delivery",
    description:
      "Working title: &lsquo;The Monolith&rsquo;. A departure into speculative architectural fiction.",
    active: false,
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HomeHeader />

      <main id="main-content" className="w-full px-edge-margin-mobile md:px-edge-margin-desktop max-w-container-max mx-auto py-12 md:py-24">
        {/* Hero / Bio section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap">
          {/* Portrait */}
          <div className="md:col-span-4">
            <div className="aspect-[3/4] bg-surface-container-low border border-outline-variant overflow-hidden">
              <SafeImage
                src="https://books.google.com/books/content?id=julianVance&printsec=frontcover&img=1&zoom=1"
                alt="Julian Vance"
                className="object-cover w-full h-full grayscale"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-8 flex flex-col justify-center md:pl-12">
            <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6">
              Julian Vance
            </h1>
            <div className="w-12 h-px bg-primary mb-8" />
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Julian Vance is a novelist and essayist whose work explores the
              intersections of architecture, memory, and the built environment.
              His debut novel <em>The Concrete Horizon</em> was shortlisted for
              the International Booker Prize, establishing him as one of the
              most distinctive voices in contemporary literary fiction. He lives
              and works between Berlin and Lisbon, drawing from the
              brutalist landscapes that shape his singular aesthetic.
            </p>
            <div className="mt-8 flex gap-4">
              <span className="font-label-md text-label-md uppercase tracking-widest border border-outline-variant px-3 py-1 text-on-surface-variant">
                Novelist
              </span>
              <span className="font-label-md text-label-md uppercase tracking-widest border border-outline-variant px-3 py-1 text-on-surface-variant">
                Essayist
              </span>
            </div>
          </div>
        </section>

        <hr className="border-t border-outline-variant mb-section-gap" />

        {/* Body of Work + Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Body of Work (8 cols) */}
          <section className="md:col-span-8 md:pr-12">
            <h2 className="font-headline-md text-headline-md text-primary mb-12 flex items-center gap-4">
              <span className="font-body-md italic text-outline">01.</span>
              Body of Work
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
              {books.map((book) => (
                <article
                  key={book.title}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[2/3] bg-surface-container mb-6 overflow-hidden border border-outline-variant relative">
                    <SafeImage
                      src={book.image}
                      alt={book.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-body-md font-bold text-primary mb-1">
                    {book.title}
                  </h3>
                  <p className="font-caption text-caption uppercase tracking-widest text-on-surface-variant">
                    {book.subtitle}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Sidebar (4 cols) */}
          <aside className="md:col-span-4 mt-16 pt-16 border-t border-outline-variant md:mt-0 md:pt-0 md:border-t-0 md:border-l md:border-outline-variant md:pl-12">
            {/* Upcoming Projects */}
            <section>
              <h2 className="font-headline-md text-headline-md text-primary mb-8 flex items-center gap-4">
                <span className="font-body-md italic text-outline">02.</span>
                Upcoming
              </h2>

              <div className="space-y-8 relative before:absolute before:left-[5px] before:top-0 before:h-full before:w-[1px] before:bg-outline-variant">
                {timelineItems.map((item) => (
                  <div
                    key={item.title}
                    className="relative flex items-start"
                  >
                    {/* Dot */}
                    <span
                      className={`w-3 h-3 rounded-full border shrink-0 absolute left-0 -translate-x-1/2 z-10 ${
                        item.active
                          ? "border-primary bg-primary"
                          : "border-outline-variant bg-surface"
                      }`}
                    />

                    {/* Content card */}
                    <div className="w-[calc(100%-2rem)] ml-6 pb-6 border-b border-outline-variant">
                      <p className="font-caption text-caption uppercase tracking-widest text-on-surface-variant mb-1">
                        {item.date}
                      </p>
                      <h4 className="font-body-md font-bold text-primary">
                        {item.title}
                      </h4>
                      <p className="font-label-md text-label-md text-on-surface-variant mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Engage card */}
            <div className="mt-16 bg-surface-container-low border border-outline-variant p-8">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">
                Engage
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                Receive quarterly dispatches, reading lists, and early access to
                essays.
              </p>
              <button
                type="button"
                className="w-full bg-primary text-primary-foreground font-label-lg text-label-lg uppercase tracking-widest py-4 flex items-center justify-center gap-2 hover:bg-surface-tint transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Follow Author
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
