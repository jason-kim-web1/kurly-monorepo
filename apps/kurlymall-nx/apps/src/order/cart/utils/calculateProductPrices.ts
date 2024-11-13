interface Props {
  // 권장 소비자가
  retailPrice: number;
  // 컬리 판매가
  productPrice: number;
  // 할인가
  discountPrice: number;
}

interface Response {
  price: number;
  finalDiscountPrice: number;
}

// 가격 노출 정책 : https://kurly0521.atlassian.net/wiki/spaces/CMS/pages/2999944104
export const calculateProductPrices = ({ productPrice, retailPrice, discountPrice }: Props): Response => {
  // (공통) 권장 소비자가가 없으면 컬리 판매가와 기존 할인가를 노출한다.
  if (retailPrice === 0) {
    return {
      price: productPrice,
      finalDiscountPrice: discountPrice,
    };
  }

  const higherPrice = retailPrice >= productPrice ? retailPrice : productPrice;
  const priceGap = Math.abs(productPrice - retailPrice);

  // (비회원/회원) 할인X > 둘 중 높은 가격이 판매가가 된다.
  // 그 차액과 원래 상품의 할인금액이 최종 할인 금액이 된다.
  return {
    price: higherPrice,
    finalDiscountPrice: priceGap + discountPrice,
  };
};
