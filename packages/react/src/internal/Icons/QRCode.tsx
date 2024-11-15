import type { SVGAttributes } from 'react';

const NAME = 'QRCode';

type QRCodeProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const QRCode = ({ width = 18, height = 18, fill = '#222222' }: QRCodeProps) => (
  <svg width={width} height={width} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 3.32237C0 1.48747 1.48747 0 3.32236 0H6.14286V2H3.32236C2.59204 2 2 2.59204 2 3.32237V6.14286H0V3.32237ZM14.6776 2H11.8571V0H14.6776C16.5125 0 18 1.48747 18 3.32236V6.14286H16V3.32236C16 2.59204 15.408 2 14.6776 2ZM2 11.8571V14.6776C2 15.408 2.59204 16 3.32237 16H6.14286V18H3.32237C1.48747 18 0 16.5125 0 14.6776V11.8571H2ZM16 14.6776V11.8571H18V14.6776C18 16.5125 16.5125 18 14.6776 18H11.8571V16H14.6776C15.408 16 16 15.408 16 14.6776Z"
      fill={fill}
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M18 9.99963H0.00167465V7.99963H18V9.99963Z" fill={fill} />
  </svg>
);

QRCode.displayName = NAME;
QRCode.RATIO = '1:1';
QRCode.BASE_WIDTH = 0.75;
QRCode.BASE_HEIGHT = 0.75;

export { QRCode };
export type { QRCodeProps };
