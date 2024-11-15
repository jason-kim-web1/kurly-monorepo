import type { SVGAttributes } from 'react';

const NAME = 'Cart_stroke_light';

type Cart_stroke_lightProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Cart_stroke_light = ({ width = 23, height = 22, fill = '#222222' }: Cart_stroke_lightProps) => (
  <svg width={width} height={width} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.15 0.849609C0.0671573 0.849609 0 0.916767 0 0.999609V2.39961C0 2.48245 0.0671573 2.54961 0.15 2.54961H3.4213L6.00815 13.6354C6.17185 14.3369 6.79725 14.8332 7.5176 14.8332H18.7108C19.436 14.8332 20.0643 14.3303 20.2231 13.6227L22.0878 5.31571C22.3053 4.34684 21.5684 3.42622 20.5755 3.42622H5.37152L4.97765 1.73828C4.85619 1.21781 4.39218 0.849609 3.85773 0.849609H0.15ZM7.63663 13.1332L5.76822 5.12622H20.388L18.5907 13.1332L7.63663 13.1332Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.6488 15.9496C16.1853 15.9496 14.9988 17.1361 14.9988 18.5996C14.9988 20.0632 16.1853 21.2496 17.6488 21.2496C19.1124 21.2496 20.2988 20.0632 20.2988 18.5996C20.2988 17.1361 19.1124 15.9496 17.6488 15.9496ZM16.6988 18.5996C16.6988 18.0749 17.1242 17.6496 17.6488 17.6496C18.1735 17.6496 18.5988 18.0749 18.5988 18.5996C18.5988 19.1243 18.1735 19.5496 17.6488 19.5496C17.1242 19.5496 16.6988 19.1243 16.6988 18.5996Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.84922 15.95C7.38566 15.95 6.19922 17.1364 6.19922 18.6C6.19922 20.0636 7.38566 21.25 8.84922 21.25C10.3128 21.25 11.4992 20.0636 11.4992 18.6C11.4992 17.1364 10.3128 15.95 8.84922 15.95ZM7.89922 18.6C7.89922 18.0753 8.32455 17.65 8.84922 17.65C9.37389 17.65 9.79922 18.0753 9.79922 18.6C9.79922 19.1247 9.37389 19.55 8.84922 19.55C8.32455 19.55 7.89922 19.1247 7.89922 18.6Z"
      fill={fill}
    />
  </svg>
);

Cart_stroke_light.displayName = NAME;
Cart_stroke_light.RATIO = '1:1';
Cart_stroke_light.BASE_WIDTH = 0.9220833333;
Cart_stroke_light.BASE_HEIGHT = 0.85;

export { Cart_stroke_light };
export type { Cart_stroke_lightProps };
