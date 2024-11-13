import { createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

import { requestHelper } from '../../cart/shared/reducers/async-request.slice';

import {
  fetchShippingAreaPolicy,
  fetchMemberAddress,
  getAddressList,
  getBaseAddressNotification,
  updateChangeCurrentAddress,
  updateMemberAddress,
  deleteMemberAddress,
} from '../services/shippingAddress.service';
import { notify, notifyAndFocus, notifyAndRedirectTo, redirectTo } from './page';
import { validateAlert } from '../error-handlers/ValidationErrorHandlers';
import { ValidationError } from '../errors/ValidationError';
import { validateAddressInfo } from '../utils/validate-address-field';
import { ReformattedError } from '../errors/ReformattedError';
import { ADDRESS_PATH, getPageUrl, MYPAGE_PATH } from '../constant';
import { isPC } from '../../../util/window/getDevice';
import { AppThunk } from '../store';
import {
  AddressListProps,
  CourierOperationServiceRequest,
  CurrentAddressParams,
  CurrentAddressResponse,
  DeliveryProps,
  MemberAddressResponse,
  SearchAddressResultResponse,
} from '../interfaces/ShippingAddress';

export interface ShippingAddressState {
  loading: boolean;
  // 현재 배송지
  currentAddress?: CurrentAddressResponse;
  // (회원) 기존 배송지 리스트
  addressList?: AddressListProps[];
  // (회원) 배송지 수정 시 사용
  selectedAddress?: MemberAddressResponse;
  // (회원/비회원 공통) 검색한 배송지
  searchAddress?: DeliveryProps;
  // (회원/비회원 공통) 검색한 배송지 권역 정보 결과
  searchAddressResult?: SearchAddressResultResponse;
  // (회원) 배송지 최초부여
  isAddressAssigned: boolean;
  // (회원) 배송지 변경 여부
  addressChanged: boolean;
  // (회원) 배송지 리스트가 없을 경우
  isEmptyAddress: boolean;
}

export const initialState: ShippingAddressState = {
  loading: false,
  isEmptyAddress: false,
  isAddressAssigned: false,
  addressChanged: false,
  addressList: [],
};

const { actions, reducer } = createSlice({
  name: 'shippingAddress',
  initialState,
  reducers: {
    setStatus: (state, { payload }) => ({ ...state, ...payload }),
    setLoading: (state, { payload: loading }) => ({
      ...state,
      loading,
    }),
    updateAddressList: (state, { payload: { addressNo, address } }) => ({
      ...state,
      addressList: state.addressList?.map((it) => (it.no === addressNo ? address : it)),
    }),
    clearAddressResult: (state) => ({
      ...state,
      searchAddressResult: undefined,
    }),
    resetAddressChanged: (state) => ({
      ...state,
      addressChanged: false,
    }),
    setNewAddress: (state, { payload: isAddressAssigned }) => ({
      ...state,
      isAddressAssigned,
    }),
    completeAddressChanged: (state) => ({
      ...state,
      addressChanged: true,
    }),
  },
});

export const {
  setStatus,
  setLoading,
  updateAddressList,
  clearAddressResult,
  resetAddressChanged,
  setNewAddress,
  completeAddressChanged,
} = actions;

// 주소지 설정
export const setCurrentAddress =
  (currentAddress: CurrentAddressParams): AppThunk =>
  async (dispatch, getState) => {
    const {
      auth: { isGuest },
    } = getState();

    const updateCurrentAddress = (checkAddressResult?: SearchAddressResultResponse) => {
      dispatch(
        setStatus({
          currentAddress: {
            isGuest,
            ...currentAddress,
            ...checkAddressResult,
          },
        }),
      );
    };

    // 배송지가 있으면 권역 조회까지 한다.
    if (!isEmpty(currentAddress.address)) {
      const { address, addressDetail, baseAddressType } = currentAddress;
      const checkAddressResult = await fetchShippingAreaPolicy({ address, addressDetail, baseAddressType });

      updateCurrentAddress(checkAddressResult);
      return;
    }

    updateCurrentAddress();
  };

// (검색 결과에 사용) 배송지 권역 정책 조회(배송 유형 포함)
export const loadShippingAreaPolicy = (params: CourierOperationServiceRequest) =>
  requestHelper({
    request: 'loadShippingAreaPolicy',
    action: async (dispatch) => {
      const searchAddressResult = await fetchShippingAreaPolicy(params);

      dispatch(
        setStatus({
          searchAddressResult,
        }),
      );
    },
    onError: (e, dispatch) => {
      dispatch(notify(e.message));
    },
  });

// 주소록 고유번호로 카트 현 배송지 업데이트
export const updateCurrentAddress = (addressNo: number) =>
  requestHelper({
    request: 'updateCurrentAddress',
    action: async (dispatch) => {
      const currentAddress = await updateChangeCurrentAddress(addressNo);

      dispatch(
        setStatus({
          currentAddress,
        }),
      );
      dispatch(completeAddressChanged());
    },
    onError: (e, dispatch) => {
      dispatch(notify(e.message));
    },
  });

// 현 배송지와 기본 배송지 동일 여부, 현 배송지 조회
export const loadBaseAddressNotification = () =>
  requestHelper({
    request: 'loadBaseAddressNotification',
    action: async (dispatch) => {
      const currentAddress = await getBaseAddressNotification();

      dispatch(
        setStatus({
          currentAddress,
        }),
      );
    },
    onError: (e, dispatch) => {
      dispatch(notify(e.message));
    },
  });

// 일반 - 회원 주소록 조회
export const loadAddressList = () =>
  requestHelper({
    request: 'loadAddressList',
    action: async (dispatch) => {
      const addressList = await getAddressList();

      dispatch(
        setStatus({
          addressList,
          isEmptyAddress: isEmpty(addressList),
        }),
      );
    },
    onError: (e, dispatch) => {
      dispatch(notify(e.message));
    },
  });

// 일반 - 회원 주소 보기
export const loadAddress = (addressNo: number) =>
  requestHelper({
    request: 'loadAddress',
    action: async (dispatch) => {
      const selectedAddress: MemberAddressResponse = await fetchMemberAddress(addressNo);

      dispatch(
        setStatus({
          selectedAddress,
        }),
      );
    },
    onError: (e, dispatch) => {
      dispatch(notify(e.message));
    },
  });

// 회원 주소 수정
export const updateAddress = (params: MemberAddressResponse, isMypage?: string) =>
  requestHelper({
    request: 'updateAddress',
    action: async (dispatch) => {
      const { name, addressDetail, mobile } = params;

      const validateAddress = await validateAddressInfo({
        name,
        addressDetail,
        mobile,
      });

      await validateAlert(validateAddress);
      dispatch(setLoading(true));
      const result = await updateMemberAddress(params);
      await dispatch(
        updateAddressList({
          addressNo: params.no,
          address: result,
        }),
      );
      if (!isPC && isMypage) {
        return window.parent.postMessage({ source: 'closeAddressSearch' }, window.location.href);
      }
      if (!isMypage) {
        //web의 마이페이지의 주소록 관리에서 주소를 수정하지 않았다면 현 배송지를 업데이트 합니다.
        await dispatch(updateCurrentAddress(params.no));
      }
      dispatch(completeAddressChanged());
      dispatch(setLoading(false));
    },
    onError: (err, dispatch) => {
      dispatch(setLoading(false));

      // 주문자 정보의 허용 불가능 문자열 수정 처리
      if (err instanceof ReformattedError) {
        const { errorMessage, documentId } = JSON.parse(err.message);

        dispatch(
          notifyAndFocus({
            message: errorMessage,
            documentId,
          }),
        );
        return;
      }

      if (err instanceof ValidationError) {
        dispatch(
          notifyAndFocus({
            message: err.message,
            documentId: err.name,
          }),
        );
        return;
      }

      dispatch(
        notifyAndRedirectTo({
          message: err.message,
          redirectUrl: !isMypage ? getPageUrl(ADDRESS_PATH.list) : getPageUrl(MYPAGE_PATH.address),
        }),
      );
    },
  });

// 회원 주소 삭제
export const deleteAddress = (addressNo: number, isMypage?: string) =>
  requestHelper({
    request: 'deleteAddress',
    action: async (dispatch) => {
      dispatch(setLoading(true));
      await deleteMemberAddress(addressNo);

      if (isMypage) {
        if (isPC) {
          dispatch(completeAddressChanged());
        } else {
          window.parent.postMessage({ source: 'closeAddressSearch' }, window.location.href);
        }
      } else {
        dispatch(redirectTo({ url: getPageUrl(ADDRESS_PATH.list), replace: true }));
      }
      dispatch(setLoading(false));
    },
    onError: (e, dispatch) => {
      dispatch(
        notifyAndRedirectTo({
          message: e.message,
          redirectUrl: !isMypage ? getPageUrl(ADDRESS_PATH.list) : getPageUrl(MYPAGE_PATH.address),
        }),
      );
    },
  });

export { reducer as shippingAddressReducer };
