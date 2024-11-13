import { css } from '@emotion/react';
import { motion, MotionStyle } from 'framer-motion';

import { WaveText } from '../animationText/WaveText';
import COLOR from '../../../../shared/constant/colorset';
import { YearArrow } from './elements/YearArrow';
import type { KeywordElement } from '../../types';
import { VideoPlayer } from './VideoPlayer';

const SVGSelector = ({ value, motionStyle }: { value: string; motionStyle: MotionStyle }) => {
  const { x, opacity } = motionStyle;

  if (value === 'CARROT_ARROW') {
    return <YearArrow motionStyle={{ x, opacity }} />;
  }

  return null;
};

const NormalKeywordText = css`
  color: ${COLOR.kurlyWhite};
  font-weight: 600;

  @media (min-width: 320px) {
    font-size: 14vw;
    line-height: 72px;
  }

  @media (min-width: 412px) {
    font-size: 13vw;
    line-height: 76px;
  }

  @media (min-width: 586px) {
    font-size: 11vw;
    line-height: 80px;
  }

  @media (min-width: 720px) {
    font-size: 9vw;
    line-height: 84px;
  }
`;

const RoundKeywordText = css`
  color: ${COLOR.kurlyWhite};
  font-weight: 600;
  height: 100%;
  line-height: 72px;
  border-radius: 100px;
  border: 1px solid ${COLOR.kurlyWhite};
  padding: 5px 18px;

  @media (min-width: 320px) {
    font-size: 12vw;
    line-height: 72px;
  }

  @media (min-width: 412px) {
    font-size: 11vw;
    line-height: 88px;
  }

  @media (min-width: 586px) {
    font-size: 9vw;
    line-height: 88px;
  }

  @media (min-width: 720px) {
    font-size: 8vw;
    line-height: 88px;
  }
`;

const imageStyle = css`
  width: 75px;
  background: no-repeat center/100%;
  object-fit: cover;
`;

const playerStyle = css`
  min-width: 125px;
  height: 60px;
  border-radius: 29px;
  object-fit: cover;
`;

const elementWrapper = css`
  position: relative;
  overflow: hidden;
  padding-right: 10px;
`;

interface ElementMakerProps {
  elementIndex: number;
  element: KeywordElement;
  motionStyle: MotionStyle;
}

const ElementMaker = ({ elementIndex, element, motionStyle }: ElementMakerProps) => {
  const { x, y, opacity, rotate } = motionStyle;

  switch (element.type) {
    case 'text':
      const renderTextContent = () =>
        element.isOuterLine ? (
          <motion.span css={RoundKeywordText} style={{ x, opacity }}>
            {element.value}
          </motion.span>
        ) : (
          <WaveText
            css={NormalKeywordText}
            elementIndex={elementIndex}
            text={element.value}
            isOuterLine={element.isOuterLine}
          />
        );
      return <span css={elementWrapper}>{renderTextContent()}</span>;
    case 'image':
      return (
        <span css={elementWrapper}>
          <motion.img css={imageStyle} style={{ x, opacity }} src={element.value} alt="상품_이미지" />
        </span>
      );
    case 'gif':
      return (
        <span css={elementWrapper}>
          <VideoPlayer css={playerStyle} motionStyle={{ x, opacity }} sourceURL={element.value} />
        </span>
      );
    case 'svg':
      return (
        <span css={elementWrapper}>
          <SVGSelector value={element.value} motionStyle={{ x, y, opacity, rotate }} />
        </span>
      );
  }
};

export { ElementMaker };
