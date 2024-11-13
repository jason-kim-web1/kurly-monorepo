import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import styled from '@emotion/styled';

import { motion } from 'framer-motion';

import COLOR from '../../constant/colorset';

import TopNavigationSkeletonBar from './TopNavigationSkeletonBar';
import { newBadge } from '../../images';
import { MainTopNavigationOption } from '../../../main/navigation';
import { amplitudeService } from '../../amplitude';
import { SelectSubtab } from '../../amplitude/events';

interface Props {
  options: MainTopNavigationOption[];
  activeId: number;
  prevId: number;
  isLoading: boolean;
}

const Container = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: auto;
  height: 44px;
  padding: 0 1.125rem;
  font-size: 0.938rem;
  color: ${COLOR.kurlyGray600};
  box-shadow: inset 0 -0.5px 0 0 ${COLOR.lightGray};
  scroll-margin-left: 1.125rem;
  scroll-margin-right: 1.125rem;

  &::-webkit-scrollbar {
    display: none;
  }

  @supports (scrollbar-width: none) {
    scrollbar-width: none;
  }
`;

const A = styled.a`
  position: relative;
  height: 100%;
  span {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${COLOR.mainSecondary};

    &.new {
      &:after {
        content: '';
        display: block;
        margin-left: 3px;
        margin-top: -3px;
        width: 12px;
        height: 12px;
        background: url(${newBadge}) no-repeat;
      }
    }
  }

  &.active {
    span {
      color: ${COLOR.mainPurple};
      font-weight: 600;
    }
    transition: all 300ms ease;
  }

  display: inline-flex;
  align-items: baseline;
  gap: 2px;
`;

const Bar = styled(motion.div)<{ left?: number; width?: number }>`
  position: absolute;
  left: ${({ left }) => left && `${left}px`};
  right: 0;
  bottom: 0;
  width: ${({ width }) => width && `${width}px`};
  height: 2px;
  background-color: ${COLOR.mainPurple};
  content: '';
`;

/**
 * 모바일 메인 상단 네이게이션 컴포넌트
 */
export default function TopNavigationBar({ options, activeId, prevId, isLoading }: Props) {
  const [currentReady, setCurrentReady] = useState(false);

  const navigationArea = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMainMenuClick = (index: number, id: string, name: string, type: string) => {
    amplitudeService.logEvent(new SelectSubtab({ type, id, position: index, name, selectionType: 'click' }));
  };

  useEffect(() => {
    navigationArea.current[activeId]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });
  }, [activeId]);

  useEffect(() => {
    if (isLoading) return;
    setCurrentReady(true);
  }, [isLoading]);

  return (
    <Container>
      {isLoading ? (
        <TopNavigationSkeletonBar />
      ) : (
        <>
          {options.map(({ id, name, link, badge, type }, index) => (
            <Link key={id} href={link} as={link} passHref>
              <A
                ref={(ref) => (navigationArea.current[index] = ref)}
                href={link}
                className={index === activeId ? 'active' : ''}
                onClick={() => handleMainMenuClick(index, id, name, type)}
              >
                <span className={badge || ''}>{name}</span>
              </A>
            </Link>
          ))}

          {currentReady ? (
            <Bar
              initial={{
                left: navigationArea.current[prevId]?.offsetLeft,
                width: navigationArea.current[prevId]?.offsetWidth,
              }}
              animate={{
                left: navigationArea.current[activeId]?.offsetLeft,
                width: navigationArea.current[activeId]?.offsetWidth,
                transition: {
                  duration: 0.3,
                },
              }}
              left={activeId && navigationArea.current[activeId]?.offsetLeft}
              width={activeId && navigationArea.current[activeId]?.offsetWidth}
            />
          ) : null}
        </>
      )}
    </Container>
  );
}
