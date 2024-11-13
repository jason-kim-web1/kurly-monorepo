import styled from '@emotion/styled';

import Progress from '../../../../shared/icons/kpds/progress';

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function CartLoading() {
  return (
    <Loading>
      <Progress />
    </Loading>
  );
}
