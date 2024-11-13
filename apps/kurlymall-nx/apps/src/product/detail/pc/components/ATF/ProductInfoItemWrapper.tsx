import { ReactNode } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import type { ProductInfoItemTitleType } from '../../../types';

const Wrapper = styled.li`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
  padding: 17px 0 18px;
  border-top: 1px solid ${COLOR.bg};
  font-size: 14px;
  letter-spacing: -0.5px;
`;

const ProductInfoItemTitle = styled.dt<{ titleLineHeight: number }>`
  width: 128px;
  height: 100%;
  color: ${COLOR.kurlyGray600};
  font-weight: 400;
  line-height: ${({ titleLineHeight }) => titleLineHeight}px;
`;

const ProductInfoItemValueWrapper = styled.dd`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

interface Props {
  title: ProductInfoItemTitleType | string;
  titleLineHeight?: number;
  children: ReactNode;
}

export default function ProductInfoItemWrapper({ title, titleLineHeight = 19, children }: Props) {
  return (
    <Wrapper>
      <ProductInfoItemTitle titleLineHeight={titleLineHeight}>{title}</ProductInfoItemTitle>
      <ProductInfoItemValueWrapper>{children}</ProductInfoItemValueWrapper>
    </Wrapper>
  );
}
