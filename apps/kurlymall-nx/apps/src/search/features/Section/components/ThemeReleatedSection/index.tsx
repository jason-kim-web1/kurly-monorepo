import { css } from '@emotion/css';
import { Swiper as SwiperClass } from 'swiper/types';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { ForwardedRef, forwardRef, useRef } from 'react';
import { useRouter } from 'next/router';

import { ImpressionSection } from '../../shared/components/ImpressionSection';
import { ThemeRelatedSectionViewModel, ThemeRelatedSectionItemViewModel } from '../../factory';
import COLOR from '../../../../../shared/constant/colorset';
import { ImpressionSectionItem } from '../../shared/components/ImpressionSectionItem';
import { ProductShortCutMeta, useLogger } from '../../../../contexts/LogSearchContext';
import type { ShortCutType } from '../../../../../shared/types';
import { ThemeSectionHeader } from '../shared/components/ThemeSectionHeader';
import { ThemeSectionAdMark } from '../shared/components/ThemeSectionAdlMark';
import { ThemeSectionProductCard } from '../shared/components/ThemeSectionProductCard';
import { ThemeSectionProductListWrap } from '../shared/components/ThemeSectionProductListWrap';
import { ThemeSectionShowMoreCard } from '../shared/components/ThemeSectionShowMoreCard';

const MAX_CARD_WIDTH = 360;

const sectionStyle = css`
  position: relative;
  padding-bottom: 24px;
`;

const productCardWrapStyle = css`
  background-color: ${COLOR.kurlyWhite};
  border-radius: 6px;
  overflow: hidden;
`;

export const swiperStyles = {
  padding: '0px 16px 24px 16px',
  '.swiper-slide': {
    maxWidth: `${MAX_CARD_WIDTH}px`,
  },
};

type OnClickProductCardFn = (product: ThemeRelatedSectionItemViewModel) => void;
type OnClickProductCardShortCutFn = (product: ThemeRelatedSectionItemViewModel, meta: ProductShortCutMeta) => void;

type SectionItemProps = {
  data: ThemeRelatedSectionItemViewModel;
  onClickProductCard: OnClickProductCardFn;
  onClickProductCardShortCut: OnClickProductCardShortCutFn;
};

const SectionItemImpl = (
  { data, onClickProductCard, onClickProductCardShortCut }: SectionItemProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const handleClickProductCard = () => onClickProductCard(data);
  const handleClickProductCardShortcut = (type: ShortCutType) => onClickProductCardShortCut(data, { type });
  return (
    <div ref={ref} className={productCardWrapStyle}>
      <ThemeSectionProductCard
        product={data}
        onClickProductCard={handleClickProductCard}
        onClickProductCardShortcut={handleClickProductCardShortcut}
      />
    </div>
  );
};

const SectionItem = forwardRef(SectionItemImpl);

type Props = {
  section: ThemeRelatedSectionViewModel;
};

const ThemeRelatedSection = ({ section }: Props) => {
  const { push } = useRouter();
  const swiperRef = useRef<SwiperClass | null>(null);
  const {
    data: { sectionInfo, items },
  } = section;
  const { collectionCode, title, subtitle, hasMore, isAds, fontColor, backgroundColor } = sectionInfo;
  const { logSelectSectionItem, logSelectSectionItemShortCut, logSelectSectionItemType } = useLogger();

  const handleClickShowMore = (selectionType: 'all' | 'more') => () => {
    logSelectSectionItemType(section, selectionType);
    if (collectionCode) {
      push(`/collections/${collectionCode}`);
    }
  };

  const handleClickProductCard: OnClickProductCardFn = (product) => logSelectSectionItem(section, product);

  const handleClickProductCardShortCut: OnClickProductCardShortCutFn = (product, meta) =>
    logSelectSectionItemShortCut(section, product, meta);

  return (
    <ImpressionSection section={section} className={sectionStyle} style={{ backgroundColor, color: fontColor }}>
      <>
        <ThemeSectionHeader
          title={title}
          subTitle={subtitle}
          onClickShowMore={handleClickShowMore('all')}
          showMoreIconColor={fontColor}
        />
        <ThemeSectionProductListWrap>
          <Swiper
            slidesPerView="auto"
            spaceBetween={8}
            css={swiperStyles}
            freeMode
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            touchStartPreventDefault={false}
          >
            {items.map((item) => {
              const { _id } = item;
              return (
                <SwiperSlide key={_id}>
                  <ImpressionSectionItem section={section} item={item}>
                    <SectionItem
                      data={item}
                      onClickProductCard={handleClickProductCard}
                      onClickProductCardShortCut={handleClickProductCardShortCut}
                    />
                  </ImpressionSectionItem>
                </SwiperSlide>
              );
            })}
            {hasMore ? (
              <SwiperSlide>
                <ThemeSectionShowMoreCard isLabelGray color={fontColor} onClick={handleClickShowMore('more')} />
              </SwiperSlide>
            ) : null}
          </Swiper>
        </ThemeSectionProductListWrap>
        <ThemeSectionAdMark isAds={isAds} color={COLOR.kurlyGray300} />
      </>
    </ImpressionSection>
  );
};

export { ThemeRelatedSection };
