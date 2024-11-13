import { useCallback, useEffect, useMemo, useState } from 'react';

import { size } from 'lodash';

import { ViewedProduct } from '../../../product/detail/types';
import { loadLocalStorage } from '../../../shared/services/storage.service';
import {
  FIRST_PRODUCT,
  LAST_TWO_PRODUCTS,
  MAXIMUM_LIST_HEIGHT,
  MAXIMUM_VIEW_SIZE,
  THUMBNAIL_HEIGHT,
  DEFAULT_MARGIN,
  ONE_THUMBNAILS_MARGIN,
  TWO_THUMBNAILS_MARGIN,
  THREE_THUMBNAILS_MARGIN,
} from '../constants';

export default function useFloatingNavigator() {
  const [positionIndex, setPositionIndex] = useState(FIRST_PRODUCT);
  const [positionValue, setPositionValue] = useState(FIRST_PRODUCT);
  const [recentProducts, setRecentProducts] = useState<ViewedProduct[]>([]);
  const [disabledPrevButton, setDisabledPrevButton] = useState(true);
  const [disabledNextButton, setDisabledNextButton] = useState(true);
  const lastPositionIndex = useMemo(() => size(recentProducts) - LAST_TWO_PRODUCTS, [recentProducts]);
  const lastPositionValue = useMemo(
    () => THUMBNAIL_HEIGHT * lastPositionIndex + MAXIMUM_LIST_HEIGHT - THUMBNAIL_HEIGHT * MAXIMUM_VIEW_SIZE,
    [lastPositionIndex],
  );

  const getCenterAlignMargin = useCallback((): number => {
    const recentProductsSize = size(recentProducts);
    if (recentProductsSize === 1) {
      return ONE_THUMBNAILS_MARGIN;
    } else if (recentProductsSize === 2) {
      return TWO_THUMBNAILS_MARGIN;
    } else if (recentProductsSize > 2) {
      return THREE_THUMBNAILS_MARGIN;
    }
    return DEFAULT_MARGIN;
  }, [recentProducts]);

  const handleClickButton = useCallback(
    (buttonType: 'prev' | 'next') => () => {
      const nowPosition = buttonType === 'prev' ? positionIndex - 1 : positionIndex + 1;
      setPositionIndex(nowPosition);
      setDisabledPrevButton(nowPosition === FIRST_PRODUCT);
      setDisabledNextButton(nowPosition === lastPositionIndex);
      setPositionValue(nowPosition === lastPositionIndex ? lastPositionValue : THUMBNAIL_HEIGHT * nowPosition);
    },
    [lastPositionIndex, lastPositionValue, positionIndex],
  );

  useEffect(() => {
    const items = loadLocalStorage<ViewedProduct[]>('viewedProducts') || [];
    setRecentProducts(items);
    setDisabledNextButton(size(items) < MAXIMUM_VIEW_SIZE);
  }, []);

  return {
    positionValue,
    recentProducts,
    disabledPrevButton,
    disabledNextButton,
    handleClickButton,
    getCenterAlignMargin,
  };
}
