import { CheckoutType } from '../../../../shared/interfaces';
import { LiquidityMessageTextMap } from '../constants/liquidity-message';

export const getLiquidityMessageToCheckoutType = (type?: CheckoutType): string => {
  switch (type) {
    case CheckoutType.GIFT_CARD:
      return LiquidityMessageTextMap.KURLY_PAY_ACCOUNT_ONLY;
    case CheckoutType.LIQUIDITY:
      return LiquidityMessageTextMap.KURLY_PAY_ACCOUNT_AND_SELECTED_CARDS;
    default:
      return '';
  }
};
