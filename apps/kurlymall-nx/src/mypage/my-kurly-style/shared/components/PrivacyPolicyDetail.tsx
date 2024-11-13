import styled from '@emotion/styled';

import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';

import TableStyle from './TableStyle';
import ListStyle from '../../pc/components/ListStyle';
import PrivacyPolicyButton from '../../pc/components/PrivacyPolicyButton';
import { AppState } from '../../../../shared/store';
import NewIcon from '../../../../shared/components/icons/NewIcon';
import usePrivacyPolicyState from '../hooks/usePrivacyPolicyState';
import { zIndex } from '../../../../shared/styles';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.myKurlyStyle};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${COLOR.kurlyBlack};
    opacity: 0.4;
  }
`;

const InnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 440px;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  background-color: ${COLOR.kurlyWhite};
`;

const Contents = styled.div`
  padding: 0 30px;
`;

const Title = styled.div<{ isNewPrivacyPolicy: boolean }>`
  line-height: 32px;
  font-size: ${({ isNewPrivacyPolicy }) => (isNewPrivacyPolicy ? '24px' : '20px')};
  font-weight: 500;
  padding: 30px 30px 20px;
`;

const Description = styled.div`
  margin: 16px 0 30px 0;
  color: ${COLOR.kurlyGray600};
  line-height: 19px;
`;

const newIcon = css`
  width: 14px;
  height: 14px;
  vertical-align: middle;
`;

interface Props {
  closeAgreementPopup: () => void;
}

export default function PrivacyPolicyDetail({ closeAgreementPopup }: Props) {
  const {
    privacyPolicy: { period, purpose, items, description },
    myKurlyStyleInformation: { privacyPolicyStatus },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  const { changePrivacyPolicyStatus, updatedPrivacyPolicy } = usePrivacyPolicyState(privacyPolicyStatus);

  return (
    <Wrapper>
      <InnerWrapper>
        <Title isNewPrivacyPolicy={changePrivacyPolicyStatus}>
          프로필 수집 및 이용 약관 동의 (필수)
          {updatedPrivacyPolicy && <NewIcon css={newIcon} />}
        </Title>
        <Contents>
          {changePrivacyPolicyStatus ? (
            <ListStyle period={period} purpose={purpose} items={items} />
          ) : (
            <TableStyle period={period} purpose={purpose} items={items} />
          )}
          <Description>{description}</Description>
        </Contents>
        <PrivacyPolicyButton closeAgreementPopup={closeAgreementPopup} />
      </InnerWrapper>
    </Wrapper>
  );
}
