// src/components/MenuCard.js
"use client";

export default function MenuCard({ title, subtitle, price, items }) {
    const list = Array.isArray(items) ? items : [];

    const scrollToQuote = () => {
        const el = document.getElementById("quote");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <article className="group rounded-2xl border bg-white/90 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                    {price ? (
                        <span className="shrink-0 rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-sm font-semibold">
                            {price}
                        </span>
                    ) : null}
                </div>

                {subtitle ? <p className="mt-1 text-sm text-neutral-600">{subtitle}</p> : null}

                {list.length ? (
                    <ul className="mt-4 grid gap-1.5 text-sm text-neutral-800 list-disc ml-5">
                        {list.map((it, i) => (
                            <li key={i}>{it}</li>
                        ))}
                    </ul>
                ) : null}
            </div>

            <div className="px-5 pb-5">
                <button
                    className="w-full rounded-xl border bg-white hover:bg-neutral-50 active:bg-neutral-100 text-sm py-2.5 transition"
                    aria-label={`Get a quote for ${title}`}
                    onClick={scrollToQuote}
                >
                    Get a Quote
                </button>
            </div>
        </article>
    );
}
