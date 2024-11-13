import { vars } from '@thefarmersfront/kpds-css';
import { SVGAttributes } from 'react';

/**
 * 장바구니 수량 증가 PLUS ICON SVG 컴포넌트입니다.
 *
 * @param width
 * @param height
 * @param fill
 * @param props
 * @constructor
 */
export default function PlusStepperIcon({
  width = 20,
  height = 20,
  fill = vars.color.$black,
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M3.33334 9.16671H16.6667V10.8334H3.33334V9.16671Z" fill={fill} />
      <path d="M9.16668 3.33337H10.8333V16.6667H9.16668V3.33337Z" fill={fill} />
    </svg>
  );
}
