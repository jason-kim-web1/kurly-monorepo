import COLOR from '../constant/colorset';

export default function EmptyError({
  width = 48,
  height = 48,
  stroke = COLOR.kurlyGray250,
  fill = COLOR.kurlyGray250,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_406_15051)">
        <path
          d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
          stroke={stroke}
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 13C25.1046 13 26 13.8954 26 15V26C26 27.1046 25.1046 28 24 28C22.8954 28 22 27.1046 22 26V15C22 13.8954 22.8954 13 24 13ZM24 31C25.1046 31 26 31.8954 26 33C26 34.1046 25.1046 35 24 35C22.8954 35 22 34.1046 22 33C22 31.8954 22.8954 31 24 31Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_406_15051">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
