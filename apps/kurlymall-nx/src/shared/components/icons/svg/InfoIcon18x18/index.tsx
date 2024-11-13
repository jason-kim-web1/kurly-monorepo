import COLOR from '../../../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  rectSize?: number;
  color?: string;
}

const InfoIcon18x18 = ({ width = 18, height = 18, rectSize = 17.5, color = COLOR.kurlyWhite }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18" fill="none">
    <g clipPath="url(#clip0_9369_1668)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.99997 16.0833C12.912 16.0833 16.0833 12.912 16.0833 9C16.0833 5.08798 12.912 1.91667 8.99997 1.91667C5.08797 1.91667 1.91666 5.08798 1.91666 9C1.91666 12.912 5.08797 16.0833 8.99997 16.0833ZM17.7499 9C17.7499 13.8325 13.8325 17.75 8.99997 17.75C4.1675 17.75 0.25 13.8325 0.25 9C0.25 4.16751 4.1675 0.25 8.99997 0.25C13.8325 0.25 17.7499 4.16751 17.7499 9Z"
        fill="white"
      />
      <path d="M8.66659 5.58331L8.66659 4.91665L9.33325 4.91665L9.33325 5.58331L8.66659 5.58331Z" stroke={color} />
      <path d="M9.33325 13.0833L8.66659 13.0833L8.66659 8.24998L9.33325 8.24998L9.33325 13.0833Z" stroke={color} />
    </g>
    <defs>
      <clipPath id="clip0_9369_1668">
        <rect width={rectSize} height={rectSize} fill={color} transform="translate(0.25 0.25)" />
      </clipPath>
    </defs>
  </svg>
);

export default InfoIcon18x18;
