import sgMail from '@sendgrid/mail';
import { DEFAULT_LEAD_QUALIFIER, normalizeLeadQualifier } from './leadQualifiers';

const SITE_URL = 'https://www.buyunrepped.com';
const RESOURCES_URL = `${SITE_URL}/resources`;
const LOGO_URL = `${SITE_URL}/images/buyunrepped-cropped.png`;
const POSTAL_ADDRESS = '2509 Cruzen St, Nashville, TN 37211';
const FIRM_PHONE = '615-208-3390';
const FIRM_LINE =
  'BuyUnrepped, Inc. · TN Firm Lic. #267134 · Broker Lic. #339134 · Licensed Tennessee real estate brokerage';
const FAIR_HOUSING_LINE =
  'BuyUnrepped is committed to the Fair Housing Act and equal opportunity in housing. We do not discriminate on the basis of race, color, religion, sex, disability, familial status, national origin, or any other class protected by federal, state, or local law.';
const EQUAL_HOUSING_LINE = 'Equal Housing Opportunity';
const DEFAULT_FROM_EMAIL = 'kayla@buyunrepped.com';
const DEFAULT_FROM_NAME = 'Kayla Brown';

export type WelcomeEmailVariant = 'buyer' | 'expansion' | 'vendor';

export interface ContactWelcomeEmailInput {
  firstName: string;
  email: string;
  interestedIn?: string;
  city?: string;
  state?: string;
  message?: string;
  location?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL?.trim();
  return url && url.length > 0 ? url.replace(/\/+$/, '') : 'https://app.buyunrepped.com';
}

function getUnsubscribePageUrl(email: string): string {
  return `${SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}`;
}

export function getOneClickUnsubscribeUrl(email: string): string {
  return `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`;
}

function parseMarketStateFromMessage(message?: string): string | undefined {
  const match = message?.match(/^Market:\s*.+,\s*([A-Z]{2})\b/m);
  return match?.[1];
}

function resolveState(input: ContactWelcomeEmailInput): string | undefined {
  const fromField = input.state?.trim().toUpperCase();
  if (fromField) {
    return fromField;
  }

  const fromLocation = input.location?.match(/,\s*([A-Z]{2})\b/)?.[1];
  if (fromLocation) {
    return fromLocation;
  }

  return parseMarketStateFromMessage(input.message);
}

export function isOperatingMarket(state?: string): boolean {
  if (!state) {
    return true;
  }

  return state.trim().toUpperCase() === 'TN';
}

export function getWelcomeEmailVariant(input: ContactWelcomeEmailInput): WelcomeEmailVariant {
  const qualifier = normalizeLeadQualifier(input.interestedIn) ?? DEFAULT_LEAD_QUALIFIER;
  const state = resolveState(input);

  if (qualifier === "I'm a vendor who is curious") {
    return 'vendor';
  }

  if (
    qualifier === 'Interested in opening my own BuyUnrepped office' ||
    qualifier === "I'm an agent who is curious"
  ) {
    return 'expansion';
  }

  if (
    qualifier === 'Looking to buy in the next 0-6 months' ||
    qualifier === 'Looking to buy in the next 6-12 months' ||
    qualifier === '1yr+' ||
    qualifier === 'I just want to chat'
  ) {
    return isOperatingMarket(state) ? 'buyer' : 'expansion';
  }

  return 'buyer';
}

function buildSignatureText(): string {
  return `Talk soon,

Kayla

Kayla Brown
Founder & Principal Broker
BuyUnrepped
${FIRM_PHONE}
${POSTAL_ADDRESS}`;
}

function buildComplianceFooterText(email: string): string {
  return `---
You received this because you opted in at buyunrepped.com.
Unsubscribe: ${getUnsubscribePageUrl(email)}

${FAIR_HOUSING_LINE}
${EQUAL_HOUSING_LINE}

${FIRM_LINE}`;
}

function buildSignatureHtml(): string {
  return `<p style="margin:24px 0 0 0 4px;">Talk soon,</p>
<p style="margin:0 0 16px;">Kayla</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
  <tr>
    <td style="padding-right:14px;vertical-align:top;">
      <img src="${LOGO_URL}" alt="BuyUnrepped" width="72" style="display:block;width:72px;height:auto;border:0;" />
    </td>
    <td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#444444;vertical-align:top;">
      Kayla Brown<br />
      Founder &amp; Principal Broker<br />
      BuyUnrepped<br />
      ${FIRM_PHONE}<br />
      ${POSTAL_ADDRESS}
    </td>
  </tr>
</table>`;
}

function buildComplianceFooterHtml(email: string): string {
  const unsubscribePageUrl = escapeHtml(getUnsubscribePageUrl(email));
  return `<p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#888888;">
      You received this because you opted in at buyunrepped.com.
      <a href="${unsubscribePageUrl}" style="color:#1a73e8;">Unsubscribe</a>
    </p>
    <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#888888;">
      ${FAIR_HOUSING_LINE}
      <br /><br />
      ${EQUAL_HOUSING_LINE}
      <br /><br />
      ${FIRM_LINE}
    </p>`;
}

