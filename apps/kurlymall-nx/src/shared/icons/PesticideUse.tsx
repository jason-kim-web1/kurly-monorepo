import * as React from 'react';

import COLOR from '../constant/colorset';

interface Props extends React.SVGAttributes<SVGElement> {
  fillBg?: string;
}

export default function PesticideUse({
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
        d="M29.68,14.26l.38-1.67a.75.75,0,0,0-.14-.65.77.77,0,0,0-.61-.3H14.69a.77.77,0,0,0-.61.3.75.75,0,0,0-.14.65l.38,1.67a22.51,22.51,0,0,0-.41,14.05l.41,1.42-.38,1.68a.75.75,0,0,0,.14.65.77.77,0,0,0,.61.3H29.31a.77.77,0,0,0,.61-.3.75.75,0,0,0,.14-.65l-.38-1.68.41-1.42A22.51,22.51,0,0,0,29.68,14.26Zm-.33,13.83-.47,1.62.43,1.87H14.69l.43-1.87-.47-1.62a21.72,21.72,0,0,1,.44-13.68l0-.1-.43-1.89H29.31l-.43,1.89,0,.1A21.72,21.72,0,0,1,29.35,28.09Z"
      />
      <path
        fill={fill}
        d="M25.69,19.05A3.52,3.52,0,0,0,22,22H22a3.52,3.52,0,0,0-3.65-2.94h0v0a3.52,3.52,0,0,0,1,2.67,3.48,3.48,0,0,0,2.31,1v3.09a.39.39,0,0,0,.78,0V22.77a3.51,3.51,0,0,0,3.34-3.69v0Z"
      />
    </svg>
  );
}
