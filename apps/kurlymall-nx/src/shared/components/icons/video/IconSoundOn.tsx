interface Props {
  width?: number;
  height?: number;
}

const IconSoundOn = ({ width = 20, height = 20 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10132_91)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7865 10.0009C16.7865 8.39396 16.1681 6.93331 15.1549 5.84091L16.358 4.72495C17.6416 6.1088 18.4275 7.96398 18.4275 10.0009C18.4275 12.0378 17.6416 13.893 16.358 15.2768L15.1549 14.1608C16.1681 13.0684 16.7865 11.6078 16.7865 10.0009Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.0312 10.0008C13.0312 9.01068 12.6019 8.12196 11.9166 7.50864L13.011 6.28582C14.0294 7.19728 14.6723 8.52449 14.6723 10.0008C14.6723 11.477 14.0294 12.8043 13.011 13.7157L11.9166 12.4929C12.6019 11.8796 13.0312 10.9909 13.0312 10.0008Z"
          fill="white"
        />
        <path
          d="M4.815 13.4922H1.96108C1.3382 13.4922 0.833252 12.8636 0.833252 12.0882V7.9143C0.833252 7.13891 1.3382 6.51033 1.96108 6.51033H4.81214L8.25929 3.62438C9.09987 2.88715 10.2589 3.63555 10.2589 4.91557V15.0845C10.2589 16.3645 9.09988 17.1129 8.2593 16.3756L4.815 13.4922Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_10132_91">
          <rect width="17.5942" height="13.3333" fill="white" transform="translate(0.833252 3.33334)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export { IconSoundOn };
