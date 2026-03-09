import { NextRequest, NextResponse } from "next/server";

const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_TOKEN;
const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID;

const INQUIRY_LABELS: Record<string, string> = {
  general: "General Inquiry",
  demo: "Demo Request",
  partnership: "Partnership",
  media: "Media",
};

async function sendSlackMessage(payload: {
  inquiryType: string;
  name: string;
  email: string;
  organization: string;
  message: string;
}) {
  if (!SLACK_OAUTH_TOKEN || !SLACK_CHANNEL_ID) {
    throw new Error("Slack credentials are not configured");
  }

  const { inquiryType, name, email, organization, message } = payload;
  const label = INQUIRY_LABELS[inquiryType] ?? inquiryType;

  const blocks = [
    {
      type: "header",
      text: { type: "plain_text", text: `📬 New Contact: ${label}` },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Name:*\n${name}` },
        { type: "mrkdwn", text: `*Email:*\n${email}` },
        { type: "mrkdwn", text: `*Organization:*\n${organization || "—"}` },
        { type: "mrkdwn", text: `*Type:*\n${label}` },
      ],
    },
    { type: "divider" },
    {
      type: "section",
      text: { type: "mrkdwn", text: `*Message:*\n${message}` },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Submitted at ${new Date().toISOString()}`,
        },
      ],
    },
  ];

  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SLACK_OAUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel: SLACK_CHANNEL_ID,
      text: `New contact from ${name} (${email}) — ${label}`,
      blocks,
    }),
  });

  const data = await res.json();
  if (!data.ok) {
    throw new Error(`Slack API error: ${data.error}`);
  }
  return data;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inquiryType, name, email, organization, message } = body;

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

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    await sendSlackMessage({
      inquiryType: inquiryType || "general",
      name: name.trim(),
      email: email.trim(),
      organization: (organization || "").trim(),
      message: message.trim(),
    });

    console.log(
      `[Contact] Slack message sent — ${name.trim()} (${email.trim()}) — ${inquiryType || "general"}`
    );

    return NextResponse.json({ success: true, id }, { status: 200 });
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
