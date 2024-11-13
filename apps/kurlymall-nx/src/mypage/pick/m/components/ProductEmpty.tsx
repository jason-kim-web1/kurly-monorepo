import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button from '../../../../shared/components/Button/Button';
import Like from '../../../../shared/icons/Like';
import usePickButtonEvent from '../../hooks/usePickButtonEvent';
import EmptyTitle from '../../shared/components/EmptyTitle';
import EmptyError from '../../../../shared/icons/EmptyError';
import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div<{ isPC: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.5;
  color: ${COLOR.kurlyGray400};

  ${({ isPC }) =>
    isPC
      ? css`
          width: 100%;
          height: 700px;
        `
      : css`
          position: absolute;
          top: 44px;
          left: 0;
          width: 100%;
          height: calc(100% - 44px);
        `}

  > svg {
    margin-bottom: 18px;
  }
  button {
    margin-top: 8px;
  }
  button > span {
    font-size: 16px;
    line-height: 44px;
  }
`;

const LikeIcon = styled.div`
  width: 68px;
  margin: 0 auto 8px;
`;

interface Props {
  isError?: boolean;
  isPC?: boolean;
}

export default function ProductEmpty({ isError, isPC = true }: Props) {
  const { handleClickEmptyButton } = usePickButtonEvent();

  return (
    <Wrapper isPC={isPC}>
      {isError ? (
        <>
          <EmptyError />
          일시적인 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </>
      ) : (
        <>
          <LikeIcon>
            <Like />
          </LikeIcon>
          <EmptyTitle />
          <Button text="베스트 상품 보기" width={146} height={44} radius={22} onClick={handleClickEmptyButton} />
        </>
      )}
    </Wrapper>
  );
}
