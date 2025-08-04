// src/app/api/quote/route.js
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const {
  EMAIL,
  EMAIL_PASS,
  AIRTABLE_TOKEN,
  AIRTABLE_BASE,
  AIRTABLE_TABLE,
} = process.env

// —– Simple brand styles (optional) —–
const brand = {
  logo: "https://gratefulgrazing.co/logo-email.png",
  primary: "#ea580c",
  text: "#111827",
  light: "#f9fafb",
}

// —– Gmail SMTP transport —–
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL, pass: EMAIL_PASS },
})

// —– Build Bri’s notification email —–
function buildHtmlQuote(d) {
  return `
    <div style="font-family:Inter,Arial,sans-serif; color:${brand.text}; line-height:1.55; max-width:620px">
      ${brand.logo ? `<img src="${brand.logo}" alt="Logo" style="height:60px; margin-bottom:24px">` : ""}
      <h2 style="margin:0 0 16px; color:${brand.primary}">New Quote Request</h2>
      <table style="border-collapse:collapse; width:100%; font-size:15px">
        ${[
      ["Name", d.name],
      ["Email", d.email],
      ["Event Date", d.date],
      ["Guests", d.guests],
    ].map(
      ([label, val]) => `
            <tr>
              <td style="background:${brand.light}; padding:8px 10px; font-weight:600">${label}</td>
              <td style="padding:8px 10px">${val || "(none)"}</td>
            </tr>`
    ).join("")}
      </table>
      <h3 style="margin:28px 0 8px; font-size:17px">Message / Notes</h3>
      <p style="white-space:pre-line; margin:0; background:${brand.light}; padding:12px 14px; border-radius:6px">
        ${d.message || "(none)"}
      </p>
      <hr style="margin:32px 0 16px; border:none; border-top:1px solid #e5e7eb">
      <small style="color:#6b7280">Sent automatically from gratefulgrazing.co ✔︎</small>
    </div>
  `
}

// —– Build visitor auto-reply —–
function buildHtmlReply(name) {
  return `
    <div style="font-family:Inter,Arial,sans-serif; line-height:1.6; max-width:620px">
      <p>Hi ${name},</p>
      <p>Thanks for reaching out! I’ve received your details and will send a personalized quote within <strong>24 hours</strong>.</p>
      <p>Stay grateful &amp; keep grazing 🧀</p>
      <p style="margin:0; font-weight:600">
        — Bri<br>
        Grateful Grazing Mobile Charcuterie Co.
      </p>
    </div>
  `
}

export async function POST(req) {
  const data = await req.json()
  console.log("🚀 New quote request:", data)

  // 1) Email Bri
  try {
    await transporter.sendMail({
      from: `"Grateful Grazing Website" <no-reply@gratefulgrazing.co>`,
      to: EMAIL,
      subject: `New Quote — ${data.name} (${data.guests} guests)`,
      text: JSON.stringify(data, null, 2),
      html: buildHtmlQuote(data),
    })
  } catch (err) {
    console.error("❌ Email-to-Bri failed:", err)
    return NextResponse.json({ ok: false, error: "Email failure" }, { status: 500 })
  }

  // 2) Insert into Airtable
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}`
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: data.name,
          Email: data.email,
          Date: data.date,
          Guests: Number(data.guests),
          Message: data.message || "",
        },
      }),
    })
    const body = await resp.json()
    console.log("🛰️ Airtable response:", resp.status, body)
    if (!resp.ok) {
      console.error("❌ Airtable insert failed!", body)
    }
  } catch (err) {
    console.error("⚠️ Airtable request threw:", err)
  }

  // 3) Auto-reply to visitor (fire‐and‐forget)
  transporter.sendMail({
    from: `"Grateful Grazing" <no-reply@gratefulgrazing.co>`,
    to: data.email,
    subject: "We received your quote request!",
    text: `Hi ${data.name},\n\nThanks for reaching out! I’ll send you a quote within 24 hours.\n\n— Bri`,
    html: buildHtmlReply(data.name),
  }).catch(e => console.warn("⚠️ Auto-reply failed:", e))

  return NextResponse.json({ ok: true })
}
