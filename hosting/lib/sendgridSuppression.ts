/**
 * Adds an address to SendGrid global suppressions so future marketing sends are blocked.
 * Failures are logged but do not block the local unsubscribe flow.
 */
export async function addSendGridGlobalSuppression(email: string): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  if (!apiKey) return;

  try {
    const response = await fetch('https://api.sendgrid.com/v3/asm/suppressions/global', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient_emails: [email] }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.warn('SendGrid global suppression failed:', response.status, detail);
    }
  } catch (error) {
    console.warn('SendGrid global suppression error:', error);
  }
}
