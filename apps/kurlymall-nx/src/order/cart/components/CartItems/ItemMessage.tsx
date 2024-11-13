import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { memo } from 'react';

import { Typography } from '@thefarmersfront/kpds-react';

import TargetUserMessage from '../m/TargetUserMessage';
import { BuyableTarget } from '../../interface/CartProduct';
import { isNotEmpty } from '../../../../shared/utils/lodash-extends';
import { isNotNull } from '../../../../shared/utils/typeGuard';

const Wrapper = styled.div`
  margin-top: ${vars.spacing.$8};
`;

const SoldOutMessage = styled(Typography)`
  color: ${vars.color.text.$secondary};
`;

const ItemMessage = ({
  soldOutText = '',
  buyableTarget,
}: {
  soldOutText?: string;
  buyableTarget: BuyableTarget | null;
}) => {
  if (!soldOutText && !buyableTarget) {
    return null;
  }

  return (
    <Wrapper>
      {isNotEmpty(soldOutText) && <SoldOutMessage variant={`$largeRegular`}>{soldOutText}</SoldOutMessage>}
      {isNotNull(buyableTarget) && <TargetUserMessage buyableTarget={buyableTarget} />}
    </Wrapper>
  );
};

export default memo(ItemMessage);
