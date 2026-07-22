import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function loadOgFonts() {
  const fontsDir = join(process.cwd(), 'node_modules/@fontsource/inter/files');
  const [interBold, interExtraBold] = await Promise.all([
    readFile(join(fontsDir, 'inter-latin-700-normal.woff')),
    readFile(join(fontsDir, 'inter-latin-800-normal.woff')),
  ]);

  return [
    { name: 'Inter', data: interBold, weight: 700 as const, style: 'normal' as const },
    { name: 'Inter', data: interExtraBold, weight: 800 as const, style: 'normal' as const },
  ];
}
