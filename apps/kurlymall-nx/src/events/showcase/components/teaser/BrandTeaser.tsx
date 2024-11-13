import { useRef } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import COLOR from '../../../../shared/constant/colorset';
import { Section } from '../Layout';
import { useCalculateTransformOrigin } from '../../hooks/useCalculateTransformOrigin';
import { MovingScrollDownIcon } from './elements/MovingScrollDownIcon';
import { KurlyLogo } from './elements/KurlyLogo';
import type { BrandShowcaseIntro } from '../../types';
import { OrrLogo } from './elements/OrrLogo';
import { useBrandMaskScaleMotion } from '../../hooks/useBrandMaskMotion';
import { useBackgroundImageTransitionMotion } from '../../hooks/useBackgroundImageTransitionMotion';

const ANIMATION_TRIGGER_SCROLLY_PROGRESS = 0.3;
const BOTTOM_GUIDE_TEXT_ANIMATION_DURATION = 0.7;

const absoluteStyle = css`
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
`;

const styles = {
  container: css`
    width: 100vw;
    height: 840vh;
  `,
  section: css`
    ${absoluteStyle};
    position: sticky;
    overflow: hidden;
    background-color: ${COLOR.kurlyBlack};
  `,
  stickyBackground: css`
    ${absoluteStyle};
    position: absolute;
    object-fit: cover;
    background: no-repeat center;
    overflow: hidden;
  `,
  stickyMask: css`
    ${absoluteStyle};
    position: sticky;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: ${COLOR.kurlyBlack};

    @supports (mix-blend-mode: multiply) {
      mix-blend-mode: multiply;
    }
  `,
  content: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    width: 100%;
    color: ${COLOR.kurlyWhite};

    & > svg {
      width: 90vw;
      height: 15vh;
    }
  `,
  showcaseLogo: css`
    position: fixed;
    z-index: 1;
    top: 13vh;
    line-height: 0.8;
    left: 50%;
    transform: translateX(-50%);
    color: ${COLOR.kurlyWhite};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 6vw;
    white-space: nowrap;
    font-weight: 700;
  `,
  showLogo: css`
    letter-spacing: -0.704px;
  `,
  caseLogo: css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    letter-spacing: 1.618px;
  `,
  brandLogo: css`
    width: 1vw;
    font-size: 0.5vw;
  `,
  sign: css`
    margin: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  `,
  by: css`
    font-size: 2rem;
    font-style: italic;
    font-weight: 300;
  `,
  bottomWrapper: css`
    width: 100%;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 24px;
  `,
  description: css`
    line-height: 1.5;
    white-space: pre-wrap;
    color: ${COLOR.kurlyWhite};
    font-size: 16px;
    padding-bottom: 24px;
  `,

  bottomGuideTextWrapper: css`
    position: relative;
    bottom: 40%;
    padding: 0 5vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: ${COLOR.kurlyWhite};
  `,
  bottomGuideBrandLogo: css`
    width: 59px;
    height: 18px;
    margin-left: 5px;
  `,
  bottomGuideBrandTitle: css`
    font-size: 13vw;
    font-weight: 600;
    line-height: 1.2;
  `,
  bottomGuideBrandDescription: css`
    font-size: 4vw;
    line-height: 1.7;
    margin-left: 5px;
  `,
};

interface Props {
  data: BrandShowcaseIntro;
}

const BrandTeaser = ({ data }: Props) => {
  const { subDescription, title, subTitle, imageList } = data;

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scale, maskOpacity, teaserTextOpacity, teaserTextPosition, variants, animate, getTransition } =
    useBrandMaskScaleMotion({ targetRef, triggerScrollYProgress: ANIMATION_TRIGGER_SCROLLY_PROGRESS });

  const { controlsArray } = useBackgroundImageTransitionMotion({
    targetRef,
    triggerScrollYProgress: ANIMATION_TRIGGER_SCROLLY_PROGRESS,
  });

  const { elementRef, transformOrigin } = useCalculateTransformOrigin({
    targetElementYRatio: 0.23,
  });

  return (
    <Section ref={targetRef} css={styles.container}>
      <div css={styles.section}>
        {imageList.map((url, index, array) => (
          <motion.div
            key={url + index}
            css={styles.stickyBackground}
            style={{
              background: `linear-gradient(to top, black 5%, transparent 40%), linear-gradient(to bottom, black 1%, transparent 30%), url(${
                imageList[array.length - index - 1]
              }) no-repeat center/100%`,
            }}
            initial={{
              scale: 1,
              opacity: index === 3 ? 1 : 0,
            }}
            animate={controlsArray[array.length - index - 1]}
          />
        ))}
        <motion.div css={styles.showcaseLogo} style={{ opacity: teaserTextOpacity }}>
          <div css={styles.showLogo}>SHOW</div>
          <div css={styles.caseLogo}>
            <span>C</span>
            <span>A</span>
            <span>S</span>
            <span>E</span>
          </div>
        </motion.div>
        <motion.div css={styles.stickyMask} style={{ opacity: maskOpacity }}>
          <motion.div ref={elementRef} css={styles.content} style={{ scale, transformOrigin }}>
            <OrrLogo />
            <div css={styles.sign}>
              <span css={styles.by}>by</span>
              <KurlyLogo width={93} height={50} />
            </div>
          </motion.div>
        </motion.div>
        <motion.div css={styles.bottomWrapper} style={{ position: teaserTextPosition }}>
          <motion.div css={styles.description} style={{ opacity: teaserTextOpacity }}>
            {subDescription}
          </motion.div>
          <MovingScrollDownIcon />
        </motion.div>
        <motion.div css={styles.bottomGuideTextWrapper}>
          <motion.div
            css={styles.bottomGuideBrandLogo}
            animate={animate}
            variants={variants}
            transition={getTransition({ duration: BOTTOM_GUIDE_TEXT_ANIMATION_DURATION, delay: 0 })}
          >
            <OrrLogo />
          </motion.div>
          <motion.div
            css={styles.bottomGuideBrandTitle}
            animate={animate}
            variants={variants}
            transition={getTransition({ duration: BOTTOM_GUIDE_TEXT_ANIMATION_DURATION, delay: 1 })}
          >
            {title}
          </motion.div>
          <motion.div
            css={styles.bottomGuideBrandDescription}
            animate={animate}
            variants={variants}
            transition={getTransition({ duration: BOTTOM_GUIDE_TEXT_ANIMATION_DURATION, delay: 2 })}
          >
            {subTitle}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export { BrandTeaser };
