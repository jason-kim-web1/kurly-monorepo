import type { Dispatch, SetStateAction } from 'react';
import { isEqual } from 'lodash';
import type { ListboxPopoverProps } from '@reach/listbox';

import { amplitudeService, ScreenName } from '../../../../../shared/amplitude';
import { SelectSortType } from '../../../../../shared/amplitude/events/review';
import { ArrowDown, ArrowUp } from '../../../../../shared/icons';
import COLOR from '../../../../../shared/constant/colorset';
import { ListboxButton, ListboxInput, ListboxList, ListboxOption, ListboxPopover } from './styled-components';
import { REVIEW_SORT_TYPE_OPTION_LIST } from '../../constants';
import type { ProductReviewSortType } from '../../types';

type Rect = NonNullable<Parameters<NonNullable<ListboxPopoverProps['position']>>[0]>;

const getCollisions = (targetRect: Rect, popoverRect: Rect, offsetLeft = 0, offsetBottom = 0) => {
  const collisions = {
    top: targetRect.top - popoverRect.height < 0,
    right: window.innerWidth < targetRect.left + popoverRect.width - offsetLeft,
    bottom: window.innerHeight < targetRect.bottom + popoverRect.height - offsetBottom,
    left: targetRect.left + targetRect.width - popoverRect.width < 0,
  };
  const directionRight = collisions.right && !collisions.left;
  const directionLeft = collisions.left && !collisions.right;
  const directionUp = collisions.bottom && !collisions.top;
  const directionDown = collisions.top && !collisions.bottom;
  return { directionRight, directionLeft, directionUp, directionDown };
};

const getTopPosition = (targetRect: Rect, popoverRect: Rect, isDirectionUp: boolean, customOffset = 0) => {
  const top = isDirectionUp
    ? targetRect.top - popoverRect.height + window.pageYOffset - customOffset
    : targetRect.top + targetRect.height + window.pageYOffset + customOffset;
  return {
    top: `${top}px`,
  };
};

interface Props {
  sortType: ProductReviewSortType;
  setSortType: Dispatch<SetStateAction<ProductReviewSortType>>;
}

export default function SortListBox({ sortType, setSortType }: Props) {
  const handleChangeSortType = (value: ProductReviewSortType) => {
    if (isEqual(sortType, value)) {
      return;
    }
    setSortType(value);
    amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_SUBTAB);
    const { browseEventName } = amplitudeService.bucketInstance();
    amplitudeService.logEvent(
      new SelectSortType({
        browseEventName,
        sortType: value,
      }),
    );
  };

  const handlePopoverPosition: ListboxPopoverProps['position'] = (targetRect, popoverRect) => {
    if (!targetRect || !popoverRect) {
      return {};
    }
    const { directionUp } = getCollisions(targetRect, popoverRect);
    return {
      width: targetRect.width,
      left: targetRect.left,
      ...getTopPosition(targetRect, popoverRect, directionUp, 8),
    };
  };

  return (
    <ListboxInput value={sortType} onChange={handleChangeSortType}>
      {({ value, valueLabel, isExpanded }) => (
        <>
          <ListboxButton>
            <span data-value={value}>{valueLabel}</span>
            {isExpanded ? <ArrowUp stroke={COLOR.kurlyGray800} /> : <ArrowDown stroke={COLOR.kurlyGray800} />}
          </ListboxButton>
          <ListboxPopover position={handlePopoverPosition}>
            <ListboxList>
              {REVIEW_SORT_TYPE_OPTION_LIST.map(({ label, value: reviewSortType }) => (
                <ListboxOption key={reviewSortType} value={reviewSortType}>
                  {label}
                </ListboxOption>
              ))}
            </ListboxList>
          </ListboxPopover>
        </>
      )}
    </ListboxInput>
  );
}
