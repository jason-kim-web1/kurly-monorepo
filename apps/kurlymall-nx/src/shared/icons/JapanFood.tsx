import * as React from 'react';

import COLOR from '../constant/colorset';

interface Props extends React.SVGAttributes<SVGElement> {
  fillBg?: string;
}

export default function JapanFood({
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
        d="M34.57,20.48c0-1.74-3-3.26-3.38-3.42a19.08,19.08,0,0,0-18.31,0c-.35.16-3.4,1.68-3.4,3.42a3.19,3.19,0,0,0,2.71,3.15,4.47,4.47,0,0,0,4.42,5.31H27.45a4.49,4.49,0,0,0,4.49-4.49,5.55,5.55,0,0,0-.07-.82A3.18,3.18,0,0,0,34.57,20.48Zm-24.31,0c0-.95,1.81-2.18,3-2.73a19.57,19.57,0,0,1,6.86-2.14v5.11H20a20.52,20.52,0,0,0-6.51,1.76c-.29.13-.58.26-.86.41l-.19,0A2.42,2.42,0,0,1,10.26,20.48Zm2.63,4a3.74,3.74,0,0,1,.11-.89,19.87,19.87,0,0,1,7.08-2.06v6.67H16.61A3.72,3.72,0,0,1,12.89,24.45Zm14.56,3.72H24V21.5a19.93,19.93,0,0,1,7.08,2.06,3.71,3.71,0,0,1-3.61,4.61Zm4.21-5.29-.19,0c-.28-.15-.57-.28-.86-.41a20.51,20.51,0,0,0-6.52-1.76H24v-5.1a19.46,19.46,0,0,1,6.87,2.13c1.14.55,2.95,1.78,2.95,2.73A2.42,2.42,0,0,1,31.66,22.88Z"
      />
    </svg>
  );
}
