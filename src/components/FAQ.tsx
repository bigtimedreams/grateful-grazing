// src/components/FAQ.tsx

// Define the shape of a single FAQ item
interface FaqItem {
    question: string;
    answer: string;
}

// Define the props the component will receive
interface FaqProps {
    faqItems: FaqItem[];
}

// Accept the 'faqItems' prop to receive data from the page
export default function FAQ({ faqItems }: FaqProps) {
    // If no items are passed, don't render anything
    if (!faqItems || faqItems.length === 0) {
        return null;
    }

    // Your original styling and layout for the FAQ section
    return (
        <section id="faq" className="py-16">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">FAQ</h2>
                <dl className="space-y-6">
                    {faqItems.map((item) => (
                        <div key={item.question}>
                            <dt className="font-semibold text-lg">{item.question}</dt>
                            <dd className="mt-2 text-gray-700">{item.answer}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}