export function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL?.trim();
  return url && url.length > 0 ? url.replace(/\/+$/, '') : 'https://app.buyunrepped.com';
}
