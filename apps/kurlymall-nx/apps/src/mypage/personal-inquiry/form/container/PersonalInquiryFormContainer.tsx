import { ReactNode, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import {
  initPersonalInquiryFormData,
  personalInquiryDefaultSearchInfo,
  personalInquiryFormInitialState as initialState,
  setInitialFromData,
  setMemberMobileMasked,
} from '../slice';
import { getPersonalInquirySessionData } from '../../service/PersonalInquiryDataStorage';
import { getPersonalInquiryMemberInfo, postPersonalInquiryItemDraft } from '../../../../shared/api';

interface Props {
  id?: number;
  orderProductPageSize: number;
  children: ReactNode;
}

export default function PersonalInquiryFormContainer({ id, orderProductPageSize, children }: Props) {
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(setInitialFromData(initialState));
    },
    [dispatch],
  );

  useEffect(() => {
    if (id) {
      // id 값이 있을 경우 수정모드. session storage 에서 데이터를 불러와 초기화
      const data = getPersonalInquirySessionData();

      if (!data || data.draft.id !== id) {
        return;
      }

      const { draft, inquiryTypeCode, inquiryTypeSubCode, orderData, allowsNotification, userImages } = data;

      dispatch(
        initPersonalInquiryFormData({
          loading: false,
          draft,
          inquiryTypeCode,
          inquiryTypeSubCode,
          allowsNotification,
          userImages,
          mode: 'EDIT',
          displayNotice: false,
          orderProductPicker: {
            loading: false,
            selectedOrderProducts: orderData.products.map((it) => ({
              ...it,
              selected: false,
              orderNo: orderData.orderNo,
            })),
            searchInfo: {
              ...personalInquiryDefaultSearchInfo,
              pageSize: orderProductPageSize,
            },
            orders: [],
          },
        }),
      );

      return;
    }

    postPersonalInquiryItemDraft().then(({ id: draftId }) => {
      dispatch(
        initPersonalInquiryFormData({
          loading: false,
          draft: {
            id: draftId,
            subject: '',
            contents: '',
          },
          orderProductPicker: {
            ...initialState.orderProductPicker,
            searchInfo: {
              ...initialState.orderProductPicker.searchInfo,
              pageSize: orderProductPageSize,
            },
          },
        }),
      );
    });
  }, [id, dispatch]);

  useEffect(() => {
    getPersonalInquiryMemberInfo().then(({ memberMobileMasked }) =>
      dispatch(setMemberMobileMasked(memberMobileMasked)),
    );
  }, [dispatch]);

  return <>{children}</>;
}
