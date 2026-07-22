import { ImageResponse } from 'next/og';
import { loadOgFonts } from '../lib/ogFonts';

export const alt = 'BuyUnrepped - Flat-Fee Home Buying in Tennessee';
export const size = { width: 1200, height: 1200 };
export const contentType = 'image/png';

export default async function TwitterImage() {
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
            padding: '64px 72px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 220,
              height: 220,
              borderRadius: 48,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '2px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Inter',
                fontSize: 112,
                fontWeight: 800,
                letterSpacing: '-0.06em',
                lineHeight: 1,
              }}
            >
              <span style={{ color: '#1b5373' }}>B</span>
              <span style={{ color: '#39b6ff' }}>U</span>
            </div>
          </div>
          <div
            style={{
              marginTop: 40,
              fontFamily: 'Inter',
              fontSize: 44,
              fontWeight: 700,
              color: '#f7c74a',
              lineHeight: 1.15,
              maxWidth: 880,
            }}
          >
            Flat-Fee Home Buying in Tennessee
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
