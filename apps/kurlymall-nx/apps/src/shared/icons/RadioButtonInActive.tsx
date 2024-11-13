import COLOR from '../constant/colorset';

export default function RadioButtonInActive({
  width = 18,
  height = 18,
  fill = COLOR.kurlyWhite,
  stroke = COLOR.lightGray,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 23.5C18.3513 23.5 23.5 18.3513 23.5 12C23.5 5.64873 18.3513 0.5 12 0.5C5.64873 0.5 0.5 5.64873 0.5 12C0.5 18.3513 5.64873 23.5 12 23.5Z"
        fill={fill}
        stroke={stroke}
      />
    </svg>
  );
}
