import { ImageResponse } from 'next/og';
import { loadOgFonts } from '../lib/ogFonts';

export const alt = "BuyUnrepped - Buy a Home in Tennessee Without a Buyer's Agent";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'radial-gradient(ellipse at 60% 40%, #24709d 0%, #1b5373 50%, #0a1f2c 100%)',
        }}
      >
        <div style={{ height: 6, width: '100%', background: '#f7c74a' }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 64px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: 88,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            BuyUnrepped
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: 'Inter',
              fontSize: 40,
              fontWeight: 700,
              color: '#f7c74a',
              lineHeight: 1.15,
              maxWidth: 920,
            }}
          >
            Buy a Home in Tennessee Without a Buyer&apos;s Agent
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: 'Inter',
              fontSize: 28,
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.5)',
              lineHeight: 1.2,
            }}
          >
            buyunrepped.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
