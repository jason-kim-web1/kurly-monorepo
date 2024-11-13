import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { Swiper as SwiperClass } from 'swiper/types';

import { isEqual } from 'lodash';

import { EasyPaymentCardType, KurlypayVendor } from '../../../../shared/interfaces';

import { useAppSelector } from '../../../../shared/store';
import { Installment, VendorCodes } from '../../../shared/shared/interfaces';
import { findCardIndex, isKurlycard } from '../../../shared/shared/services';
import { selectKurlyPay, selectVendor, toggleUsedCardPoint } from '../reducers/checkout-payment.slice';
import { notifyCouponMessage } from '../reducers/checkout-coupon.slice';
import { CardVenderCode } from '../../../../shared/constant';

interface Response {
  swiper?: SwiperClass;
  kurlypayVendors: KurlypayVendor[];
  selectedKurlypayVendor?: KurlypayVendor;
  visibleSelectBox: boolean;
  visibleKurlyCardAccruedPoint: boolean;
  visibleHyundaiPoint: boolean;
  installmentOptions: Installment[];
  setSwiper: Dispatch<SetStateAction<SwiperClass | undefined>>;
  changeKurlypayCard: (e: SwiperClass) => void;
  clickKurlypaySwiper: (e: SwiperClass) => void;
}

export default function useKurlypaySwiper(): Response {
  const [swiper, setSwiper] = useState<SwiperClass>();

  const dispatch = useDispatch();
  const { kurlypayVendors, selectedKurlypayVendor, selectedCardPoint, selectedVendor } = useAppSelector(
    ({ checkoutPayment }) => ({
      kurlypayVendors: checkoutPayment.kurlypayVendors,
      selectedKurlypayVendor: checkoutPayment.selectedKurlypayVendor,
      selectedCardPoint: checkoutPayment.selectedCardPoint,
      selectedVendor: checkoutPayment.selectedVendor,
    }),
  );

  const changeKurlypayCard = (event: SwiperClass) => {
    const { activeIndex } = event;
    const activeVendor = kurlypayVendors[activeIndex];

    // 카드가 변경될때는 선택된 포인트 사용 여부를 초기화 합니다.
    if (selectedCardPoint && activeVendor.companyId !== selectedKurlypayVendor?.companyId) {
      dispatch(toggleUsedCardPoint());
    }

    dispatch(selectKurlyPay(activeVendor));
    dispatch(notifyCouponMessage());
  };

  const clickKurlypaySwiper = (event: SwiperClass) => {
    const { activeIndex, clickedIndex } = event;
    if (selectedVendor?.code === VendorCodes.KURLYPAY || !isEqual(activeIndex, clickedIndex)) {
      return;
    }

    dispatch(selectVendor(VendorCodes.KURLYPAY));
  };

  useEffect(() => {
    if (!swiper) {
      return;
    }

    const index = findCardIndex({ kurlypayVendors, selectedKurlypayVendor });
    swiper.slideTo(index, 0);
  }, [swiper, selectedKurlypayVendor]);

  const installmentOptions = useMemo(
    () =>
      kurlypayVendors.find(({ paymentMethodId }) => paymentMethodId === selectedKurlypayVendor?.paymentMethodId)
        ?.installments ?? [],
    [kurlypayVendors, selectedKurlypayVendor],
  );

  const visibleSelectBox = useMemo(
    () => !selectedKurlypayVendor?.isDisabled && selectedKurlypayVendor?.cardType === EasyPaymentCardType.CREDIT_CARD,
    [selectedKurlypayVendor],
  );

  const visibleKurlyCardAccruedPoint = useMemo(
    () => !selectedKurlypayVendor?.isDisabled && isKurlycard({ companyId: selectedKurlypayVendor?.companyId }),
    [selectedKurlypayVendor],
  );

  const visibleHyundaiPoint = useMemo(
    () => !selectedKurlypayVendor?.isDisabled && selectedKurlypayVendor?.companyId === CardVenderCode.HYUNDAI_CARD,
    [selectedKurlypayVendor],
  );

  return {
    swiper,
    kurlypayVendors,
    selectedKurlypayVendor,
    visibleSelectBox,
    visibleKurlyCardAccruedPoint,
    visibleHyundaiPoint,
    installmentOptions,
    setSwiper,
    changeKurlypayCard,
    clickKurlypaySwiper,
  };
}
