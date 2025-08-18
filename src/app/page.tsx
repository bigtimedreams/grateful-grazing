// src/app/page.tsx
import Image from "next/image";
import MenuCard from "@/components/MenuCard";
import AboutBri from "@/components/AboutBri";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import QuoteForm from "@/components/QuoteForm";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// --- Data Type Definitions ---
interface HomepageData {
  hero_headline: string;
  hero_subheadline: string;
  about_headline: string;
  about_text: string;
  about_image: string;
}
interface MenuCardData {
  title: string;
  subtitle: string;
  price: string;
  items: string[];
  image?: string;
}
interface GalleryImage { title?: string; image: string; }
interface TestimonialData { name: string; quote: string; avatar?: string; }
interface FaqItem { question: string; answer: string; }
interface SettingsData { phone: string; email: string; facebook_url: string; service_area: string; }

// --- helpers ---
const ROOT = process.cwd();
const readJson = <T,>(rel: string, fallback: Partial<T> = {}): T => {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8")) as T;
  } catch {
    return fallback as T;
  }
};
const readFrontmatterDir = <T,>(relDir: string): T[] => {
  const dir = path.join(ROOT, relDir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".markdown"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data } = matter(raw);
      return data as T;
    });
};

function getData() {
  const homepageData = readJson<HomepageData>("data/homepage.json");
  const settingsData = readJson<SettingsData>("data/settings.json");

  const menuDir = path.join(ROOT, "data", "menu");
  const menuData: MenuCardData[] = fs.existsSync(menuDir)
    ? fs
      .readdirSync(menuDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => readJson<MenuCardData>(path.join("data", "menu", f)))
    : [];

  const galleryData = readFrontmatterDir<GalleryImage>("data/gallery");
  const testimonialsData = readFrontmatterDir<TestimonialData>("data/testimonials");
  const faqData = readFrontmatterDir<FaqItem>("data/faq");

  return { homepageData, settingsData, menuData, galleryData, testimonialsData, faqData };
}

export default function Home() {
  const { homepageData, settingsData, menuData, galleryData, testimonialsData, faqData } = getData();

  // FAQ JSON-LD (AEO)
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <main className="font-sans text-brown-800 bg-stone-50">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-lime-100 to-amber-50 pb-24">
          <div className="max-w-screen-2xl mx-auto pt-16 sm:pt-20 text-center px-4 sm:px-6">
            <Image
              src="/Brisheroheader.png"
              alt="Grateful Grazing logo"
              width={360}
              height={360}
              className="mx-auto mb-4 sm:mb-6 drop-shadow-lg"
              priority
            />
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {homepageData.hero_headline}
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-brown-700 max-w-3xl mx-auto">
              {homepageData.hero_subheadline}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="#menu"
                className="px-5 sm:px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg transition"
              >
                See the Menu
              </a>
              <a
                href="#quote"
                className="px-5 sm:px-6 py-3 rounded-full bg-lime-600 hover:bg-lime-700 text-white font-semibold shadow-lg transition"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </section>

        {/* Menu Highlights */}
        <section id="menu" className="max-w-screen-2xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
            Menu Highlights
          </h2>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {menuData.map((card) => (
              <MenuCard
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                price={card.price}
                items={card.items}
                image={card.image}
              />
            ))}
          </div>
        </section>

        {/* About Bri */}
        <AboutBri
          headline={homepageData.about_headline}
          text={homepageData.about_text}
          image={homepageData.about_image}
        />

        {/* CMS-driven Sections */}
        <Gallery galleryImages={galleryData} />
        <Testimonials testimonials={testimonialsData} />
        <FAQ faqItems={faqData} />

        {/* Public review form (anchor target for #review) */}
        <ReviewForm />

        {/* Quote Form (anchor target for #quote with sticky-header offset) */}
        <section id="quote" className="scroll-mt-24">
          <QuoteForm />
        </section>

        {/* Sticky CTA */}
        <StickyCTA />
      </main>

      {/* Footer */}
      <Footer {...settingsData} />

      {/* AEO: FAQ JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
