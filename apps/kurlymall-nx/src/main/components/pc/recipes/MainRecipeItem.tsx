import Link from 'next/link';

import styled from '@emotion/styled';

import { MainRecipeData } from '../../../interfaces/MainSection.interface';
import COLOR from '../../../../shared/constant/colorset';
import { NoMainImageLogo } from '../../../../shared/images';
import { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import NextImage from '../../../../shared/components/NextImage';

const LinkInner = styled.a`
  display: block;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
`;

const ImageWrap = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 225px;
  background-color: ${COLOR.kurlyGray150};
  border-radius: 4px;
`;

const Title = styled.div`
  padding: 14px 10px;
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.3;
  letter-spacing: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: pre-line;
`;

interface Props {
  index: number;
  no: number;
  recipe: MainRecipeData;
  onSelectProduct(selectProduct: ProductMainSelectData): void;
}

export default function MainRecipeItem({ index, no, recipe, onSelectProduct }: Props) {
  const { imageUrl, mainRecipeUrl, link, title } = recipe;

  return (
    <Link href={link} passHref prefetch={false}>
      <LinkInner href={link}>
        <ImageWrap onClick={() => onSelectProduct({ type: 'content', index, productNo: no })}>
          <NextImage
            src={mainRecipeUrl || imageUrl ? mainRecipeUrl || imageUrl : NoMainImageLogo}
            width={338}
            height={225}
            objectFit="cover"
            alt="상품이미지"
          />
        </ImageWrap>
        <Title>{title}</Title>
      </LinkInner>
    </Link>
  );
}
