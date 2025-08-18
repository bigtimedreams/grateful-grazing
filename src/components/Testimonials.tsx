// src/components/Testimonials.tsx
type T = { name: string; quote: string; avatar?: string };

export default function Testimonials({ testimonials = [] as T[] }) {
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
                            className="rounded-2xl border bg-white p-5 shadow-sm"
                            itemScope
                            itemType="https://schema.org/Review"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={t.avatar || "/default-avatar.png"}
                                    alt={t.name ? `${t.name}'s avatar` : "Client avatar"}
                                    className="w-10 h-10 rounded-full object-cover border"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="font-medium" itemProp="author" itemScope itemType="https://schema.org/Person">
                                    <span itemProp="name">{t.name}</span>
                                </div>
                            </div>

                            <blockquote className="mt-3 text-neutral-800" itemProp="reviewBody">
                                “{t.quote}”
                            </blockquote>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
