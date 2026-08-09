interface SlackBlock {
  type: string;
  text?: { type: string; text: string; emoji?: boolean };
  fields?: Array<{ type: string; text: string }>;
}

function getSlackWebhookUrl(override?: string): string | undefined {
  const url = override?.trim() || process.env.SLACK_WAITLIST_WEBHOOK_URL?.trim() || process.env.SLACK_CONTACT_WEBHOOK_URL?.trim();
  return url && url.length > 0 ? url : undefined;
}

async function postSlackMessage(input: {
  text: string;
  blocks: SlackBlock[];
  webhookUrl?: string;
}): Promise<void> {
  const webhookUrl = getSlackWebhookUrl(input.webhookUrl);
  if (!webhookUrl) {
    return;
  }

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: input.text, blocks: input.blocks }),
  });
}

export async function notifySlackContactForm(input: {
  firstName: string;
  lastName: string;
  email: string;
  interestedIn?: string;
  message?: string;
  marketingOptIn: boolean;
}): Promise<void> {
  const name = `${input.firstName} ${input.lastName}`;

  await postSlackMessage({
    text: `New contact form submission from ${name} (${input.email})`,
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: 'New Contact Form Submission', emoji: true },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Name:*\n${name}` },
          { type: 'mrkdwn', text: `*Email:*\n${input.email}` },
          { type: 'mrkdwn', text: `*Interested In:*\n${input.interestedIn || 'Not specified'}` },
          { type: 'mrkdwn', text: `*Marketing opt-in:*\n${input.marketingOptIn ? 'Yes' : 'No'}` },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Message:*\n${input.message || '_No message provided_'}`,
        },
      },
    ],
  });
}

export async function notifySlackWaitlistSignup(input: {
  firstName: string;
  lastName: string;
  email: string;
  source: string;
  city?: string;
  state?: string;
  interestedIn?: string;
  message?: string;
}): Promise<void> {
  const name = `${input.firstName} ${input.lastName}`;
  const location =
    input.city && input.state
      ? `${input.city}, ${input.state}`
      : input.city || input.state || 'Not specified';

  await postSlackMessage({
    text: `New waitlist signup from ${name} (${input.email}) — ${input.source}`,
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: 'New Waitlist Signup', emoji: true },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Name:*\n${name}` },
          { type: 'mrkdwn', text: `*Email:*\n${input.email}` },
          { type: 'mrkdwn', text: `*Qualifier:*\n${input.interestedIn || 'Not specified'}` },
          { type: 'mrkdwn', text: `*Location:*\n${location}` },
          { type: 'mrkdwn', text: `*Source:*\n${input.source}` },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Message:*\n${input.message || '_No message provided_'}`,
        },
      },
    ],
  });
}

export async function notifySlackCalendlyBooking(input: {
  name: string;
  email: string;
  eventType?: string;
  startTime?: string;
}): Promise<void> {
  await postSlackMessage({
    text: `New Calendly booking from ${input.name} (${input.email})`,
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: 'New Calendly Booking', emoji: true },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Name:*\n${input.name}` },
          { type: 'mrkdwn', text: `*Email:*\n${input.email}` },
          { type: 'mrkdwn', text: `*Event:*\n${input.eventType || 'Not specified'}` },
          { type: 'mrkdwn', text: `*Start time:*\n${input.startTime || 'Not specified'}` },
        ],
      },
    ],
  });
}
