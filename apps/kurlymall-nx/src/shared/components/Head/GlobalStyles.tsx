import { css, Global } from '@emotion/react';

import { isPC } from '../../../../util/window/getDevice';

const pcStyle = css`
  html,
  button,
  input,
  select,
  textarea {
    font-family: 'Noto Sans KR', 'malgun gothic', 'AppleGothic', 'dotum', sans-serif;
  }
`;

const mobileStyle = css`
  html,
  button,
  input,
  select,
  textarea {
    font-family: -apple-system, 'BlinkMacSystemFont', 'AppleSDGothicNeo', 'Apple SD Gothic Neo', 'Helvetica',
      'Noto Sans KR', 'malgun gothic', '맑은 고딕', sans-serif;
  }
  html {
    /*
      모바일 디바이스에서 반응형 rem 을 사용하기 위한 media query.
      디자인 시안인 375 미만 view width 에 대해서 root-font-size 를 상대적인 vw 값으로 설정한다.
    */
    @media screen and (max-width: 374px) {
      font-size: 4.26667vw;
    }
  }
`;

export default function GlobalStyles() {
  if (isPC) {
    return <Global styles={pcStyle} />;
  }

  return <Global styles={mobileStyle} />;
}
