import type { SVGAttributes } from 'react';

const NAME = 'Kakao';

type KakaoProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Kakao = ({ width = 19, height = 19, fill = '#222222' }: KakaoProps) => (
  <svg width={width} height={width} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 8.19646C0 10.9328 1.7636 13.3259 4.40901 14.6986L3.51417 18.1256C3.47945 18.2284 3.50472 18.3425 3.57933 18.4198C3.63245 18.4706 3.70217 18.4992 3.77481 18.5C3.8354 18.4965 3.89328 18.4731 3.93987 18.4332L7.78852 15.7592C8.3554 15.843 8.92728 15.8862 9.5 15.8885C14.743 15.8885 19 12.4391 19 8.18755C19 3.936 14.743 0.5 9.5 0.5C4.25263 0.5 0 3.94491 0 8.19646Z"
      fill={fill}
    />
  </svg>
);

Kakao.displayName = NAME;
Kakao.RATIO = '1:1';
Kakao.BASE_WIDTH = 0.7916666667;
Kakao.BASE_HEIGHT = 0.75;

export { Kakao };
export type { KakaoProps };
