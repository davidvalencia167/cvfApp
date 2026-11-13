import { createClient } from "@supabase/supabase-js";
import QRCode from "npm:qrcode";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ROOMS = ["Registro", "Sala 1", "Sala 2"];
const UNIQUE_VIOLATION = "23505";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readText(body: Record<string, unknown>, key: string, max: number) {
  const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
  return value.length > 0 && value.length <= max ? value : null;
}

async function findAttendeeByToken(token: string) {
  const { data, error } = await supabase
    .from("attendees")
    .select("id, full_name")
    .eq("qr_token", token)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function sendQrEmail(name: string, email: string, qrBase64: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return false;

  const from = Deno.env.get("EMAIL_FROM") ?? "Congreso <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Tu código QR de inscripción",
      html: `<p>Hola ${escapeHtml(name)},</p><p>Tu inscripción está confirmada. Presenta el código QR adjunto en el registro del congreso y en cada sala.</p>`,
      attachments: [{ filename: "qr-inscripcion.png", content: qrBase64 }],
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected the email", response.status, await response.text());
    return false;
  }
  return true;
}

async function register(body: Record<string, unknown>) {
  const fullName = readText(body, "full_name", 120);
  const email = readText(body, "email", 254)?.toLowerCase() ?? null;
  if (!fullName) return json({ error: "Escribe tu nombre completo." }, 400);
  if (!email || !EMAIL_PATTERN.test(email)) return json({ error: "Escribe un correo electrónico válido." }, 400);

  const { data, error } = await supabase
    .from("attendees")
    .insert({ full_name: fullName, email })
    .select("qr_token")
    .single();

  if (error?.code === UNIQUE_VIOLATION) {
    return json({ error: "Este correo ya está inscrito." }, 409);
  }
  if (error) throw error;

  const qrDataUrl = await QRCode.toDataURL(data.qr_token, { width: 512, margin: 2 });
  const emailSent = await sendQrEmail(fullName, email, qrDataUrl.split(",")[1]);

  if (emailSent) {
    await supabase.from("attendees").update({ email_sent_at: new Date().toISOString() }).eq("qr_token", data.qr_token);
  }

  return json({ qr_token: data.qr_token, email_sent: emailSent });
}

async function badge(body: Record<string, unknown>) {
  const token = readText(body, "token", 64);
  const attendee = token ? await findAttendeeByToken(token) : null;
  if (!attendee) return json({ error: "Código QR no válido." }, 404);

  const qrDataUrl = await QRCode.toDataURL(token, { width: 512, margin: 2 });
  return json({ full_name: attendee.full_name, qr_png: qrDataUrl });
}

async function checkin(body: Record<string, unknown>) {
  const token = readText(body, "token", 64);
  const room = typeof body.room === "string" && ROOMS.includes(body.room) ? body.room : null;
  if (!room) return json({ error: "Sala no válida." }, 400);

  const attendee = token ? await findAttendeeByToken(token) : null;
  if (!attendee) return json({ error: "Código QR no válido." }, 404);

  const { error } = await supabase.from("room_check_ins").insert({ attendee_id: attendee.id, room });
  if (error && error.code !== UNIQUE_VIOLATION) throw error;

  return json({
    status: error ? "already" : "checked_in",
    full_name: attendee.full_name,
    room,
  });
}

async function lead(body: Record<string, unknown>) {
  const token = readText(body, "token", 64);
  const companyName = readText(body, "company_name", 120);
  if (!companyName) return json({ error: "Escribe el nombre de la empresa." }, 400);

  const attendee = token ? await findAttendeeByToken(token) : null;
  if (!attendee) return json({ error: "Código QR no válido." }, 404);

  const { error } = await supabase
    .from("company_leads")
    .insert({ attendee_id: attendee.id, company_name: companyName });
  if (error && error.code !== UNIQUE_VIOLATION) throw error;

  return json({
    status: error ? "already" : "captured",
    full_name: attendee.full_name,
    company_name: companyName,
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const action = new URL(req.url).pathname.split("/").filter(Boolean).pop();
    if (req.method !== "POST") return json({ error: "Método no permitido." }, 405);

    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) return json({ error: "Solicitud no válida." }, 400);

    switch (action) {
      case "register":
        return await register(body);
      case "badge":
        return await badge(body);
      case "checkin":
        return await checkin(body);
      case "lead":
        return await lead(body);
      default:
        return json({ error: "Ruta no encontrada." }, 404);
    }
  } catch (err) {
    console.error("attendees function failed", err);
    return json({ error: "Ocurrió un error. Intenta de nuevo." }, 500);
  }
});