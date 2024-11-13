import { css } from '@emotion/react';

import COLOR from '../../../shared/constant/colorset';

export const contentsStyle = `
  @media (min-width: 720px) {
    .popup-content {
      padding: 40px 30px 24px;
      text-align: center;
      letter-spacing: -0.5px;
    }
    .popup-footer {
      justify-content: space-around;
      border-top: 1px solid ${COLOR.bgLightGray};
      > button {
        flex: 1 1 50%;
        margin: 0;
        font-weight: 500;
      }
    }
  }
`;

export const InputGroupStyle = css`
  div {
    position: relative;
  }
  > div:first-of-type {
    padding: 8px 0;
  }
  > div:nth-of-type(3) {
    padding: 0 0 12px;
  }
  input::placeholder,
  input::-webkit-input-placeholder,
  input::-moz-placeholder {
    color: ${COLOR.kurlyGray350};
  }
`;
