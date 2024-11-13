import { ComponentProps, forwardRef, ReactNode, Ref } from 'react';
import { buttonVariants, ButtonVariants } from '@thefarmersfront/kpds-css';
import clsx from 'clsx';

export type Props = Omit<NonNullable<ButtonVariants>, 'type' | 'style'> &
  Omit<ComponentProps<'button'>, 'className' | 'children' | 'color' | 'ref'> & {
    _type?: NonNullable<ButtonVariants>['type'];
    _style?: NonNullable<ButtonVariants>['style'];
    className?: string;
    children?: string | ReactNode | Element;
  };

export const Button = forwardRef(
  (
    { _type, _style, size, shape, color, weight, className, children, ...buttonProps }: Props,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <button
        {...buttonProps}
        className={clsx(
          buttonVariants({
            type: _type,
            style: _style,
            size,
            shape,
            color,
            weight,
          }),
          className,
        )}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
