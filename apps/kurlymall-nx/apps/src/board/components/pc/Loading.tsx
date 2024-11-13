import styled from '@emotion/styled';

import Skeleton from 'react-loading-skeleton';

import Repeat from '../../../shared/components/Repeat';

const Row = styled.div`
  width: 100%;
  padding: 10px 0;
`;

interface Props {
  numberOfRows: number;
}

export default function Loading({ numberOfRows }: Props) {
  return (
    <Repeat count={numberOfRows}>
      <Row>
        <Skeleton height={30} />
      </Row>
    </Repeat>
  );
}
