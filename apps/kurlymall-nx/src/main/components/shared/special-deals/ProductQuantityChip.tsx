import styled from '@emotion/styled';

import { isUndefined } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';
import { addComma } from '../../../../shared/services';

const Container = styled.div`
  height: 20px;
  padding: 4px 6px 3px;
  color: ${COLOR.mainSecondary};
  font-size: 10px;
  font-weight: 500;
  border-radius: 4px;
  background-color: ${COLOR.mykurlyBg};
`;

interface Props {
  quantity?: number;
  className?: string;
}

export default function ProductQuantityChip({ quantity, className }: Props) {
  if (isUndefined(quantity) || quantity === 0) {
    return null;
  }

  return (
    <Container className={`quantity ${className}`}>
      <span>{`${addComma(quantity)}개 남음`}</span>
    </Container>
  );
}
