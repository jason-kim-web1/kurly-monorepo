import { ComponentProps, createElement, forwardRef, ReactNode, Ref } from 'react';
import { textVariants, TextVariants } from '@thefarmersfront/kpds-css';
import clsx from 'clsx';

type HtmlTextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'strong' | 'em' | 'b' | 'i' | 'mark' | 'small' | 'pre' | 'code' | 'kbd' | 'samp' | 'var' | 'blockquote' | 'q' | 'cite' |'address' | 'abbr' | 'del' | 'ins' | 'sub' | 'sup' | 'time' ;

export type Props = TextVariants &
  ComponentProps<HtmlTextTag> & {
    as?: HtmlTextTag;
    className?: string;
    children: string | number | ReactNode;
  };

export const Text = forwardRef(
  ({ className, as = 'span', children, size, lineHeight, weight, ...textProps }: Props, ref: Ref<Props>) => {
    return createElement(
      as,
      {
        className: clsx(textVariants({ size, lineHeight, weight }), className),
        ref,
        ...(textProps as ComponentProps<typeof as>),
      },
      children,
    );
  },
);
