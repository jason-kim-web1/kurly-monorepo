import COLOR from '../../../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  bg?: string;
}

const TooltipArrow = ({ width = 10, height = 6, fill = COLOR.benefitGray, bg = COLOR.kurlyWhite }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 10 6" fill="none">
      <g clipPath="url(#clip0_8910_2850)">
        <path
          d="M6.5264 4.24515C5.8214 5.25162 4.1786 5.25162 3.4736 4.24515L0.5 0L9.5 0L6.5264 4.24515Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_8910_2850">
          <rect width={width} height={height} fill={bg} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TooltipArrow;
