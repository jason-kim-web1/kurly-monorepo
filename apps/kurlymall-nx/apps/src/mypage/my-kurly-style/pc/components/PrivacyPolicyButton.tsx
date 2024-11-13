import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useSelector } from 'react-redux';

import Button from '../../../../shared/components/Button/Button';
import COLOR from '../../../../shared/constant/colorset';
import { AppState } from '../../../../shared/store';
import useAgreement from '../../shared/hooks/useAgreement';
import usePrivacyPolicyState from '../../shared/hooks/usePrivacyPolicyState';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px 30px;
`;

const styles = {
  button: css`
    border: 0;
    padding: 0;
    margin: 0;
    border-radius: 0 0 12px 12px;
    border-top: 1px solid ${COLOR.bgLightGray};
  `,
};

interface Props {
  closeAgreementPopup: () => void;
}

export default function PrivacyPolicyButton({ closeAgreementPopup }: Props) {
  const {
    myKurlyStyleInformation: { privacyPolicyStatus },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  const { changePrivacyPolicyStatus, isDisagreement } = usePrivacyPolicyState(privacyPolicyStatus);

  const { moveToMypage, onChangeAgreement, agreePrivacyPolicy } = useAgreement(closeAgreementPopup);

  return (
    <>
      {changePrivacyPolicyStatus ? (
        <ButtonWrapper>
          <Button
            text="취소"
            theme="tertiary"
            width={186}
            onClick={isDisagreement ? moveToMypage : onChangeAgreement}
          />
          <Button text="동의 후 계속" width={186} onClick={agreePrivacyPolicy} />
        </ButtonWrapper>
      ) : (
        <Button text="확인" theme="secondary" css={styles.button} onClick={closeAgreementPopup} />
      )}
    </>
  );
}
