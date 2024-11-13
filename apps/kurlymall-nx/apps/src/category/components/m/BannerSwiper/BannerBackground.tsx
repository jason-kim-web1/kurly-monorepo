import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { motion, useAnimation, useIsomorphicLayoutEffect, Variants } from 'framer-motion';

import NextImage from '../../../../shared/components/NextImage';
import { CategoryBanner } from '../../../../shared/reducers/category';
import { useIsFirstRender } from '../../../../shared/hooks/useIsFirstRender';

interface Props extends Pick<CategoryBanner, 'mobileImageUrl'> {
  isActive: boolean;
}

const ImageWrapper = styled(motion.figure)`
  border-radius: 0.75rem;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const imageStyle = css`
  border-radius: 0.75rem;
`;

const animationVariants: Variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  disappear: {
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
    opacity: [1, 0.8, 0.6, 0.4, 0.2, 0, 0],
  },
  appear: {
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
    opacity: [0, 0, 0.2, 0.4, 0.6, 0.8, 1],
  },
};

const BannerBackground = ({ mobileImageUrl, isActive }: Props) => {
  const isFirstRender = useIsFirstRender();
  const animationControl = useAnimation();

  useIsomorphicLayoutEffect(() => {
    if (isFirstRender) return;
    void animationControl.start(isActive ? 'appear' : 'disappear');
  }, [isActive]);

  return (
    <ImageWrapper initial={isActive ? 'visible' : 'hidden'} animate={animationControl} variants={animationVariants}>
      <NextImage src={mobileImageUrl} alt={''} objectFit={'cover'} layout={'fill'} css={imageStyle} loading={'lazy'} />
    </ImageWrapper>
  );
};

export { BannerBackground };
