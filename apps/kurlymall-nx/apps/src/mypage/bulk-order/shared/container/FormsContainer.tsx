import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { isWebview } from '../../../../../util/window/getDevice';
import { useAppSelector } from '../../../../shared/store';
import { hideLoading, notifyAndFocus, redirectTo, showLoading } from '../../../../shared/reducers/page';
import { postBulkOrder } from '../../services/bulk-order.service';
import Alert from '../../../../shared/components/Alert/Alert';
import BulkOrderBasicForm from '../components/BulkOrderBasicForm';
import BulkOrderDateForm from '../components/BulkOrderDateForm';
import BulkOrderDeliveryForm from '../components/BulkOrderDeliveryForm';
import BulkOrderInquiryForm from '../components/BulkOrderInquiryForm';
import BulkOrderWarningForm from '../components/BulkOrderWarningForm';
import BulkOrderAgreeForm from '../components/BulkOrderAgreeForm';
import Button from '../../../../shared/components/Button/Button';
import { EMAIL_REGEX, getPageUrl, USER_MENU_PATH } from '../../../../shared/constant';
import appService from '../../../../shared/services/app.service';
import { clear } from '../../reducers/bulk-order.slice';

const ContentWrapper = styled.div<{ isPC: boolean }>`
  padding: 4px 20px;
  width: ${({ isPC }) => (isPC ? '100%' : 'calc(100% + 40px)')};
  margin: ${({ isPC }) => (isPC ? 0 : '0 -20px')};

  ${({ isPC }) =>
    isPC
      ? `
    border-top: 2px solid ${COLOR.kurlyGray800};
  `
      : `
    background-color: ${COLOR.kurlyWhite};
  `}
`;

const BottomWrapper = styled.div<{ isPC: boolean }>`
  margin-top: 10px;

  ${({ isPC }) =>
    isPC
      ? `
    padding-top: 40px;
    border-top: 1px solid ${COLOR.bg};
  `
      : `
    margin-bottom: 20px;
    padding: 10px 20px 18px;
    background-color: ${COLOR.kurlyWhite};
  `}
`;

const BulkOrderFormSubmit = styled.div`
  display: flex;
  justify-content: center;
`;

export default function FormsContainer({ isPC = true }: { isPC: boolean }) {
  const dispatch = useDispatch();

  const {
    form: { name, contact, email, receiveDate, deliveryType, note, agreePrivacyUse },
  } = useAppSelector(({ bulkOrder }) => bulkOrder);

  const onSubmit = useCallback(async () => {
    if (!name) {
      dispatch(
        notifyAndFocus({
          message: '신청하는 분 이름을 입력해 주세요.',
          documentId: 'name',
        }),
      );
      return;
    }

    if (!contact) {
      dispatch(
        notifyAndFocus({
          message: '신청하는 분 연락처를 입력해 주세요.',
          documentId: 'contact',
        }),
      );
      return;
    }

    if (!email) {
      dispatch(
        notifyAndFocus({
          message: '신청하는 분 이메일을 입력해 주세요.',
          documentId: 'email',
        }),
      );
      return;
    }

    if (!agreePrivacyUse) {
      await Alert({ text: '약관 동의는 필수입니다.' });
      return;
    }

    if (!new RegExp(EMAIL_REGEX).test(email)) {
      dispatch(
        notifyAndFocus({
          message: '이메일 형식을 확인해 주세요.',
          documentId: 'email',
        }),
      );
      return;
    }

    try {
      dispatch(showLoading());
      await postBulkOrder({
        name,
        contact,
        email,
        receiveDate,
        deliveryType,
        note,
        agreePrivacyUse,
      });

      await Alert({
        text: '정상적으로 등록되었습니다.',
      });

      if (isWebview()) {
        appService.postAppMessage({ code: 'WV7000' });
      } else {
        dispatch(redirectTo({ url: getPageUrl(USER_MENU_PATH.home) }));
      }
      return;
    } finally {
      dispatch(clear());
      dispatch(hideLoading());
    }
  }, [agreePrivacyUse, contact, deliveryType, dispatch, email, name, note, receiveDate]);

  return (
    <>
      <form>
        <ContentWrapper isPC={isPC}>
          <BulkOrderBasicForm isPC={isPC} />
          <BulkOrderDateForm isPC={isPC} />
          <BulkOrderDeliveryForm />
          <BulkOrderInquiryForm />
          <BulkOrderWarningForm />
        </ContentWrapper>
        <BottomWrapper isPC={isPC}>
          <BulkOrderAgreeForm />
          <BulkOrderFormSubmit>
            <Button
              text="문의하기"
              width={isPC ? 240 : undefined}
              height={isPC ? 56 : 48}
              radius={3}
              onClick={onSubmit}
            />
          </BulkOrderFormSubmit>
        </BottomWrapper>
      </form>
    </>
  );
}
