// src/components/Gallery.tsx
type GalleryItem = {
    title?: string | null;
    image: string; // required
};

export default function Gallery({ galleryImages = [] }: { galleryImages?: GalleryItem[] }) {
    if (!galleryImages.length) return null;

    return (
        <section className="bg-white">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-8 sm:mb-10">
                    Gallery
                </h2>

                {/* Responsive grid — 1 col mobile, 2 tablet, 3 desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {galleryImages.map((g, i) => {
                        const caption = g.title ?? "";
                        return (
                            <figure
                                key={i}
                                className="rounded-2xl overflow-hidden border bg-white shadow-sm"
                            >
                                <img
                                    src={g.image}
                                    alt={caption || "Grateful Grazing board"}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full object-cover aspect-[4/3]" // nice consistent crop
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                />
                                {caption ? (
                                    <figcaption className="p-3 text-sm text-neutral-700">{caption}</figcaption>
                                ) : null}
                            </figure>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
