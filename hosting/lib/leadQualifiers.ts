export const LEAD_QUALIFIER_OPTIONS = [
  'Looking to buy in the next 0-6 months',
  'Looking to buy in the next 6-12 months',
  '1yr+',
  "I'm an agent who is curious",
  "I'm a vendor who is curious",
  'Interested in opening my own BuyUnrepped office',
  'I just want to chat',
] as const;

export type LeadQualifier = (typeof LEAD_QUALIFIER_OPTIONS)[number];

export const DEFAULT_LEAD_QUALIFIER: LeadQualifier = LEAD_QUALIFIER_OPTIONS[0];

const QUALIFIER_SET = new Set<string>(LEAD_QUALIFIER_OPTIONS);

export function isValidLeadQualifier(value: string): value is LeadQualifier {
  return QUALIFIER_SET.has(value);
}

export function normalizeLeadQualifier(value: unknown): LeadQualifier | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return isValidLeadQualifier(trimmed) ? trimmed : null;
}
