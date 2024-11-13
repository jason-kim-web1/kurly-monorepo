import COLOR from '../../../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  rectColor?: string;
  plusColor?: string;
}

export default function KurlypayCardPlusIcon({
  width = 34,
  height = 34,
  rectColor = COLOR.kurlyGray200,
  plusColor = COLOR.kurlyGray400,
}: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" width={width} height={height} rx="17" fill={rectColor} />
      <path d="M17.5 9.5625V24.4375" stroke={plusColor} strokeWidth="2" />
      <path d="M24.9375 17L10.0625 17" stroke={plusColor} strokeWidth="2" />
    </svg>
  );
}
