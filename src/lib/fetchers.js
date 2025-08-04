// src/lib/fetchers.js
import Airtable from "airtable";

// initialize with your token & base
const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN })
    .base(process.env.AIRTABLE_BASE)

// helper to map records → plain objects
function mapRecords(records) {
    return records.map((r) => ({
        id: r.id,
        ...r.fields,
    }));
}

// fetch Gallery items
export async function getGallery() {
    const records = await base("Gallery")
        .select({ view: "Grid view" })
        .all();
    return mapRecords(records);
}

// fetch Testimonials
export async function getTestimonials() {
    const records = await base("Testimonials")
        .select({ view: "Grid view" })
        .all();
    return mapRecords(records);
}

// fetch FAQ entries
export async function getFAQ() {
    const records = await base("FAQ")
        .select({ view: "Grid view" })
        .all();
    return mapRecords(records);
}
