import { isValidLeadQualifier } from './leadQualifiers';

export function buildContactUrl(input: {
  interest?: string;
  message?: string;
  city?: string;
  state?: string;
}): string {
  const params = new URLSearchParams();

  if (input.interest && isValidLeadQualifier(input.interest)) {
    params.set('interest', input.interest);
  }

  const location =
    input.city && input.state ? `${input.city.trim()}, ${input.state.trim().toUpperCase()}` : '';

  let message = input.message?.trim() || '';
  if (location && !message.toLowerCase().includes(input.city!.trim().toLowerCase())) {
    message = message
      ? `Market: ${location}\n\n${message}`
      : `I'm interested in BuyUnrepped in ${location}. `;
  }

  if (message) {
    params.set('message', message);
  }

  if (input.city) {
    params.set('city', input.city.trim());
  }

  if (input.state) {
    params.set('state', input.state.trim().toUpperCase());
  }

  const query = params.toString();
  return query ? `/contact?${query}` : '/contact';
}
