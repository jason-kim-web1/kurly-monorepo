import { ReactNode, RefObject, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { isEmpty, head } from 'lodash';

import type { ProductBannerData } from '../../types';
import type { MainSite } from '../../../../main/interfaces/MainSection.interface';
import { PRODUCT_LIST_HEADING_TOP_MARGIN } from '../../constants';
import { queryStringSiteConverter } from '../../../../shared/utils/queryStringSiteConverter';
import { usePreviousRouteFromGoodsDetail } from '../../../../shared/context/PreviousRoutePathContext';

const BannerView = styled.div`
  text-align: center;
`;

const BannerImg = styled.img`
  width: 100%;
  vertical-align: top;
`;

const WrapperBanner = ({
  children,
  link,
  site,
  onClickBanner,
}: {
  children: ReactNode;
  link: string;
  site: MainSite;
  onClickBanner?: (link: string) => void;
}) => {
  if (!isEmpty(link)) {
    return (
      <Link href={queryStringSiteConverter({ link, site })} passHref>
        <a href={queryStringSiteConverter({ link, site })} onClick={() => onClickBanner && onClickBanner(link)}>
          {children}
        </a>
      </Link>
    );
  }

  return <>{children}</>;
};

interface Props {
  banner: ProductBannerData[];
  site: MainSite;
  titleRef?: RefObject<HTMLHeadingElement>;
  onClickBanner?(url: string): void;
  productTotal?: number;
}

export default function Banner({ banner, site, productTotal, onClickBanner, titleRef }: Props) {
  const headBanner = head(banner);
  const [loaded, setLoaded] = useState(false);
  const isPageFromGoodsDetail = usePreviousRouteFromGoodsDetail();

  useEffect(() => {
    if (!isPageFromGoodsDetail && window.scrollY > 0 && loaded && titleRef?.current && headBanner) {
      const $headerHeight = document.getElementById('header')?.clientHeight ?? 0;
      titleRef.current.scrollIntoView();
      window.scrollBy(0, -$headerHeight - PRODUCT_LIST_HEADING_TOP_MARGIN);
    }
  }, [headBanner, isPageFromGoodsDetail, loaded, titleRef]);

  if (!headBanner || productTotal === 0) {
    return null;
  }

  const { pcLink, pcImage, eventBannerPcUrl } = headBanner;

  return (
    <BannerView>
      <WrapperBanner site={site} link={pcLink} onClickBanner={onClickBanner}>
        <BannerImg onLoad={() => setLoaded(true)} src={eventBannerPcUrl || pcImage} alt="배너 이미지" />
      </WrapperBanner>
    </BannerView>
  );
}
