import styled from '@emotion/styled';

import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';

import { motion, useAnimation } from 'framer-motion';

import { vars } from '@thefarmersfront/kpds-css';

import COLOR from '../../../shared/constant/colorset';

const Container = styled.nav`
  position: relative;
  width: 100%;
  font-size: 1rem;
  color: ${vars.color.text.$tertiary};
  border-bottom: solid 1px ${vars.color.line.$line1};
  background-color: ${COLOR.kurlyWhite};
`;

const ButtonWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: ${vars.spacing.$4} ${vars.spacing.$16};
`;

const Button = styled.button`
  flex: 1;
  font-size: ${vars.fontSize.$16};
  line-height: ${vars.lineHeight.$22};
  font-weight: ${vars.fontWeight.$regular};
  padding-inline: ${vars.spacing.$12};
  padding-block: ${vars.spacing.$8};
  text-align: center;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease-out;
  color: ${vars.color.text.$tertiary};

  &:active {
    background-color: ${vars.color.main.$secondaryContainer};
  }
  &.active {
    color: ${vars.color.text.$primary};
    font-weight: 600;
    transition: all 300ms ease;
  }
`;

const Bar = styled(motion.div)<{ left?: number; width?: number }>`
  position: absolute;
  left: ${({ left }) => left && `${left}px`};
  right: 0;
  bottom: 0;
  width: ${({ width }) => width && `${width}px`};
  height: 2px;
  background-color: #222;
  content: '';
`;

interface Props {
  activeId: number;
  onChangeActiveId: (id: number) => void;
  options: { id: number; label: string }[];
  onAnimate: (isAnimating: boolean) => void;
}

const MotionTabImpl = (
  { activeId, options, onChangeActiveId: handleChangeActiveId, onAnimate }: Props,
  wrapperRef: ForwardedRef<HTMLDivElement>,
) => {
  const itemArea = useRef<(HTMLSpanElement | null)[]>([]);

  const animate = useAnimation();

  const [remountKey, setRemountKey] = useState(0);

  const handleClickButton = (id: number) => {
    if (id === activeId) return;
    handleChangeActiveId(id);
  };

  useEffect(() => {
    setRemountKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    (async () => {
      onAnimate(true);
      await animate.start('animate');
      onAnimate(false);
    })();
  }, [onAnimate, activeId]);

  return (
    <Container ref={wrapperRef}>
      <ButtonWrapper>
        {options.map(({ id, label }, index) => (
          <Button
            key={id}
            ref={(ref) => (itemArea.current[index] = ref)}
            className={id === activeId ? 'active' : ''}
            onClick={() => handleClickButton(id)}
          >
            <span>{label}</span>
          </Button>
        ))}
      </ButtonWrapper>
      <Bar
        key={remountKey}
        animate={animate}
        variants={{
          initial: {
            left: itemArea.current[activeId]?.offsetLeft,
            width: itemArea.current[activeId]?.offsetWidth,
          },
          animate: {
            left: itemArea.current[activeId]?.offsetLeft,
            width: itemArea.current[activeId]?.offsetWidth,
            transition: {
              duration: 0.3,
            },
          },
        }}
        initial={'initial'}
        left={itemArea.current[activeId]?.offsetLeft}
        width={itemArea.current[activeId]?.offsetWidth}
      />
    </Container>
  );
};

const MotionTab = forwardRef(MotionTabImpl);

export { MotionTab };
