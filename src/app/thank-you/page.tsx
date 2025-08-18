// src/app/thank-you/page.tsx
export const metadata = { title: "Thanks for your review!" };

export default function ThankYou() {
    return (
        <main className="min-h-[60vh] grid place-items-center px-4">
            <div className="max-w-lg text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                    Thanks for your review!
                </h1>
                <p className="text-neutral-700">
                    We’ve received your message. After a quick moderation check,
                    we’ll publish it on the site. 💛
                </p>
                <a
                    href="/"
                    className="inline-block mt-6 rounded-xl bg-lime-600 hover:bg-lime-700 text-white px-5 py-2.5 font-semibold"
                >
                    Back to home
                </a>
            </div>
        </main>
    );
}
