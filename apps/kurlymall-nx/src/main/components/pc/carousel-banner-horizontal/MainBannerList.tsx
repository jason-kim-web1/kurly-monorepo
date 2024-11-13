import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import type { MainBannerDataCarouselHorizontal } from '../../../interfaces/MainSection.interface';
import type { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { multiMaxLineText } from '../../../../shared/utils';
import { bannerCarouselHorizontal, bannerCarouselHorizontalGroup } from '../constant';
import ListSwiper from '../list/ListSwiper';
import NextImage from '../../../../shared/components/NextImage';
import NoImage516x376 from '../../../../shared/icons/NoImage516x376';
import COLOR from '../../../../shared/constant/colorset';

const ListBanner = styled.a`
  display: block;
  overflow: hidden;
  position: relative;
  width: 516px;
  height: 376px;
  border-radius: 4px;
  background-color: ${COLOR.kurlyGray150};
`;

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 26px;
  width: 100%;
  height: 54px;
  padding: 0 31px;
`;

const Name = styled.strong<{ hasSubTitle: boolean }>`
  flex: 1 0 414px;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  ${multiMaxLineText(1)};
  ${({ hasSubTitle }) => !hasSubTitle && 'padding-top:6px'}
`;

const Description = styled.span`
  flex: 1 0 414px;
  padding-top: 7px;
  font-size: 16px;
  line-height: 21px;
  opacity: 0.5;
  ${multiMaxLineText(1)};
`;

interface Props {
  banners: MainBannerDataCarouselHorizontal[];
  landingUrl: string;
  onSelectProduct(selectProduct: ProductMainSelectData): void;
  onSelectMore(): void;
}

export default function MainBannerList({ banners, landingUrl, onSelectProduct, onSelectMore }: Props) {
  const items = banners.map(({ id, title, subtitle, imageUrl, mainHorizontalBannerPcUrl, link }, index) => (
    <Link href={link} key={id} passHref prefetch={false}>
      <ListBanner href={link} onClick={() => onSelectProduct({ type: 'content', index, productNo: id })}>
        {mainHorizontalBannerPcUrl || imageUrl ? (
          <NextImage
            src={mainHorizontalBannerPcUrl || imageUrl}
            width={516}
            height={376}
            objectFit="cover"
            alt="이벤트 관련 이미지"
          />
        ) : (
          <NoImage516x376 width={516} height={376} />
        )}
        {title ? (
          <Title>
            <Name hasSubTitle={!!subtitle}>{title}</Name>
            {subtitle ? <Description>{subtitle}</Description> : null}
          </Title>
        ) : null}
      </ListBanner>
    </Link>
  ));

  return (
    <ListSwiper
      items={items}
      slidesPerView={bannerCarouselHorizontal}
      slidesPerGroup={bannerCarouselHorizontalGroup}
      buttonOffset={20}
      handleSelectMore={onSelectMore}
      landingUrl={landingUrl}
      className="banner-carousel-horizontal"
      itemCount={banners.length}
    />
  );
}
