import { NextResponse } from 'next/server';

type LeadPayload = Record<string, unknown> & {
  email?: string;
  formType?: string;
  interest?: string;
  message?: string;
  name?: string;
  propertyAddress?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;

    if (payload.formType === 'seller_questionnaire' && !payload.propertyAddress) {
      return NextResponse.json({ error: 'Property address is required' }, { status: 400 });
    }

    const deliveries = await Promise.allSettled([
      sendFormspree(payload),
      sendGoogleAppsScript(payload),
      sendSlackWebhook(payload),
      sendSlackBot(payload),
    ]);

    const configured = deliveries.filter((delivery) => delivery.status === 'fulfilled' && delivery.value.configured);
    const failed = deliveries.filter((delivery) => delivery.status === 'rejected');

    if (configured.length > 0 && failed.length === configured.length) {
      return NextResponse.json({ error: 'Failed to submit lead' }, { status: 502 });
    }

    return NextResponse.json({ success: true, delivered: configured.length });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }
}

async function sendFormspree(payload: LeadPayload) {
  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) return { configured: false };

  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`Formspree failed: ${response.status}`);
  return { configured: true };
}

async function sendGoogleAppsScript(payload: LeadPayload) {
  const url = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
  if (!url) return { configured: false };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN,
      ...payload,
    }),
  });

  if (!response.ok) throw new Error(`Google Apps Script failed: ${response.status}`);
  return { configured: true };
}

async function sendSlackWebhook(payload: LeadPayload) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return { configured: false };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: slackText(payload) }),
  });

  if (!response.ok) throw new Error(`Slack webhook failed: ${response.status}`);
  return { configured: true };
}

async function sendSlackBot(payload: LeadPayload) {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_CHANNEL;
  if (!token || !channel) return { configured: false };

  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel,
      text: slackText(payload),
    }),
  });

  const result = (await response.json()) as { ok?: boolean; error?: string };
  if (!response.ok || !result.ok) throw new Error(`Slack bot failed: ${result.error || response.status}`);
  return { configured: true };
}

function slackText(payload: LeadPayload) {
  return [
    '*New BuyUnrepped Lead*',
    `Type: ${payload.formType || 'lead'}`,
    `Interest: ${payload.interest || 'Not specified'}`,
    `Name: ${payload.name || 'Not provided'}`,
    `Email: ${payload.email || 'Not provided'}`,
    `Property: ${payload.propertyAddress || 'Not provided'}`,
    '',
    payload.message || 'No message provided',
  ].join('\n');
}
