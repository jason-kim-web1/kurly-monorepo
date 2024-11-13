import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import ExclamationMark from '../../../../shared/icons/ExclamationMark';
import { emptyResultText } from '../../../../search/shared/constants';
import type { StrictPropsWithChildren } from '../../../../shared/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1050px;
  margin: 0 auto;
`;

const EmptyProduct = styled.div`
  font-size: 16px;
  color: ${COLOR.kurlyGray400};
  margin-top: 17px;
`;

export const ListContainer = ({ children }: StrictPropsWithChildren) => {
  return <Container id="container">{children}</Container>;
};

export const Error = () => {
  return (
    <>
      <ExclamationMark width={48} height={48} />
      <EmptyProduct>{emptyResultText.default}</EmptyProduct>
    </>
  );
};
