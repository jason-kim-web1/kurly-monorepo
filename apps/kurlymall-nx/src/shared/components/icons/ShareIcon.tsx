import COLOR from '../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  stroke?: string;
}

export default function ShareIcon({ width = 40, height = 40, stroke = COLOR.kurlyGray800 }: Props) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <g stroke={stroke} strokeWidth="1.5" fill="none" fillRule="evenodd">
        <path d="M15.934 17.705h-2.748a.7.7 0 0 0-.7.7v10.589c0 .348.281.63.63.63h14.957a.63.63 0 0 0 .63-.63V18.405a.7.7 0 0 0-.7-.7h-2.75M15.934 14.492l4.66-4.412 4.658 4.412M20.598 10.08l-.004 13.584" />
      </g>
    </svg>
  );
}
