import { addComma } from '../../../shared/services';

interface Args {
  price: number;
  prefix?: 'plus' | 'minus';
  isAllOrdersCanceled?: boolean;
}

const generatePriceText = ({ price, prefix, isAllOrdersCanceled }: Args): string => {
  if (isAllOrdersCanceled) return '0원';

  if (price > 0) {
    const formattedPrice = `${addComma(price)}원`;
    if (prefix === 'minus') {
      return `-${formattedPrice}`;
    }
    if (prefix === 'plus') {
      return `+${formattedPrice}`;
    }
    return formattedPrice;
  }
  return '0원';
};

export default generatePriceText;
