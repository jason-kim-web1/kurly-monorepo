import { useRef, useEffect, ReactNode, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';

import { zIndex } from '../../styles';

export const BOTTOM_SHEET_AREA_HEIGHT = {
  TOTAL: '560px',
  HANDLE: '30px',
  TITLE: '56px',
};

const DrawerContainer = styled.div<{ translateY: number; shouldTransition: boolean }>`
  position: fixed;
  max-height: ${BOTTOM_SHEET_AREA_HEIGHT.TOTAL};
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top-left-radius: ${vars.radius.$24};
  border-top-right-radius: ${vars.radius.$24};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transform: ${({ translateY }) => `translateY(${translateY}px)`};
  transition: ${({ shouldTransition }) => (shouldTransition ? 'transform 0.3s ease-in-out' : 'none')};
  overflow: hidden;
  z-index: ${zIndex.bottomSheet};
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  z-index: ${zIndex.bottomSheetOverlay};
`;

const Title = styled(Typography)`
  margin: ${vars.spacing.$12} ${vars.spacing.$16};
  color: ${vars.color.main.$secondary};
`;

const HandleWrapper = styled.div`
  display: flex;
  width: 100%;
  height: ${BOTTOM_SHEET_AREA_HEIGHT.HANDLE};
`;

const Handle = styled.div`
  width: 40px;
  height: 6px;
  background: ${vars.color.background.$background5};
  border-radius: 3px;
  margin: auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ScrollableWrapper = styled.div<{ hasTitle: boolean; hasFixedBottomContent: boolean; maxHeight: string }>`
  display: flex;
  flex-direction: column;
  max-height: ${({ hasTitle, hasFixedBottomContent, maxHeight }) =>
    hasFixedBottomContent
      ? maxHeight
      : hasTitle
      ? `calc(${BOTTOM_SHEET_AREA_HEIGHT.TOTAL} - ${BOTTOM_SHEET_AREA_HEIGHT.HANDLE} - ${BOTTOM_SHEET_AREA_HEIGHT.TITLE})`
      : `calc(${BOTTOM_SHEET_AREA_HEIGHT.TOTAL} - ${BOTTOM_SHEET_AREA_HEIGHT.HANDLE})`};
  padding: ${({ hasFixedBottomContent }) =>
    hasFixedBottomContent ? `0 ${vars.spacing.$16}` : `0 ${vars.spacing.$16} ${vars.spacing.$16}`};
`;

const ScrollableArea = styled.div`
  overflow-y: auto;
  overscroll-behavior: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const FixedContentWrapper = styled.div``;

interface ComponentProps {
  title?: string;
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
  fixedBottomContent?: ReactNode;
  maxHeight?: string;
}

const FullTypeBottomSheetComponent = ({
  isOpen,
  close,
  title,
  children,
  fixedBottomContent,
  maxHeight = '323px',
}: ComponentProps) => {
  // 전체 바텀시트 영역 ref
  const ref = useRef<HTMLDivElement>(null);
  // ScrollableArea의 ref
  const scrollableAreaRef = useRef<HTMLDivElement>(null);
  // 터치 이벤트가 시작된 y 값
  const touchStartY = useRef(0);
  // 터치 이벤트가 시작됐을때 ScrollableArea의 스크롤 위치
  const scrollTopAtTouchStart = useRef(0);
  // 전체 모달이 이동될 높이 값
  const [translateY, setTranslateY] = useState(isOpen ? 0 : 1000);
  //매끈한 스타일을 위해 transition을 열고, 닫을때만 스타일을 적용하기 위해 사용하는 상태 값
  const [shouldTransition, setShouldTransition] = useState(false);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      // 터치이벤트가 시작되었을 때 터치 영역 y값을 저장
      touchStartY.current = e.touches[0].clientY;
      // 터치 이벤트가 시작되었을 때 ScrollableArea의 scrollTop 값 저장
      scrollTopAtTouchStart.current = scrollableAreaRef.current?.scrollTop || 0;
      // 터치 이벤트시에는 transition 제거
      setShouldTransition(false);
    },
    [touchStartY, scrollTopAtTouchStart, setShouldTransition],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diffY = currentY - touchStartY.current;
      const touchedElement = e.target as HTMLElement;

      const isInsideScrollableArea = scrollableAreaRef.current?.contains(touchedElement);
      const isTouchingDown = diffY > 0;
      const isAtTopOfScroll = scrollTopAtTouchStart.current === 0;

      if (isTouchingDown) {
        if ((isInsideScrollableArea && isAtTopOfScroll) || !isInsideScrollableArea) {
          // 터치 영역이 ScrollableArea가 아니거나, ScrollableArea이면서 스크롤이 맨위에 위치해 있을때 바텀시트 아래로 이동 처리
          // 스크롤 끝(맨위)에서 터치 다운을 하면 기본 스크롤 동작이 되지 않도록 막고 닥 페이지 스크롤 움직이지 않도록 처리
          e.preventDefault();
          setTranslateY(diffY);
        }
      }
    },
    [touchStartY, scrollableAreaRef, scrollTopAtTouchStart],
  );

  const handleTouchEnd = useCallback(() => {
    // 터치길이가 100보다 큰 경우
    if (translateY >= 100) {
      // 모달 닫기를 위해 transition true로 변경 후
      setShouldTransition(true);
      // 닫기 처리
      close();
    } else {
      // 100보다 작은 경우 다시 원래 위치로 돌아감
      setTranslateY(0);
    }
  }, [translateY, close]);

  useEffect(() => {
    const currentRef = ref.current;

    if (!currentRef) return;

    currentRef.addEventListener('touchstart', handleTouchStart);
    currentRef.addEventListener('touchmove', handleTouchMove, { passive: false }); // e.preventDefault 사용을 위해 명시적으로 false처리
    currentRef.addEventListener('touchend', handleTouchEnd);

    return () => {
      currentRef.removeEventListener('touchstart', handleTouchStart);
      currentRef.removeEventListener('touchmove', handleTouchMove);
      currentRef.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  useEffect(() => {
    if (isOpen) {
      setShouldTransition(true);
      setTranslateY(0);
      // 바텀시트가 열린 경우 바닥 페이지 스크롤 불가하도록 처리
      document.body.style.overflow = 'hidden';
    } else {
      setShouldTransition(true);
      setTranslateY(1000);
      // 바텀시트 닫힌 경우 바닥 페이지 스크롤 가능 처리
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <Overlay isOpen={isOpen} onClick={close} />
      <DrawerContainer ref={ref} translateY={translateY} shouldTransition={shouldTransition}>
        <HandleWrapper>
          <Handle />
        </HandleWrapper>
        <ContentWrapper>
          {title && <Title variant="$xxxlargeSemibold">{title}</Title>}
          <ScrollableWrapper hasTitle={!!title} hasFixedBottomContent={!!fixedBottomContent} maxHeight={maxHeight}>
            <ScrollableArea ref={scrollableAreaRef}>{children}</ScrollableArea>
          </ScrollableWrapper>
          {fixedBottomContent && <FixedContentWrapper>{fixedBottomContent}</FixedContentWrapper>}
        </ContentWrapper>
      </DrawerContainer>
    </>
  );
};

export default FullTypeBottomSheetComponent;
