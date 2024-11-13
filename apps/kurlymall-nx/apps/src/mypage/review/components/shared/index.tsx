import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import LoadingSpinner from './LoadingSpinner';
import SpinnerOverlay from './SpinnerOverlay';

const CenterSpinner = styled.div`
  position: absolute;
  inset: 0;
  width: fit-content;
  height: fit-content;
  margin: auto;
`;

const ReviewImageWrapper = styled.div<{ isError: boolean }>`
  position: relative;
  border-radius: 6px;
  outline: ${({ isError }) => (isError ? `2px solid ${COLOR.invalidRed}` : 'none')};
  overflow: hidden;
`;

export { CenterSpinner, LoadingSpinner, ReviewImageWrapper, SpinnerOverlay };
