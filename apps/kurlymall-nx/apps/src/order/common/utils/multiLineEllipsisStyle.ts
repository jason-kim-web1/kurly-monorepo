import { css } from '@emotion/react';

export const multiLineEllipsisStyle = (line = 2) => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${line};
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;

  @supports (-moz-box-orient: vertical) {
    display: -moz-box;
    -moz-box-orient: vertical;
    -moz-line-clamp: ${line};
  }
  @supports (-ms-box-orient: vertical) {
    display: -ms-box;
    -ms-box-orient: vertical;
    -ms-line-clamp: ${line};
  }
`;
