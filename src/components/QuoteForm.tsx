// components/QuoteForm.jsx
"use client"

import { useState } from "react"

export default function QuoteForm() {
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e: { preventDefault: () => void; currentTarget: any }) {
        e.preventDefault()
        setSending(true)
        setError("")

        const form = e.currentTarget
        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            date: form.date.value,
            guests: form.guests.value,
            message: form.message.value.trim(),
        }

        try {
            const res = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                // attempt to read server‐side error message
                const body = await res.json().catch(() => ({}))
                throw new Error(body.error || "Network error")
            }

            setSent(true)
            form.reset()
        } catch (err) {
            console.error("QuoteForm submission failed:", err)
            setError(
                err && typeof err === "object" && "message" in err && typeof (err as any).message === "string"
                    ? (err as any).message
                    : "Oops! Something went wrong."
            )
        } finally {
            setSending(false)
        }
    }

    // after success, show a confirmation instead of the form
    if (sent) {
        return (
            <section id="quote" className="py-20 text-center bg-amber-100">
                <h2 className="text-3xl font-bold mb-4">Request Sent!</h2>
                <p className="text-green-600">
                    🎉 Thanks! Bri will email you within 24 hrs.
                </p>
            </section>
        )
    }

    return (
        <section id="quote" className="py-20 text-center bg-amber-100">
            <h2 className="text-3xl font-bold mb-8">Get a Custom Quote</h2>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto space-y-4 text-left"
                noValidate
            >
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block mb-1 font-medium">Event Date</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label htmlFor="guests" className="block mb-1 font-medium">Guests</label>
                    <input
                        id="guests"
                        name="guests"
                        type="number"
                        placeholder="Number of guests"
                        min="1"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block mb-1 font-medium">Additional Details</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Any extra info…"
                        required
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition disabled:opacity-50"
                >
                    {sending ? "Sending…" : "Request Quote"}
                </button>
            </form>

            {error && (
                <p className="mt-4 text-red-600">{error}</p>
            )}
        </section>
    )
}
