import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { get, head } from 'lodash';

import { Section } from '../../Layout';
import { useTextOpacityMotion } from '../../../hooks/useTextOpacityMotion';
import type { ContentType, ProductContent } from '../../../types';

const sectionStyle = css`
  position: relative;
  width: 100%;
  max-width: 1050px;
  height: 250vh;
  background-color: #fffced;
`;

const headingBaseStyle = css`
  position: sticky;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 130vh;
  margin: 0 auto;
  color: #121212;
  width: 100%;
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  text-align: center;
  z-index: 3;
  padding-bottom: 24px;
`;

const imageStyle = css`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  background: no-repeat center/100%;
`;

interface Props {
  productContent: ProductContent;
}

const GIFSection = ({ productContent }: Props) => {
  const { targetRef, opacity, scale } = useTextOpacityMotion();
  const contentTitle = get(productContent, 'title', '');
  const mainContent = head(get(productContent, 'content', [])) as ContentType;
  const contentGIF = get(mainContent, 'image', '');

  return (
    <Section ref={targetRef} css={sectionStyle}>
      {contentTitle ? (
        <motion.h2 css={headingBaseStyle} style={{ opacity }}>
          {contentTitle}
        </motion.h2>
      ) : null}
      <motion.img src={contentGIF} css={imageStyle} style={{ scale }} alt={`GIF_for_${contentTitle}`} />
    </Section>
  );
};

export { GIFSection };
