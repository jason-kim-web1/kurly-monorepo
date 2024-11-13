import { SVGAttributes } from 'react';

export const Clip = ({ width = 18, height = 18, stroke = 'white', ...props }: SVGAttributes<SVGElement>) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.4286 10.143L14.7143 7.85721C15.9767 6.59484 15.9767 4.54812 14.7143 3.28574V3.28574C13.4519 2.02336 11.4052 2.02336 10.1429 3.28574L7.85713 5.57148"
        stroke={stroke}
        strokeWidth="1.3"
      />
      <path
        d="M5.57141 7.85705L3.28568 10.1428C2.02331 11.4052 2.02331 13.4519 3.28568 14.7143V14.7143C4.54806 15.9766 6.59477 15.9766 7.85714 14.7143L10.1429 12.4285"
        stroke={stroke}
        strokeWidth="1.3"
      />
      <path d="M11.6665 6.33342L7.09505 10.9049" stroke={stroke} strokeWidth="1.3" />
    </svg>
  );
};
