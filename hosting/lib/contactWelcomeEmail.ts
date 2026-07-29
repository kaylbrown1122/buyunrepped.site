import sgMail from '@sendgrid/mail';

const SITE_URL = 'https://www.buyunrepped.com';
const LOGO_URL = `${SITE_URL}/images/buyunrepped-cropped.png`;
const INSTAGRAM_URL = 'https://www.instagram.com/buyunrepped';
const POSTAL_ADDRESS = '2509 Cruzen St, Nashville, TN 37211';
const FIRM_PHONE = '615-208-3390';
const FIRM_LINE =
  'BuyUnrepped, Inc. · TN Firm Lic. #267134 · Broker Lic. #339134 · Licensed Tennessee real estate brokerage';

export interface ContactWelcomeEmailInput {
  firstName: string;
  email: string;
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

/** Human-readable unsubscribe page (for email body links) */
function getUnsubscribePageUrl(email: string): string {
  return `${SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}`;
}

/** One-click List-Unsubscribe target (POST /api/unsubscribe) */
export function getOneClickUnsubscribeUrl(email: string): string {
  return `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`;
}

export function buildContactWelcomeEmailHtml(input: ContactWelcomeEmailInput): string {
  const firstName = escapeHtml(input.firstName);
  const location = escapeHtml(input.location || 'Middle Tennessee');
  const appUrl = escapeHtml(getAppUrl());
  const unsubscribePageUrl = escapeHtml(getUnsubscribePageUrl(input.email));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to BuyUnrepped</title>
</head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:Arial,Helvetica,sans-serif;color:#1b5373;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;padding:40px 32px;">
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <img src="${LOGO_URL}" alt="BuyUnrepped" width="220" style="display:block;width:220px;max-width:100%;height:auto;border:0;" />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:28px;font-size:13px;line-height:1.5;color:#6b7280;">
              we&apos;re not your agent, we&apos;re your advantage.
            </td>
          </tr>
          <tr>
            <td style="font-size:16px;line-height:1.7;color:#1b5373;">
              <p style="margin:0 0 18px;">Hi ${firstName}!</p>
              <p style="margin:0 0 18px;">
                Thanks for opting in at <strong>BuyUnrepped</strong>. We&apos;re glad you stopped by, and we look forward to
                sharing buyer resources for <strong>${location}</strong>.
              </p>
              <p style="margin:0 0 18px;">
                Here&apos;s what you may receive from us:
              </p>
              <p style="margin:0 0 10px;">&#127968; Updates when we expand into your market</p>
              <p style="margin:0 0 10px;">&#128140; Our monthly buyer newsletter</p>
              <p style="margin:0 0 10px;">&#128184; Special rate promotions, when available</p>
              <p style="margin:0 0 24px;">&#128276; Transaction alerts if you use the BuyUnrepped app</p>
              <p style="margin:0 0 28px;">
                Explore our site, browse resources, or reach out anytime with questions. Ready to move forward?
                <a href="${appUrl}" style="color:#39b6ff;text-decoration:none;">Open the BuyUnrepped app</a> to get started.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <a href="${SITE_URL}" style="display:inline-block;background-color:#f7c74a;color:#1b5373;font-size:16px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:999px;">
                Visit BuyUnrepped.com
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:24px;font-size:15px;line-height:1.6;">
              <a href="${INSTAGRAM_URL}" style="color:#39b6ff;text-decoration:none;">
                Follow us on Instagram &rarr; @buyunrepped
              </a>
            </td>
          </tr>
          <tr>
            <td style="font-size:16px;line-height:1.7;color:#1b5373;">
              <p style="margin:0;">Cheers,</p>
              <p style="margin:8px 0 0;">The <strong>BuyUnrepped</strong> Team</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top:20px;font-size:12px;line-height:1.5;color:#9ca3af;">
              You received this email because you opted in at buyunrepped.com.
              <a href="${unsubscribePageUrl}" style="color:#39b6ff;text-decoration:none;">Unsubscribe from marketing email</a>.<br />
              ${FIRM_LINE}<br />
              ${POSTAL_ADDRESS} · ${FIRM_PHONE}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildContactWelcomeEmailText(input: ContactWelcomeEmailInput): string {
  const location = input.location || 'Middle Tennessee';
  const appUrl = getAppUrl();
  const unsubscribePageUrl = getUnsubscribePageUrl(input.email);

  return `Hi ${input.firstName}!

Thanks for opting in at BuyUnrepped. We're glad you stopped by, and we look forward to sharing buyer resources for ${location}.

Here's what you may receive from us:

- Updates when we expand into your market
- Our monthly buyer newsletter
- Special rate promotions, when available
- Transaction alerts if you use the BuyUnrepped app

Explore our site at ${SITE_URL}, or open the BuyUnrepped app to get started: ${appUrl}
Follow us on Instagram: ${INSTAGRAM_URL}

Cheers,
The BuyUnrepped Team

You received this email because you opted in at buyunrepped.com.
Unsubscribe from marketing email: ${unsubscribePageUrl}
${FIRM_LINE}
${POSTAL_ADDRESS} · ${FIRM_PHONE}`;
}

export interface SendContactWelcomeEmailResult {
  ok: boolean;
  error?: string;
}

export async function sendContactWelcomeEmail(
  input: ContactWelcomeEmailInput
): Promise<SendContactWelcomeEmailResult> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim() || 'info@buyunrepped.com';
  const fromName = process.env.SENDGRID_FROM_NAME?.trim() || 'BuyUnrepped';

  if (!apiKey) {
    console.warn('SENDGRID_API_KEY is not configured; skipping contact welcome email');
    return { ok: true };
  }

  sgMail.setApiKey(apiKey);

  try {
    await sgMail.send({
      to: input.email,
      from: { email: fromEmail, name: fromName },
      subject: 'Welcome to BuyUnrepped!',
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
