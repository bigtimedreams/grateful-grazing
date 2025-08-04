// src/components/Testimonials.tsx
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

interface TestimonialRecord {
    name: string;
    quote: string;
    avatar?: string;
}

export default function Testimonials() {
    const dir = path.join(process.cwd(), 'data', 'testimonials');
    const allTestimonials: TestimonialRecord[] = [];

    try {
        const filenames = fs.readdirSync(dir).filter(fn => fn.endsWith('.json'));

        filenames.forEach(filename => {
            const filePath = path.join(dir, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            if (fileContents) {
                const data = JSON.parse(fileContents);
                if (Array.isArray(data)) {
                    allTestimonials.push(...data);
                } else {
                    allTestimonials.push(data);
                }
            }
        });
    } catch (error) {
        console.error("Could not read or parse Testimonials data:", error);
        return null;
    }

    if (allTestimonials.length === 0) {
        return null;
    }

    return (
        <section id="testimonials" className="bg-lime-50 py-16">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">What People Say</h2>
                <div className="grid gap-8 md:grid-cols-2">
                    {allTestimonials.map((item, index) => (
                        // Using the index ensures the key is always unique
                        <div key={`${item.name}-${index}`} className="p-6 bg-white rounded-xl shadow flex flex-col">
                            {item.avatar && (
                                <Image
                                    src={item.avatar}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full mb-4 self-start"
                                />
                            )}
                            <blockquote className="italic mb-4 flex-grow">“{item.quote}”</blockquote>
                            <p className="text-right font-semibold">— {item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
