import styled from '@emotion/styled';

import { times } from 'lodash';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import COLOR from '../../../../shared/constant/colorset';

const Tr = styled.tr`
  height: 60px;
  border-bottom: 1px solid ${COLOR.bg};
  td {
    padding: 0 20px;
  }
`;

interface Props {
  count: number;
}

export default function BoardTableBodyLoading({ count }: Props) {
  return (
    <tbody>
      <SkeletonTheme baseColor="#eee" height={22} borderRadius={2}>
        {times(count, (num) => (
          <Tr key={`item-loading-${num}`}>
            <td>
              <Skeleton />
            </td>
            <td>
              <Skeleton />
            </td>
            <td>
              <Skeleton />
            </td>
            <td>
              <Skeleton />
            </td>
          </Tr>
        ))}
      </SkeletonTheme>
    </tbody>
  );
}
