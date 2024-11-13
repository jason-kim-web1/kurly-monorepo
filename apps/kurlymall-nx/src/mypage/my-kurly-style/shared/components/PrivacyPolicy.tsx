import { useCallback, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { isPC } from '../../../../../util/window/getDevice';

import COLOR from '../../../../shared/constant/colorset';
import Checkbox from '../../../../shared/components/Input/Checkbox';

import PrivacyPolicyDetail from './PrivacyPolicyDetail';
import MobilePrivacyPolicy from '../../m/components/PrivacyPolicy';
import { useAppSelector } from '../../../../shared/store';
import usePrivacyPolicyState from '../hooks/usePrivacyPolicyState';
import { updateCheckedState } from '../../slice';
import useAgreement from '../hooks/useAgreement';

const Wrapper = styled.div`
  ${isPC
    ? css`
        margin-top: 57px;
        padding-top: 6px;
        border-top: 1px solid ${COLOR.kurlyGray800};
      `
    : css`
        width: 100%;
        background: ${COLOR.kurlyWhite};
        padding-bottom: 20px;
        display: flex;
        align-items: center;
      `};
`;

const Title = styled.button`
  margin: 6px 0 60px 35px;
  text-decoration: underline;
`;

const styles = {
  checkbox: css`
    font-size: 20px;
    font-weight: 500;
  `,
};

export default function PrivacyPolicy() {
  const {
    myKurlyStyleInformation: { privacyPolicyStatus },
    checkedState,
  } = useAppSelector(({ myKurlyStyle }) => myKurlyStyle);

  const { isAgreement, changePrivacyPolicyStatus } = usePrivacyPolicyState(privacyPolicyStatus);

  const dispatch = useDispatch();

  const [isOpenAgreePopup, setIsOpenAgreePopup] = useState(false);

  const { onChangeAgreement } = useAgreement();

  const openAgreePopup = useCallback(() => {
    setIsOpenAgreePopup(!isOpenAgreePopup);
  }, [isOpenAgreePopup]);

  const onClickPrivacyPolicy = useCallback(async () => {
    dispatch(updateCheckedState(!checkedState));
    if (checkedState) {
      await onChangeAgreement();
    }
  }, [dispatch, onChangeAgreement, checkedState]);

  useEffect(() => {
    if (isAgreement) {
      setIsOpenAgreePopup(false);
      dispatch(updateCheckedState(true));
    }

    if (changePrivacyPolicyStatus) {
      setIsOpenAgreePopup(true);
      dispatch(updateCheckedState(false));
    }
  }, [changePrivacyPolicyStatus, dispatch, isAgreement]);

  const closeAgreementPopup = useCallback(() => {
    setIsOpenAgreePopup(false);
  }, []);

  return (
    <Wrapper>
      <Checkbox
        label={isPC ? '이용약관 필수동의' : ''}
        css={isPC && styles.checkbox}
        checked={checkedState}
        onChange={onClickPrivacyPolicy}
      />
      {isPC ? (
        <>
          <Title type="button" onClick={openAgreePopup}>
            프로필 수집 및 이용 약관 동의 (필수)
          </Title>
          {isOpenAgreePopup && <PrivacyPolicyDetail closeAgreementPopup={closeAgreementPopup} />}
        </>
      ) : (
        <MobilePrivacyPolicy />
      )}
    </Wrapper>
  );
}
