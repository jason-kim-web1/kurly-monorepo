import { useMemo } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import type { MainBannerDataCarouselHorizontal } from '../../../interfaces/MainSection.interface';
import type { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import LandingUrlItem from '../shared/LandingUrlItem';
import MainBannerSwiper from './MainBannerSwiper';
import NextImage from '../../../../shared/components/NextImage';
import NoImage516x376 from '../../../../shared/icons/NoImage516x376';
import COLOR from '../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../shared/utils';
import { productCardImage, productCardImageWrapper } from '../../../../shared/styles/product-card-image-style';

const TitleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 29%;
  padding: 0 20px;
`;

const ListBanner = styled.div`
  position: relative;
  width: 100%;
  flex-shrink: 0;
  background-color: ${COLOR.kurlyGray150};
  border-radius: 4px;
`;
const ImageWrapper = styled.div`
  ${productCardImageWrapper('80%')};
  padding-top: clamp(255px, 80%, 588px);
`;

const NoImage = styled.div`
  ${productCardImage};
  background-color: ${COLOR.kurlyGray150};
`;

const Name = styled.strong`
  flex: 1 0 100%;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: ${COLOR.benefitGray};
  ${multiMaxLineText(1)};
`;

const Description = styled.span`
  flex: 1 0 100%;
  padding-top: 4px;
  font-size: 13px;
  line-height: 18px;
  opacity: 0.5;
  color: ${COLOR.benefitGray};
  ${multiMaxLineText(1)};
`;

const LandingUrlItemWrapper = styled.div`
  height: 100%;

  a {
    display: block;
    height: 100%;
  }
`;

const LandingUrlItemInner = styled(LandingUrlItem)`
  height: 100%;
  margin-top: -2px;
  padding-right: 16px;
`;

interface Props {
  banners: MainBannerDataCarouselHorizontal[];
  landingUrl: string;

  onSelectProduct(selectProduct: ProductMainSelectData): void;

  onSelectMore(): void;
}

export default function MainBannerList({ banners, landingUrl, onSelectProduct, onSelectMore }: Props) {
  const items = banners.map(({ id, title, subtitle, mainHorizontalBannerMobileUrl, imageUrl, link }, index) => (
    <ListBanner key={id}>
      <Link href={link} passHref>
        <a
          href={link}
          onClick={() =>
            onSelectProduct({
              type: 'content',
              index,
              productNo: id,
            })
          }
        >
          <ImageWrapper>
            {mainHorizontalBannerMobileUrl || imageUrl ? (
              <NextImage
                src={mainHorizontalBannerMobileUrl || imageUrl}
                layout="fill"
                objectFit="cover"
                alt="이벤트 관련 이미지"
              />
            ) : (
              <NoImage>
                <NoImage516x376 />
              </NoImage>
            )}
          </ImageWrapper>
          {title ? (
            <TitleWrapper>
              <div>
                <Name>{title}</Name>
                {subtitle ? <Description>{subtitle}</Description> : null}
              </div>
            </TitleWrapper>
          ) : null}
        </a>
      </Link>
    </ListBanner>
  ));

  const slideItems = useMemo(() => {
    const sliced = items.slice(0, banners.length);

    if (landingUrl) {
      sliced.push(
        <LandingUrlItemWrapper>
          <LandingUrlItemInner landingUrl={landingUrl} handleSelectMore={onSelectMore} />
        </LandingUrlItemWrapper>,
      );
    }

    return sliced;
  }, [onSelectMore, items, landingUrl, banners.length]);

  return (
    <MainBannerSwiper
      items={slideItems}
      slidesPerView="auto"
      spaceBetween={8}
      className="banner-carousel-horizontal"
      isMore={!!landingUrl}
    />
  );
}
