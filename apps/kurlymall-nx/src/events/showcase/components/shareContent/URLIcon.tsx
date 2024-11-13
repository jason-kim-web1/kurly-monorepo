import { SVGAttributes } from 'react';

type Props = SVGAttributes<SVGElement>;

const URLIcon = ({ width = 64, height = 64 }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="24" fill="#CBA3E9" />
      <g filter="url(#filter0_d_2177_148)">
        <path
          d="M19.9138 18.6016H21.1443V25.1504C21.1443 27.1875 19.6198 28.6709 17.2888 28.6777C14.9509 28.6709 13.4333 27.1875 13.4333 25.1504V18.6016H14.6638V25.0547C14.657 26.4902 15.655 27.5225 17.2888 27.5293C18.9226 27.5225 19.907 26.4902 19.9138 25.0547V18.6016ZM23.0518 28.5V18.6016H26.415C28.7324 18.6016 29.792 19.8867 29.792 21.6504C29.792 22.9629 29.2041 23.9883 27.9463 24.4258L30.1748 28.5H28.7393L26.668 24.6514C26.5928 24.6582 26.5107 24.6582 26.4287 24.6582H24.2822V28.5H23.0518ZM24.2822 23.5371H26.374C27.9531 23.5371 28.5684 22.8262 28.5752 21.6504C28.5684 20.4678 27.9531 19.6953 26.3604 19.6953H24.2822V23.5371ZM31.2893 28.5V18.6016H32.5198V27.4062H37.1136V28.5H31.2893Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2177_148"
          x="11.1833"
          y="16.3516"
          width="28.1802"
          height="14.5762"
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
          <feGaussianBlur stdDeviation="1.125" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.286275 0 0 0 0 0.235294 0 0 0 0 0.196078 0 0 0 0.129412 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2177_148" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2177_148" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export { URLIcon };
