import styled from '@emotion/styled';

import { MainRecipeData } from '../../../interfaces/MainSection.interface';
import COLOR from '../../../../shared/constant/colorset';
import { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { MobileLink } from '../../../../shared/components/Link/MobileLink';
import { multiMaxLineText } from '../../../../shared/utils';
import { NoMainImageLogo } from '../../../../shared/images';
import { productCardImageWrapper } from '../../../../shared/styles/product-card-image-style';
import NextImage from '../../../../shared/components/NextImage';

const Container = styled.a`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: calc(64vw + 16px);
  margin-left: -8px;
  padding-left: 16px;
  scroll-snap-align: start;

  &:first-of-type {
    margin-left: 0;
  }
`;

const ImageWrap = styled.div`
  min-width: 64vw;
  background-color: ${COLOR.kurlyGray150};
  ${productCardImageWrapper('71%')};
`;

const Content = styled.div`
  display: flex;
  padding: 8px 8px 8px 0;

  span {
    overflow: hidden;
    max-height: 38px;
    font-size: 14px;
    line-height: 19px;
    color: ${COLOR.benefitGray};
    ${multiMaxLineText(2)};
    overflow-wrap: break-word;
  }
`;

interface Props {
  index: number;
  no: number;
  recipe: MainRecipeData;

  onSelectProduct(selectProduct: ProductMainSelectData): void;
}

export default function RecipeItem({ index, no, recipe, onSelectProduct }: Props) {
  const { imageUrl, mainRecipeUrl, link, title } = recipe;

  return (
    <MobileLink url={link} passHref>
      <Container
        href={link}
        onClick={() =>
          onSelectProduct({
            type: 'content',
            index,
            productNo: no,
          })
        }
      >
        <ImageWrap>
          <NextImage
            src={mainRecipeUrl || imageUrl ? mainRecipeUrl || imageUrl : NoMainImageLogo}
            layout="fill"
            objectFit="cover"
            alt={`${title} 레시피 이미지`}
          />
        </ImageWrap>
        <Content>
          <span>{title}</span>
        </Content>
      </Container>
    </MobileLink>
  );
}
