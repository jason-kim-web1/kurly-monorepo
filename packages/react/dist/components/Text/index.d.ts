import { ComponentProps, ReactNode } from 'react';
import { TextVariants } from '@thefarmersfront/kpds-css';
type HtmlTextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'strong' | 'em' | 'b' | 'i' | 'mark' | 'small' | 'pre' | 'code' | 'kbd' | 'samp' | 'var' | 'blockquote' | 'q' | 'cite' | 'address' | 'abbr' | 'del' | 'ins' | 'sub' | 'sup' | 'time';
export type Props = TextVariants & ComponentProps<HtmlTextTag> & {
    as?: HtmlTextTag;
    className?: string;
    children: string | number | ReactNode;
};
export declare const Text: import('react').ForwardRefExoticComponent<Pick<any, string | number | symbol> & import('react').RefAttributes<any>>;
export {};
