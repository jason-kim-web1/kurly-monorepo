import styled from '@emotion/styled';

import { createElement, MouseEvent, ReactNode, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { isFunction } from 'lodash';

import type { ProductStatusCode } from '../../../interfaces';
import type { ShortCutType } from '../../../types';
import RestockNotificationModal from '../../Restock/RestockNotificationModal';

import DialogCart from '../../Cart/DialogCart';
import ShortcutModalContainer from '../../Cart/ShortcutModalContainer';

import COLOR from '../../../constant/colorset';
import ProductListCart from '../../../icons/ProductListCart';
import ProductListBuyNow from '../../../icons/ProductListBuyNow';
import ProductListRestockNotify from '../../../icons/ProductListRestockNotify';
import { isPC } from '../../../../../util/window/getDevice';
import { SHORTCUT_TYPE } from '../../../constant/shortcut-type';
import type { DeliveryInfoName } from '../../../../product/types';

interface ButtonProps {
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  color: ${({ disabled }) => (disabled ? COLOR.lightGray : COLOR.kurlyGray800)};
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    pointer-events: none;
  }
`;

function PreventEventBubbling({ children }: { children: ReactNode }) {
  return createElement(
    'div',
    {
      className: 'button-wrapper',
      onClick: (e) => e.stopPropagation(),
    },
    children,
  );
}

interface Props {
  code: ProductStatusCode;
  isGroupProduct: boolean;
  canRestockNotify: boolean;
  contentProductNo: number;
  href: string;
  isBuyNow: boolean;
  deliveryTypeNames: DeliveryInfoName[];
  className?: string;
  queryId?: string;
  isVisibleBuyNowIcon?: boolean;
  /**
   * NOTE: 상품상세 추천 섹션 referrer 상품 정보
   * 현재 MWEB 만 지원
   * */
  referrerProductName?: string;
  referrerProductNo?: number;
  onSelectProductShortcut?(type: ShortCutType): void;
  selectMainShortcut?(type: ShortCutType): void;
  selectDetailShortcut?(type: ShortCutType): void;
  onChangeSoldOutStatus?(): void;
}

export default function ProductCardFunction({
  code,
  isGroupProduct,
  canRestockNotify,
  contentProductNo,
  href,
  isBuyNow,
  deliveryTypeNames,
  className,
  queryId,
  isVisibleBuyNowIcon = true,
  onSelectProductShortcut,
  selectMainShortcut,
  selectDetailShortcut,
  onChangeSoldOutStatus,
  referrerProductName,
  referrerProductNo,
}: Props) {
  const router = useRouter();
  const [restockModalOpen, setRestockModalOpen] = useState(false);
  const [cartShortcutOpen, setCartShortcutOpen] = useState(false);
  const isPurchasable = code === 'PURCHASABLE';
  const isSoldOut = code === 'SOLD_OUT';
  const buyNowShortcutEnabled = isPurchasable && isBuyNow;
  const cartShortcutEnabled = isPurchasable && !isGroupProduct && !isBuyNow;
  const BuyNowIcon = buyNowShortcutEnabled && isVisibleBuyNowIcon ? <ProductListBuyNow /> : null;
  const CartIcon = cartShortcutEnabled ? <ProductListCart /> : null;
  const ButtonIcon = BuyNowIcon ?? CartIcon;

  // 숏컷 타입
  const shortCutType: ShortCutType = useMemo(() => {
    if (cartShortcutEnabled) {
      return SHORTCUT_TYPE.CART;
    }

    if (!isPC && buyNowShortcutEnabled) {
      return SHORTCUT_TYPE.PURCHASE;
    }

    if (isSoldOut) {
      return SHORTCUT_TYPE.RESTOCK_NOTIFICATION;
    }

    return SHORTCUT_TYPE.DETAIL;
  }, [cartShortcutEnabled, buyNowShortcutEnabled, isSoldOut]);

  const openCartDialog = (e: MouseEvent<HTMLButtonElement>) => {
    if (onSelectProductShortcut) {
      onSelectProductShortcut(shortCutType);
    }

    if (selectMainShortcut) {
      selectMainShortcut(shortCutType);
    }

    // PC일 때 바로구매 상품이면 상품 상세로 진입해야 하기 때문에 아래 로직이 실행되면 안됨
    if (!((isPC && !buyNowShortcutEnabled) || !isPC)) {
      return;
    }

    e.preventDefault();
    setCartShortcutOpen(true);
  };

  const openRestockModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (onSelectProductShortcut) {
      onSelectProductShortcut(shortCutType);
    }

    if (selectMainShortcut) {
      selectMainShortcut(shortCutType);
    }

    setRestockModalOpen(true);
  };

  const renderDetailButton = () => {
    return (
      <PreventEventBubbling>
        <Button
          type="button"
          className={className}
          onClick={(e) => {
            e.preventDefault();
            /**
             * 기존의 상세보기를 누르면 이벤트 버블링에 의하여 select_recommendation_{event_code} 이벤트의 selection_type 값이 'content'로 지정되는데
             * 상세보기 버튼을 눌렀을 때는 'detail'로 지정되어야 하므로 이를 위한 핸들러 함수(selectDetailShortcut)를 따로 받아서 처리하고 라우팅 처리
             */
            if (isFunction(onSelectProductShortcut)) {
              onSelectProductShortcut(SHORTCUT_TYPE.DETAIL);
            }
            if (isFunction(selectDetailShortcut)) {
              selectDetailShortcut(SHORTCUT_TYPE.DETAIL);
            }
            router.push(href);
          }}
        >
          상세보기
        </Button>
      </PreventEventBubbling>
    );
  };

  const renderBuyNowOrCartButton = () => {
    return (
      <PreventEventBubbling>
        {cartShortcutOpen &&
          (isPC ? (
            <DialogCart
              open={cartShortcutOpen}
              productCode={contentProductNo.toString()}
              deliveryTypeNames={deliveryTypeNames}
              queryId={queryId}
              onHandleClose={() => setCartShortcutOpen(false)}
              onChangeSoldOutStatus={onChangeSoldOutStatus}
            />
          ) : (
            <ShortcutModalContainer
              open={cartShortcutOpen}
              productCode={contentProductNo.toString()}
              queryId={queryId}
              onHandleClose={() => setCartShortcutOpen(false)}
              onChangeSoldOutStatus={onChangeSoldOutStatus}
              isShortcutButton
              referrerProductName={referrerProductName}
              referrerProductNo={referrerProductNo}
            />
          ))}
        <Button type="button" className={className} onClick={openCartDialog}>
          {ButtonIcon}
          {buyNowShortcutEnabled ? '바로구매' : '담기'}
        </Button>
      </PreventEventBubbling>
    );
  };

  const renderRestockNotifyButton = () => {
    return (
      <Button type="button" className={className} onClick={openRestockModal} disabled={!canRestockNotify}>
        <ProductListRestockNotify color={canRestockNotify ? COLOR.kurlyBlack : COLOR.lightGray} />
        재입고 알림
      </Button>
    );
  };

  // PC일 때와 콘텐츠그룹(옵션형) 상품은 바로구매 버튼 대신 상세보기 버튼이 노출되어야 함
  if ((isPC && buyNowShortcutEnabled) || isGroupProduct) {
    return renderDetailButton();
  }

  // 바로구매나 장바구니 담기가 가능한 상품이면 바로구매 또는 담기 버튼 노출
  if (buyNowShortcutEnabled || cartShortcutEnabled) {
    return renderBuyNowOrCartButton();
  }

  if (isSoldOut && !isGroupProduct) {
    return (
      <PreventEventBubbling>
        {restockModalOpen &&
          (isPC ? (
            <RestockNotificationModal
              contentProductNo={contentProductNo}
              open={restockModalOpen}
              deliveryTypeNames={deliveryTypeNames}
              queryId={queryId}
              closeModal={() => setRestockModalOpen(false)}
            />
          ) : (
            <ShortcutModalContainer
              open={restockModalOpen}
              productCode={contentProductNo.toString()}
              queryId={queryId}
              onHandleClose={() => setRestockModalOpen(false)}
              isShortcutButton
              referrerProductName={referrerProductName}
              referrerProductNo={referrerProductNo}
            />
          ))}
        {renderRestockNotifyButton()}
      </PreventEventBubbling>
    );
  }

  return renderDetailButton();
}
