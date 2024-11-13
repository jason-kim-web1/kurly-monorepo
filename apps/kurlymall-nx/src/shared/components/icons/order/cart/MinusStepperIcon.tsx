import { vars } from '@thefarmersfront/kpds-css';
import { SVGAttributes } from 'react';

/**
 * 장바구니 수량 감소 MINUS ICON SVG 컴포넌트입니다.
 *
 * @param width
 * @param height
 * @param fill
 * @param props
 * @constructor
 */
export default function MinusStepperIcon({
  width = 20,
  height = 20,
  fill = vars.color.$black,
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M3.33334 9.16663H16.6667V10.8333H3.33334V9.16663Z" fill={fill} />
    </svg>
  );
}
