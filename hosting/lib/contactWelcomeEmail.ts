import sgMail from '@sendgrid/mail';

const SITE_URL = 'https://www.buyunrepped.com';
const LOGO_URL = `${SITE_URL}/images/buyunrepped-cropped.png`;
const INSTAGRAM_URL = 'https://www.instagram.com/buyunrepped';

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

export function buildContactWelcomeEmailHtml(input: ContactWelcomeEmailInput): string {
  const firstName = escapeHtml(input.firstName);
  const location = escapeHtml(input.location || 'Middle Tennessee');
  const appUrl = escapeHtml(getAppUrl());

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
              <p style="margin:0 0 18px;">Hi ${firstName} !</p>
              <p style="margin:0 0 18px;">
                You&apos;re in! &#127881; We&apos;re thrilled you stopped by to check out <strong>BuyUnrepped</strong>,
                and we can&apos;t wait to help equip you with everything you need to confidently <strong>buy</strong> a home
                in <strong>${location}</strong>.
              </p>
              <p style="margin:0 0 18px;">
                We&apos;re not here to spam you, but we <em>do</em> want to support you. Here&apos;s what you&apos;ll receive from us:
              </p>
              <p style="margin:0 0 10px;">&#127968; A heads-up when we&apos;re fully live in your market</p>
              <p style="margin:0 0 10px;">&#128140; Our monthly newsletter packed with useful tips</p>
              <p style="margin:0 0 10px;">&#128184; Special rate promotions, when available</p>
              <p style="margin:0 0 24px;">&#128276; Alerts if/when you have a running offer or transaction within our webapp!</p>
              <p style="margin:0 0 28px;">
                In the meantime, feel free to click around our temporary landing page, and don&apos;t hesitate to reach out
                if you have questions, concerns, or would like to connect. We&apos;re here when you need us!
                And if you need to <strong>buy</strong> a home pronto, <em>we can totally get you set up to purchase using our Beta!</em>
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <a href="${SITE_URL}" style="display:inline-block;background-color:#f7c74a;color:#1b5373;font-size:16px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:999px;">
                Explore Our Landing Page
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
            <td style="padding-top:24px;font-size:12px;line-height:1.5;color:#9ca3af;">
              Ready to start now? <a href="${appUrl}" style="color:#39b6ff;text-decoration:none;">Open the BuyUnrepped app</a>.
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

  return `Hi ${input.firstName} !

You're in! We're thrilled you stopped by to check out BuyUnrepped, and we can't wait to help equip you with everything you need to confidently buy a home in ${location}.

We're not here to spam you, but we do want to support you. Here's what you'll receive from us:

- A heads-up when we're fully live in your market
- Our monthly newsletter packed with useful tips
- Special rate promotions, when available
- Alerts if/when you have a running offer or transaction within our webapp!

In the meantime, feel free to click around our temporary landing page, and don't hesitate to reach out if you have questions, concerns, or would like to connect. We're here when you need us! And if you need to buy a home pronto, we can totally get you set up to purchase using our Beta!

Explore our landing page: ${SITE_URL}
Follow us on Instagram: ${INSTAGRAM_URL}
Open the BuyUnrepped app: ${appUrl}

Cheers,
The BuyUnrepped Team`;
}

export async function sendContactWelcomeEmail(
  input: ContactWelcomeEmailInput
): Promise<{ ok: true } | { ok: false; error: string }> {
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
    });
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown SendGrid error';
    console.error('SendGrid contact welcome email error:', error);
    return { ok: false, error: message };
  }
}
