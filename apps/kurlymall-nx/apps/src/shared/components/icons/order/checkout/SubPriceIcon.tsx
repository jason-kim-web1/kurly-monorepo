import COLOR from '../../../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  stroke?: string;
}

export default function SubPriceIcon({ width = 16, height = 20, stroke = COLOR.lightGray }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M1 5H0V10V11H1H6V10H1V5Z" fill={stroke} />
    </svg>
  );
}
