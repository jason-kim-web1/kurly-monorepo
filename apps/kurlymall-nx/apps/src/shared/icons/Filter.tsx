export default function Filter({ width = 18, height = 18, ...props }: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2 6.5H5" stroke="#333333" />
      <path d="M7 6.5H16" stroke="#333333" />
      <circle cx="6" cy="6.5" r="1.5" stroke="#333333" />
      <path d="M2 11.5H11" stroke="#333333" />
      <path d="M13 11.5H16" stroke="#333333" />
      <circle cx="12" cy="11.5" r="1.5" stroke="#333333" />
    </svg>
  );
}
