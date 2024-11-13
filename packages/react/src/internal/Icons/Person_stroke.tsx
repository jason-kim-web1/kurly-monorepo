import type { SVGAttributes } from 'react';

const NAME = 'Person_stroke';

type Person_strokeProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Person_stroke = ({ width = 17, height = 20, fill = '#222222' }: Person_strokeProps) => (
  <svg width={width} height={width} viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5361 0.799805C6.21857 0.799805 4.33984 2.67853 4.33984 4.99606C4.33984 7.31359 6.21857 9.19232 8.5361 9.19232C10.8536 9.19232 12.7324 7.31359 12.7324 4.99606C12.7324 2.67853 10.8536 0.799805 8.5361 0.799805ZM6.33984 4.99606C6.33984 3.7831 7.32314 2.7998 8.5361 2.7998C9.74906 2.7998 10.7324 3.7831 10.7324 4.99606C10.7324 6.20902 9.74906 7.19232 8.5361 7.19232C7.32314 7.19232 6.33984 6.20902 6.33984 4.99606Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.06019 10.8193C3.95198 10.8193 1.18192 12.7802 0.14891 15.7118C-0.442965 17.3914 0.803213 19.1518 2.5841 19.1518H14.389C16.2172 19.1518 17.4791 17.321 16.8285 15.6125C15.7295 12.7266 12.9623 10.8193 9.87423 10.8193H7.06019ZM2.03522 16.3765C2.78629 14.245 4.80031 12.8193 7.06019 12.8193H9.87423C12.1323 12.8193 14.1558 14.214 14.9594 16.3243C15.1115 16.7238 14.8165 17.1518 14.389 17.1518H2.5841C2.1827 17.1518 1.90182 16.755 2.03522 16.3765Z"
      fill={fill}
    />
  </svg>
);

Person_stroke.displayName = NAME;
Person_stroke.RATIO = '1:1';
Person_stroke.BASE_WIDTH = 0.7083333333;
Person_stroke.BASE_HEIGHT = 0.7645833333;

export { Person_stroke };
export type { Person_strokeProps };
