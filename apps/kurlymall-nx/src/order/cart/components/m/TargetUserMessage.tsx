import { isEmpty } from 'lodash';
import { Typography } from '@thefarmersfront/kpds-react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { BuyableTarget } from '../../interface/CartProduct';

const Wrapper = styled(Typography)<{ color: string }>`
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`;

export default function TargetUserMessage({
  buyableTarget: {
    text,
    basicStyle: { color, bold },
  },
}: {
  buyableTarget: BuyableTarget;
}) {
  if (isEmpty(text)) {
    return null;
  }

  return (
    <Wrapper variant={bold ? `$largeBold` : `$largeRegular`} color={color}>
      {text}
    </Wrapper>
  );
}
