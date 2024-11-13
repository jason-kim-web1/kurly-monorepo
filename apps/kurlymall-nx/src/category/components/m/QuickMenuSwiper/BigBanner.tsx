import styled from '@emotion/styled';

import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { motion, useAnimationControls } from 'framer-motion';

import type { Property } from 'csstype';

import useWindowSize from '../../../../shared/hooks/useWindowSize';
import { CategoryBanner } from '../../../../shared/reducers/category';

interface Props {
  banner: CategoryBanner;
  shrinkPositionGetter: () => { x: number; y: number } | null;
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const BannerImageArea = styled(motion.div)<{
  backgroundImage: Property.BackgroundImage;
  backgroundSize: Property.BackgroundSize;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-image: ${({ backgroundImage }) => backgroundImage};
  background-size: ${({ backgroundSize }) => backgroundSize};
  background-repeat: no-repeat;
`;

const SHRINK_DELAY = 2000; //ms
const SHRINK_DURATION = 500; //ms
const FADEOUT_DURATION = 500; //ms

const BigBannerImpl = ({ banner: { mobileImageUrl: imgUrl }, shrinkPositionGetter }: Props) => {
  const [bannerImageSize, setBannerImageSize] = useState<{ width: number; height: number } | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const { width: viewportWidth } = useWindowSize();
  const controls = useAnimationControls();

  const backgroundPosition = useMemo(() => {
    if (!bannerImageSize) return;

    return {
      x: (viewportWidth - bannerImageSize.width) / 2,
      y: 0,
    };
  }, [bannerImageSize, viewportWidth]);

  const imageReady = Boolean(backgroundPosition && bannerImageSize);

  const shrinkPosition = useMemo(() => {
    if (!imageReady) return null;
    return shrinkPositionGetter();
  }, [shrinkPositionGetter, imageReady]);

  const bannerReady = Boolean(imageReady && shrinkPosition);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { width: containerWidth, height: containerHeight } = el.getBoundingClientRect();

    const image = new Image();
    image.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = image;
      const scale = Math.max(containerWidth / width, containerHeight / height);

      setBannerImageSize({ width: width * scale, height: height * scale });
    };

    image.src = imgUrl;
  }, [imgUrl]);

  useEffect(() => {
    if (!bannerReady) return;

    const timeout = setTimeout(async () => {
      await controls.start('shrink');
      await controls.start('fadeOut');
    }, SHRINK_DELAY);

    return () => {
      clearTimeout(timeout);
    };
  }, [controls, bannerReady]);

  return (
    <Wrapper ref={ref}>
      {bannerReady && (
        <BannerImageArea
          initial={'full'}
          animate={controls}
          backgroundImage={`url(${imgUrl})`}
          backgroundSize={`${bannerImageSize!.width}px ${bannerImageSize!.height}px`}
          variants={{
            full: {
              width: '100%',
              height: '100%',
              backgroundPosition: `${backgroundPosition!.x}px calc(50% - ${backgroundPosition!.y}px)`,
            },
            shrink: {
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              x: shrinkPosition!.x,
              y: shrinkPosition!.y,
              backgroundPosition: `${backgroundPosition!.x - shrinkPosition!.x}px calc(50% - ${
                backgroundPosition!.y - shrinkPosition!.y
              }px)`,
              transition: {
                duration: SHRINK_DURATION / 1000,
                ease: 'easeInOut',
              },
            },
            fadeOut: {
              opacity: 0,
              transition: {
                duration: FADEOUT_DURATION / 1000,
                ease: 'easeInOut',
              },
              transitionEnd: {
                display: 'none',
              },
            },
          }}
        />
      )}
    </Wrapper>
  );
};

const BigBanner = memo(BigBannerImpl);

export { BigBanner };
