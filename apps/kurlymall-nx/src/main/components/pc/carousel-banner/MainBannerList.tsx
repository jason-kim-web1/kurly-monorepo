import styled from '@emotion/styled';
import Link from 'next/link';

import type { MainSite, MainBannerDataCarousel } from '../../../interfaces/MainSection.interface';
import type { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { NoBannerImagex249x410 } from '../../../../shared/images';
import { multiMaxLineText } from '../../../../shared/utils';
import { queryStringSiteConverter } from '../../../../shared/utils/queryStringSiteConverter';
import { productListSlidePerView } from '../constant';
import COLOR from '../../../../shared/constant/colorset';
import ListSwiper from '../list/ListSwiper';
import NextImage from '../../../../shared/components/NextImage';

const ListBanner = styled.a`
  display: block;
  overflow: hidden;
  position: relative;
  width: 249px;
  height: 410px;
  border-radius: 4px;
  :hover img {
    transform: scale(1.02);
    transition: all 0.3s ease-in-out;
  }
`;

const Title = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  color: ${COLOR.kurlyWhite};
  letter-spacing: -0.2px;
`;

const Name = styled.strong`
  display: block;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  ${multiMaxLineText(2)};
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const Description = styled.span`
  display: block;
  overflow: hidden;
  padding: 11px 0 29px;
  font-size: 14px;
  line-height: 19px;
  opacity: 0.7;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface Props {
  site: MainSite;
  banners: MainBannerDataCarousel[];
  selectProduct(selectProduct: ProductMainSelectData): void;
  selectMore(): void;
}

export default function MainBannerList({ site, banners, selectProduct, selectMore }: Props) {
  const items = banners.map(({ id, title, subtitle, mainVerticalBannerPcUrl, imageUrl, link }, index) => (
    <Link href={link} key={id} passHref prefetch={false}>
      <ListBanner
        href={queryStringSiteConverter({ link, site })}
        onClick={() => selectProduct({ type: 'content', index, productNo: id })}
      >
        <NextImage
          src={mainVerticalBannerPcUrl || imageUrl ? mainVerticalBannerPcUrl || imageUrl : NoBannerImagex249x410}
          width={249}
          height={410}
          objectFit="cover"
          objectPosition={'50% 0'}
          alt="이벤트 관련 이미지"
        />
        <Title>
          <Name>{title}</Name>
          <Description>{subtitle}</Description>
        </Title>
      </ListBanner>
    </Link>
  ));

  return (
    <ListSwiper
      top={205}
      items={items}
      slidesPerView={productListSlidePerView}
      buttonOffset={1}
      handleSelectMore={selectMore}
    />
  );
}
