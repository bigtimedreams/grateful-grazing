// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { readSite } from "@/lib/content";

export const metadata = { title: "Grateful Grazing" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // App Router layouts can be async, but reading a small JSON sync is fine here:
  const site = readSite();

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl">
              {site.businessName || "Grateful Grazing"}
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/menu" className="hover:underline">Menus</Link>
              <Link href="/gallery" className="hover:underline">Gallery</Link>
              <a href="mailto:{site.email}" className="hover:underline">Contact</a>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>

        <footer className="mt-16 border-t">
          <div className="max-w-5xl mx-auto px-4 py-8 text-sm flex flex-wrap gap-4 justify-between">
            <div>
              <div className="font-semibold">{site.businessName}</div>
              {site.serviceArea && <div className="text-neutral-600">{site.serviceArea}</div>}
            </div>
            <div className="space-y-1 text-neutral-700">
              {site.phone && <div>📞 {site.phone}</div>}
              {site.email && <div>✉️ {site.email}</div>}
              <div className="flex gap-3">
                {site.instagram && <a className="underline" href={site.instagram} target="_blank">Instagram</a>}
                {site.facebook && <a className="underline" href={site.facebook} target="_blank">Facebook</a>}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
