import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function loadWordmarkDataUrl() {
  const logo = await readFile(join(process.cwd(), 'public/images/buyunrepped-cropped.png'));
  return `data:image/png;base64,${logo.toString('base64')}`;
}

export const ogBackgroundStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as const,
  background: 'radial-gradient(ellipse at 60% 40%, #24709d 0%, #1b5373 50%, #0a1f2c 100%)',
};
