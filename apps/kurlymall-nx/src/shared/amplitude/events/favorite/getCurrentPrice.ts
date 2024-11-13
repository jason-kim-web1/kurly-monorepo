export function getCurrentPrice(price: number, finalDiscountPrice: number) {
  if (finalDiscountPrice === 0) {
    return price;
  }

  return price - finalDiscountPrice;
}
