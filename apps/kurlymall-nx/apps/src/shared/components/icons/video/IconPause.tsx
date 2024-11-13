interface Props {
  width?: number;
  height?: number;
}

const IconPause = ({ width = 20, height = 20 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10132_236)">
        <path
          d="M4.80552 2.91666C3.76231 2.91666 2.91663 3.70949 2.91663 4.68749V15.3125C2.91663 16.2905 3.76231 17.0833 4.80552 17.0833H6.69441C7.73761 17.0833 8.5833 16.2905 8.5833 15.3125V4.68749C8.5833 3.70949 7.73761 2.91666 6.69441 2.91666H4.80552Z"
          fill="white"
        />
        <path
          d="M13.3055 2.91666C12.2623 2.91666 11.4166 3.70949 11.4166 4.68749V15.3125C11.4166 16.2905 12.2623 17.0833 13.3055 17.0833H15.1944C16.2376 17.0833 17.0833 16.2905 17.0833 15.3125V4.68749C17.0833 3.70949 16.2376 2.91666 15.1944 2.91666H13.3055Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_10132_236">
          <rect width="14.1667" height="14.1667" fill="white" transform="translate(2.91663 2.91666)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export { IconPause };
