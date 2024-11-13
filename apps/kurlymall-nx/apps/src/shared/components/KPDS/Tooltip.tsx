import { CSSProperties, ReactNode } from 'react';
import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { css } from '@emotion/react';

import { Icon } from '@thefarmersfront/kpds-react';

import useToggle from '../../../order/checkout/shared/hooks/useToggle';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TooltipIconButton = styled.button`
  width: ${vars.spacing.$16};
  height: ${vars.spacing.$16};
`;

const Contents = styled.div<{ isHidden: boolean; isPC: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  right: 0;
  width: ${({ isPC }) => (isPC ? '400px' : 'calc(100vw - 32px)')};
  transform: translateX(-50%);
  margin-top: ${vars.spacing.$8};
  transition: opacity 0.3s;
  opacity: 1;
  border-radius: ${vars.spacing.$10};
  border: 1px solid ${vars.color.main.$secondary};
  background-color: ${vars.color.background.$background1};
  padding: ${vars.spacing.$16} ${vars.spacing.$40} ${vars.spacing.$16} ${vars.spacing.$16};

  ${({ isHidden }) =>
    isHidden &&
    css`
      opacity: 0;
      pointer-events: none;
    `};
`;

const CloseButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${vars.spacing.$4};
  right: ${vars.spacing.$4};
  width: ${vars.spacing.$40};
  height: ${vars.spacing.$40};
`;

/**
 * @param children 툴팁 내용
 */

interface Props {
  children: ReactNode;
  isPC?: boolean;
  customStyle?: CSSProperties;
}

export default function Tooltip({ children, isPC = false, customStyle }: Props) {
  const { isOpen, open, close } = useToggle();

  const handleTooltip = () => {
    if (isOpen) {
      close();
      return;
    }

    open();
  };

  return (
    <Wrapper>
      <TooltipIconButton onClick={handleTooltip}>
        <Icon type="QuestionCircle" size={16} ratio="1:1" fill={vars.color.$gray300} />
      </TooltipIconButton>
      <Contents isHidden={!isOpen} isPC={isPC} style={customStyle}>
        <CloseButton onClick={close}>
          <Icon type="Close" size={20} ratio="1:1" />
        </CloseButton>
        {children}
      </Contents>
    </Wrapper>
  );
}
