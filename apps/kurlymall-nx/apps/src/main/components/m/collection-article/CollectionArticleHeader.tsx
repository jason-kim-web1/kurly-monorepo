import styled from '@emotion/styled';

import { multiMaxLineText } from '../../../../shared/utils';
import { NoMainImageLogo } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';
import { MobileLink } from '../../../../shared/components/Link/MobileLink';
import { productCardImageWrapper } from '../../../../shared/styles/product-card-image-style';
import NextImage from '../../../../shared/components/NextImage';

const ArticleHeader = styled.a`
  display: block;
  padding: 0 16px;
`;

const ThumbWrapper = styled.div`
  ${productCardImageWrapper('50.5%')}
`;

const Description = styled.p`
  display: block;
  padding-top: 11px;
  font-size: 15px;
  color: ${COLOR.benefitTextGray};
  line-height: 20px;
  ${multiMaxLineText(5)};
`;

interface Props {
  imageUrl: string;
  description: string;
  landingUrl: string;

  selectImage(): void;

  selectDescription(): void;
}

export default function CollectionArticleHeader({
  imageUrl,
  description,
  landingUrl,
  selectImage,
  selectDescription,
}: Props) {
  return (
    <MobileLink url={landingUrl} passHref>
      <ArticleHeader href={landingUrl}>
        <ThumbWrapper onClick={selectImage}>
          <NextImage src={imageUrl ? imageUrl : NoMainImageLogo} layout="fill" objectFit="cover" alt="상품 이미지" />
        </ThumbWrapper>
        <Description onClick={selectDescription}>{description}</Description>
      </ArticleHeader>
    </MobileLink>
  );
}
