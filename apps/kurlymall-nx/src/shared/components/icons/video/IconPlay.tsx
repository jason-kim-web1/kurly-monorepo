interface Props {
  width?: number;
  height?: number;
}

const IconPlay = ({ width = 20, height = 20 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10132_120)">
        <path
          d="M15.8574 8.61815C16.9363 9.25988 16.9363 10.7401 15.8574 11.3818L6.0005 17.2443C4.8431 17.9326 3.33325 17.1504 3.33325 15.8624V4.13758C3.33325 2.84957 4.8431 2.06736 6.0005 2.75573L15.8574 8.61815Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_10132_120">
          <rect width="13.3333" height="15" fill="white" transform="translate(3.33325 2.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export { IconPlay };
