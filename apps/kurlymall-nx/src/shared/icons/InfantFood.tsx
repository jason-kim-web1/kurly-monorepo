import * as React from 'react';

import COLOR from '../constant/colorset';

interface Props extends React.SVGAttributes<SVGElement> {
  fillBg?: string;
}

export default function InfantFood({
  width = 44,
  height = 44,
  fillBg = COLOR.kurlyWhite,
  fill = COLOR.kurlyPurple,
  ...props
}: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle fill={fillBg} cx="22" cy="22" r="22" />
      <path
        fill={fill}
        d="M27.17,17.28a.73.73,0,0,0,.06-.3V15.44a.76.76,0,0,0-.77-.77h0a4.58,4.58,0,0,0-2.31-3.6,1.41,1.41,0,0,0,0-.2,2.25,2.25,0,1,0-4.49,0,1.41,1.41,0,0,0,0,.2,4.58,4.58,0,0,0-2.31,3.6h0a.77.77,0,0,0-.77.77V17a.73.73,0,0,0,.06.3,2,2,0,0,0-.9,1.63V31.65a1.93,1.93,0,0,0,1.93,1.93h8.49a1.94,1.94,0,0,0,1.93-1.93V18.91A1.93,1.93,0,0,0,27.17,17.28Zm-6.91-5.65.28-.13-.07-.3a1.35,1.35,0,0,1,0-.33,1.48,1.48,0,1,1,2.95,0,2.11,2.11,0,0,1,0,.33l-.07.3.28.13a3.77,3.77,0,0,1,2.13,3H18.12A3.78,3.78,0,0,1,20.26,11.63Zm7,20a1.16,1.16,0,0,1-1.16,1.16H17.66a1.16,1.16,0,0,1-1.16-1.16V29.53h3.57a.39.39,0,0,0,0-.78H16.5V25.67h3.57a.39.39,0,0,0,0-.78H16.5V21.81h3.57a.4.4,0,0,0,.39-.39.39.39,0,0,0-.39-.38H16.5V18.91a1.16,1.16,0,0,1,1.16-1.16h8.49a1.16,1.16,0,0,1,1.16,1.16Z"
      />
    </svg>
  );
}