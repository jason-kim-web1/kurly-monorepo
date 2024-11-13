import COLOR from '../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  stroke?: string;
}

export default function ThumbsUp({ width = 14, height = 14, stroke = COLOR.kurlyGray450 }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.04837 12.9998H2.21935C1.54592 12.9998 1 12.4626 1 11.7999V7.59992C1 6.93718 1.54592 6.39993 2.21935 6.39993H4.04837M8.31608 5.19995V2.79998C8.31608 1.80588 7.4972 1 6.48706 1L4.04837 6.39993V12.9999H10.9255C11.5335 13.0066 12.0537 12.5715 12.1448 11.9799L12.9862 6.57993C13.0399 6.23185 12.9355 5.87812 12.7008 5.61245C12.466 5.34678 12.1246 5.19596 11.7668 5.19995H8.31608Z"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
