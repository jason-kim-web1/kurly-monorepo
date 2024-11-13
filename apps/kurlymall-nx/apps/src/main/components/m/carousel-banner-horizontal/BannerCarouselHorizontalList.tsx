import styled from '@emotion/styled';
import Link from 'next/link';

import type { CarouselHorizontalAmplitudeData, MainSubBanners } from '../../../interfaces/MainSub.interface';
import NextImage from '../../../../shared/components/NextImage';
import NoImage516x376 from '../../../../shared/icons/NoImage516x376';

import { productCardImageWrapper, productCardImage } from '../../../../shared/styles/product-card-image-style';
import { multiMaxLineText } from '../../../../shared/utils';
import COLOR from '../../../../shared/constant/colorset';

const BannerWrapper = styled.div`
  padding: 0 16px 40px;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  margin-top: 16px;
  background-color: ${COLOR.kurlyGray150};
`;

const ImageWrapper = styled.div`
  ${productCardImageWrapper('80%')};
  padding-top: clamp(255px, 80%, 588px);
`;

const NoImage = styled.div`
  ${productCardImage};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 29%;
  padding: 0 22px;
`;

const Name = styled.strong`
  display: block;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  ${multiMaxLineText(1)};
`;

const Description = styled.span`
  display: block;
  padding-top: 5px;
  font-size: 14px;
  line-height: 20px;
  opacity: 0.5;
  ${multiMaxLineText(1)};
`;

interface Props {
  banners: MainSubBanners;
  onAmplitudeEvent({ title, link, index }: CarouselHorizontalAmplitudeData): void;
}

export default function BannerCarouselHorizontalList({ banners, onAmplitudeEvent }: Props) {
  return (
    <BannerWrapper>
      {banners.map(({ id, title, subtitle, imageUrl, mainHorizontalBannerMobileUrl, link }, index) => (
        <Banner key={`${id}-${index}`} onClick={() => onAmplitudeEvent({ title, link, index })}>
          <Link href={link} passHref>
            <a href={link}>
              <ImageWrapper>
                {imageUrl ? (
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
        </Banner>
      ))}
    </BannerWrapper>
  );
}
