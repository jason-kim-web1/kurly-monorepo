import { SVGAttributes } from 'react';

type Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowTailRight = ({ width = 20, height = 20, fill = '#565E67' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2132 17.6605L17.8735 10.0002L10.2132 2.33984L9.0347 3.51836L14.684 9.16764H2.12402V10.8343L14.6824 10.8343L9.0347 16.482L10.2132 17.6605Z"
        fill={fill}
      />
      <defs>
        <clipPath id="clip0_12587_16100">
          <rect width="15.3207" height="15.7495" fill="white" transform="translate(2.33887 2.125)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export { ArrowTailRight };
