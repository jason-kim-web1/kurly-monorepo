import { css } from '@emotion/react';
import { get, head } from 'lodash';

import { Section } from '../../Layout';
import { getContentItem } from '../../../utils/getContentItem';
import { FadeInUpText } from '../../animationText/FadeInUpText';
import type { ProductContent } from '../../../types';

const sectionStyle = css`
  position: relative;
  max-width: 1050px;
  text-align: right;
  padding-bottom: 100px;
`;

const headingStyle = css`
  color: #121212;
  width: 68.8%;
  text-align: left;
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  margin: 0 auto;
`;

const imageStyle = css`
  width: 84.26%;
  text-align: left;
  object-fit: contain;
  padding: 40px 0;
`;

const descriptionStyle = css`
  width: 68.53%;
  color: #121212;
  opacity: 0.8;
  font-size: 20px;
  line-height: 30px;
  text-align: left;
  margin: 0 auto;
`;

interface Props {
  productContent: ProductContent;
  isOdd: boolean;
}

const IntroSectionB = ({ productContent, isOdd }: Props) => {
  const contentItem = getContentItem(productContent);
  const title = get(productContent, 'title', '');
  const description = get(head(contentItem), 'description', '');
  const image = get(head(contentItem), 'image', '');

  return (
    <Section css={[sectionStyle, isOdd ? { textAlign: 'right' } : { textAlign: 'left' }]}>
      {title ? (
        <FadeInUpText>
          <h3 css={headingStyle}>{title}</h3>
        </FadeInUpText>
      ) : null}
      <FadeInUpText>
        <img css={imageStyle} src={image} alt={title} />
      </FadeInUpText>
      {description ? (
        <FadeInUpText>
          <p css={descriptionStyle}>{description}</p>
        </FadeInUpText>
      ) : null}
    </Section>
  );
};

export { IntroSectionB };
