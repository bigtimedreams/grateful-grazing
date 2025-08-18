// src/components/Gallery.tsx
type GalleryItem = {
    title?: string | null; // title can be missing in your MD frontmatter
    image: string;         // image is required
};

export default function Gallery({ galleryImages = [] }: { galleryImages?: GalleryItem[] }) {
    if (!galleryImages.length) return null;

    return (
        <section className="bg-white">
            <div className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold tracking-tight mb-6">Gallery</h2>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
                    {galleryImages.map((g, i) => {
                        const img = g.image;
                        const caption = g.title ?? "";
                        return (
                            <figure
                                key={i}
                                className="mb-4 break-inside-avoid rounded-2xl overflow-hidden border bg-white shadow-sm"
                            >
                                {img && (
                                    <img
                                        src={img}
                                        alt={caption || "Gallery image"}
                                        className="w-full object-cover"
                                        loading="lazy"
                                    />
                                )}
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
