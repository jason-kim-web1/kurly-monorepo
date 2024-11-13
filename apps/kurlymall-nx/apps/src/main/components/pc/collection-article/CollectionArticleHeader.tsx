import styled from '@emotion/styled';

import Link from 'next/link';

import { multiMaxLineText } from '../../../../shared/utils';
import { NoMainImageLogo } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';
import NextImage from '../../../../shared/components/NextImage';

const ArticleHeader = styled.a`
  display: flex;
  padding-top: 40px;
`;

const ThumbWrapper = styled.div`
  overflow: hidden;
  flex-shrink: 0;
  height: 308px;
  margin-right: 36px;
  border-radius: 4px;
  img {
    transition: all 0.5s ease-in-out;
  }
  :hover img {
    transform: scale(1.02);
    transition: all 0.3s ease-in-out;
  }
`;

const Title = styled.div`
  letter-spacing: -0.2px;
`;

const Subject = styled.strong`
  display: block;
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
`;

const Description = styled.p`
  display: block;
  padding-top: 23px;
  font-size: 16px;
  color: ${COLOR.kurlyGray700};
  line-height: 26px;
  ${multiMaxLineText(7)};
`;

interface Props {
  title: string;
  imageUrl: string;
  description: string;
  landingUrl: string;
  selectImage(): void;
  selectDescription(): void;
}

export default function CollectionArticleHeader({
  title,
  imageUrl,
  description,
  landingUrl,
  selectImage,
  selectDescription,
}: Props) {
  return (
    <Link href={landingUrl} passHref prefetch={false}>
      <ArticleHeader href={landingUrl}>
        <ThumbWrapper onClick={selectImage}>
          <NextImage
            src={imageUrl ? imageUrl : NoMainImageLogo}
            width={615}
            height={308}
            objectFit="cover"
            alt="상품 이미지"
          />
        </ThumbWrapper>
        <Title>
          <Subject onClick={selectDescription}>{title}</Subject>
          <Description onClick={selectDescription}>{description}</Description>
        </Title>
      </ArticleHeader>
    </Link>
  );
}
