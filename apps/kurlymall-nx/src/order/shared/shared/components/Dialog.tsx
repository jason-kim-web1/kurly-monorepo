import styled from '@emotion/styled';

import { ReactNode, useEffect, useMemo } from 'react';

import { css, SerializedStyles } from '@emotion/react';

import { zIndex } from '../../../../shared/styles';
import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';

const CommonStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: ${zIndex.dialog};
`;

const Dimmed = styled(CommonStyle)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Wrapper = styled(CommonStyle)`
  top: 24px;
  left: 24px;
  right: 24px;
  bottom: 24px;
  pointer-events: none;
`;

const InnerWrapper = styled.div<{ maxWidth: string }>`
  position: relative;
  background: ${COLOR.kurlyWhite};
  border-radius: 12px;
  overflow: hidden;
  max-width: ${({ maxWidth }) => maxWidth};
  pointer-events: visible;
`;

const Contents = styled.div<{ hasActions: boolean }>`
  padding: ${isPC ? '30px' : '30px 24px'};
  ${({ hasActions }) =>
    hasActions &&
    css`
      padding-bottom: 0;
    `}
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
  color: ${COLOR.kurlyGray800};
  padding-bottom: 10px;
  ${isPC &&
  css`
    padding-bottom: 24px;
    font-size: 20px;
    letter-spacing: -0.5px;
  `}
`;

interface Props {
  isOpen: boolean;
  maxWidth?: string;
  title?: string;
  contents?: ReactNode;
  actions?: ReactNode;
  handleDimmedClick?: () => void;
  styles?: SerializedStyles;
}

export default function Dialog({
  isOpen,
  maxWidth = 'none',
  title,
  contents,
  actions,
  handleDimmedClick,
  styles,
}: Props) {
  useEffect(() => {
    if (!isPC) {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }
  }, [isOpen]);

  const hasAction = useMemo(() => !!actions, [actions]);

  return (
    <>
      {isOpen && (
        <>
          <Dimmed onClick={handleDimmedClick} />
          <Wrapper>
            <InnerWrapper maxWidth={maxWidth} css={styles}>
              <Contents hasActions={hasAction}>
                {title && <Title>{title}</Title>}
                {contents}
              </Contents>
              {actions}
            </InnerWrapper>
          </Wrapper>
        </>
      )}
    </>
  );
}
