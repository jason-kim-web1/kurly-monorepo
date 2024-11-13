interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function InfoIcon({ width = 14, height = 14, color = '#5F0080' }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <circle stroke={color} strokeWidth="1.2" cx="7" cy="7" r="6.4" />
        <circle fill={color} cx="7" cy="4.4" r="1" />
        <rect fill={color} x="6.3" y="6.2" width="1.4" height="4.4" rx=".7" />
      </g>
    </svg>
  );
}
