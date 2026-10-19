import nodemailer from "nodemailer";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Spam trap: real visitors never see or fill this field. Pretend success to bots.
  if (clean(data.website, 100)) return Response.json({ ok: true });

  const name = clean(data.name, 100);
  const email = clean(data.email, 150);
  const phone = clean(data.phone, 40);
  const topic = clean(data.topic, 150);
  const message = clean(data.message, 1500);

  if (!name || !message) {
    return Response.json({ error: "Name and message are required" }, { status: 400 });
  }
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { SMTP_HOST = "smtp.hostinger.com", SMTP_PORT = "465", SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP_USER or SMTP_PASS is not set");
    return Response.json({ error: "Email is not configured" }, { status: 500 });
  }

  const port = Number(SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const text = [
    `Name: ${name}`,
    email && `Email: ${email}`,
    phone && `Phone: ${phone}`,
    topic && `Project or sector: ${topic}`,
    "",
    message,
  ]
    .filter((l) => typeof l === "string")
    .join("\n");

  try {
    await transporter.sendMail({
      from: `"Website enquiry" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: validEmail ? email : undefined,
      subject: oneLine(`Website enquiry${topic ? `: ${topic}` : ""} (${name})`),
      text,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form: send failed", err);
    return Response.json({ error: "Could not send" }, { status: 502 });
  }
}