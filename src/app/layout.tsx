// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
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
    const raw = fs.readFileSync(p, "utf8");
    return JSON.parse(raw) as Settings;
  } catch {
    return {};
  }
}

export const metadata = { title: "Grateful Grazing" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = readSettings();

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl">Grateful Grazing</Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/#menu" className="hover:underline">Menus</Link>
              <Link href="/#quote" className="hover:underline">Get a Quote</Link>
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="hover:underline">Contact</a>
              )}
            </nav>
          </div>
        </header>

        {/* Page */}
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t">
          <div className="max-w-5xl mx-auto px-4 py-8 text-sm flex flex-wrap gap-4 justify-between">
            <div>
              <div className="font-semibold">Grateful Grazing</div>
              {settings.service_area && (
                <div className="text-neutral-600">{settings.service_area}</div>
              )}
            </div>
            <div className="space-y-1 text-neutral-700">
              {settings.phone && <div>📞 {settings.phone}</div>}
              {settings.email && <div>✉️ {settings.email}</div>}
              <div className="flex gap-3">
                {settings.facebook_url && (
                  <a className="underline" href={settings.facebook_url} target="_blank">
                    Facebook
                  </a>
                )}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
