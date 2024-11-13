import { useCallback } from 'react';

import { css } from '@emotion/react';

import { RestockBell, CartIconOn } from '../../../../shared/images';
import Button from '../../../../shared/components/Button/Button';
import { FavoriteProductExtend } from '../../../../shared/interfaces';
import useFavoriteClickEvent from '../../hooks/useFavoriteClickEvent';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectProductShortcut } from '../../../../shared/amplitude/events/favorite';
import useAddCartItem from '../../hooks/useAddCartItem';
import { isPC } from '../../../../../util/window/getDevice';
import { CartItem } from '../../../../order/cart/interface/CartProduct';

const bellIcon = (disabled: boolean) => css`
  ${disabled && 'opacity: 0.3'};
  display: inline-block;
  width: ${isPC ? 18 : 20}px;
  height: ${isPC ? 18 : 20}px;
  margin-right: 4px;
  vertical-align: middle;
`;

const iconButton = css`
  span {
    display: flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
  }
`;

interface Props {
  index: number;
  productExtend: FavoriteProductExtend;
  productNoWithQuantity: CartItem[];
  onClickRestock: (productExtend: FavoriteProductExtend) => () => void;
}

export default function ProductButton({ index, productExtend, productNoWithQuantity, onClickRestock }: Props) {
  const { handleClickMoveTo } = useFavoriteClickEvent();

  const { isRestockNotify, isCartAdd, isDisplay, isSoldOut, productImageUrl, productName } = productExtend;

  const { addCartFavoriteItem } = useAddCartItem(productExtend);

  const handleClickAddCart = useCallback(async () => {
    amplitudeService.logEvent(new SelectProductShortcut({ productExtend, index }));
    await addCartFavoriteItem(productNoWithQuantity, productImageUrl, productName);
  }, [addCartFavoriteItem, productNoWithQuantity, productExtend, productImageUrl, productName]);

  if (!isDisplay || isSoldOut) {
    return (
      <Button
        css={iconButton}
        text="재입고 알림"
        theme="tertiary"
        fontSize={isPC ? 13 : 14}
        radius={4}
        width={104}
        height={36}
        styleIcon={{
          src: RestockBell,
          css: bellIcon(!isRestockNotify),
        }}
        disabled={!isRestockNotify}
        onClick={onClickRestock(productExtend)}
      />
    );
  }

  return (
    <Button
      css={iconButton}
      text={isCartAdd ? '담기' : '바로 구매'}
      theme="secondary"
      fontSize={isPC ? 13 : 14}
      radius={4}
      width={104}
      height={36}
      icon={isCartAdd ? CartIconOn : undefined}
      onClick={isCartAdd ? handleClickAddCart : handleClickMoveTo(productExtend, index)}
    />
  );
}
