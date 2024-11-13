// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper as SwiperCore } from 'swiper/types';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { vars } from '@thefarmersfront/kpds-css';

import { eq, head, take } from 'lodash';

import { InView } from 'react-intersection-observer';

import { BannerItem } from './BannerItem';
import { BannerBackground } from './BannerBackground';
import { CategoryBanner, PrimaryCategory } from '../../../../shared/reducers/category';
import { ImpressionPolicy, useImpressionPolicy } from '../../../../shared/context/ImpressionPolicyContext';
import { logSelectCategoryBanner } from '../../../amplitude/events';

import { useImpressionLogPolicy } from '../../../queries/useImpressionLogPolicy';

interface Props extends Pick<PrimaryCategory, 'name' | 'code'> {
  items: CategoryBanner[];
}

const Wrapper = styled.div`
  position: relative;
  max-width: 506px;
  height: auto;
  margin-bottom: ${vars.spacing.$8};
`;

const TextWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const swiperStyle = css`
  & > .swiper-pagination {
    position: absolute;
    bottom: ${vars.spacing.$8};
    left: 50%;
    transform: translateX(-50%);

    .swiper-pagination-bullet {
      display: inline-block;
      vertical-align: bottom;
      width: ${vars.spacing.$6};
      height: ${vars.spacing.$6};
      margin: 0 3px;
      border-radius: 50%;
      background: ${vars.color.$white};
      transition: opacity 0.2s ease-out;
      opacity: 0.5;

      &.swiper-pagination-bullet-active {
        opacity: 1;
      }
    }
  }
`;

export default memo(function BannerSwiper({ items: originalItems, name, code }: Props) {
  const [realIndex, setRealIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const { registerElement, unRegisterElement, checkIsScrolling, checkIsSwiping } = useImpressionPolicy();
  const { logSection, logSectionItem } = useImpressionLogPolicy();
  const [inView, setInView] = useState(false);

  // 프론트에선 최대 3개까지만 노출 가능
  const items = useMemo(() => {
    return take(originalItems, 3);
  }, [originalItems]);

  const handleCategoryBannerImpression = () => {
    logSection(`category-banner-${name}-${code}`, {
      search_section_id: 'main_category_banner',
      primary_category_id: code,
      primary_category_name: name,
    });
  };

  const handleCategoryBannerItemImpression = useCallback(
    (title: string, url: string, index: number) => {
      logSectionItem(`category-banner-${title}-${code}-${index}`, {
        search_section_id: 'main_category_banner',
        primary_category_id: code,
        primary_category_name: name,
        title,
        url,
        item_position: index + 1,
      });
    },
    [code, logSectionItem, name],
  );

  const handleSelectCategoryBanner = (url: string, index: number) => {
    logSelectCategoryBanner({
      selection_type: 'main_category_banner',
      url,
      item_position: index + 1,
      primary_category_id: code,
      primary_category_name: name,
    });
  };

  useEffect(() => {
    if (!swiper?.el || swiper.destroyed) return;

    registerElement(swiper.wrapperEl);

    return () => {
      unRegisterElement(swiper.wrapperEl);
    };
  }, [registerElement, unRegisterElement, swiper]);

  useEffect(() => {
    const item = items[realIndex];
    if (!item || checkIsSwiping() || checkIsScrolling()) return;
    const { title, mobileLink } = item;
    if (inView) {
      handleCategoryBannerItemImpression(title, mobileLink, realIndex);
    }
  }, [items, realIndex, inView, checkIsSwiping, checkIsScrolling, handleCategoryBannerItemImpression]);

  if (items.length === 1) {
    const { mobileImageUrl, title, subTitle, mobileLink } = head(items)!;

    return (
      <ImpressionPolicy
        onInView={() => {
          handleCategoryBannerImpression();
          handleCategoryBannerItemImpression(title, mobileLink, 0);
        }}
      >
        <Wrapper>
          <TextWrapper>
            <BannerItem
              mobileLink={mobileLink}
              title={title}
              subTitle={subTitle}
              onClick={() => handleSelectCategoryBanner(mobileLink, 0)}
            />
          </TextWrapper>
          <BannerBackground mobileImageUrl={mobileImageUrl} isActive />
        </Wrapper>
      </ImpressionPolicy>
    );
  }

  return (
    <InView onChange={setInView}>
      <ImpressionPolicy onInView={handleCategoryBannerImpression}>
        <Wrapper>
          <Swiper
            modules={[Autoplay, Pagination]}
            loop
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            onRealIndexChange={({ realIndex: index }) => setRealIndex(index)}
            speed={1000}
            watchSlidesProgress
            css={swiperStyle}
            onSwiper={setSwiper}
          >
            {items.map(({ mobileLink, title, subTitle }, index) => (
              <SwiperSlide key={`${mobileLink}-${index}`}>
                {(slideData) => (
                  <BannerItem
                    mobileLink={mobileLink}
                    title={title}
                    subTitle={subTitle}
                    onClick={() => handleSelectCategoryBanner(mobileLink, index)}
                    {...slideData}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {items.map(({ mobileImageUrl }, index) => {
            return (
              <BannerBackground
                key={`${mobileImageUrl}-${index}`}
                mobileImageUrl={mobileImageUrl}
                isActive={eq(realIndex, index)}
              />
            );
          })}
        </Wrapper>
      </ImpressionPolicy>
    </InView>
  );
});
