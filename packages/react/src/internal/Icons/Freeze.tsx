import type { SVGAttributes } from 'react';

const NAME = 'Freeze';

type FreezeProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Freeze = ({ width = 20, height = 19, fill = '#222222' }: FreezeProps) => (
  <svg width={width} height={width} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.0002 0.464395C15.2927 0.633284 15.4083 0.989479 15.2841 1.29345L15.2442 1.37508L14.0491 3.44507L16.1376 2.88546C16.4606 2.79891 16.7922 2.96577 16.9209 3.26381L16.9531 3.35734C17.0404 3.68077 16.8728 4.012 16.5755 4.14111L16.482 4.17333L13.1064 5.07782L11.1553 8.45724L15.0572 8.45808L17.5288 5.98682C17.789 5.72646 18.2112 5.72591 18.4711 5.98683C18.7082 6.22328 18.7293 6.59371 18.5364 6.85493L18.4718 6.9295L16.9424 8.45853L19.3343 8.45794C19.7019 8.4577 20.0005 8.75639 20.0003 9.12474C20.0004 9.46245 19.7491 9.74127 19.4238 9.78547L19.3331 9.79157L16.9437 9.79151L18.4711 11.32C18.7082 11.5565 18.7294 11.9269 18.5365 12.1881L18.4715 12.2635C18.2347 12.4994 17.8643 12.5205 17.6035 12.3269L17.5285 12.263L15.058 9.79183L11.1553 9.79055L13.1061 13.1708L16.4822 14.0752C16.8377 14.1706 17.0488 14.5357 16.9541 14.8916C16.8666 15.2157 16.5573 15.4189 16.2337 15.382L16.1369 15.363L14.0479 14.8036L15.2442 16.8737C15.4281 17.1934 15.3192 17.6006 15.0003 17.785C14.7078 17.9538 14.3409 17.8764 14.1399 17.6167L14.0891 17.5411L12.8943 15.4719L12.3349 17.5589C12.2478 17.8822 11.9381 18.0863 11.615 18.0485L11.5177 18.0304C11.1952 17.9437 10.9912 17.634 11.0281 17.3104L11.0471 17.2136L11.9517 13.8387L10.0006 10.4572L8.04907 13.8374L8.95356 17.213C9.04845 17.5695 8.83778 17.9344 8.48201 18.0297C8.15857 18.1171 7.82734 17.9494 7.69824 17.6522L7.66602 17.5586L7.1064 15.4701L5.91085 17.5409C5.72685 17.8596 5.31886 17.9689 5.00016 17.7849C4.70764 17.616 4.59203 17.2598 4.7162 16.9559L4.75615 16.8742L5.95081 14.805L3.8632 15.3631C3.53977 15.4504 3.20854 15.2828 3.07943 14.9855L3.04721 14.892C2.9599 14.5685 3.12753 14.2373 3.4248 14.1082L3.51833 14.076L6.89393 13.1715L8.84548 9.79129L4.94314 9.79122L2.47149 12.2625C2.21134 12.5228 1.78918 12.5234 1.52926 12.2625C1.29216 12.026 1.27099 11.6556 1.46388 11.3944L1.52849 11.3198L3.05791 9.79077L0.666054 9.79136C0.298465 9.7916 -0.000206775 9.49291 1.07411e-07 9.12455C-3.97331e-05 8.78684 0.251259 8.50803 0.576485 8.46383L0.667251 8.45773L3.05668 8.45779L1.52919 6.92926C1.29209 6.69281 1.27092 6.32237 1.46381 6.06115L1.52887 5.98581C1.76564 5.74993 2.13608 5.72875 2.39685 5.92242L2.47187 5.98626L4.94236 8.45747L8.84546 8.45798L6.89424 5.07849L3.51809 4.17415C3.16262 4.07874 2.95156 3.71363 3.0462 3.35771C3.13375 3.03362 3.44304 2.83037 3.76658 2.86731L3.86341 2.88626L5.95244 3.44574L4.75614 1.37557C4.57223 1.05589 4.6811 0.648658 5 0.4643C5.29248 0.29548 5.6594 0.372859 5.86045 0.632631L5.91127 0.708161L7.10603 2.77744L7.66538 0.690392C7.75249 0.367073 8.06222 0.163049 8.38531 0.200761L8.48259 0.218946C8.80514 0.305608 9.00916 0.615339 8.97222 0.938881L8.95327 1.03571L8.0486 4.41064L10.0001 7.79135L11.9513 4.41192L11.0468 1.03632C10.9519 0.679778 11.1626 0.314892 11.5183 0.219563C11.8418 0.132249 12.173 0.299876 12.3021 0.597145L12.3343 0.690674L12.8944 2.77841L14.0895 0.708413C14.2735 0.389715 14.6815 0.280395 15.0002 0.464395Z"
      fill={fill}
    />
  </svg>
);

Freeze.displayName = NAME;
Freeze.RATIO = '1:1';
Freeze.BASE_WIDTH = 0.8333333333;
Freeze.BASE_HEIGHT = 0.7441666667;

export { Freeze };
export type { FreezeProps };
