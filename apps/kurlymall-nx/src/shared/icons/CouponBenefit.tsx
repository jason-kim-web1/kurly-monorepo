import * as React from 'react';

import { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

interface Props extends SVGAttributes<SVGElement> {
  fill2?: string;
  fillBg?: string;
}

export default function CouponBenefit({
  width = 32,
  height = 32,
  fill = '#ACE1EC',
  fill2 = '#4DBED7',
  fillBg = COLOR.kurlyWhite,
  ...props
}: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M28.1616 13.3315H9.16162V17.2602V20.403V24.3315H28.1616V20.4029L28.1455 20.403C27.2532 20.403 26.5298 19.6994 26.5298 18.8315C26.5298 17.9637 27.2532 17.2601 28.1455 17.2601L28.1616 13.3315Z"
        fill={fill}
      />
      <path
        d="M24.1616 8.33154H4.16162V12.6173C5.52217 12.6174 5.8623 13.7602 5.8623 14.3315C5.8623 15.2783 5.10088 16.0458 4.16162 16.0458V20.3315H24.1616V16.0457L24.1446 16.0458C23.2054 16.0458 22.4439 15.2783 22.4439 14.3315C22.4439 13.3848 23.2054 12.6173 24.1446 12.6173L24.1616 8.33154Z"
        fill={fill2}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9717 11.8462C13.3103 12.1945 13.3103 12.7591 12.9717 13.1074C12.6331 13.4557 12.0841 13.4557 11.7455 13.1074C11.4069 12.7591 11.4069 12.1945 11.7455 11.8462C12.0841 11.4979 12.6331 11.4979 12.9717 11.8462ZM13.4406 11.3639C14.0381 11.9785 14.0381 12.9751 13.4406 13.5897C12.843 14.2043 11.8742 14.2043 11.2767 13.5897C10.6791 12.9751 10.6791 11.9785 11.2767 11.3639C11.8742 10.7493 12.843 10.7493 13.4406 11.3639ZM16.1452 11.7773L11.6782 16.3719L12.178 16.8859L16.645 12.2913L16.1452 11.7773ZM16.5781 16.817C16.9168 16.4687 16.9168 15.904 16.5781 15.5558C16.2395 15.2075 15.6905 15.2075 15.3519 15.5558C15.0133 15.904 15.0133 16.4687 15.3519 16.817C15.6905 17.1653 16.2395 17.1653 16.5781 16.817ZM17.047 17.2993C17.6445 16.6846 17.6445 15.6881 17.047 15.0735C16.4494 14.4589 15.4806 14.4589 14.8831 15.0735C14.2855 15.6881 14.2855 16.6846 14.8831 17.2993C15.4806 17.9139 16.4494 17.9139 17.047 17.2993Z"
        fill={fillBg}
      />
    </svg>
  );
}