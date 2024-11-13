import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { memo } from 'react';

import { Section } from '../Layout';
import { useWaveTextMotion } from '../../hooks/useWaveTextMotion';
import { ElementMaker } from './ElementMaker';
import { FadeInUpText } from '../animationText/FadeInUpText';
import { ShowcaseIntroB } from '../../types';
import { MovingScrollDownIcon } from './elements/MovingScrollDownIcon';
import COLOR from '../../../../shared/constant/colorset';

const wrapperStyle = css`
  height: 180vh;
`;

const stickyBackgroundStyle = css`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;

const stickyMaskStyle = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #0006;
  backdrop-filter: blur(10px);
  overflow: hidden;
`;

const contentStyle = css`
  max-height: 39%;
  margin: 0 auto;
  padding-top: 25.45%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  row-gap: 0px;
  column-gap: 20px;
  text-align: center;
`;

const KeywordGroupRow = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  grid-column: span 3;
  color: ${COLOR.kurlyWhite};
`;

const bottomElementGroup = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 47.91%;
`;

const bottomGuideText = css`
  color: ${COLOR.kurlyWhite};
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  white-space: pre-line;
  padding-top: 24%;
  padding-bottom: 8%;
`;

const downScrollWrapperStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 9%;
`;

interface Props {
  data?: ShowcaseIntroB;
}

const MemoizedElementMaker = memo(ElementMaker);

const TeaserB = ({ data }: Props) => {
  const motionStyle = useWaveTextMotion();

  if (!data) {
    return null;
  }

  const { bgImage, elementMap, subDescription } = data;

  return (
    <Section css={wrapperStyle}>
      <div css={stickyBackgroundStyle} style={{ background: `url(${bgImage}) no-repeat center/120%` }}>
        <div css={stickyMaskStyle}>
          <motion.div css={contentStyle} ref={motionStyle.targetRef}>
            {elementMap.map((elementList, index) => {
              const elements = elementList.map((element, elementIndex) => (
                <MemoizedElementMaker
                  key={`${element.value}-${elementIndex}`}
                  elementIndex={elementIndex}
                  element={element}
                  motionStyle={motionStyle}
                />
              ));
              return (
                <div key={`elementMap-${index}`} css={KeywordGroupRow}>
                  {elements}
                </div>
              );
            })}
          </motion.div>
          <div css={bottomElementGroup}>
            <FadeInUpText css={bottomGuideText}>{subDescription}</FadeInUpText>
            <div css={downScrollWrapperStyle}>
              <MovingScrollDownIcon />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export { TeaserB };
