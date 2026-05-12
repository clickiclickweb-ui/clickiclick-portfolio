import { Resend } from "resend";
import type { NextRequest } from "next/server";

const resendKey = process.env.RESEND_API_KEY;
const audienceId = process.env.RESEND_AUDIENCE_ID;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string; consent?: boolean };
    const email = body?.email?.trim().toLowerCase();
    const consent = body?.consent === true;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json(
        { error: "Email no válido." },
        { status: 400 },
      );
    }
    if (!consent) {
      return Response.json(
        { error: "Falta el opt-in explícito." },
        { status: 400 },
      );
    }

    // If Resend not configured, gracefully accept in dev / placeholder mode.
    if (!resendKey) {
      console.warn(
        "[newsletter] RESEND_API_KEY not set — accepting subscription in placeholder mode",
        email,
      );
      return Response.json({ ok: true, mode: "placeholder" });
    }

    const resend = new Resend(resendKey);

    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    } else {
      // Fallback — send notification to ops email
      await resend.emails.send({
        from: "Clickiclick <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL ?? "diegoolipue@gmail.com",
        subject: "Nueva suscripción newsletter",
        text: `Email: ${email}\nConsent: ${consent}\nDate: ${new Date().toISOString()}`,
      });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] error", err);
    return Response.json(
      { error: "Error inesperado. Inténtalo en unos minutos." },
      { status: 500 },
    );
  }
}
