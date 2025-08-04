// src/components/FAQ.tsx
import fs from 'fs';
import path from 'path';

interface FaqRecord {
    question: string;
    answer: string;
}

export default function FAQ() {
    const dir = path.join(process.cwd(), 'data', 'faq');
    const allFaqs: FaqRecord[] = [];

    try {
        const filenames = fs.readdirSync(dir).filter(fn => fn.endsWith('.json'));

        filenames.forEach(filename => {
            const filePath = path.join(dir, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            if (fileContents) {
                const data = JSON.parse(fileContents);
                if (Array.isArray(data)) {
                    allFaqs.push(...data);
                } else {
                    allFaqs.push(data);
                }
            }
        });
    } catch (error) {
        console.error("Could not read or parse FAQ data:", error);
        return null;
    }

    if (allFaqs.length === 0) {
        return null;
    }

    return (
        <section id="faq" className="py-16">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">FAQ</h2>
                <dl className="space-y-6">
                    {allFaqs.map((item, index) => (
                        // Using the index ensures the key is always unique
                        <div key={`${item.question}-${index}`}>
                            <dt className="font-semibold text-lg">{item.question}</dt>
                            <dd className="mt-2 text-gray-700">{item.answer}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
