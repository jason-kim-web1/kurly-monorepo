import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import Alert from '../../../../shared/components/Alert/Alert';

import { redirectTo } from '../../../../shared/reducers/page';
import { getPageUrl, MYPAGE_PATH, USER_MENU_PATH } from '../../../../shared/constant';
import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';
import { putPrivacyPolicy } from '../../../../shared/services/myKurlyStyle.service';
import { updateCheckedState, clearInfo, updatePrivacyPolicy } from '../../slice';

const Wrapper = styled.p`
  word-break: keep-all;
  text-align: left;
`;

const Emphasis = styled.span`
  color: ${COLOR.invalidRed};
`;

const contentsStyle = `
  .swal2-popup {
    max-width: 440px;
  }

  ${
    isPC &&
    `
    .popup-content{
      padding-bottom: 0;
    }
    .popup-footer {
      column-gap: 8px;
      padding: 24px 30px 30px;
      border: 0;
      height: auto;
    }
    .popup-footer button:first-of-type {
      border: 1px solid ${COLOR.lightGray};
      color: ${COLOR.kurlyGray800};
      background: ${COLOR.kurlyWhite};
    }
    .popup-footer button {
      margin:0;
      width: 50%;
      border-radius: 3px;
      height: 56px;
      background: ${COLOR.kurlyPurple};
      color: ${COLOR.kurlyWhite};
    }
  `
  };
`;

export default function useAgreement(closeAgreementPopup?: () => void) {
  const dispatch = useDispatch();

  const [popupOpen, setPopupOpen] = useState(true);

  const agreePrivacyPolicy = useCallback(async () => {
    dispatch(updatePrivacyPolicy('AGREE'));
    dispatch(updateCheckedState(true));
    await putPrivacyPolicy(true);
    if (closeAgreementPopup) {
      closeAgreementPopup();
    }
    setPopupOpen(false);
  }, [closeAgreementPopup, dispatch]);

  const moveToMypage = useCallback(() => {
    if (closeAgreementPopup) {
      closeAgreementPopup();
    }
    if (isPC) {
      dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.orderList) }));
    } else {
      dispatch(redirectTo({ url: getPageUrl(USER_MENU_PATH.mykurly) }));
    }
  }, [closeAgreementPopup, dispatch]);

  const onDeletePrivacyPolicy = useCallback(async () => {
    await Alert({
      text: '나의 컬리 스타일 프로필이 삭제되었습니다.',
      allowOutsideClick: false,
    });
    await moveToMypage();
  }, [moveToMypage]);

  const onChangeAgreement = useCallback(async () => {
    const { isConfirmed } = await Alert({
      title: '약관 동의를 취소하시겠습니까?',
      contentsStyle,
      allowOutsideClick: false,
      showCancelButton: true,
      cancelButtonText: '아니요',
      confirmButtonText: '네',
      contents: (
        <Wrapper>
          미동의 시 이용이 어려우며, 기존 동의를 철회하는 경우 서비스 제공은 즉시 중단되고{' '}
          <Emphasis>기존 정보는 모두 삭제</Emphasis>됩니다.
        </Wrapper>
      ),
    });

    if (isConfirmed) {
      dispatch(clearInfo());
      await putPrivacyPolicy(false);
      await onDeletePrivacyPolicy();
    } else {
      dispatch(updateCheckedState(true));
    }
  }, [dispatch, onDeletePrivacyPolicy]);

  return {
    popupOpen,
    moveToMypage,
    onChangeAgreement,
    agreePrivacyPolicy,
  };
}
