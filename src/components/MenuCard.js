export default function MenuCard({ title, subtitle, price, items }) {
    return (
        <div className="rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-1">{title}</h3>
            <p className="text-sm text-brown-600 mb-2">{subtitle}</p>

            <ul className="text-sm flex-grow list-disc list-inside space-y-1 mb-4">
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <span className="mt-auto inline-block font-bold text-brown-800">
                {price}
            </span>
        </div>
    );
}
