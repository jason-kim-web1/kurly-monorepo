import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';

import { GiftIconGrayImg } from '../../../../../shared/images';
import { isPC } from '../../../../../../util/window/getDevice';
import { ORDER_FILTER_HEADER } from '../../../../../order/order-list/constants/order-list';

const Wrapper = styled.div<{ isPC: boolean }>`
  ${(props) =>
    props.isPC
      ? css`
          height: 700px;
        `
      : css`
          position: absolute;
          height: calc(100% - ${44 + ORDER_FILTER_HEADER}px);
          top: ${44 + ORDER_FILTER_HEADER}px;
          left: 0;
        `}

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.strong<{ imgUrl: string }>`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: normal;
  color: ${COLOR.kurlyGray400};
  &:before {
    display: block;
    width: 68px;
    height: 68px;
    margin: 0 auto 8px;
    background: url(${(props) => props.imgUrl}) 0 0 no-repeat;
    content: '';
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: ${COLOR.kurlyGray400};
  text-align: center;
`;

export default function Empty() {
  return (
    <Wrapper isPC={isPC}>
      <Title imgUrl={GiftIconGrayImg}>선물 내역이 없습니다.</Title>
      <Description>선물하기 서비스는 컬리 앱에서 이용할 수 있습니다.</Description>
    </Wrapper>
  );
}
