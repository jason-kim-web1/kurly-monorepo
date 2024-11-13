import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isUndefined } from 'lodash';

import ArrowDown from '../../../../../shared/icons/ArrowDown';
import COLOR from '../../../../../shared/constant/colorset';
import RawHTML from '../../../../../shared/components/layouts/RawHTML';
import { useReceiverDetailTerms } from '../../hooks/useReceiverDetailTerms';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid ${COLOR.bg};
  align-items: flex-start;
`;

const Title = styled.p`
  font-weight: 600;
`;

const ToggleButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  margin-left: 8px;
  align-items: center;
  word-break: keep-all;
  color: ${COLOR.kurlyGray450};

  ${({ isOpen }) =>
    isOpen &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `}
`;

export const ReceiverDetailTerms = () => {
  const { isOpen, terms, handleClickToggleButton } = useReceiverDetailTerms();

  if (isUndefined(terms)) return null;

  return (
    <>
      <Wrapper>
        <Title>[필수] 공동현관비밀번호 수집 및 이용 동의</Title>
        <ToggleButton isOpen={isOpen} onClick={handleClickToggleButton}>
          {isOpen ? '접기' : '더보기'}
          <ArrowDown />
        </ToggleButton>
      </Wrapper>
      {isOpen && <RawHTML html={terms} />}
    </>
  );
};
