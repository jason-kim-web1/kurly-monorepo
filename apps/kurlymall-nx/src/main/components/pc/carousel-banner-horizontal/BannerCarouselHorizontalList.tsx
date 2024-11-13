import styled from '@emotion/styled';
import Link from 'next/link';

import type { CarouselHorizontalAmplitudeData, MainSubBanners } from '../../../interfaces/MainSub.interface';
import NextImage from '../../../../shared/components/NextImage';
import NoImage516x376 from '../../../../shared/icons/NoImage516x376';

import { multiMaxLineText } from '../../../../shared/utils';
import Pagination from '../../../../product/list/pc/components/Pagination';
import COLOR from '../../../../shared/constant/colorset';

const BannerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1050px;
  margin: 0 auto;
`;

const ListBanner = styled.a`
  flex: 0 0 516px;
  overflow: hidden;
  position: relative;
  height: 376px;
  margin-top: 30px;
  background-color: ${COLOR.kurlyGray150};
  border-radius: 4px;
`;

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 25px;
  width: 100%;
  height: 54px;
  padding: 0 32px;
`;

const Name = styled.strong<{ hasSubTitle: boolean }>`
  flex: 1 0 400px;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  ${multiMaxLineText(1)};
  ${({ hasSubTitle }) => !hasSubTitle && 'padding-top: 3px;'}
`;

const Description = styled.span`
  flex: 1 0 400px;
  padding-top: 6px;
  font-size: 16px;
  line-height: 22px;
  opacity: 0.5;
  ${multiMaxLineText(1)};
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 54px 0 80px;
`;

interface Props {
  banners: MainSubBanners;
  currentPage: number;
  totalPages: number;
  onClickPage(page: number): void;
  onAmplitudeEvent({ title, link, index }: CarouselHorizontalAmplitudeData): void;
}

export default function BannerCarouselHorizontalListPC({
  banners,
  currentPage,
  totalPages,
  onClickPage,
  onAmplitudeEvent,
}: Props) {
  return (
    <BannerWrapper>
      {banners.map(({ id, title, subtitle, imageUrl, mainHorizontalBannerPcUrl, link }, index) => (
        <Link href={link} key={id} passHref prefetch={false}>
          <ListBanner href={link} onClick={() => onAmplitudeEvent({ title, link, index })}>
            {imageUrl ? (
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
      ))}
      <PaginationWrapper>
        <Pagination currentPage={currentPage} totalPages={totalPages} onClickPage={onClickPage} />
      </PaginationWrapper>
    </BannerWrapper>
  );
}
