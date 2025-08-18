// src/components/ReviewForm.tsx
// Static Netlify form — no JS required
export default function ReviewForm() {
    return (
        <section id="review" className="bg-white scroll-mt-24">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                    Leave a review
                </h2>

                <form
                    name="testimonial-submissions"
                    method="POST"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    action="/thank-you/"             // <-- trailing slash so it maps to /thank-you/index.html
                    encType="multipart/form-data"
                    className="grid gap-4 max-w-xl"
                >
                    {/* Netlify needs these hidden fields */}
                    <input type="hidden" name="form-name" value="testimonial-submissions" />
                    <p className="hidden">
                        <label>
                            Don’t fill this out if you’re human:
                            <input name="bot-field" />
                        </label>
                    </p>

                    <label className="grid gap-1">
                        <span className="text-sm font-medium">Your name</span>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Jane Doe"
                            className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-lime-500"
                        />
                    </label>

                    <label className="grid gap-1">
                        <span className="text-sm font-medium">Your review</span>
                        <textarea
                            name="quote"
                            required
                            rows={4}
                            placeholder="Tell us what you loved!"
                            className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-lime-500"
                        />
                    </label>

                    <label className="grid gap-1">
                        <span className="text-sm font-medium">Headshot (optional)</span>
                        <input type="file" name="avatar" accept="image/*" className="block text-sm" />
                    </label>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="rounded-xl bg-lime-600 hover:bg-lime-700 text-white px-5 py-2.5 font-semibold"
                        >
                            Submit review
                        </button>
                        <a href="#testimonials" className="rounded-xl border px-5 py-2.5">
                            Cancel
                        </a>
                    </div>

                    <p className="text-xs text-neutral-600">
                        We may lightly edit for length/clarity. Your email isn’t collected.
                    </p>
                </form>
            </div>
        </section>
    );
}
