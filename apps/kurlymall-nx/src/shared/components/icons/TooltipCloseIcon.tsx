import COLOR from '../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  stroke?: string;
}

export default function TooltipCloseIcon({ width = 16, height = 16, stroke = COLOR.kurlyWhite }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none">
      <path d="M12.6154 12.8154L3 3" stroke={stroke} strokeLinecap="round" />
      <path d="M3 12.8154L12.6242 3" stroke={stroke} strokeLinecap="round" />
    </svg>
  );
}
