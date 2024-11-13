import { isEmpty } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { SweetAlertResult } from 'sweetalert2';

import { useAppSelector } from '../../../shared/store';
import {
  deleteAddress,
  loadAddress,
  loadAddressList,
  loadShippingAreaPolicy,
  setStatus,
  updateAddress,
  updateCurrentAddress,
} from '../../../shared/reducers/shipping-address.slice';

import {
  ADDRESS_PATH,
  REMOVE_ADDRESS_TEXT,
  MAX_ADDRESS_LIST_LENGTH,
  MAX_ADDRESS_TEXT,
  EMPTY_ADDRESS_DETAIL_TEXT,
} from '../../../shared/constant';
import { isPC } from '../../../../util/window/getDevice';

import Alert from '../../../shared/components/Alert/Alert';
import { storeAddressRegistered } from '../services/shipping-address.storage.service';
import { isDefaultPhoneNumber } from '../../../shared/utils';
import { ParsedUrlQuery } from 'querystring';
import { BaseAddressType, DefaultAddressType, DeliveryProps } from '../../../shared/interfaces/ShippingAddress';

interface Response {
  updateSearchAddress: (result: DeliveryProps) => void;
  updateRecentAddress: (addressNo: number) => void;
  updateMemberAddressDetail: (isDefault: boolean, isMypage?: string) => void;
  removeAddress: (addressNo: number, isMypage?: string) => void;
  changeAddressDetail: (params: { name: string; value: string }) => void;
  moveAddressModifyPage: (addressNo: number) => void;
  moveAddressAddPage: () => void;
}

export default function useShippingAddress(): Response {
  const dispatch = useDispatch();
  const router = useRouter();
  const { openerOrigin } = router.query as ParsedUrlQuery & {
    openerOrigin?: string;
  };

  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const { addressList, selectedAddress, addressChanged } = useAppSelector(({ shippingAddress }) => ({
    addressList: shippingAddress.addressList,
    selectedAddress: shippingAddress.selectedAddress,
    addressChanged: shippingAddress.addressChanged,
  }));

  // (공통) 배송지 권역 조회
  const updateSearchAddress = (result: DeliveryProps) => {
    dispatch(
      setStatus({
        searchAddress: result,
      }),
    );

    if (!isEmpty(result.address)) {
      const isRoadAddress = result.baseAddressType === BaseAddressType.road;

      dispatch(
        loadShippingAreaPolicy({
          address: isRoadAddress ? result.roadAddress : result.address,
          addressDetail: result.addressDetail,
          baseAddressType: result.baseAddressType,
        }),
      );
    }
  };

  // (회원) 최근 주소지 변경
  const updateRecentAddress = (addressNo: number) => {
    const recentAddress = addressList?.find((it) => it.isCurrentDeliveryAddress === true);
    if (addressNo === recentAddress?.no) {
      return;
    }

    dispatch(updateCurrentAddress(addressNo));
  };

  // (회원) 상세 주소지 수정
  const updateMemberAddressDetail = (isDefault: boolean, isMypage?: string) => {
    if (!selectedAddress) {
      return;
    }

    const type = isDefault ? DefaultAddressType.default : DefaultAddressType.recent;

    if (isDefaultPhoneNumber(selectedAddress.mobile)) {
      Alert({
        text: '휴대폰 번호를 정확히 입력해주세요.',
      });

      return;
    }

    if (isEmpty(selectedAddress.addressDetail)) {
      Alert({
        text: EMPTY_ADDRESS_DETAIL_TEXT,
        showCancelButton: true,
      }).then(({ isConfirmed }: SweetAlertResult) => {
        if (isConfirmed) {
          dispatch(
            updateAddress(
              {
                ...selectedAddress,
                type,
              },
              isMypage,
            ),
          );
        }
      });

      return;
    }

    dispatch(
      updateAddress(
        {
          ...selectedAddress,
          type,
        },
        isMypage,
      ),
    );
  };

  // (회원) 주소지 삭제
  const removeAddress = (addressNo: number, isMypage?: string) => {
    Alert({
      text: REMOVE_ADDRESS_TEXT,
      showCancelButton: true,
    }).then(({ isConfirmed }: SweetAlertResult) => {
      if (isConfirmed) {
        dispatch(deleteAddress(addressNo, isMypage));
      }
    });
  };

  // (공통) 상세 주소지 입력값 변경
  const changeAddressDetail = ({ name, value }: { name: string; value: string }) => {
    dispatch(
      setStatus({
        selectedAddress: {
          ...selectedAddress,
          [name]: value,
        },
      }),
    );
  };

  // (회원) 주소지 수정 페이지 이동
  const moveAddressModifyPage = (addressNo: number) => {
    const url = `${ADDRESS_PATH.update.uri}?addressNo=${addressNo}`;

    router.push(isPC ? url : `/m${url}`, url);
  };

  // (회원) 주소지 등록 페이지 이동
  const moveAddressAddPage = () => {
    const url = ADDRESS_PATH.add.uri;

    if (addressList?.length === MAX_ADDRESS_LIST_LENGTH) {
      Alert({
        text: MAX_ADDRESS_TEXT,
      });

      return;
    }

    router.push(isPC ? url : `/m${url}`, url);
  };

  // (공통) 페이지 진입
  const loadInformation = useCallback(() => {
    const { pathname, query } = router;

    // (회원) 배송지 관리
    if (pathname.includes(ADDRESS_PATH.list.uri)) {
      dispatch(loadAddressList());
    }

    // (회원) 배송지 수정
    if (pathname.includes(ADDRESS_PATH.update.uri)) {
      const addressNo = Number(query.addressNo);

      dispatch(loadAddress(addressNo));
    }
  }, [dispatch, router]);

  // (공통) 주소지 수정, 변경
  const detectAddressChanged = useCallback(() => {
    if (!addressChanged) {
      return;
    }

    const origin =
      openerOrigin && /https?:\/\/[\w.]+kurly.com(?:$|\/|:)/.test(openerOrigin) ? openerOrigin : window.location.href;

    if (isPC) {
      window.opener?.postMessage({ source: 'addressChanged' }, origin);
      window.close();
      return;
    }

    // FIXME: V2의 배송지 툴팁을 띄우기 위한 코드. 추후 삭제 되어야 함
    storeAddressRegistered(false);

    if (router.pathname.includes(ADDRESS_PATH.list.uri)) {
      router.back();
    }

    if (router.pathname.includes(ADDRESS_PATH.update.uri)) {
      window.history.go(-2);
    }
  }, [addressChanged, openerOrigin, router]);

  useEffect(() => {
    if (!hasSession || !router.isReady) {
      return;
    }

    loadInformation();
    detectAddressChanged();
  }, [dispatch, hasSession, loadInformation, detectAddressChanged, router]);

  return {
    updateSearchAddress,
    updateRecentAddress,
    updateMemberAddressDetail,
    removeAddress,
    changeAddressDetail,
    moveAddressModifyPage,
    moveAddressAddPage,
  };
}
