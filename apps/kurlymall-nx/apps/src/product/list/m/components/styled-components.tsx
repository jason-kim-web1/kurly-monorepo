import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import ExclamationMark from '../../../../shared/icons/ExclamationMark';
import { emptyResultText } from '../../../../search/shared/constants';
import type { StrictPropsWithChildren } from '../../../../shared/types';

const Container = styled.div<{ isAccessible?: boolean }>`
  margin: 0 auto;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin-top: -10px;
`;

const EmptyProduct = styled.div`
  margin-top: 18px;
  white-space: pre-wrap;
  font-size: 16px;
  color: ${COLOR.kurlyGray400};
  line-height: 21px;
  text-align: center;
`;

export const ListContainer = ({ children }: StrictPropsWithChildren) => {
  return <Container id="container">{children}</Container>;
};

export const Error = () => {
  return (
    <ErrorWrapper>
      <ExclamationMark width={48} height={48} />
      <EmptyProduct>{emptyResultText.default}</EmptyProduct>
    </ErrorWrapper>
  );
};
