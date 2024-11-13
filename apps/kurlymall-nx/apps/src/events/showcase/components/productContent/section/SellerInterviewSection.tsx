import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import { get, head } from 'lodash';

import { getContentItem } from '../../../utils/getContentItem';
import { FadeInUpText } from '../../animationText/FadeInUpText';
import type { ProductContent } from '../../../types';

const sectionStyle = css`
  position: relative;
`;

const backgroundImgStyle = css`
  position: sticky;
  top: 7.143rem;
  left: 0;
  min-width: 100%;
  object-fit: cover;
  padding-bottom: 200px;
`;

const imageGroupStyle = css`
  position: relative;
  padding: 0 4.214rem 203px;
  z-index: 3;

  > img {
    width: 100%;
    padding-bottom: 3.786rem;
    z-index: 3;
  }
`;

const headingStyle = css`
  color: #121212;
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.571rem;
`;

const linkWrapperStyle = css`
  text-align: right;
  padding-right: 52px;
  padding-bottom: 100px;
`;

const linkStyle = css`
  color: #121212;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.429rem;
  text-align: left;
`;

interface Props {
  contentNo: number;
  productContent: ProductContent;
}

const SellerInterviewSection = ({ productContent, contentNo }: Props) => {
  const contentItem = getContentItem(productContent);
  const backgroundImage = get(head(contentItem), 'image', '');
  const motionImageList = contentItem?.slice(1).map((item) => item.image) || [];

  return (
    <section css={sectionStyle}>
      <img css={backgroundImgStyle} src={backgroundImage} alt="seller_interview_background" />
      <div css={imageGroupStyle}>
        {motionImageList.map((imageUrl, index) => (
          <motion.img
            key={imageUrl}
            initial={{ opacity: 0.4 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 'all' }}
            src={imageUrl}
            alt={`${productContent.title} - 셀러 인터뷰 ${index}`}
          />
        ))}
        <FadeInUpText>
          <h3 css={[headingStyle, { paddingBottom: '0.571rem' }]}>INTERVIEW</h3>
        </FadeInUpText>
        <FadeInUpText>
          <p css={headingStyle}>{productContent.title}</p>
        </FadeInUpText>
      </div>
      <FadeInUpText css={linkWrapperStyle}>
        <a css={linkStyle} href={`/goods/${contentNo}`}>
          상세 페이지에서{'\n'}인터뷰 내용을 확인해보세요
        </a>
      </FadeInUpText>
    </section>
  );
};

export { SellerInterviewSection };
