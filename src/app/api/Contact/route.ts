import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;
        const to = process.env.EMAIL_TO;

        if (!user || !pass) {
            return NextResponse.json(
                { error: "Email credentials not set" },
                { status: 500 }
            );
        }

        // For debugging: log the transporter config and mail options
        // (Remove these logs in production)
        console.log("Creating transporter with user:", user);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user,
                pass,
            },
        });

        // Verify transporter connection before sending
        try {
            await transporter.verify();
            console.log("Transporter verified successfully.");
        } catch (verifyErr) {
            console.error("Transporter verification failed:", verifyErr);
            return NextResponse.json(
                { error: "Failed to verify email transporter", details: verifyErr instanceof Error ? verifyErr.message : verifyErr },
                { status: 500 }
            );
        }

        const mailOptions = {
            from: `"${name}" <${user}>`,
            to,
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            replyTo: email,
        };

        console.log("Sending mail with options:", mailOptions);

        const info = await transporter.sendMail(mailOptions);

        console.log("Mail sent:", info);

        return NextResponse.json({ success: true, info });
    } catch (err) {
        console.error("Error in POST /api/Contact:", err);
        return NextResponse.json(
            { error: "Email failed to send", details: err instanceof Error ? err.message : err },
            { status: 500 }
        );
    }
}
