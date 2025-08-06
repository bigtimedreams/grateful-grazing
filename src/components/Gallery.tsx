// src/components/Gallery.tsx
import Image from 'next/image';

// Define the shape of a single image record
interface GalleryRecord {
    title: string;
    image: string;
}

// Define the props the component will receive
interface GalleryProps {
    galleryImages: GalleryRecord[];
}

// Accept the 'galleryImages' prop to receive data from the page
export default function Gallery({ galleryImages }: GalleryProps) {
    // If no images are passed, don't render anything
    if (!galleryImages || galleryImages.length === 0) {
        return null;
    }

    // Your original styling and layout for the gallery section
    return (
        <section id="gallery" className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-8">Event Gallery</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {galleryImages.map((item) => (
                    <figure key={item.title} className="overflow-hidden rounded-xl shadow">
                        {item.image && (
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={500}
                                height={500}
                                className="object-cover w-full h-64"
                            />
                        )}
                        <figcaption className="text-center mt-2 p-2">
                            {item.title}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}