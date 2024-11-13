import { memo, ReactElement, useMemo } from 'react';

import { isEmpty } from 'lodash';

import ShowMoreSlideItem from './ShowMoreSlideItem';
import MainSwiper from '../../shared/MainSwiper';

interface Props {
  items: ReactElement[];
  slidesPerView: number | 'auto';
  slidesPerGroup?: number;
  top?: number;
  landingUrl?: string;
  className?: string;
  buttonOffset?: number;
  spaceBetween?: number;
  itemCount?: number;
  handleSelectMore(): void;
}

function ListSwiper({
  items,
  slidesPerView,
  top,
  landingUrl,
  handleSelectMore,
  className,
  slidesPerGroup,
  buttonOffset = 50,
  spaceBetween,
  itemCount = 20,
}: Props) {
  const slideItems = useMemo(() => {
    const sliced = items.slice(0, itemCount);

    if (landingUrl) {
      sliced.push(<ShowMoreSlideItem landingUrl={landingUrl} onSelectMore={handleSelectMore} />);
    }

    return sliced;
  }, [handleSelectMore, items, landingUrl, itemCount]);

  if (isEmpty(slideItems)) {
    return null;
  }

  return (
    <MainSwiper
      items={slideItems}
      slidesPerView={slidesPerView}
      slidesPerGroup={slidesPerGroup}
      top={top}
      buttonOffset={buttonOffset}
      className={className}
      spaceBetween={spaceBetween}
    />
  );
}

export default memo(ListSwiper);
