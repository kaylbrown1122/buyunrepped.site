import { ImageResponse } from 'next/og';
import { loadWordmarkDataUrl, ogBackgroundStyle } from '../lib/ogLogo';

export const alt = 'BuyUnrepped - Flat-Fee Home Buying in Tennessee';
export const size = { width: 1200, height: 1200 };
export const contentType = 'image/png';

export default async function TwitterImage() {
  const wordmarkSrc = await loadWordmarkDataUrl();

  return new ImageResponse(
    (
      <div style={ogBackgroundStyle}>
        <div style={{ height: 6, width: '100%', background: '#f7c74a' }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 96px',
          }}
        >
          <img
            src={wordmarkSrc}
            alt=""
            width={900}
            height={254}
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
