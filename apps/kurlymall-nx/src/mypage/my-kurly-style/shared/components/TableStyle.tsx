import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';

import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.table``;

const TitleWrapper = styled.thead``;

const Row = styled.tr``;

const Title = styled.th`
  width: calc(100% / 3);
  border: 1px solid ${COLOR.lightGray};
  background-color: ${COLOR.kurlyGray100};

  ${isPC
    ? css`
        height: 39px;
        font-weight: 500;
      `
    : css`
        height: 37px;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
      `}
`;

const DescriptionWrapper = styled.tbody``;

const Column = styled.td`
  padding: 10px;
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  border: 1px solid ${COLOR.lightGray};
  &:last-of-type {
    font-weight: 500;
  }
`;

interface Props {
  period: string;
  purpose: string;
  items: string;
}

export default function TableStyle({ period, purpose, items }: Props) {
  return (
    <Wrapper>
      <TitleWrapper>
        <Row>
          <Title>수집 목적</Title>
          <Title>수집 항목</Title>
          <Title>보유 기간</Title>
        </Row>
      </TitleWrapper>
      <DescriptionWrapper>
        <Row>
          <Column>{purpose}</Column>
          <Column>{items}</Column>
          <Column>{period}</Column>
        </Row>
      </DescriptionWrapper>
    </Wrapper>
  );
}
