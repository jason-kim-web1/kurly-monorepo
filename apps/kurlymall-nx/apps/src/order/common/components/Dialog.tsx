import { ReactNode, useEffect } from 'react';
import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { zIndex } from '../../../shared/styles';

const Overlay = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  z-index: ${zIndex.dialog};
`;

const Background = styled.div<{ borderRadius: string; maxHeight?: string }>`
  display: inline-block;
  background: white;
  border-radius: ${({ borderRadius }) => borderRadius};
  max-height: ${({ maxHeight }) => maxHeight};
  overflow: hidden;
`;

interface Props {
  isOpen: boolean;
  children: ReactNode;
  maxHeight?: string;
  title?: string;
  hasCloseButton?: boolean;
  borderRadius?: string;
}

const Dialog = ({ isOpen, children, maxHeight, borderRadius = vars.radius.$24 }: Props) => {
  useEffect(() => {
    if (isOpen) {
      // 모달이 열린 경우 바닥 페이지 스크롤 불가하도록 처리
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힌 경우 바닥 페이지 스크롤 가능 처리
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <Overlay isOpen={isOpen}>
      <Background borderRadius={borderRadius} maxHeight={maxHeight}>
        {children}
      </Background>
    </Overlay>
  );
};

export default Dialog;