const BUYER_WELCOME_SUBJECT = 'BuyUnrepped Buyer Inquiry';
const EXPANSION_WELCOME_SUBJECT = 'Bring BuyUnrepped to your market';
const VENDOR_WELCOME_SUBJECT = 'Partner with BuyUnrepped';

export function buildContactWelcomeEmailSubject(input: ContactWelcomeEmailInput): string {
  const variant = getWelcomeEmailVariant(input);

  if (variant === 'vendor') {
    return VENDOR_WELCOME_SUBJECT;
  }

  if (variant === 'expansion') {
    return EXPANSION_WELCOME_SUBJECT;
  }

  return BUYER_WELCOME_SUBJECT;
}

function buildBuyerWelcomeEmailText(input: ContactWelcomeEmailInput): string {
  const appUrl = getAppUrl();

  return `Hi ${input.firstName},

Thanks for stopping by BuyUnrepped. We're pumped to help you get into your next home!

If you haven't found the perfect home yet, here's what we recommend:

1. Start building your team in the BuyUnrepped app: ${appUrl}
Review lenders, title companies, home warranty companies, and other trusted providers before you are under pressure.

2. Talk to a lender early. You don't know what you don't know. Find out whether you need any credit work, documentation, or financial homework. Ideally, get fully approved and underwritten before you are ready to submit an offer.

Paying cash? Ask your bank for a clean proof-of-funds letter showing your available funds, so you do not have to send a listing agent screenshots of your accounts.

3. Visit our buyer resources page: ${RESOURCES_URL}
You'll find advice for touring homes without a buyer's agent, plus scripts in the Playbook section for talking with lenders, listing agents, and everyone else involved in the purchase.

${buildSignatureText()}

${buildComplianceFooterText(input.email)}`;
}

function buildExpansionWelcomeEmailText(input: ContactWelcomeEmailInput): string {
  return `Hi ${input.firstName},

Thanks for stopping by BuyUnrepped!

We are not operating in your area yet, but we are exploring new markets every day.

The more interest we see from buyers, brokers, agents, and local partners in a city, the more likely that market is to move up our expansion list.

Interested in bringing BuyUnrepped to your area or opening a BuyUnrepped office of your own? Reply with your city, state, licensing background, and what interests you about the model.

You may help decide where we go next.

${buildSignatureText()}

${buildComplianceFooterText(input.email)}`;
}

function buildVendorWelcomeEmailText(input: ContactWelcomeEmailInput): string {
  return `Hi ${input.firstName},

Thanks for your interest in partnering with BuyUnrepped!

We are ultra selective about the vendors we recommend. Every partner goes through a rigorous review process designed to protect our buyers and make sure they receive excellent service from start to finish.

We are especially interested in companies with a clear specialty, a strong reputation, and a real commitment to serving homebuyers well.

To be considered, reply with:

- Your name
- Company name
- Service area
- Specialty
- Website
- Instagram handle
- Anything else you think we should know

We review every submission personally and will reach out if it looks like a strong fit.

${buildSignatureText()}

${buildComplianceFooterText(input.email)}`;
}

function buildBuyerWelcomeEmailHtml(input: ContactWelcomeEmailInput): string {
  const firstName = escapeHtml(input.firstName);
  const appUrl = escapeHtml(getAppUrl());
  const resourcesUrl = escapeHtml(RESOURCES_URL);

  return `<p style="margin:0 0 16px;">Hi ${firstName},</p>
<p style="margin:0 0 16px;">Thanks for stopping by BuyUnrepped. We&apos;re pumped to help you get into your next home!</p>
<p style="margin:0 0 12px;">If you haven&apos;t found the perfect home yet, here&apos;s what we recommend:</p>
<ol style="margin:0 0 16px;padding-left:24px;">
  <li style="margin:0 0 14px;">
    <strong><a href="${appUrl}" style="color:#1a73e8;">Start building your team in the BuyUnrepped app</a>.</strong>
    Review lenders, title companies, home warranty companies, and other trusted providers before you are under pressure.
  </li>
  <li style="margin:0 0 14px;">
    <strong>Talk to a lender early.</strong> You don&apos;t know what you don&apos;t know. Find out whether you need any credit work, documentation, or financial homework. Ideally, get fully approved and underwritten before you are ready to submit an offer.
    <br /><br />
    Paying cash? Ask your bank for a clean proof-of-funds letter showing your available funds, so you do not have to send a listing agent screenshots of your accounts.
  </li>
  <li style="margin:0 0 14px;">
    <strong><a href="${resourcesUrl}" style="color:#1a73e8;">Visit our buyer resources page</a>.</strong>
    You&apos;ll find advice for touring homes without a buyer&apos;s agent, plus scripts in the Playbook section for talking with lenders, listing agents, and everyone else involved in the purchase.
  </li>
</ol>
${buildSignatureHtml()}
${buildComplianceFooterHtml(input.email)}`;
}

