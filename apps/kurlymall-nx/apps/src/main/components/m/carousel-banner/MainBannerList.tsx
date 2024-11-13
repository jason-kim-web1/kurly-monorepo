import styled from '@emotion/styled';

import type { MainSite, MainBannerDataCarousel } from '../../../interfaces/MainSection.interface';
import type { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { hiddenScrollBar } from '../../../../../src/shared/utils/hidden-scrollbar';
import { MobileLink } from '../../../../shared/components/Link/MobileLink';
import { NoBannerImagex150x264 } from '../../../../shared/images';
import { multiMaxLineText } from '../../../../shared/utils';
import { queryStringSiteConverter } from '../../../../shared/utils/queryStringSiteConverter';
import COLOR from '../../../../shared/constant/colorset';
import { productCardImageWrapper } from '../../../../shared/styles/product-card-image-style';
import NextImage from '../../../../shared/components/NextImage';

const Container = styled.ul`
  display: flex;
  position: relative;
  padding-top: 1px;
  ${hiddenScrollBar({ x: 'auto' })}
  scroll-snap-type: x mandatory;
`;

const Title = styled.div`
  position: absolute;
  left: 0;
  bottom: 18px;
  width: 100%;
  padding: 0 16px 0 32px;
  color: ${COLOR.kurlyWhite};
`;

const ListBanner = styled.li`
  position: relative;
  flex-shrink: 0;
  scroll-snap-align: start;
  max-width: calc(40vw + 16px);
  margin-left: -8px;
  padding-left: 16px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    max-width: calc(40vw + 32px);
    padding-right: 16px;

    ${Title} {
      padding-right: 32px;
    }
  }
`;
const ImageWrapper = styled.div`
  width: 40vw;
  ${productCardImageWrapper('176%')};
`;

const Name = styled.strong`
  display: block;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  ${multiMaxLineText(2)};
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const Description = styled.span`
  display: block;
  padding-top: 5px;
  font-size: 13px;
  line-height: 18px;
  opacity: 0.7;
  ${multiMaxLineText(1)};
`;

interface Props {
  site: MainSite;
  banners: MainBannerDataCarousel[];
  selectProduct(selectProduct: ProductMainSelectData): void;
}

export default function MainBannerList({ site, banners, selectProduct }: Props) {
  return (
    <Container>
      {banners.map(({ id, title, subtitle, mainVerticalBannerMobileUrl, imageUrl, link }, index) => (
        <ListBanner key={id}>
          <MobileLink url={queryStringSiteConverter({ link, site })} passHref>
            <a
              href={queryStringSiteConverter({ link, site })}
              onClick={() => selectProduct({ type: 'content', index, productNo: id })}
            >
              <ImageWrapper>
                <NextImage
                  src={
                    mainVerticalBannerMobileUrl || imageUrl
                      ? mainVerticalBannerMobileUrl || imageUrl
                      : NoBannerImagex150x264
                  }
                  layout="fill"
                  objectFit="cover"
                  objectPosition={'50% 0'}
                  alt="이벤트 관련 이미지"
                />
              </ImageWrapper>
              <Title>
                <Name>{title}</Name>
                <Description>{subtitle}</Description>
              </Title>
            </a>
          </MobileLink>
        </ListBanner>
      ))}
    </Container>
  );
}
