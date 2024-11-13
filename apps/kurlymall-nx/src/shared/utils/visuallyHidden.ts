import { css } from '@emotion/react';

export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  margin: -1px;
  clip: rect(0 0 0 0);
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal;
`;
