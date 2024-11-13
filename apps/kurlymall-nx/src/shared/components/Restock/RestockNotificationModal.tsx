import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useCallback, useEffect, useState } from 'react';

import { head, isEmpty } from 'lodash';

import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import { useDispatch } from 'react-redux';

import type { DealProduct, ProductProps } from '../../../product/detail/types';
import COLOR from '../../constant/colorset';
import Dropdown from '../Input/Dropdown';
import Button from '../Button/Button';
import { notify, redirectToLogin } from '../../reducers/page';
import { isPC } from '../../../../util/window/getDevice';
import { useAppSelector } from '../../store';
import useRestockNotification from '../../../product/detail/hooks/useRestockNotification';
import { getProductDetail } from '../../../product/service/product.service';
import { initProductDetail } from '../../../product/detail/slice';
import sendAmplitudeProductViewSelection from '../../amplitude/component/sendAmplitudeProductViewSelection';
import type { DeliveryInfoName } from '../../../product/types';

const TextWrapper = styled.div`
  ${isPC &&
  css`
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 30px;
  `}
`;

const Name = styled.div`
  font-size: 16px;
  color: ${COLOR.kurlyGray800};
  display: block;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  ${isPC
    ? css`
        font-weight: 500;
        line-height: 24px;
        letter-spacing: -0.67px;
        margin-bottom: 16px;
      `
    : css`
        max-height: 40px;
        margin-top: 26px;
        margin-bottom: 8px;
        font-weight: 400;
        line-height: 20px;
      `}
`;

const Header = styled.div`
  color: ${COLOR.kurlyGray800};
  ${isPC
    ? css`
        margin-top: 10px;
        font-size: 24px;
        font-weight: 500;
      `
    : css`
        display: block;
        font-weight: 600;
        font-size: 18px;
        color: #333;
        line-height: 20px;
      `}
`;

const MultiContent = styled.div``;

const SingleContent = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${COLOR.kurlyGray800};
  ${!isPC &&
  `
    max-height: 40px;
    margin-top: 26px;
    margin-bottom: 8px;
    font-weight: 400;
    line-height: 20px;
  `}
`;

const Notification = styled.div`
  color: ${COLOR.kurlyGray600};
  ${isPC
    ? css`
        font-size: 12px;
      `
    : css`
        margin-top: 11px;
        padding-left: 7px;
        font-size: 12px;
      `}
`;

const dialog = css`
  .MuiPaper-root {
    border-radius: 12px;
    box-shadow: none;
    ${isPC
      ? css`
          width: 440px;
          padding: 0 30px;
        `
      : css`
          padding: 0 20px;
        `}
  }
  .MuiDialog-paper {
    margin: 0;
  }
  .MuiDialog-paperFullWidth {
    ${!isPC &&
    css`
      width: 90%;
      border-radius: 4px;
    `}
  }
`;

const content = css`
  &.MuiDialogContent-root {
    padding: 0;
    overflow: hidden;
  }
`;

const actions = css`
  &.MuiDialogActions-root {
    display: flex;
    ${isPC
      ? css`
          padding: 30px 0;
          button {
            border-radius: 3px;
          }
        `
      : css`
          padding: 24px 0 19px;
        `}
  }
`;

interface Props {
  contentProductNo: number;
  open: boolean;
  dealProductCode?: number;
  queryId?: string;
  deliveryTypeNames?: DeliveryInfoName[];
  closeModal(): void;
}

export default function RestockNotificationModal({
  contentProductNo,
  open,
  dealProductCode = 0,
  queryId,
  deliveryTypeNames,
  closeModal,
}: Props) {
  const [selectedDealNo, setSelectedDealNo] = useState<number>();
  const [deals, setDeals] = useState<DealProduct[]>([]);

  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const productName = useAppSelector(({ productDetail }) => productDetail.name);
  const dispatch = useDispatch();
  const { subscribe } = useRestockNotification();

  const handleSendProductViewSelectionAmplitudeEvent = useCallback(
    (product: ProductProps) => {
      if (!open || !product) {
        return;
      }
      const { no, name, isGroupProduct, isGiftable } = product;
      sendAmplitudeProductViewSelection({
        productDetailState: {
          no,
          name,
          isGroupProduct,
          isGiftable,
          deliveryTypeNames,
        },
        queryId,
      });
    },
    [deliveryTypeNames, open, queryId],
  );

  useEffect(() => {
    if (!contentProductNo || !open) {
      setDeals([]);
      return;
    }

    (async () => {
      try {
        const shortcutProduct = await getProductDetail({ productCode: contentProductNo });
        dispatch(initProductDetail(shortcutProduct));
        setDeals(shortcutProduct?.dealProducts || []);

        handleSendProductViewSelectionAmplitudeEvent(shortcutProduct);
      } catch (err) {
        setDeals([]);
        dispatch(notify(err.message));
      }
    })();
  }, [contentProductNo, dispatch, open]);

  useEffect(() => {
    // 멀티딜이더라도 값이 있는경우, 해당 상품만 노출되도록 처리하는 변수
    if (dealProductCode === 0 || deals.length <= 1) {
      return;
    }

    setSelectedDealNo(dealProductCode);
  }, [dealProductCode, deals]);

  const selectedDeal = selectedDealNo
    ? deals.filter((deal) => deal.canRestockNotify).find((deal) => deal.no === selectedDealNo)
    : head(deals.filter((deal) => deal.canRestockNotify));

  if (!selectedDeal || isEmpty(deals)) {
    return null;
  }

  const options = deals
    .filter((deal) => deal.canRestockNotify && !deal.isGiftable)
    .map((deal) => ({
      id: deal.no,
      value: deal.no.toString(),
      name: deal.name,
    }));

  const handleChangeOption = async ({ value }: { value: string; name?: string }) => {
    setSelectedDealNo(Number(value));
  };

  const handleClickConfirm = async () => {
    if (isGuest) {
      dispatch(redirectToLogin());
      return;
    }

    await subscribe(selectedDeal);
    closeModal();
  };

  const isMultiDeal = options.length > 1 && dealProductCode === 0;

  return (
    <Dialog
      css={dialog}
      open={open}
      fullWidth
      aria-labelledby="재입고 알림 신청"
      aria-describedby="재입고 알림을 신청하고 상품이 입고되면 앱 푸시 또는 알림톡으로 알려 드립니다."
      disableEnforceFocus
    >
      <DialogContent css={content}>
        <TextWrapper>
          <Header>재입고 알림 신청</Header>
          {isMultiDeal ? (
            <MultiContent>
              {productName && <Name>{productName}</Name>}
              <Dropdown
                selectedValue={options.find((option) => option.id === selectedDeal.no)}
                options={options}
                onChange={handleChangeOption}
                isItemLineType={true}
              />
            </MultiContent>
          ) : (
            <SingleContent>{selectedDeal.name}</SingleContent>
          )}
          <Notification>· 상품이 입고되면 앱 푸시 또는 알림톡으로 알려 드립니다.</Notification>
        </TextWrapper>
      </DialogContent>
      <DialogActions css={actions}>
        <Button text="취소" theme="tertiary" radius={2} onClick={closeModal} />
        <Button text="신청하기" radius={2} onClick={handleClickConfirm} />
      </DialogActions>
    </Dialog>
  );
}
