// src/app/page.tsx
import Image from "next/image"
import MenuCard from "@/components/MenuCard"
import AboutBri from "@/components/AboutBri"
import Gallery from "@/components/Gallery"
import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"
import QuoteForm from "@/components/QuoteForm"
import StickyCTA from "@/components/StickyCTA"
import Footer from "@/components/Footer"

import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

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
}
interface SettingsData {
  phone: string;
  email: string;
  facebook_url: string;
  service_area: string;
}

// --- Data Fetching Function ---
function getData() {
  // Helper to read and parse a JSON file
  const readJsonFile = (filePath: string) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  };

  // Read homepage content
  const homepagePath = path.join(process.cwd(), 'data', 'homepage.json');
  const homepageData: HomepageData = readJsonFile(homepagePath);

  // Read all menu items
  const menuDir = path.join(process.cwd(), 'data', 'menu');
  const menuFilenames = fs.readdirSync(menuDir);
  const menuData: MenuCardData[] = menuFilenames.map(filename => {
    const filePath = path.join(menuDir, filename);
    return readJsonFile(filePath);
  });

  // Read site settings
  const settingsPath = path.join(process.cwd(), 'data', 'settings.json');
  const settingsData: SettingsData = readJsonFile(settingsPath);

  return { homepageData, menuData, settingsData };
}


export default function Home() {
  const { homepageData, menuData, settingsData } = getData();

  return (
    <>
      <main className="font-sans text-brown-800 bg-stone-50">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-lime-100 to-amber-50 pb-24">
          <div className="max-w-5xl mx-auto pt-20 text-center px-4">
            <Image
              src="/Brisheroheader.png"
              alt="Grateful Grazing Logo"
              width={400} height={400}
              className="mx-auto mb-6 drop-shadow-lg"
              priority
            />
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
              {homepageData.hero_headline}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-brown-700 max-w-3xl mx-auto">
              {homepageData.hero_subheadline}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#menu" className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg transition">See the Menu</a>
              <a href="#quote" className="px-6 py-3 rounded-full bg-lime-600 hover:bg-lime-700 text-white font-semibold shadow-lg transition">Get a Quote</a>
            </div>
          </div>
        </section>

        {/* Menu Highlights */}
        <section id="menu" className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Menu Highlights</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {menuData.map(card => <MenuCard key={card.title} {...card} />)}
          </div>
        </section>

        {/* About Bri */}
        <AboutBri
          headline={homepageData.about_headline}
          text={homepageData.about_text}
          image={homepageData.about_image}
        />

        {/* CMS-driven Sections */}
        <Gallery />
        <Testimonials />
        <FAQ />

        {/* Quote Form */}
        <QuoteForm />

        {/* Sticky CTA */}
        <StickyCTA />
      </main>

      {/* Footer */}
      <Footer {...settingsData} />
    </>
  )
}
