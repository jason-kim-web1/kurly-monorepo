import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';

import { useWebview } from '../../../../shared/hooks';

import EmptyError from '../../../../shared/icons/EmptyError';
import { USER_MENU_HEIGHT } from '../constants/favorite.constant';

const Container = styled.div<{ webview: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${isPC
    ? css`
        height: 700px;
      `
    : css`
        position: absolute;
        left: 0;
      `}

  top: ${({ webview }) => (webview ? 0 : USER_MENU_HEIGHT)}px;
  bottom: ${({ webview }) => (webview ? 0 : USER_MENU_HEIGHT)}px;
  width: 100%;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: ${COLOR.kurlyGray400};
`;

const Icon = css`
  margin-bottom: 18px;
`;

export default function Error() {
  const webview = useWebview();

  // 띠배너 없는 기준으로 안내 문구를 가운데 정렬합니다. (https://kurly0521.atlassian.net/browse/KQA-15438)
  return (
    <Container webview={webview}>
      <EmptyError css={Icon} />
      일시적인 오류가 발생했습니다.
      <br />
      잠시 후 다시 시도해주세요.
    </Container>
  );
}
