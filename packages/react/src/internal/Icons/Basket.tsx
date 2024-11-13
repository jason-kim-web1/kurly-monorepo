import type { SVGAttributes } from 'react';

const NAME = 'Basket';

type BasketProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Basket = ({ width = 22, height = 22, fill = '#222222' }: BasketProps) => (
  <svg width={width} height={width} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5391 0C7.29176 0 4.78906 2.82048 4.78906 6.13333V7H2.00074C0.731176 7 -0.217108 8.16756 0.0432412 9.41014L2.348 20.4101C2.5421 21.3365 3.359 22 4.3055 22H16.771C17.7175 22 18.5344 21.3365 18.7285 20.4101L21.0333 9.41014C21.2936 8.16756 20.3453 7 19.0758 7H16.2891V6.13333C16.2891 2.82048 13.7864 0 10.5391 0ZM14.2891 7V6.13333C14.2891 3.77606 12.5385 2 10.5391 2C8.53966 2 6.78906 3.77606 6.78906 6.13333V7H14.2891ZM2.00074 9L19.0758 9L16.771 20L4.3055 20L2.00074 9Z"
      fill={fill}
    />
  </svg>
);

Basket.displayName = NAME;
Basket.RATIO = '1:1';
Basket.BASE_WIDTH = 0.8783333333;
Basket.BASE_HEIGHT = 0.9166666667;

export { Basket };
export type { BasketProps };
