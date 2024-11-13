import { ReactNode, RefObject, useEffect, useRef } from 'react';

import { isUndefined } from 'lodash';
import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { zIndex } from '../../../../shared/styles';
import { isPC } from '../../../../../util/window/getDevice';

import TooltipCloseIcon from '../../../../shared/components/icons/TooltipCloseIcon';
import { Tooltip as TooltipProps } from '../interfaces/Tooltip.interface';

const Wrapper = styled.div<{
  visible: boolean;
  top: number;
  right?: number;
  left?: number;
  width?: number;
  height?: number;
  arrowLeft?: number;
  arrowRight?: number;
}>`
  display: flex;
  position: absolute;
  top: ${({ top }) => top && `${top}px`};
  left: ${({ left }) => left && `${left}px`};
  right: ${({ right }) => right && `${right}px`};
  min-width: ${({ width }) => width}px;
  min-height: ${({ height }) => height}px;

  z-index: ${zIndex.notAvailablePurchaseTooltip};
  padding: ${isPC ? 14 : 12}px;
  border-radius: 6px;
  font-size: ${isPC ? 12 : 14}px;
  line-height: 17px;
  background-color: ${COLOR.toolTip};
  color: ${COLOR.kurlyWhite};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: -9px;
    left: ${({ arrowLeft }) => arrowLeft && `${arrowLeft}px`};
    right: ${({ arrowRight }) => arrowRight && `${arrowRight}px`};
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 10px solid ${COLOR.toolTip};

    ${isPC
      ? `
        width: 12px;
        height: 6px;
        border-left-width: 8px;
        border-right-width: 8px;
      `
      : `
        width: 15px;
        height: 10px;
      `}
  }
`;

const Content = styled.div`
  flex: 1;
`;

const CloseButton = styled.button`
  width: 16px;
  height: 16px;
`;

interface Props extends TooltipProps {
  visible: boolean;
  children: ReactNode;
  initialY?: number;
  labelRef: RefObject<HTMLDivElement>;
  onClose: () => void;
}

export default function Tooltip({
  children,
  visible,
  top,
  right,
  left,
  width,
  height,
  arrowRight,
  arrowLeft,
  initialY,
  labelRef,
  onClose,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const SCROLL_CLOSE_RANGE = 100;

  const handleClick = (e: Event) => {
    if (!contentRef.current || !labelRef.current) {
      return;
    }

    const isTooltipClicked = contentRef.current.contains(e.target as Node);
    const isLabelClicked = labelRef.current.contains(e.target as Node);

    if (!isTooltipClicked && !isLabelClicked) {
      onClose();
    }
  };

  const handleScroll = () => {
    if (isUndefined(initialY)) {
      return;
    }

    if (Math.abs(initialY - window.scrollY) > SCROLL_CLOSE_RANGE) {
      onClose();
    }
  };

  useEffect(() => {
    if (!visible) {
      return;
    }
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visible]);

  return (
    <Wrapper
      visible={visible}
      top={top}
      right={right}
      left={left}
      width={width}
      height={height}
      arrowRight={arrowRight}
      arrowLeft={arrowLeft}
      ref={contentRef}
    >
      <Content>{children}</Content>
      <CloseButton onClick={onClose}>
        <TooltipCloseIcon />
      </CloseButton>
    </Wrapper>
  );
}
