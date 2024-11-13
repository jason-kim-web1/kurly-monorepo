import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';

import { FavoriteProductExtend } from '../../../shared/interfaces';
import deepLinkUrl from '../../../shared/constant/deepLink';
import { PRODUCT_PATH, getPageUrl } from '../../../shared/constant';
import { isWebview } from '../../../../util/window/getDevice';
import { notify, redirectTo } from '../../../shared/reducers/page';
import appService from '../../../shared/services/app.service';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectProduct } from '../../../shared/amplitude/events/favorite';

export default function useFavoriteClickEvent() {
  const dispatch = useDispatch();

  const [productCode, setProductCode] = useState<string | null>(null);
  const [openedRestock, setOpenedRestock] = useState(false);
  const [dealProductCode, setDealProductCode] = useState<number>(0);

  const handleClickRestock = useCallback(
    (productExtend: FavoriteProductExtend) => () => {
      const { contentsProductNo, dealProductNo, dealProductName, isDisplay } = productExtend;

      if (!isDisplay) {
        dispatch(notify('현재 판매 중인 상품이 아닙니다.'));
        return;
      }

      if (isWebview()) {
        appService.postRestockedNotification({
          code: 'WVA6000',
          dealProductName,
          dealProductNo,
          contentsProductNo,
        });
        return;
      }

      setProductCode(contentsProductNo.toString());
      setDealProductCode(dealProductNo);
      setOpenedRestock(true);
    },
    [dispatch],
  );

  const handleClickMoveTo = useCallback(
    (productExtend: FavoriteProductExtend, index: number) => () => {
      const { contentsProductNo } = productExtend;

      amplitudeService.logEvent(new SelectProduct({ productExtend, index }));

      if (isWebview()) {
        dispatch(
          redirectTo({
            url: `${deepLinkUrl.PRODUCT}${contentsProductNo}`,
          }),
        );
        return;
      }

      dispatch(
        redirectTo({
          url: `${getPageUrl(PRODUCT_PATH.detail)}/${contentsProductNo}`,
        }),
      );
    },
    [dispatch],
  );

  const handleClickLink = useCallback(
    (productExtend: FavoriteProductExtend, index: number) => () => {
      amplitudeService.logEvent(new SelectProduct({ productExtend, index }));
    },
    [],
  );

  const handleCloseRestock = useCallback(() => setOpenedRestock(false), []);

  return {
    productCode,
    openedRestock,
    dealProductCode,
    handleClickRestock,
    handleCloseRestock,
    handleClickMoveTo,
    handleClickLink,
  };
}
