import { ImageResponse } from 'next/og';
import { loadWordmarkDataUrl, ogBackgroundStyle } from '../lib/ogLogo';

export const alt = "BuyUnrepped - Buy a Home in Tennessee Without a Buyer's Agent";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
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
            padding: '48px 80px',
          }}
        >
          <img
            src={wordmarkSrc}
            alt=""
            width={800}
            height={226}
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
