import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';

import SlideToggleWrapper from '../../../shared/components/motion/SlideToggleWrapper';
import { multiLineEllipsisStyle } from '../utils/multiLineEllipsisStyle';

const Button = styled.button`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: ${vars.spacing.$20} ${vars.spacing.$4} ${vars.spacing.$12};
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Typography)`
  color: ${vars.color.text.$primary};
  ${multiLineEllipsisStyle(1)};
`;

const ArrowWrapper = styled.div<{ isOpen?: boolean }>`
  display: flex;
  ${({ isOpen }) =>
    isOpen &&
    css`
      rotate: -180deg;
    `}
`;

/**TODO_ORDER 아이콘 추후 이관 필요 */
const ArrowDown = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0001 14.2178L17.256 6.96185L16.0775 5.78334L10.0001 11.8608L3.92265 5.78334L2.74414 6.96185L10.0001 14.2178Z"
        fill="#222222"
      />
    </svg>
  );
};

interface Props {
  title: string | ReactNode;
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
}

const Accordion = ({ title, isOpen, onClick, children }: Props) => {
  return (
    <>
      <Button onClick={onClick}>
        <Title variant="$xxxlargeSemibold">{title}</Title>
        <ArrowWrapper isOpen={isOpen}>
          <ArrowDown />
        </ArrowWrapper>
      </Button>
      <SlideToggleWrapper opened={isOpen}>{children}</SlideToggleWrapper>
    </>
  );
};

export default Accordion;
