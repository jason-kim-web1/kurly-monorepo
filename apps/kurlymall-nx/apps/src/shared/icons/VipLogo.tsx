import { SVGAttributes } from 'react';

export const VipLogo = ({ width = 53, height = 24, fill = '#222222' }: SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 53 24" fill="none">
      <g clipPath="url(#clip0_5813_12260)">
        <path
          d="M12.0526 18.0125L4.66012 1.33203H0.287109L9.82604 22.4669H12.369L21.2618 1.33203H18.9111L12.0526 18.0125Z"
          fill={fill}
        />
        <path d="M29.7427 1.13342H25.666V22.2683H29.7427V1.13342Z" fill={fill} />
        <path
          d="M46.1891 1.13476H36.1309V22.2696H40.2075V13.6144H46.1891C49.6357 13.6144 52.4295 10.8205 52.4295 7.37391C52.4295 3.92729 49.6357 1.13342 46.1891 1.13342V1.13476ZM48.9255 7.37524C48.9255 9.8087 46.7871 11.7803 44.1507 11.7803H40.2089V2.97019H44.1507C46.7884 2.97019 48.9255 4.94312 48.9255 7.37524Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};
