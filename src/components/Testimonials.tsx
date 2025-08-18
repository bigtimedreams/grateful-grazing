// src/components/Testimonials.tsx
"use client";

import { useState } from "react";

type Testimonial = { name: string; quote: string; avatar?: string };

function InitialAvatar({ name }: { name: string }) {
    const initials = (name || "")
        .split(/\s+/)
        .map((s) => s[0] || "")
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="w-10 h-10 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center border font-semibold">
            {initials || "GG"}
        </div>
    );
}

function PersonAvatar({ name, src }: { name: string; src?: string }) {
    const [broken, setBroken] = useState(false);
    if (!src || broken) return <InitialAvatar name={name} />;
    return (
        <img
            src={src}
            alt={name ? `${name}'s avatar` : "Client avatar"}
            className="w-10 h-10 rounded-full object-cover border"
            loading="lazy"
            decoding="async"
            onError={() => setBroken(true)}
        />
    );
}

export default function Testimonials({ testimonials = [] as Testimonial[] }) {
    if (!testimonials.length) return null;

    return (
        <section className="bg-gradient-to-br from-amber-50 to-lime-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-8 sm:mb-10">
                    What our clients say
                </h2>

                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <article
                            key={i}
                            className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col gap-3"
                            itemScope
                            itemType="https://schema.org/Review"
                        >
                            <div className="flex items-center gap-3">
                                <PersonAvatar name={t.name} src={t.avatar} />
                                <div
                                    className="font-medium"
                                    itemProp="author"
                                    itemScope
                                    itemType="https://schema.org/Person"
                                >
                                    <span itemProp="name" className="capitalize">
                                        {t.name}
                                    </span>
                                </div>
                            </div>

                            <blockquote
                                className="text-neutral-800 italic leading-relaxed"
                                itemProp="reviewBody"
                            >
                                “{t.quote}”
                            </blockquote>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
