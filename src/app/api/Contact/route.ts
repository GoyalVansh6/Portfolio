import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/Contact
 * Handles contact form submissions and sends an email.
 * 
 * NOTE: If you are seeing net::ERR_CONNECTION_REFUSED, ensure:
 *   - Your Next.js server is running and listening on the correct port.
 *   - The API route is correctly named (case-sensitive: use /api/Contact if your file is Contact, or /api/contact if your file is contact).
 *   - You are sending requests to the correct URL (check for typos in /api/Contact vs /api/contact).
 *   - Your firewall or network is not blocking port 3000.
 */

export async function POST(req: NextRequest) {
    // Only allow POST requests
    if (req.method && req.method !== "POST") {
        return NextResponse.json(
            { error: "Method not allowed" },
            { status: 405 }
        );
    }

    try {
        // Parse and validate request body
        const body = await req.json();
        const { name, email, message } = body || {};

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Get email credentials from environment variables
        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;
        const to = process.env.EMAIL_TO;

        if (!user || !pass || !to) {
            return NextResponse.json(
                { error: "Email credentials not set" },
                { status: 500 }
            );
        }

        // Create nodemailer transporter
        let transporter;
        try {
            transporter = nodemailer.createTransport({
                service: "gmail",
                auth: { user, pass },
            });
            // Verify transporter connection before sending
            await transporter.verify();
        } catch (verifyErr) {
            return NextResponse.json(
                { error: "Failed to verify email transporter", details: verifyErr instanceof Error ? verifyErr.message : verifyErr },
                { status: 500 }
            );
        }

        // Compose email
        const mailOptions = {
            from: `"${name}" <${user}>`,
            to,
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            replyTo: email,
        };

        // Send email
        let info;
        try {
            info = await transporter.sendMail(mailOptions);
        } catch (sendErr) {
            return NextResponse.json(
                { error: "Failed to send email", details: sendErr instanceof Error ? sendErr.message : sendErr },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, info });
    } catch (err) {
        return NextResponse.json(
            { error: "Email failed to send", details: err instanceof Error ? err.message : err },
            { status: 500 }
        );
    }
}
