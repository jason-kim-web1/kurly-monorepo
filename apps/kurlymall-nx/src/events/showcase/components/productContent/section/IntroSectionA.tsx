import { css } from '@emotion/react';
import { get, head } from 'lodash';

import { Section } from '../../Layout';
import { getContentItem } from '../../../utils/getContentItem';
import { FadeInUpText } from '../../animationText/FadeInUpText';
import type { ProductContent } from '../../../types';

const sectionStyle = css`
  position: relative;
  max-width: 1050px;
  text-align: left;
  padding-top: 60px;
  padding-bottom: 100px;
`;

const contentWrapperStyle = css`
  width: 100%;
  padding: 0 15.73% 16px;
  color: #121212;
`;

const headingStyle = css`
  font-size: 40px;
  font-weight: 600;
`;

const descriptionStyle = css`
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  opacity: 0.8;
`;

const imageStyle = css`
  width: 84.26%;
  object-fit: contain;
`;

interface Props {
  productIndex: number;
  productContent: ProductContent;
  isOdd: boolean;
}

const IntroSectionA = ({ productIndex, productContent, isOdd }: Props) => {
  const contentItem = getContentItem(productContent);
  const title = get(productContent, 'title', '');
  const description = get(head(contentItem), 'description', '');
  const image = get(head(contentItem), 'image', '');
  const productIndexText = String(productIndex).padStart(2, '0');

  return (
    <Section css={[sectionStyle, isOdd ? {} : { textAlign: 'right', alignItems: 'flex-end' }]}>
      <FadeInUpText css={[contentWrapperStyle, { paddingBottom: '16px' }]}>
        <span css={headingStyle}>{productIndexText}</span>
      </FadeInUpText>
      {title ? (
        <FadeInUpText css={[contentWrapperStyle, { paddingBottom: '16px' }]}>
          <h3 css={headingStyle}>{title}</h3>
        </FadeInUpText>
      ) : null}
      {description ? (
        <FadeInUpText css={[contentWrapperStyle, { paddingBottom: '80px' }]}>
          <p css={descriptionStyle}>{description}</p>
        </FadeInUpText>
      ) : null}
      <FadeInUpText>
        <img css={imageStyle} src={image} alt={productContent.title} />
      </FadeInUpText>
    </Section>
  );
};

export { IntroSectionA };
