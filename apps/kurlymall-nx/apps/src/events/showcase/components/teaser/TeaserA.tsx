import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

import { isAndroid } from 'react-device-detect';

import COLOR from '../../../../shared/constant/colorset';
import { Section } from '../Layout';
import { useMaskScaleMotion } from '../../hooks/useMaskScaleMotion';
import { useCalculateTransformOrigin } from '../../hooks/useCalculateTransformOrigin';
import { MovingScrollDownIcon } from './elements/MovingScrollDownIcon';
import { KurlyLogo } from './elements/KurlyLogo';
import type { ShowcaseIntroA } from '../../types';
import { VideoPlayer } from './VideoPlayer';

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
    height: 240vh;
  `,
  section: css`
    ${absoluteStyle};
    position: sticky;
    overflow: hidden;
    background: #fffced;
  `,
  stickyBackground: css`
    ${absoluteStyle};
    position: absolute;
    object-fit: cover;
    background: no-repeat center/160%;
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
}
  `,
  content: css`
    display: flex;
    flex-direction: column;
    color: ${COLOR.kurlyWhite};
  `,
  date: css`
    font-size: 6vw;
    font-weight: 700;
    line-height: 1.429rem;
    text-align: left;
    padding: 0 0 4px 6px;
  `,
  title: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    overflow: hidden;
    font-size: 30vw;
    white-space: nowrap;
    font-weight: ${isAndroid ? 800 : 700};
    line-height: 25vw;
    text-transform: uppercase;
  `,
  sign: css`
    display: flex;
    flex-direction: row;
    align-items: end;
    text-align: left;
  `,
  by: css`
    font-size: 3.932rem;
    font-style: italic;
    font-weight: 300;
    letter-spacing: -0.14rem;
    padding: 1.143rem 0.929rem 0.714rem 0;
  `,
  bottomWrapper: css`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 24px;

    > span {
      color: ${COLOR.kurlyWhite};
      font-size: 16px;
      padding-bottom: 24px;
    }
  `,
};

const transformDateYYMMFormat = (date: string) => {
  return format(new Date(date), 'yy.MM');
};

interface Props {
  data: ShowcaseIntroA;
}

const TeaserA = ({ data }: Props) => {
  const { titleList, startDate, image } = data;
  const { targetRef, scale, opacity } = useMaskScaleMotion();
  const { elementRef, transformOrigin } = useCalculateTransformOrigin({});

  return (
    <Section ref={targetRef} css={styles.container}>
      <div css={styles.section}>
        <VideoPlayer css={styles.stickyBackground} sourceURL={image} />
        <motion.div css={styles.stickyMask} style={{ opacity }}>
          <motion.div ref={elementRef} css={styles.content} style={{ scale, transformOrigin }}>
            <div css={styles.date}>
              <time dateTime={startDate}>{transformDateYYMMFormat(startDate)}</time>
            </div>
            {titleList.map((text, index) => {
              const chars = Array.from(text);
              return (
                <div key={`${text}-${index}`} css={styles.title}>
                  {chars.map((char, charIndex) => (
                    <span key={`${char}-${charIndex}`}>{char}</span>
                  ))}
                </div>
              );
            })}
            <div css={styles.sign}>
              <span css={styles.by}>by</span>
              <KurlyLogo />
            </div>
          </motion.div>
          <div css={styles.bottomWrapper}>
            <span>SCROLL</span>
            <MovingScrollDownIcon />
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export { TeaserA };
