import { eq } from 'lodash';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import NextImage from '../../../../../shared/components/NextImage';
import { productImageCSS } from '../styled-components';
import COLOR from '../../../../../shared/constant/colorset';
import { IconCircularDimmedClose } from '../../../../../shared/images';

const Wrap = styled.div`
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background-color: ${COLOR.bg};
`;

const Button = styled.button`
  position: absolute;
  top: 8%;
  right: 8%;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: url(${IconCircularDimmedClose}) no-repeat 0 0;
`;

export const LAYOUT_TYPE = {
  FIXED: 'FIXED',
  PERCENTAGE: 'PERCENTAGE',
} as const;

type LayoutType = keyof typeof LAYOUT_TYPE;

const getStyle = (layoutType: LayoutType) => {
  if (eq(layoutType, LAYOUT_TYPE.PERCENTAGE)) {
    return css`
      width: 100%;
      padding-bottom: 100%;
    `;
  }
  return css`
    width: 72px;
    padding-bottom: 72px;
  `;
};

interface Props {
  layoutType: LayoutType;
  src: string;
  onDismiss(): void;
}

// TODO: 'AspectRatio' 공통 컴포넌트 구성
export const PreviewImage = ({ layoutType, src, onDismiss }: Props) => {
  return (
    <Wrap css={getStyle(layoutType)}>
      <NextImage src={src} layout="fill" css={productImageCSS} />
      <Button type="button" onClick={onDismiss} />
    </Wrap>
  );
};
