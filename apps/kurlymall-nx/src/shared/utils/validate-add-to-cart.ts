interface Parameter {
  totalCount: number;
  contentsName: string;
  contentsMaxEa: number | null;
  contentsMinEa: number;
}

export const validateAddToCart = ({ totalCount, contentsName, contentsMinEa, contentsMaxEa }: Parameter) => {
  if (totalCount < contentsMinEa) {
    return `${contentsName} 상품의 최소 구매 수량은 ${contentsMinEa}개 입니다.`;
  }

  if (contentsMaxEa !== null && contentsMaxEa !== 0 && totalCount > contentsMaxEa) {
    return `${contentsName} 상품의 최대 구매 수량은 ${contentsMaxEa}개 입니다.`;
  }

  return '';
};
