import { cloneElement, ComponentProps, forwardRef, ReactElement, Ref } from 'react';
import { iconButtonVariants, IconButtonVariants, vars } from '@thefarmersfront/kpds-css';
import clsx from 'clsx';

const SIZE = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;
type Size = (typeof SIZE)[keyof typeof SIZE];

const FILL: { [key in Exclude<NonNullable<IconButtonVariants>['type'], undefined>]: string } = {
  primary: vars.color.main.$primary,
  secondary: vars.color.main.$secondary,
  tertiary: vars.color.main.$tertiary,
  quaternary: vars.color.$gray600,
  quinary: vars.color.$gray500,
  inverse: vars.color.background.$background1,
  universal: vars.color.background.$background1Universal,
  danger: vars.color.main.$danger,
  point: vars.color.point.$point2,
} as const;

export type Props = Omit<NonNullable<IconButtonVariants>, 'type'> &
  Omit<ComponentProps<'button'>, 'className' | 'children' | 'ref'> & {
    _type?: NonNullable<IconButtonVariants>['type'];
    className?: string;
    size: Size;
    children: ReactElement;
  };

const getIconFillColor = (type: Exclude<Props['_type'], undefined>) => {
  return FILL[type];
};

const getIconSize = (size: Props['size']) => {
  switch (size) {
    case 'large':
      return 24;
    case 'medium':
      return 20;
    case 'small':
      return 16;
    default:
      return 24;
  }
};

/**
 * TODO
 * - size는 children으로 받고 있어서 children에서 사이즈 넣어줘도 오버라이딩 되고 있음
 *  - icon 타입만 받고 내부에서 처리하는 형태가 좋긴하나, icon 프로퍼티가 각자 달라서 어려움
 * - disable 컬러에 대해서 따로 작업 되어져 있지 않음 (figma에도 없음)
 */
export const IconButton = forwardRef(
  ({ _type, size, className, children, ...buttonProps }: Props, ref: Ref<HTMLButtonElement>) => {
    const clonedChildren = cloneElement(children, {
      size: getIconSize(size),
      fill: getIconFillColor(_type ?? 'primary'),
    });

    return (
      <button
        {...buttonProps}
        className={clsx(
          iconButtonVariants({
            type: _type,
          }),
          className,
        )}
        ref={ref}
      >
        {clonedChildren}
      </button>
    );
  },
);
