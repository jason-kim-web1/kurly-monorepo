import { ReactNode, useEffect } from 'react';
import Link from 'next/link';

import styled from '@emotion/styled';

import { motion } from 'framer-motion';

import type { MainSite } from '../../../main/interfaces/MainSection.interface';
import type { EventBenefitResponse } from '../../../shared/interfaces';
import COLOR from '../../../shared/constant/colorset';
import { isPC } from '../../../../util/window/getDevice';
import { fadeVariant } from '../../../shared/styles/motions';
import { queryStringSiteConverter } from '../../../shared/utils/queryStringSiteConverter';
import NextImage from '../../../shared/components/NextImage';

const Item = styled(motion.li)`
  position: relative;
  width: 100%;
  height: ${isPC ? '200px' : '37.5vw'};
  margin-bottom: 10px;
  background-color: ${COLOR.bg};
`;

const WrapperBanner = ({
  children,
  site,
  bannerUrl,
  giftIds,
  index,
  onClickBanner,
}: {
  children: ReactNode;
  site: MainSite;
  bannerUrl: string;
  giftIds: string;
  index: number;
  onClickBanner(link: string | null, giftIds: string | null, index: number): void;
}) => {
  if (bannerUrl) {
    return (
      <Item initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeVariant}>
        <Link href={queryStringSiteConverter({ link: bannerUrl, site })} passHref>
          <a
            onClick={() => onClickBanner(bannerUrl, giftIds, index)}
            href={queryStringSiteConverter({ link: bannerUrl, site })}
          >
            {children}
          </a>
        </Link>
      </Item>
    );
  }

  return (
    <Item initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeVariant}>
      {children}
    </Item>
  );
};

interface Props {
  site: MainSite;
  eventList: EventBenefitResponse;
  index: number;
  countEventList: number;
  onClickBanner(link: string | null, giftIds: string | null, index: number): void;
  onFocusBannerPosition(): void;
}

export default function EventItem({
  site,
  eventList,
  index,
  countEventList,
  onClickBanner,
  onFocusBannerPosition,
}: Props) {
  const { link, mobileLink, giftIds, image, specialPricePcUrl, mobileImage, specialPriceMobileUrl, title } = eventList;
  const bannerUrl = isPC ? link : mobileLink;
  const bannerImage = isPC ? specialPricePcUrl || image : specialPriceMobileUrl || mobileImage;

  useEffect(() => {
    if (onFocusBannerPosition && index === countEventList - 1) {
      onFocusBannerPosition();
    }
  }, [countEventList, index, onFocusBannerPosition]);

  return (
    <WrapperBanner site={site} bannerUrl={bannerUrl} giftIds={giftIds} index={index} onClickBanner={onClickBanner}>
      <NextImage src={bannerImage} alt={title} layout="fill" objectFit="cover" />
    </WrapperBanner>
  );
}
