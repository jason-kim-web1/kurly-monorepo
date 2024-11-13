export const resetPointUsage = ({ value, totalPoint, price }: { value: number; totalPoint: number; price: number }) => {
  if ((totalPoint < price && price < value) || (totalPoint < value && value < price)) {
    return totalPoint;
  }

  if ((price < totalPoint && totalPoint < value) || (price < value && value < totalPoint)) {
    return price;
  }

  return value;
};
