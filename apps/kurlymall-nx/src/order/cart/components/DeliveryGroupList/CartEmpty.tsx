import styled from '@emotion/styled';
import { Icon, Typography } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';

import { css } from '@emotion/react';

import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  pointer-events: none;

  ${isPC
    ? css`
        margin-top: ${vars.spacing.$160};
      `
    : css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `}
`;

const Description = styled(Typography)`
  margin-top: ${vars.spacing.$16};
  color: ${vars.color.text.$primary};
`;

export default function CartEmpty() {
  return (
    <Wrapper>
      <Icon type="ErrorCircle" size={64} ratio="1:1" fill={vars.color.background.$background5} />
      <Description variant={`$xxlargeSemibold`}>장바구니에 담긴 상품이 없습니다</Description>
    </Wrapper>
  );
}
