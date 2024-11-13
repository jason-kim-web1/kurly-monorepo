import { css } from '@emotion/react';
import { get } from 'lodash';
import { motion } from 'framer-motion';

import { Section } from '../../Layout';
import { getContentItem } from '../../../utils/getContentItem';
import { useImageSlideMotion } from '../../../hooks/useImageSlideMotion';
import type { ProductContent } from '../../../types';
import { FadeInUpText } from '../../animationText/FadeInUpText';

const sectionStyle = css`
  position: relative;
  width: 100%;
  max-width: 1050px;
  padding-bottom: 122px;
  background-color: #fffced;
`;

const sectionStickyBase = css`
  height: 300vh;
  padding: 160px 32px 122px;
  background-color: #06b360;
`;

const headingBaseStyle = css`
  margin: 0 auto;
  color: #000;
  width: 68.8%;
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
`;

const headingStyle = css`
  position: sticky;
  top: 160px;
  left: 0;
  color: #fff;
`;

const singleContentStyle = css`
  padding-top: 32px;
`;

const contentStyle = css`
  position: sticky;
  top: 160px;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
`;

const guideWrapperStyle = css`
  position: sticky;
  top: 236px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #06b360;
  padding-top: 30px;
`;

const descriptionBaseStyle = css`
  width: 68.8%;
  color: #121212;
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  margin: 0 auto;
  padding-top: 40px;
`;

const descriptionStyle = css`
  color: #fff;
  padding-bottom: 46px;
`;

const imageStyle = css`
  width: 100%;
  margin: 0 auto;
  object-fit: contain;
`;

interface Props {
  productContent: ProductContent;
}

const TipSection = ({ productContent }: Props) => {
  const contentItem = getContentItem(productContent);
  const contentTitle = get(productContent, 'title', '');
  const { itemRef, transformY } = useImageSlideMotion({ distanceOffset: [0, 0] });
  const validContentItems = contentItem?.filter((item) => item?.description && item?.image) || [];

  if (validContentItems.length === 1) {
    return (
      <Section ref={itemRef} css={sectionStyle}>
        <FadeInUpText>
          <h2 css={[headingBaseStyle, { paddingBottom: '8px' }]}>Kurly{"'"}s Tip</h2>
        </FadeInUpText>
        <FadeInUpText>
          {contentTitle ? <h2 css={[headingBaseStyle, { paddingBottom: '16px' }]}>{contentTitle}</h2> : null}
        </FadeInUpText>
        <FadeInUpText>
          {validContentItems.map((item, index) => {
            const itemDescription = get(item, 'description', '');
            return (
              <div key={`${index}-${itemDescription}`} css={singleContentStyle}>
                <img css={imageStyle} src={item.image} alt={`${index}-${itemDescription}`} />
                {itemDescription ? <p css={descriptionBaseStyle}>{itemDescription}</p> : null}
              </div>
            );
          })}
        </FadeInUpText>
      </Section>
    );
  }

  return (
    <Section ref={itemRef} css={[sectionStyle, sectionStickyBase]}>
      <h2 css={[headingBaseStyle, headingStyle]}>Kurly{"'"}s Tip</h2>
      <h2 css={[headingBaseStyle, headingStyle, { top: '200px' }]}>{contentTitle}</h2>
      <div css={contentStyle}>
        {validContentItems.map((item, index) => {
          return (
            <div key={`${index}-${item.description}`} css={guideWrapperStyle}>
              <p css={[descriptionBaseStyle, descriptionStyle]}>
                {index + 1}. {item.description}
              </p>
              <motion.img
                key={`${contentTitle}-kurly-tip-${index}`}
                src={item.image}
                css={imageStyle}
                style={{ y: transformY }}
                alt="tip_image"
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export { TipSection };
