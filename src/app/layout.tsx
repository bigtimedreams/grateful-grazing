// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

type Settings = {
  phone?: string;
  email?: string;
  facebook_url?: string;
  service_area?: string;
};

function readSettings(): Settings {
  const p = path.join(process.cwd(), "data", "settings.json");
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as Settings;
  } catch {
    return {};
  }
}

export const metadata: Metadata = {
  metadataBase: new URL("https://gratefulgrazing.netlify.app"),
  title: {
    default: "Grateful Grazing | Mobile Charcuterie",
    template: "%s | Grateful Grazing",
  },
  description:
    "Hand-crafted grazing boards & a mobile charcuterie cart that bring gratitude, flavor, and connection to every gathering.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://gratefulgrazing.netlify.app/",
    title: "Grateful Grazing | Mobile Charcuterie",
    description:
      "Hand-crafted grazing boards & a mobile charcuterie cart for weddings, showers, and celebrations.",
    images: [{ url: "/Brisheroheader.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grateful Grazing | Mobile Charcuterie",
    description:
      "Hand-crafted grazing boards & a mobile charcuterie cart for weddings, showers, and celebrations.",
    images: ["/Brisheroheader.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = readSettings();

  // LocalBusiness (Catering) JSON-LD
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Grateful Grazing",
    url: "https://gratefulgrazing.netlify.app/",
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    sameAs: settings.facebook_url ? [settings.facebook_url] : undefined,
    areaServed: settings.service_area || undefined,
    contactPoint: settings.phone
      ? [{ "@type": "ContactPoint", telephone: settings.phone, contactType: "customer service" }]
      : undefined,
  };

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://gratefulgrazing.netlify.app/" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-neutral-900">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl">Grateful Grazing</Link>
            <nav className="hidden sm:flex gap-6 text-sm">
              <Link href="/#menu" className="hover:underline">Menus</Link>
              <Link href="/#quote" className="hover:underline">Get a Quote</Link>
              {settings.email && <a href={`mailto:${settings.email}`} className="hover:underline">Contact</a>}
            </nav>
          </div>
        </header>

        {/* Page (no global width cap; sections control their own width) */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8 text-sm grid gap-6 sm:flex sm:items-start sm:justify-between">
            <div>
              <div className="font-semibold text-lg">Grateful Grazing</div>
              {settings.service_area && <div className="text-neutral-600">{settings.service_area}</div>}
            </div>
            <div className="space-y-1 text-neutral-700">
              {settings.phone && <div>📞 {settings.phone}</div>}
              {settings.email && <div>✉️ {settings.email}</div>}
              {settings.facebook_url && (
                <a className="underline" href={settings.facebook_url} target="_blank">Facebook</a>
              )}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
