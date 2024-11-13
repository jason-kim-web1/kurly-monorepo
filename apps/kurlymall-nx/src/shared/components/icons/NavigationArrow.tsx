import COLOR from '../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function NavigationArrow({ width = 29, height = 41, color = COLOR.kurlyWhite }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 29 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_dd_6783_1734)">
        <path d="M21.3333 7L8 20.5L21.3333 34" stroke={color} strokeWidth="2" />
      </g>
      <defs>
        <filter
          id="filter0_dd_6783_1734"
          x="0.594727"
          y="0.297241"
          width="27.4502"
          height="40.4055"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6783_1734" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_6783_1734" result="effect2_dropShadow_6783_1734" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_6783_1734" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}
