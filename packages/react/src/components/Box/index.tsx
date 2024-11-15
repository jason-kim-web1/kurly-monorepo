import { AllHTMLAttributes, forwardRef, Ref } from 'react';
import { boxVariants } from '@thefarmersfront/kpds-css';
import clsx from 'clsx';

type HTMLProperties = Omit<AllHTMLAttributes<HTMLElement>, 'className'>;

export type Props = HTMLProperties & {
  className?: string;
};

export const Box = forwardRef(({ className, ...props }: Props, ref: Ref<HTMLDivElement>) => {
  return <div {...props} className={clsx(boxVariants, className)} ref={ref} />;
});
