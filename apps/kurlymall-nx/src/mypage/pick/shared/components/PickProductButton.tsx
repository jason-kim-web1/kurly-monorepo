import { useCallback } from 'react';

import { css } from '@emotion/react';

import usePickButtonEvent from '../../hooks/usePickButtonEvent';

import { PickProduct, PickProductExtend } from '../../../../shared/api';
import { RestockBell, CartIconOn } from '../../../../shared/images';
import Button from '../../../../shared/components/Button/Button';

const bellIcon = (disabled: boolean) => css`
  ${disabled && 'opacity: 0.3'};
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 4px;
  vertical-align: middle;
`;

const mwIconButton = css`
  flex-grow: 1;
  min-width: 50%;
  white-space: nowrap;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const mwDeleteButton = css`
  flex-grow: 1;
  width: auto;
  min-width: 44px;
  word-break: keep-all;
`;

interface Props {
  isPC: boolean;
  index: number;
  product: PickProductExtend;
  onClickCart: (product: PickProduct, index: number) => () => void;
  onClickRestock: () => void;
}

export default function PickProductButton({ isPC, index, product, onClickCart, onClickRestock }: Props) {
  const { isBuyNow, canStockedNotify, isGroupProduct, isUnavailable, isSoldOut, isBuyPossible } = product;

  const { handleClickRemoveButton, handleClickMoveTo } = usePickButtonEvent();

  const RenderProductButton = useCallback(() => {
    if (isUnavailable) {
      return null;
    }

    if (isSoldOut && isGroupProduct) {
      return (
        <Button
          css={isPC ? '' : mwIconButton}
          text="다른 옵션 보기"
          theme="secondary"
          radius={4}
          width={104}
          height={36}
          onClick={handleClickMoveTo(product, index)}
        />
      );
    }

    if (isSoldOut) {
      return (
        <Button
          css={isPC ? '' : mwIconButton}
          text="재입고 알림"
          theme="tertiary"
          radius={4}
          width={104}
          height={36}
          styleIcon={{
            src: RestockBell,
            css: bellIcon(!canStockedNotify),
          }}
          disabled={!canStockedNotify}
          onClick={onClickRestock}
        />
      );
    }

    if (isBuyPossible) {
      return (
        <Button
          css={isPC ? '' : mwIconButton}
          text={isBuyNow ? '바로 구매' : '담기'}
          theme="secondary"
          radius={4}
          width={104}
          height={36}
          icon={isBuyNow ? undefined : CartIconOn}
          onClick={isBuyNow ? handleClickMoveTo(product, index) : onClickCart(product, index)}
        />
      );
    }
  }, [
    canStockedNotify,
    handleClickMoveTo,
    index,
    isBuyNow,
    isBuyPossible,
    isGroupProduct,
    isSoldOut,
    isUnavailable,
    onClickCart,
    onClickRestock,
    product,
    isPC,
  ]);

  return (
    <>
      <Button
        text="삭제"
        theme="tertiary"
        css={isPC ? '' : mwDeleteButton}
        radius={4}
        width={104}
        height={36}
        onClick={handleClickRemoveButton(product)}
      />
      {RenderProductButton()}
    </>
  );
}
