import styled from '@emotion/styled';

import { zIndex } from '../../../../shared/styles';

export default styled.div`
  position: fixed;
  z-index: ${zIndex.productMaximum};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
