import * as React from 'react';

import COLOR from '../constant/colorset';

interface Props extends React.SVGAttributes<SVGElement> {
  fillBg?: string;
}

export default function SpecialIcon({
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
        d="M20.27,24.33a.08.08,0,0,1,0,.09l-.56,2.35a.1.1,0,0,0,.15.11L22,25.62a.09.09,0,0,1,.1,0l2.06,1.26a.1.1,0,0,0,.15-.11l-.56-2.35a.08.08,0,0,1,0-.09l1.84-1.58a.1.1,0,0,0-.06-.17l-2.41-.19a.1.1,0,0,1-.08-.06l-.93-2.23a.1.1,0,0,0-.18,0L21,22.33a.1.1,0,0,1-.08.06l-2.41.19a.1.1,0,0,0-.06.17Z"
      />
      <path
        fill={fill}
        d="M32.08,13.32H11.92a.77.77,0,0,0-.78.77v2.56a.77.77,0,0,0,.78.77h.14V30.77a.77.77,0,0,0,.77.77H31.17a.77.77,0,0,0,.77-.77V17.42h.14a.77.77,0,0,0,.78-.77V14.09A.77.77,0,0,0,32.08,13.32Zm-.91,17.45H12.83V17.42H31.17Zm0-14.12H11.92V14.09H32.08v2.56Z"
      />
    </svg>
  );
}