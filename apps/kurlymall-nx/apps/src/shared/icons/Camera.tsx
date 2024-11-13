import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

export default function Camera({
  width = 30,
  height = 30,
  stroke = COLOR.kurlyGray800,
  strokeWidth = 1.3,
}: SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h30v30H0z" />
        <g transform="translate(4.779 6.111)" stroke={stroke} strokeWidth={strokeWidth}>
          <path d="M11.792 0c.399 0 .717.056.955.17.179.084.346.199.503.344l.153.155.631.703c.122.13.234.233.337.31a.95.95 0 0 0 .34.16c.125.031.292.047.503.047l2.906-.003c1.284 0 2.324 1.062 2.324 2.37v11.151c0 1.31-1.04 2.37-2.324 2.37H2.324c-1.283 0-2.324-1.06-2.324-2.37V4.257c0-1.31 1.04-2.37 2.324-2.37h2.983c.245-.009.432-.045.559-.108.11-.055.23-.145.36-.27l.134-.137.631-.703c.2-.22.418-.387.657-.5.19-.09.432-.144.725-.162L8.603 0h3.189z" />
          <circle cx="10.142" cy="9.529" r="3.556" />
        </g>
      </g>
    </svg>
  );
}