import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface ContactSubmission {
  id: string;
  inquiryType: string;
  name: string;
  email: string;
  organization: string;
  message: string;
  submittedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "contact-submissions.json");

function ensureDataFile(): ContactSubmission[] {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
    return [];
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inquiryType, name, email, organization, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const submission: ContactSubmission = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      inquiryType: inquiryType || "general",
      name: name.trim(),
      email: email.trim(),
      organization: (organization || "").trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Save to file
    const submissions = ensureDataFile();
    submissions.push(submission);
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");

    console.log(`[Contact] New submission from ${submission.name} (${submission.email}) - ${submission.inquiryType}`);

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact] Error processing submission:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
