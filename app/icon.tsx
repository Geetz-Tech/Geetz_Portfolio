import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c4a4ff',
          background: 'linear-gradient(145deg, #151021, #050509)',
          fontSize: 44,
          fontWeight: 800,
          letterSpacing: '-0.08em',
        }}
      >
        G
      </div>
    ),
    size,
  );
}
