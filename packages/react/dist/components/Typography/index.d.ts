import { ReactNode } from 'react';
import { TextProps } from '../../index';
export type VariantType = '$accessibility4Regular' | '$accessibility3Regular' | '$accessibility2Regular' | '$accessibility1Regular' | '$xxxlargeRegular' | '$xxlargeRegular' | '$xlargeRegular' | '$largeRegular' | '$mediumRegular' | '$smallRegular' | '$xsmallRegular' | '$accessibility4Semibold' | '$accessibility3Semibold' | '$accessibility2Semibold' | '$accessibility1Semibold' | '$xxxlargeSemibold' | '$xxlargeSemibold' | '$xlargeSemibold' | '$largeSemibold' | '$mediumSemibold' | '$smallSemibold' | '$xsmallSemibold' | '$accessibility4Bold' | '$accessibility3Bold' | '$accessibility2Bold' | '$accessibility1Bold' | '$xxxlargeBold' | '$xxlargeBold' | '$xlargeBold' | '$largeBold' | '$mediumBold' | '$smallBold' | '$xsmallBold';
export type Props = {
    variant: VariantType;
    as?: TextProps['as'];
    className?: string;
    children?: ReactNode;
};
export declare const Typography: import('react').ForwardRefExoticComponent<Props & import('react').RefAttributes<any>>;
