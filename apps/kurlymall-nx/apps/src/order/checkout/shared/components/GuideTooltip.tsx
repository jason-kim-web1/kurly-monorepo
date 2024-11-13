import { ReactNode, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import useToggle from '../hooks/useToggle';
import QuestionIcon from '../../../../shared/components/icons/QuestionIcon';
import COLOR from '../../../../shared/constant/colorset';
import { Close } from '../../../../shared/icons';
import { zIndex } from '../../../../shared/styles';
import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${COLOR.kurlyGray450};
  ${() =>
    isPC
      ? css`
          font-weight: 600;
          line-height: 20px;
        `
      : css`
          font-weight: 500;
          line-height: 19px;
          letter-spacing: -0.5px;
        `}
`;

const Tooltip = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0;
  background-color: ${COLOR.kurlyWhite};
  border: 1px solid ${COLOR.kurlyGray800};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: ${COLOR.kurlyGray600};
  white-space: nowrap;
  margin-top: 11px;
  z-index: ${zIndex.checkoutGuideTooltip};

  ${({ isOpen }) =>
    isOpen
      ? css`
          visibility: visible;
          opacity: 1;
          transition: all 0.3s ease;
        `
      : css`
          visibility: hidden;
          opacity: 0;
          transition: all 0.3s ease;
        `}

  ${() =>
    isPC
      ? css`
          border-radius: 3px;
          padding: 14px;
          margin-top: 11px;
        `
      : css`
          display: flex;
          border-radius: 4px;
          padding: 12px;
          line-height: 16px;
          color: ${COLOR.kurlyGray450};
          margin-top: 4px;
          > svg {
            margin-left: 10px;
          }
        `}
`;

interface Props {
  title: string;
  content: ReactNode;
}

const VIEWPORT_TOP = 60;

const GuideTooltip = ({ title, content }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, close, toggle } = useToggle();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggle();
  };

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      // 툴팁 바깥 영역 클릭 시 닫힘 처리
      if (isOpen && target && !ref.current?.contains(target as HTMLDivElement)) {
        close();
      }
    };

    const handleScroll = () => {
      if (!ref.current) {
        return;
      }

      //스크롤시 툴팁이 뷰포트 top과 가까워지면 닫힘 처리
      if (ref.current.getBoundingClientRect().y < VIEWPORT_TOP) {
        close();
      }
    };

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, close, isOpen]);

  return (
    <Wrapper>
      <Title onClick={handleClick}>
        <span>{title}</span>
        <QuestionIcon />
      </Title>
      <Tooltip isOpen={isOpen} ref={ref}>
        <span>{content}</span>
        {!isPC && (
          <Close
            width={16}
            height={16}
            stroke={COLOR.kurlyGray800}
            fill={COLOR.kurlyGray800}
            strokeWidth={2}
            onClick={close}
          />
        )}
      </Tooltip>
    </Wrapper>
  );
};

export default GuideTooltip;
