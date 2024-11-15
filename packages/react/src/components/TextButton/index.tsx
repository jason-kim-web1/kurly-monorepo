import { ComponentProps, forwardRef, ReactNode, Ref } from 'react';
import { textButtonVariants, TextButtonVariants } from '@thefarmersfront/kpds-css';
import clsx from 'clsx';
import { Typography, VariantType } from '@/components/Typography';

export type Props = Omit<NonNullable<TextButtonVariants>, 'type' | 'style'> &
  Omit<ComponentProps<'button'>, 'className' | 'children' | 'color' | 'ref'> & {
    _type?: NonNullable<TextButtonVariants>['type'];
    _style?: NonNullable<TextButtonVariants>['style'];
    weight?: 'semibold' | 'regular';
    className?: string;
    children?: string | ReactNode | Element;
  };

const getTypographyVariant = ({ size, weight }: { size: Props['size']; weight: Props['weight'] }): VariantType => {
  let variant = '';

  switch (size) {
    case 'large':
      variant = '$xxlarge';
      break;
    case 'medium':
      variant = '$xlarge';
      break;
    case 'small':
      variant = '$large';
      break;
    default:
      variant = '$xxlarge';
  }

  switch (weight) {
    case 'semibold':
      variant += 'Semibold';
      break;
    case 'regular':
      variant += 'Regular';
      break;
    default:
      variant += 'Semibold';
  }

  return variant as VariantType;
};

export const TextButton = forwardRef(
  (
    { _type, _style, size = 'large', weight = 'semibold', className, children, ...buttonProps }: Props,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <button
        {...buttonProps}
        className={clsx(
          textButtonVariants({
            type: _type,
            style: _style,
            size,
          }),
          className,
        )}
        ref={ref}
      >
        <Typography variant={getTypographyVariant({ size, weight })}>{children}</Typography>
      </button>
    );
  },
);
