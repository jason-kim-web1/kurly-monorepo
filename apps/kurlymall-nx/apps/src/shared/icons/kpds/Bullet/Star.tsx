import * as React from 'react';

import { vars } from '@thefarmersfront/kpds-css';

export default function Star({ width = 6, height = 6, fill = vars.color.$gray900 }: React.SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 6 6" fill="none">
      <path
        d="M2.36364 6L2.48485 3.87715L0.651515 5.04177L0 3.9656L1.95455 3.00737L0 2.0344L0.651515 0.958231L2.48485 2.12285L2.36364 0H3.65152L3.5303 2.12285L5.36364 0.958231L6 2.0344L4.06061 3.00737L6 3.9656L5.36364 5.04177L3.5303 3.87715L3.65152 6H2.36364Z"
        fill={fill}
      />
    </svg>
  );
}
