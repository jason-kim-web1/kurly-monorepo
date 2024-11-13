interface Props {
  width?: number;
  height?: number;
}

const IconSoundOff = ({ width = 20, height = 20 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.81513 13.4922H1.9612C1.33832 13.4922 0.833374 12.8636 0.833374 12.0882V7.9143C0.833374 7.13891 1.33832 6.51033 1.9612 6.51033H4.81226L8.25942 3.62438C9.1 2.88715 10.259 3.63555 10.259 4.91557V15.0845C10.259 16.3645 9.1 17.1129 8.25942 16.3756L4.81513 13.4922Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2401 6.51104L12.0548 7.67142L14.4252 9.99204L12.0552 12.3122L13.2405 13.4726L15.6104 11.1524L17.981 13.4733L19.1663 12.3129L16.7956 9.99204L19.1667 7.67071L17.9815 6.51033L15.6104 8.83166L13.2401 6.51104Z"
        fill="white"
      />
    </svg>
  );
};

export { IconSoundOff };
