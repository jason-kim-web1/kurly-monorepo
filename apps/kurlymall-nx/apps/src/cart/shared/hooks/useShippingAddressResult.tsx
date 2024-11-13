import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';

import {
  clearAddressResult,
  setLoading,
  setNewAddress,
  setStatus,
  updateCurrentAddress,
} from '../../../shared/reducers/shipping-address.slice';

import { EMPTY_ADDRESS_DETAIL_TEXT } from '../../../shared/constant';
import { isPC } from '../../../../util/window/getDevice';
import { storeAddressRegistered } from '../services/shipping-address.storage.service';

import Alert from '../../../shared/components/Alert/Alert';
import { ParsedUrlQuery } from 'querystring';
import { validateAddressDetail } from '../../../shared/utils/validate-address-field';
import { validateAlert } from '../../../shared/error-handlers/ValidationErrorHandlers';
import { ReformattedError } from '../../../shared/errors/ReformattedError';
import { notify, notifyAndFocus } from '../../../shared/reducers/page';
import { useAppSelector } from '../../../shared/store';

import { DefaultAddressType } from '../../../shared/interfaces/ShippingAddress';
import { createGuestAddress, createMemberAddress } from '../../../shared/services/shippingAddress.service';

export default function useShippingAddressResult() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isIframe, openerOrigin } = router.query as ParsedUrlQuery & {
    isIframe?: string;
    openerOrigin?: string;
  };

  const { searchAddressResult, addressDetail, searchAddress, isEmptyAddress } = useAppSelector(
    ({ shippingAddress }) => ({
      searchAddressResult: shippingAddress.searchAddressResult,
      addressDetail: shippingAddress.searchAddressResult?.addressDetail,
      searchAddress: shippingAddress.searchAddress,
      isEmptyAddress: shippingAddress.isEmptyAddress,
    }),
  );
  const { isGuest } = useAppSelector(({ auth }) => auth);

  const checkAddressDetail = () => {
    if (!addressDetail) {
      return;
    }

    const validateAddress = validateAddressDetail(addressDetail);
    validateAlert(validateAddress);
  };

  const createAddress = async (isDefault: boolean) => {
    if (!searchAddress || !searchAddressResult) {
      return;
    }

    dispatch(setLoading(true));

    if (isGuest) {
      await createGuestAddress({
        baseAddressType: searchAddress.baseAddressType,
        roadAddress: searchAddress.roadAddress,
        roadZoneCode: searchAddress.roadZoneCode,
        address: searchAddressResult.address,
        addressDetail: searchAddressResult.addressDetail,
      });
    } else {
      const address = await createMemberAddress({
        ...searchAddress,
        addressDetail: searchAddressResult.addressDetail,
        type: isDefault || isEmptyAddress ? DefaultAddressType.default : DefaultAddressType.recent,
      });

      dispatch(updateCurrentAddress(address.no));
    }

    dispatch(setNewAddress(true));
  };

  const confirmSubmitAddress = async (isDefault: boolean) => {
    try {
      checkAddressDetail();
      await createAddress(isDefault);
    } catch (err) {
      dispatch(setLoading(false));

      if (err instanceof ReformattedError) {
        const { errorMessage, documentId } = JSON.parse(err.message);
        dispatch(
          notifyAndFocus({
            message: errorMessage,
            documentId: documentId,
          }),
        );
        return;
      }

      dispatch(notify(err.message));
    }

    const origin =
      openerOrigin && /https?:\/\/[\w.]+kurly.com(?:$|\/|:)/.test(openerOrigin) ? openerOrigin : window.location.href;

    if (isPC) {
      window.opener?.postMessage({ source: 'addressChanged' }, origin);
      window.close();
      return;
    }

    if (isIframe) {
      window.parent.postMessage({ source: 'addressChanged' }, origin);
      dispatch(setLoading(false));
      return;
    }

    // FIXME: V2의 배송지 툴팁을 띄우기 위한 코드. 추후 삭제 되어야 함
    storeAddressRegistered(true);

    // page(v2 or nx) -> (회원: 배송지관리 리스트) -> search -> searchResult
    window.history.go(isGuest ? -3 : -4);

    dispatch(setLoading(false));
  };

  const saveAddress = async (isDefault: boolean) => {
    if (!searchAddressResult) {
      return;
    }

    if (isEmpty(searchAddressResult.addressDetail)) {
      const { isDismissed } = await Alert({
        text: EMPTY_ADDRESS_DETAIL_TEXT,
        showConfirmButton: true,
        showCancelButton: true,
        returnFocus: false,
      });

      if (isDismissed) {
        return;
      }
    }

    await confirmSubmitAddress(isDefault);
  };

  const researchAddress = () => {
    dispatch(clearAddressResult());

    router.back();
  };

  const changeAddress = ({ value }: { name?: string; value: string }) => {
    dispatch(
      setStatus({
        searchAddressResult: {
          ...searchAddressResult,
          addressDetail: value,
        },
      }),
    );
  };

  return {
    researchAddress,
    changeAddress,
    saveAddress,
  };
}
