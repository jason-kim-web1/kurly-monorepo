import COLOR from '../constant/colorset';

export default function CheckBoxActive({
  width = 18,
  height = 18,
  stroke = COLOR.kurlyWhite,
  fill = COLOR.kurlyPurple,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill={fill}
      />
      <path
        d="M7 12.6667L10.3846 16L18 8.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
