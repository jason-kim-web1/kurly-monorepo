import { ReactElement } from 'react';

import DeliveryLocationContainer from '../containers/m/DeliveryLocationContainer';
import CartButtonContainer from '../../shared/containers/m/CartButtonContainer';
import BackButton from '../../shared/components/Button/BackButton';
import CloseButton from '../../shared/components/Button/CloseButton';
import { ButtonType } from '../../shared/services';

export type RightButtonType = 'delivery' | 'cart';

export const LeftButton: Record<ButtonType, ReactElement> = {
  close: <CloseButton onClick={() => {}} />, //닫기 버튼
  back: <BackButton />, //뒤로가기 버튼
  none: <></>,
};

export const RightButton: Record<RightButtonType, ReactElement> = {
  delivery: <DeliveryLocationContainer />, //배송지 버튼
  cart: <CartButtonContainer />, //장바구니 버튼
};
