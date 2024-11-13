import { UnavailableProduct } from '../../../../shared/interfaces';

export const ADD_CART_ERROR_MESSAGE = `장바구니 담기에 실패 하였습니다.\n잠시 후 다시 시도해주세요.`;

export const AVAILABLE_ITEMS_ERROR_MESSAGE = '품절 등의 이유로 구매 불가능한 상품입니다.';

interface GetAlertMessageProps {
  unavailableProducts: UnavailableProduct[];
  availableLength: number;
}

export const makeSuccessMessage = ({ unavailableProducts, availableLength }: GetAlertMessageProps) => {
  const message = `${
    unavailableProducts.length > 0 ? '구매 불가능한 상품을 제외하고 ' : ''
  }${availableLength}개 상품을 장바구니에 담았습니다.`;

  return message;
};
