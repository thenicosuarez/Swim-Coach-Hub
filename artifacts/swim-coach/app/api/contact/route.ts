import { NextResponse } from "next/server";
import { z } from "zod";

const ContactBody = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = ContactBody.parse(await request.json());
    console.log(`New contact from ${body.name} <${body.email}>: ${body.message}`);
    return NextResponse.json({
      success: true,
      message: "Thanks for reaching out! I'll get back to you within 24 hours.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Invalid contact data" },
      { status: 400 }
    );
  }
}
