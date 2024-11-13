import { ReactNode, SyntheticEvent } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { isEmpty, head } from 'lodash';

import type { MainSite } from '../../../../main/interfaces/MainSection.interface';
import { ProductBannerData } from '../../types';
import { NoImage } from '../../../../shared/images';
import { queryStringSiteConverter } from '../../../../shared/utils/queryStringSiteConverter';
import COLOR from '../../../../shared/constant/colorset';

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
  onClickBanner?(url: string): void;
}

export default function Banner({ banner, site, onClickBanner }: Props) {
  const headBanner = head(banner);
  if (!headBanner) {
    return null;
  }

  const { mobileLink, mobileImage, eventBannerMobileUrl } = headBanner;

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;

    event.currentTarget.src = NoImage;
    event.currentTarget.style.width = '100vw';
    event.currentTarget.style.height = '100vw';
    event.currentTarget.style.maxHeight = '340px';
    event.currentTarget.style.backgroundColor = COLOR.kurlyGray200;
  };

  return (
    <WrapperBanner site={site} link={mobileLink} onClickBanner={onClickBanner}>
      <BannerImg src={eventBannerMobileUrl || mobileImage} onError={handleImageError} alt="배너 이미지" />
    </WrapperBanner>
  );
}
