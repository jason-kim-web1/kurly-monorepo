import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  loadBaseAddressNotification,
  resetAddressChanged,
  setNewAddress,
} from '../../shared/reducers/shipping-address.slice';
import { useAppSelector } from '../../shared/store';

import { CART_PAGE, isAllowedUrl } from '../utils/isAllowedUrl';
import { isPC } from '../../../util/window/getDevice';
import { isProduction, KURLY_PRODUCTION_URL_LIST } from '../../shared/configs/config';
import { COMMON_PATH, getPageUrl } from '../../shared/constant';
import { removeAddressRegistered } from '../../cart/shared/services/shipping-address.storage.service';
import updateDeliveryTooltipVisibleState from './mainDeliveryTooltipVisibleState';
import { redirectTo } from '../../shared/reducers/page';
import { useCurrentAddress } from '../../shared/hooks/useCartAddress';

const TOOLTIP_DISPLAY_MILLI_SECOND = 3000;
const MAIN_TOOLTIP_DISPLAY_MILLI_SECOND = 5000;

export default function useDeliveryLocation() {
  const dispatch = useDispatch();
  const { asPath, pathname, isReady } = useRouter();

  const { hasSession, isGuest } = useAppSelector(({ auth }) => auth);
  const { addressChanged, currentAddress } = useAppSelector(({ shippingAddress }) => shippingAddress);

  const [isDisabled, setIsDisabled] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [addressId, setAddressId] = useState<string | null>(null);

  const { loadCartAddress } = useCurrentAddress();

  const moveLoginPage = () => {
    dispatch(
      redirectTo({
        url: getPageUrl(COMMON_PATH.login),
        query: { internalUrl: asPath },
      }),
    );
  };

  const toggleAddressLayer = useCallback((value: boolean) => {
    setTooltipOpen(value);
  }, []);

  const detectAddressChanged = useCallback(() => {
    if (addressChanged && !isPC) {
      window.postMessage({ source: 'addressChanged' }, window.location.href);
    }
  }, [addressChanged]);

  const getAddress = useCallback(async () => {
    if (!hasSession || CART_PAGE.includes(pathname)) {
      return;
    }

    if (isGuest) {
      await loadCartAddress();
      return;
    }

    dispatch(loadBaseAddressNotification());
  }, [hasSession, pathname, isGuest, dispatch, loadCartAddress]);

  const alertMessage = useCallback(
    async (e: MessageEvent) => {
      if (isProduction() && !KURLY_PRODUCTION_URL_LIST.includes(e.origin)) {
        return;
      }

      if (e.data.source === 'addressChanged') {
        getAddress();
        // 툴팁을 띄우기 위해 id 초기화 처리
        setAddressId('resetId');
      }
    },
    [getAddress],
  );

  const changeAddressStatus = useCallback(() => {
    dispatch(resetAddressChanged());
    dispatch(setNewAddress(false));
  }, [dispatch]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let timeoutEnd: ReturnType<typeof setTimeout>;

    // 첫 진입 시는 툴팁을 띄우지 않는다.
    if (addressId === null) {
      return;
    }

    const id = String(currentAddress?.id);
    if (id !== addressId) {
      setAddressId(id);
      setTooltipOpen(true);

      timeout = setTimeout(
        () => {
          setTooltipOpen(false);
          timeoutEnd = setTimeout(() => {
            changeAddressStatus();
            clearTimeout(timeout);
            clearTimeout(timeoutEnd);
          }, 300);
        },
        addressId === 'open' ? MAIN_TOOLTIP_DISPLAY_MILLI_SECOND : TOOLTIP_DISPLAY_MILLI_SECOND,
      );
    }
  }, [addressId, changeAddressStatus, currentAddress, dispatch]);

  // 메인 페이지 배송지 툴팁 노출 처리
  useEffect(() => {
    if (!currentAddress) {
      return;
    }

    // 비회원 메인 툴팁 미노출
    if (!hasSession || isGuest) {
      return;
    }

    const isMainTooltipVisible = updateDeliveryTooltipVisibleState(asPath, !!currentAddress.address);

    if (isMainTooltipVisible) {
      setAddressId('open');
    }
  }, [currentAddress, hasSession, isGuest, asPath]);

  useEffect(() => {
    if (!hasSession || !isReady) {
      return;
    }

    const allowed = isAllowedUrl(pathname);

    if (!allowed) {
      setIsDisabled(true);
      return;
    }

    // FIXME: V2 대응 코드 / 메인이 옮겨오면 삭제되어야 함
    removeAddressRegistered();
    getAddress();
    detectAddressChanged();
  }, [dispatch, hasSession, isReady, pathname, getAddress, detectAddressChanged]);

  useEffect(() => {
    window.addEventListener('message', alertMessage);

    return () => {
      window.removeEventListener('message', alertMessage);
    };
  }, [alertMessage]);

  return {
    moveLoginPage,
    tooltip: {
      isDisabled,
      tooltipOpen,
    },
    toggleAddressLayer,
  };
}
