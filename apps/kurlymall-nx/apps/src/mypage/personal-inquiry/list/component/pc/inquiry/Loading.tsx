import styled from '@emotion/styled';

import Skeleton from 'react-loading-skeleton';

const Tr = styled.tr`
  td {
    padding: 0 5px;
    &:first-of-type {
      padding: 20px 15px 20px 20px;
    }
  }
`;

const Td = styled.td`
  span > span {
    height: 22px;
    border-radius: 2px;
    animation-duration: 2s;
    color: transparent;
  }
`;

export default function Loading() {
  return (
    <>
      {Array(10)
        .fill({})
        .map(() => (
          <Tr key={Math.random()}>
            <Td>
              <Skeleton />
            </Td>
            <Td>
              <Skeleton />
            </Td>
            <Td>
              <Skeleton />
            </Td>
          </Tr>
        ))}
    </>
  );
}
