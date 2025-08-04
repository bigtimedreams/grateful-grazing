// src/components/AboutBri.tsx
import Image from "next/image";
import ReactMarkdown from 'react-markdown';

// Define the props that this component will receive from page.tsx
interface AboutBriProps {
    headline: string;
    text: string;
    image: string;
}

export default function AboutBri({ headline, text, image }: AboutBriProps) {
    return (
        <section id="about" className="bg-lime-50 py-20 px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Photo: Use the 'image' prop */}
                <div className="order-2 md:order-1">
                    <Image
                        src={image}
                        alt="Bri with her grazing cart"
                        width={600}
                        height={400}
                        className="rounded-2xl shadow-xl object-cover w-full h-auto"
                        priority
                    />
                </div>

                {/* Copy: Use the 'headline' and 'text' props */}
                <div className="order-1 md:order-2">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        {headline}
                    </h2>
                    {/* The 'prose' class helps style the markdown output */}
                    <div className="prose text-brown-700 leading-relaxed max-w-none">
                        {/* By splitting the text by newline, we can give each paragraph a unique key */}
                        {text.split('\n').map((paragraph, index) => (
                            <ReactMarkdown key={index}>{paragraph}</ReactMarkdown>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}