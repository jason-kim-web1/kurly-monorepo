import { css } from '@emotion/react';

import { get, head } from 'lodash';

import { motion } from 'framer-motion';

import { Section } from '../../Layout';
import { getContentItem } from '../../../utils/getContentItem';
import { FadeInUpText } from '../../animationText/FadeInUpText';
import type { ProductContent } from '../../../types';

const sectionStyle = css`
  max-width: 1050px;
  margin: 0 auto;
  padding-bottom: 100px;
`;

const headingStyle = css`
  width: 68.8%;
  color: #121212;
  font-size: 28px;
  font-weight: 600;
  line-height: 2.571rem;
  text-align: left;
  padding: 40px 0 0;
  margin: 0 auto;
`;

const imageStyle = css`
  width: 100%;
  object-fit: contain;
  padding-top: 36px;
`;

const descriptionStyle = css`
  width: 68.8%;
  color: #121212;
  opacity: 0.8;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  padding-top: 24px;
  margin: 0 auto;
`;

interface Props {
  productContent: ProductContent;
}

const IntroSectionC = ({ productContent }: Props) => {
  const contentItem = getContentItem(productContent);
  const title = get(productContent, 'title', '');
  const description = get(head(contentItem), 'description', '');
  const image = get(head(contentItem), 'image', '');
  const imageWidth = get(head(contentItem), 'imageWidth', '');

  return (
    <Section css={sectionStyle}>
      {title ? (
        <FadeInUpText>
          <motion.h3 css={headingStyle}>{title}</motion.h3>
        </FadeInUpText>
      ) : null}
      <FadeInUpText>
        <motion.img css={[imageStyle, imageWidth && { maxWidth: imageWidth }]} src={image} alt={description} />
      </FadeInUpText>
      {description ? (
        <FadeInUpText>
          <p css={descriptionStyle}>{description}</p>
        </FadeInUpText>
      ) : null}
    </Section>
  );
};

export { IntroSectionC };
