import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Alert from '../Alert/Alert';
import ShortcutModal from './ShortcutModal';
import SlideModal from '../modal/SlideModal';
import Loading from '../Loading/Loading';
import sendAmplitudeProductViewSelection from '../../amplitude/component/sendAmplitudeProductViewSelection';
import { useProductDetail } from '../../../product/detail/hooks/useProductDetail';
import type { ProductDetailState } from '../../../product/detail/slice';

interface Props {
  productCode: string | null;
  open: boolean;
  queryId?: string;
  isShortcutButton?: boolean;
  /**
   * NOTE: 상품상세 추천 섹션 referrer 상품 정보
   * 현재 MWEB 만 지원
   * */
  referrerProductName?: string;
  referrerProductNo?: number;

  onHandleClose(): void;
  onChangeSoldOutStatus?(): void;
}

const DefaultSlideModal = styled.div`
  height: 295px;
  background-color: white;
`;

export default function ShortcutModalContainer({
  productCode,
  open,
  queryId,
  onHandleClose,
  onChangeSoldOutStatus,
  isShortcutButton = false,
  referrerProductName,
  referrerProductNo,
}: Props) {
  const [duplicateProductNo, setDuplicateProductNo] = useState<string | null>();
  const { isLoading, isSuccess, isError, data } = useProductDetail(Number(productCode));

  const handleSendProductViewSelectionAmplitudeEvent = useCallback(
    (shortcutProduct: ProductDetailState) => {
      if (!open || !shortcutProduct || duplicateProductNo === productCode) {
        return;
      }
      const { no, name, isGroupProduct, isGiftable, deliveryTypeNames } = shortcutProduct;
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
      setDuplicateProductNo(productCode);
    },
    [duplicateProductNo, open, productCode, queryId],
  );

  useEffect(() => {
    if (!isSuccess || !data) {
      return;
    }
    if (onChangeSoldOutStatus && (data.isSoldOut || !data.isPurchaseStatus)) {
      onChangeSoldOutStatus();
    }
    handleSendProductViewSelectionAmplitudeEvent(data);
  }, [isSuccess, data, onChangeSoldOutStatus, handleSendProductViewSelectionAmplitudeEvent]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    Alert({ text: '구매할 수 없는 상품입니다.' });
    onHandleClose();
    if (onChangeSoldOutStatus) {
      onChangeSoldOutStatus();
    }
  }, [isError, onChangeSoldOutStatus, onHandleClose]);

  return (
    <>
      <SlideModal open={open} onClose={onHandleClose}>
        {isLoading ? (
          <DefaultSlideModal>
            <Loading isAbsolute />
          </DefaultSlideModal>
        ) : (
          <ShortcutModal
            referrerProductNo={referrerProductNo}
            referrerProductName={referrerProductName}
            productCode={Number(productCode)}
            onChangeSoldOutStatus={onChangeSoldOutStatus}
            isShortcutButton={isShortcutButton}
          />
        )}
      </SlideModal>
    </>
  );
}
