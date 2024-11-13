export default function ListIcon({ width = 20, height = 20 }: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <ellipse cx="4.0004" cy="5.90005" rx="1.10001" ry="1.1" fill="#222222" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1003 6.60007H7.10034V5.20007H17.1003V6.60007Z"
        fill="#222222"
      />
      <ellipse cx="4.0004" cy="10.5" rx="1.10001" ry="1.1" fill="#222222" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.1003 11.2H7.10034V9.80005H17.1003V11.2Z" fill="#222222" />
      <ellipse cx="4.0004" cy="15.1" rx="1.10001" ry="1.1" fill="#222222" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1003 15.7C17.1003 15.7553 17.0556 15.8 17.0003 15.8H7.20034C7.14511 15.8 7.10034 15.7553 7.10034 15.7V14.5C7.10034 14.4448 7.14511 14.4 7.20034 14.4H17.0003C17.0556 14.4 17.1003 14.4448 17.1003 14.5V15.7Z"
        fill="#222222"
      />
    </svg>
  );
}