function buildExpansionWelcomeEmailHtml(input: ContactWelcomeEmailInput): string {
  const firstName = escapeHtml(input.firstName);

  return `<p style="margin:0 0 16px;">Hi ${firstName},</p>
<p style="margin:0 0 16px;">Thanks for stopping by BuyUnrepped!</p>
<p style="margin:0 0 16px;">We are not operating in your area yet, but we are exploring new markets every day.</p>
<p style="margin:0 0 16px;">The more interest we see from buyers, brokers, agents, and local partners in a city, the more likely that market is to move up our expansion list.</p>
<p style="margin:0 0 16px;">Interested in bringing BuyUnrepped to your area or opening a BuyUnrepped office of your own? Reply with your city, state, licensing background, and what interests you about the model.</p>
<p style="margin:0 0 16px;">You may help decide where we go next.</p>
${buildSignatureHtml()}
${buildComplianceFooterHtml(input.email)}`;
}

function buildVendorWelcomeEmailHtml(input: ContactWelcomeEmailInput): string {
  const firstName = escapeHtml(input.firstName);

  return `<p style="margin:0 0 16px;">Hi ${firstName},</p>
<p style="margin:0 0 16px;">Thanks for your interest in partnering with BuyUnrepped!</p>
<p style="margin:0 0 16px;">We are ultra selective about the vendors we recommend. Every partner goes through a rigorous review process designed to protect our buyers and make sure they receive excellent service from start to finish.</p>
<p style="margin:0 0 16px;">We are especially interested in companies with a clear specialty, a strong reputation, and a real commitment to serving homebuyers well.</p>
<p style="margin:0 0 8px;">To be considered, reply with:</p>
<ul style="margin:0 0 16px;padding-left:24px;">
  <li style="margin:0 0 6px;">Your name</li>
  <li style="margin:0 0 6px;">Company name</li>
  <li style="margin:0 0 6px;">Service area</li>
  <li style="margin:0 0 6px;">Specialty</li>
  <li style="margin:0 0 6px;">Website</li>
  <li style="margin:0 0 6px;">Instagram handle</li>
  <li style="margin:0 0 6px;">Anything else you think we should know</li>
</ul>
<p style="margin:0 0 16px;">We review every submission personally and will reach out if it looks like a strong fit.</p>
${buildSignatureHtml()}
${buildComplianceFooterHtml(input.email)}`;
}

export function buildContactWelcomeEmailText(input: ContactWelcomeEmailInput): string {
  const variant = getWelcomeEmailVariant(input);

  if (variant === 'vendor') {
    return buildVendorWelcomeEmailText(input);
  }

  if (variant === 'expansion') {
    return buildExpansionWelcomeEmailText(input);
  }

  return buildBuyerWelcomeEmailText(input);
}

export function buildContactWelcomeEmailHtml(input: ContactWelcomeEmailInput): string {
  const subject = escapeHtml(buildContactWelcomeEmailSubject(input));
  const variant = getWelcomeEmailVariant(input);

  let body = buildBuyerWelcomeEmailHtml(input);
  if (variant === 'vendor') {
    body = buildVendorWelcomeEmailHtml(input);
  } else if (variant === 'expansion') {
    body = buildExpansionWelcomeEmailHtml(input);
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:24px 16px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;color:#222222;background-color:#ffffff;">
  <div style="max-width:640px;margin:0 auto;">
    ${body}
  </div>
</body>
</html>`;
}

export interface SendContactWelcomeEmailResult {
  ok: boolean;
  error?: string;
}

export async function sendContactWelcomeEmail(
  input: ContactWelcomeEmailInput
): Promise<SendContactWelcomeEmailResult> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;
  const fromName = process.env.SENDGRID_FROM_NAME?.trim() || DEFAULT_FROM_NAME;

  if (!apiKey) {
    console.warn('SENDGRID_API_KEY is not configured; skipping contact welcome email');
    return { ok: true };
  }

  sgMail.setApiKey(apiKey);

  try {
    await sgMail.send({
      to: input.email,
      from: { email: fromEmail, name: fromName },
      replyTo: { email: fromEmail, name: fromName },
      subject: buildContactWelcomeEmailSubject(input),
      text: buildContactWelcomeEmailText(input),
      html: buildContactWelcomeEmailHtml(input),
      headers: {
        'List-Unsubscribe': `<${getOneClickUnsubscribeUrl(input.email)}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    });
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown SendGrid error';
    console.error('SendGrid contact welcome email error:', error);
    return { ok: false, error: message };
  }
}
