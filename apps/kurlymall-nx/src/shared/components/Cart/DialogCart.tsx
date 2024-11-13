import { css } from '@emotion/react';

import { useCallback, useEffect, useState } from 'react';

import type { ContentsProduct } from '../../../mypage/order/shared/interfaces';
import SimpleDialog from '../Dialog/SimpleDialog';
import DialogCartContainer from './DialogCartContainer';
import Alert from '../Alert/Alert';
import DialogCartSkeleton from './DialogCartSkeleton';
import { getCartProduct } from '../../../mypage/order/shared/services/cart.service';
import sendAmplitudeProductViewSelection from '../../amplitude/component/sendAmplitudeProductViewSelection';
import type { DeliveryInfoName } from '../../../product/types';

interface Props {
  open: boolean;
  productCode: string | null;
  queryId?: string;
  deliveryTypeNames?: DeliveryInfoName[];
  onHandleClose(): void;
  onChangeSoldOutStatus?(): void;
}

const dialogInnerStyle = css`
  height: auto;
  width: 440px;
  overflow-x: hidden;
  padding: 30px;
  border-radius: 12px;
  box-shadow: none;
`;

export default function DialogCart({
  open,
  productCode,
  onHandleClose,
  queryId,
  deliveryTypeNames,
  onChangeSoldOutStatus,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [productData, setProductData] = useState<ContentsProduct>();

  const handleSendProductViewSelectionAmplitudeEvent = useCallback(
    (product: ContentsProduct) => {
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
    [deliveryTypeNames, open, productData, queryId],
  );

  useEffect(() => {
    if (!productCode) {
      return;
    }

    setLoading(true);

    (async () => {
      try {
        const product = await getCartProduct(Number(productCode));
        setProductData(product);
        setLoading(false);

        if (onChangeSoldOutStatus && (product.isSoldOut || !product.isPurchaseStatus)) {
          onChangeSoldOutStatus();
        }

        handleSendProductViewSelectionAmplitudeEvent(product);
      } catch (e) {
        await Alert({ text: '구매할 수 없는 상품입니다.' });
        onHandleClose();

        if (onChangeSoldOutStatus) {
          onChangeSoldOutStatus();
        }
      }
    })();
  }, [onChangeSoldOutStatus, onHandleClose, productCode]);

  const voidFunction = () => {};

  return (
    <SimpleDialog dialogStyle={dialogInnerStyle} open={open} onHandleClose={voidFunction} disableEscapeKeyDown>
      {loading ? (
        <DialogCartSkeleton />
      ) : (
        productData && (
          <DialogCartContainer
            productData={productData}
            queryId={queryId}
            deliveryTypeNames={deliveryTypeNames}
            onHandleClose={onHandleClose}
            onChangeSoldOutStatus={onChangeSoldOutStatus}
          />
        )
      )}
    </SimpleDialog>
  );
}
