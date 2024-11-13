import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import Reset from '../../../../shared/icons/Reset';
import ExclamationMark from '../../../../shared/icons/ExclamationMark';
import { isPC } from '../../../../../util/window/getDevice';

const Wrap = styled.div`
  position: ${isPC ? 'absolute' : 'fixed'};
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  margin: auto;
`;

const MainMessage = styled.p`
  margin: 18px 0 24px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: ${COLOR.kurlyGray400};
`;

const RetryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  height: 44px;
  padding: 12px 20px;
  border-radius: 22px;
  background-color: ${COLOR.kurlyPurple};
  > span {
    padding-bottom: 2px;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: ${COLOR.kurlyWhite};
  }
`;

interface Props {
  onRetry(): void;
}

export const Error = ({ onRetry }: Props) => {
  return (
    <Wrap>
      <ExclamationMark />
      <MainMessage>상품 목록을 불러올 수 없습니다.</MainMessage>
      <RetryButton type="button" onClick={onRetry}>
        <Reset stroke={COLOR.kurlyWhite} />
        <span>새로고침</span>
      </RetryButton>
    </Wrap>
  );
};
