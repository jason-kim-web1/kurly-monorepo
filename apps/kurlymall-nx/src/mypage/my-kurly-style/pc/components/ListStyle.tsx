import styled from '@emotion/styled';

import { useEffect } from 'react';

import COLOR from '../../../../shared/constant/colorset';
import { amplitudeService } from '../../../../shared/amplitude';
import { ImpressionProfileInformationArgeement } from '../../../../shared/amplitude/events/mykurly-style';

const Wrapper = styled.dl`
  margin-top: 9px;
`;

const Title = styled.dt`
  font-weight: 500;

  & ~ dt {
    margin-top: 12px;
  }
`;

const Description = styled.dd`
  margin-top: 4px;
  color: ${COLOR.kurlyGray450};
`;

interface Props {
  period: string;
  purpose: string;
  items: string;
}
export default function ListStyle({ period, purpose, items }: Props) {
  useEffect(() => {
    void amplitudeService.logEvent(new ImpressionProfileInformationArgeement());
  }, []);

  return (
    <Wrapper>
      <Title>수집 목적</Title>
      <Description>{purpose}</Description>
      <Title>수집 항목</Title>
      <Description>{items}</Description>
      <Title>보유 및 이용기간</Title>
      <Description>{period}</Description>
    </Wrapper>
  );
}
