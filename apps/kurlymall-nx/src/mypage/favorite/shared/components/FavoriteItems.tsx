import { CSSProperties, useMemo } from 'react';

import deepLinkUrl from '../../../../shared/constant/deepLink';

import { FavoriteProductExtend } from '../../../../shared/interfaces';

import { useWebview } from '../../../../shared/hooks';
import useFavoriteClickEvent from '../../hooks/useFavoriteClickEvent';

import { FavoriteItem } from './FavoriteItem';
import { CartItem } from '../../../../order/cart/interface/CartProduct';

interface Props {
  index: number;
  productExtend: FavoriteProductExtend;
  style: CSSProperties;
  handleClickRestock: (productExtend: FavoriteProductExtend) => () => void;
}

export const FavoriteItems = ({ index, productExtend, style, handleClickRestock }: Props) => {
  const webview = useWebview();

  const { contentsProductNo, dealProductNo } = productExtend;

  const { handleClickLink } = useFavoriteClickEvent();

  const goodsViewLink = useMemo(
    () => (webview ? `${deepLinkUrl.PRODUCT}${contentsProductNo}` : `/goods/${contentsProductNo}`),
    [contentsProductNo, webview],
  );

  const productNoWithQuantity: CartItem[] = useMemo(() => {
    return [
      {
        dealProductNo,
        quantity: 1,
      },
    ];
  }, [dealProductNo]);

  return (
    <FavoriteItem
      index={index}
      style={style}
      productExtend={productExtend}
      productNoWithQuantity={productNoWithQuantity}
      goodsViewLink={goodsViewLink}
      handleClickLink={handleClickLink}
      handleClickRestock={handleClickRestock}
    />
  );
};
