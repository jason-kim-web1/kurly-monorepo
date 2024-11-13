interface ProductLimit {
  min: number;
  max: number | null;
}

interface Props {
  quantity: number;
  dealProductName: string;
  dealProductLimit: ProductLimit;
}

interface Response {
  text: string;
  changedQuantity: number;
}

export const validateDealProductQuantity = ({ quantity, dealProductName, dealProductLimit }: Props): Response => {
  if (dealProductLimit.min > quantity) {
    return {
      text: `${dealProductName} 상품의 최소 구매 수량은 ${dealProductLimit.min}개 입니다.`,
      changedQuantity: dealProductLimit.min,
    };
  }

  if (dealProductLimit.max !== null && dealProductLimit.max < quantity) {
    return {
      text: `${dealProductName} 상품의 최대 구매 수량은 ${dealProductLimit.max}개 입니다.`,
      changedQuantity: dealProductLimit.max,
    };
  }

  return {
    text: '',
    changedQuantity: quantity,
  };
};
