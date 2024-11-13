import { memo } from 'react';
import styled from '@emotion/styled';

import { ReceiverInfo } from '../../shared/interfaces';
import { multiMaxLineText } from '../../../../shared/utils';

const ContentContainer = styled.div`
  padding: 12px 20px 20px 20px;
`;

const Wrap = styled.div`
  display: flex;
  font-size: 16px;
  :not(:first-of-type) {
    margin-top: 12px;
  }
`;

const Title = styled.div`
  width: 100px;
  color: #666;
  flex-shrink: 0;
`;

const Content = styled.div`
  color: #333;
  word-break: break-all;
  ${multiMaxLineText(2)};
`;

const GuideText = styled.p`
  margin-top: 16px;
  font-size: 12px;
  color: #999;
`;

interface Props {
  receiverInfo: ReceiverInfo;
}

function MemberOrdererInfo({ receiverInfo: { name, phone, email } }: Props) {
  return (
    <ContentContainer>
      <Wrap>
        <Title>보내는 분</Title>
        <Content>{name}</Content>
      </Wrap>
      <Wrap>
        <Title>휴대폰</Title>
        <Content>{phone}</Content>
      </Wrap>
      <Wrap>
        <Title>이메일</Title>
        <Content>{email}</Content>
      </Wrap>
      <GuideText>
        주문자 정보 변경 방법 : 마이컬리
        {' > '}
        개인정보 수정
      </GuideText>
    </ContentContainer>
  );
}

export default memo(MemberOrdererInfo);
