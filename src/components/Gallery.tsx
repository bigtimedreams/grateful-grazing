// src/components/Gallery.tsx
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

interface GalleryRecord {
    title: string;
    image: string;
}

export default function Gallery() {
    const dir = path.join(process.cwd(), 'data', 'gallery');
    const allImages: GalleryRecord[] = [];

    try {
        // Read all the .json files from the data/gallery directory
        const filenames = fs.readdirSync(dir).filter(fn => fn.endsWith('.json'));

        filenames.forEach(filename => {
            const filePath = path.join(dir, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            if (fileContents) {
                const data = JSON.parse(fileContents);
                // This handles both single-item files and files with a list of items
                if (Array.isArray(data)) {
                    allImages.push(...data);
                } else {
                    allImages.push(data);
                }
            }
        });
    } catch (error) {
        console.error("Could not read or parse Gallery data. Make sure the 'data/gallery' folder exists.", error);
        // If the folder is missing or there's an error, we can return null so the page doesn't crash.
        return null;
    }

    // If there are no images after reading the files, don't render the section.
    if (allImages.length === 0) {
        return null;
    }

    return (
        <section id="gallery" className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-8">Event Gallery</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {allImages.map((item, index) => (
                    // Using a combination of image path and index for a robust unique key
                    <figure key={`${item.image}-${index}`} className="overflow-hidden rounded-xl shadow">
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
