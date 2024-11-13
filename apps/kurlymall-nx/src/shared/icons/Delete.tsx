import COLOR from '../constant/colorset';

export default function Delete({
  width = 20,
  height = 20,
  stroke = COLOR.kurlyGray350,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5.55566 5.55566L14.4446 14.4446" stroke={stroke} />
      <path d="M14.4443 5.55566L5.55545 14.4446" stroke={stroke} />
    </svg>
  );
}
