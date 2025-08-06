// src/components/Testimonials.tsx
import Image from 'next/image';

// This defines the shape of a single testimonial
interface Testimonial {
    name: string;
    quote: string;
    avatar?: string;
}

// This tells the component to expect a prop called "testimonials"
// which is an array of Testimonial objects
interface TestimonialsProps {
    testimonials: Testimonial[];
}

// By adding "{ testimonials }: TestimonialsProps", we are telling the component
// to accept the data from page.tsx
export default function Testimonials({ testimonials }: TestimonialsProps) {
    // If no data was passed, don't show anything
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    // Your original styling and layout for the testimonials section
    return (
        <section id="testimonials" className="bg-lime-50 py-16">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">What People Say</h2>
                <div className="grid gap-8 md:grid-cols-2">
                    {testimonials.map((item) => (
                        <div key={item.name} className="p-6 bg-white rounded-xl shadow flex flex-col">
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