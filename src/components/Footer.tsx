// components/Footer.tsx

interface FooterProps {
    phone: string;
    email: string;
    facebook_url: string;
    service_area: string;
}

export default function Footer({ phone, email, facebook_url, service_area }: FooterProps) {
    // Using a standard Tailwind color (bg-gray-800) to ensure the background applies correctly.
    // The text-white class should make the text visible against this dark background.
    return (
        <footer className="bg-gray-800 text-white py-10 px-4">
            <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8">
                <div>
                    <h4 className="font-semibold mb-2">Contact</h4>
                    <p>{phone}</p>
                    <p>{email}</p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Follow</h4>
                    <p>
                        <a
                            href={facebook_url}
                            className="underline hover:text-gray-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Facebook
                        </a>
                    </p>
                </div>

                <div className="sm:text-right">
                    <h4 className="font-semibold mb-2">Service Area</h4>
                    <p>{service_area}</p>
                    <p className="opacity-60 text-sm mt-2">
                        © {new Date().getFullYear()} Grateful Grazing
                    </p>
                </div>
            </div>
        </footer>
    );
}
