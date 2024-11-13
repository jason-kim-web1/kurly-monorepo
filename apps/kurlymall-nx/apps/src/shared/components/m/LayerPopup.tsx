import styled from '@emotion/styled';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import COLOR from '../../constant/colorset';
import CloseButton from '../Button/CloseButton';
import { zIndex } from '../../styles';
import { useWebview } from '../../hooks';

const Wrapper = styled.div<{ isOpen: boolean }>`
  background: ${COLOR.kurlyWhite};
  position: fixed;
  top: ${({ isOpen }) => (isOpen ? 0 : 100)}%;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
  height: 100vh;
  z-index: ${zIndex.layerPopup};
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background: ${COLOR.kurlyWhite};
`;

const Title = styled.p`
  line-height: 44px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const Close = styled.div`
  position: absolute;
  left: 5px;
  top: 0;
`;

const Content = styled.div<{ innerHeight: number }>`
  width: 100%;
  height: ${({ innerHeight }) => `calc(${innerHeight}px - 44px)`};
  border: 0;
  overflow-y: scroll;
`;

interface LayerPopupProps {
  isOpen: boolean;
  onClosePopup: () => void;
  headerTitle: string;
  children: ReactNode;
}

/**
 * 모바일 웹에서만 사용하는 레이어팝업입니다.
 *
 * @description
 * 레이어팝업이 열린 상태로 브라우저 뒤로가기를 했을 때, 레이어팝업을 열었던 페이지가 유지 됩니다.
 *
 * @param isOpen 레이어팝업 열림 상태
 * @param onClosePopup 레이어팝업 닫는 함수
 * @param headerTitle 레이어팝업 헤더 타이틀
 * @param children 레이어팝업 내부 컴포넌트
 *
 */
export default function LayerPopup({ isOpen, onClosePopup, headerTitle, children }: LayerPopupProps) {
  const webview = useWebview();
  const { beforePopState, back } = useRouter();

  const handleCloseButton = () => {
    onClosePopup();
    back();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.style.overflow = 'hidden';

    window.history.pushState('', '');
    window.addEventListener('popstate', onClosePopup);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('popstate', onClosePopup);
    };
  }, [isOpen, beforePopState, onClosePopup]);

  // 모웹인 경우에만 LayerPopup 렌더링
  if (webview) return null;

  return (
    <Wrapper isOpen={isOpen}>
      <Header>
        <Close>
          <CloseButton onClick={handleCloseButton} />
        </Close>
        <Title>{headerTitle}</Title>
      </Header>
      {isOpen && <Content innerHeight={window.innerHeight}>{children}</Content>}
    </Wrapper>
  );
}
