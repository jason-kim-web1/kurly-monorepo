// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Swiper as SwiperCore } from 'swiper/types';

import { css } from '@emotion/react';

import { eq, head } from 'lodash';

import { QuickMenuItem } from './QuickMenuItem';
import useQuickMenuBigBanner from '../../../hooks/useQuickMenuBigBanner';
import { BigBanner } from './BigBanner';
import { PrimaryCategory } from '../../../../shared/reducers/category';
import { ImpressionPolicy, useImpressionPolicy } from '../../../../shared/context/ImpressionPolicyContext';
import { useImpressionLogPolicy } from '../../../queries/useImpressionLogPolicy';

interface Props {
  items: PrimaryCategory[];
  stickyTop: number;
}

const Wrapper = styled.div<{ stickyTop: number }>`
  background: ${vars.color.$white};
  position: sticky;
  top: ${({ stickyTop }) => stickyTop}px;
  z-index: 1000;
  padding: ${vars.spacing.$16} 0;
`;

const swiperStyle = css`
  .swiper-wrapper > .swiper-slide {
    width: auto;
  }
`;

const QuickMenuSwiperImpl = ({ items, stickyTop }: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const { bannerVisible, banner } = useQuickMenuBigBanner(head(items));
  const { registerElement, unRegisterElement } = useImpressionPolicy();
  const { logSection, logSectionItem } = useImpressionLogPolicy();

  const quickMenuImageWrapperRefs = useRef<Map<number, HTMLElement>>(new Map());
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleQuickMenuImpression = () => {
    logSection('category-quick-menu', {
      search_section_id: 'main_category_quick_menu',
    });
  };

  const handleQuickMenuItemImpression = ({ name: title, mobileLink: url, kind }: PrimaryCategory, index: number) => {
    logSectionItem(`category-quick-menu-item-${title}-${index}`, {
      search_section_id: 'main_category_quick_menu',
      content_title: title,
      item_policy: `${items[index].kind},${items[index].code}`,
      item_policy_detail: eq(index, 0) && bannerVisible ? 'main_category_quick_menu_banner' : null,
      item_position: index + 1,
      url: kind === 'url' ? url : null,
    });
  };

  const handleQuickMenuImageWrapperRefs = (index: number) => (el: HTMLElement | null) => {
    if (!el) return;
    quickMenuImageWrapperRefs.current.set(index, el);
  };

  const handleWrapperRef = (el: HTMLDivElement | null) => {
    wrapperRef.current = el;

    if (!ref) return;
    if (typeof ref === 'function') {
      ref(el);
      return;
    }
    ref.current = el;
  };

  const getBigBannerShrinkPosition = useCallback(() => {
    // NOTE: 애니메이션 // 첫번째 퀵메뉴 아이템으로 줄어든다.
    const el = quickMenuImageWrapperRefs.current.get(0);
    const wrapperEl = wrapperRef.current;

    if (!el || !wrapperEl) return null;

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    return {
      x: Math.abs(wrapperRect.left - elRect.left),
      y: Math.abs(wrapperRect.top - elRect.top),
    };
  }, []);

  useEffect(() => {
    if (!swiper?.el || swiper.destroyed) return;

    registerElement(swiper.wrapperEl);

    return () => {
      unRegisterElement(swiper.wrapperEl);
    };
  }, [registerElement, unRegisterElement, swiper]);

  return (
    <Wrapper ref={handleWrapperRef} stickyTop={stickyTop}>
      <ImpressionPolicy onInView={handleQuickMenuImpression}>
        <div>
          <Swiper
            slidesPerView={'auto'}
            slidesOffsetBefore={8}
            slidesOffsetAfter={8}
            spaceBetween={4}
            css={swiperStyle}
            onSwiper={setSwiper}
            centeredSlidesBounds
          >
            {items.map((item, index) => (
              <SwiperSlide key={`${item.mobileLink}-${index}`}>
                <ImpressionPolicy onInView={() => handleQuickMenuItemImpression(item, index)}>
                  <div>
                    <QuickMenuItem {...item} index={index} imageWrapperRef={handleQuickMenuImageWrapperRefs(index)} />
                  </div>
                </ImpressionPolicy>
              </SwiperSlide>
            ))}
          </Swiper>
          {banner && bannerVisible ? (
            <BigBanner banner={banner} shrinkPositionGetter={getBigBannerShrinkPosition} />
          ) : null}
        </div>
      </ImpressionPolicy>
    </Wrapper>
  );
};

const QuickMenuSwiper = forwardRef(QuickMenuSwiperImpl);

export { QuickMenuSwiper };
