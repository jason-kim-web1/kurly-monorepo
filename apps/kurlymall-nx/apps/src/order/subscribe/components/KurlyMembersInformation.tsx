import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isPC } from '../../../../util/window/getDevice';
import COLOR from '../../../shared/constant/colorset';
import NextImage from '../../../shared/components/NextImage';
import { KURLY_MEMBERS_BANNER_3 } from '../../../shared/constant';
import { useAppSelector } from '../../../shared/store';
import StartKurlyMembershipText from './StartKurlyMemebershipText';

const Wrapper = styled.div<{ isChangePayment?: boolean }>`
  border-bottom: ${isPC ? 1 : 8}px solid ${COLOR.bg};

  ${({ isChangePayment }) =>
    isChangePayment &&
    css`
      border-bottom: none;
      padding-left: ${isPC ? 30 : 20}px;
    `};
`;

const ContentWrapper = styled.div`
  margin: ${isPC ? `0 30px 24px` : `0 20px 18px`};
`;

const ImageWrapper = styled.div`
  position: relative;
  text-align: center;
  height: 36vw;
  span {
    border-radius: 8px;
  }

  ${isPC &&
  css`
    height: 146px;
    span {
      border-radius: 12px;
    }
  `}
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 28px;
  padding: 24px 0 14px;
  white-space: pre;

  ${isPC &&
  css`
    font-size: 24px;
    line-height: 32px;
    padding: 36px 0 20px;
  `}
`;

export default function KurlyMembersInformation() {
  const isChangePayment = useAppSelector(({ subscribeCheckout }) => subscribeCheckout.isChangePayment);

  if (isChangePayment) {
    return (
      <Wrapper isChangePayment>
        <Title>{'다음 결제일부터\n변경된 수단으로 결제됩니다.'}</Title>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <Title>
          <StartKurlyMembershipText />
        </Title>
        <ImageWrapper>
          <NextImage src={KURLY_MEMBERS_BANNER_3} layout="fill" objectFit="cover" alt="컬리멤버스 배너" />
        </ImageWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
