import { TextVariants } from '@thefarmersfront/kpds-css';
import { forwardRef, ReactNode, Ref } from 'react';
import { Text, TextProps } from '@/index';

export type VariantType =
  | '$accessibility4Regular'
  | '$accessibility3Regular'
  | '$accessibility2Regular'
  | '$accessibility1Regular'
  | '$xxxlargeRegular'
  | '$xxlargeRegular'
  | '$xlargeRegular'
  | '$largeRegular'
  | '$mediumRegular'
  | '$smallRegular'
  | '$xsmallRegular'
  | '$accessibility4Semibold'
  | '$accessibility3Semibold'
  | '$accessibility2Semibold'
  | '$accessibility1Semibold'
  | '$xxxlargeSemibold'
  | '$xxlargeSemibold'
  | '$xlargeSemibold'
  | '$largeSemibold'
  | '$mediumSemibold'
  | '$smallSemibold'
  | '$xsmallSemibold'
  | '$accessibility4Bold'
  | '$accessibility3Bold'
  | '$accessibility2Bold'
  | '$accessibility1Bold'
  | '$xxxlargeBold'
  | '$xxlargeBold'
  | '$xlargeBold'
  | '$largeBold'
  | '$mediumBold'
  | '$smallBold'
  | '$xsmallBold';

const VARIANTS: Record<VariantType, TextVariants> = {
  $accessibility4Regular: { size: '$64', lineHeight: '$72', weight: 'regular' },
  $accessibility3Regular: { size: '$36', lineHeight: '$44', weight: 'regular' },
  $accessibility2Regular: { size: '$28', lineHeight: '$36', weight: 'regular' },
  $accessibility1Regular: { size: '$24', lineHeight: '$32', weight: 'regular' },
  $xxxlargeRegular: { size: '$20', lineHeight: '$28', weight: 'regular' },
  $xxlargeRegular: { size: '$18', lineHeight: '$26', weight: 'regular' },
  $xlargeRegular: { size: '$16', lineHeight: '$22', weight: 'regular' },
  $largeRegular: { size: '$14', lineHeight: '$20', weight: 'regular' },
  $mediumRegular: { size: '$13', lineHeight: '$18', weight: 'regular' },
  $smallRegular: { size: '$12', lineHeight: '$16', weight: 'regular' },
  $xsmallRegular: { size: '$10', lineHeight: '$14', weight: 'regular' },
  $accessibility4Semibold: { size: '$64', lineHeight: '$72', weight: 'semibold' },
  $accessibility3Semibold: { size: '$36', lineHeight: '$44', weight: 'semibold' },
  $accessibility2Semibold: { size: '$28', lineHeight: '$36', weight: 'semibold' },
  $accessibility1Semibold: { size: '$24', lineHeight: '$32', weight: 'semibold' },
  $xxxlargeSemibold: { size: '$20', lineHeight: '$28', weight: 'semibold' },
  $xxlargeSemibold: { size: '$18', lineHeight: '$26', weight: 'semibold' },
  $xlargeSemibold: { size: '$16', lineHeight: '$22', weight: 'semibold' },
  $largeSemibold: { size: '$14', lineHeight: '$20', weight: 'semibold' },
  $mediumSemibold: { size: '$13', lineHeight: '$18', weight: 'semibold' },
  $smallSemibold: { size: '$12', lineHeight: '$16', weight: 'semibold' },
  $xsmallSemibold: { size: '$10', lineHeight: '$14', weight: 'semibold' },
  $accessibility4Bold: { size: '$64', lineHeight: '$72', weight: 'bold' },
  $accessibility3Bold: { size: '$36', lineHeight: '$44', weight: 'bold' },
  $accessibility2Bold: { size: '$28', lineHeight: '$36', weight: 'bold' },
  $accessibility1Bold: { size: '$24', lineHeight: '$32', weight: 'bold' },
  $xxxlargeBold: { size: '$20', lineHeight: '$28', weight: 'bold' },
  $xxlargeBold: { size: '$18', lineHeight: '$26', weight: 'bold' },
  $xlargeBold: { size: '$16', lineHeight: '$22', weight: 'bold' },
  $largeBold: { size: '$14', lineHeight: '$20', weight: 'bold' },
  $mediumBold: { size: '$13', lineHeight: '$18', weight: 'bold' },
  $smallBold: { size: '$12', lineHeight: '$16', weight: 'bold' },
  $xsmallBold: { size: '$10', lineHeight: '$14', weight: 'bold' },
};

export type Props = {
  variant: VariantType;
  as?: TextProps['as'];
  className?: string;
  children?: ReactNode;
};

export const Typography = forwardRef(({ className, as = 'p', children, variant }: Props, ref: Ref<TextProps>) => {
  return (
    <Text className={className} as={as} {...VARIANTS[variant]} ref={ref}>
      {children}
    </Text>
  );
});
