import styled from '@emotion/styled';

import { Collapse, List } from '@mui/material';

import { format } from 'date-fns';

import { getDealDisabledText, getFormattedDate } from '../../../../../../shared/utils/productDetailState';

import { GroupMemberSubOption } from '../../../../../../types';

import COLOR from '../../../../../../../../shared/constant/colorset';
import SelectedOptionItem from './SelectedOptionItem';
import ContentListItem from './ContentListItem';
import { HandleChangeOptionProps } from '../CalendarContent';
import { hiddenScrollBar } from '../../../../../../../../shared/utils/hidden-scrollbar';

const TODAY = format(new Date(), 'yyyy-MM-dd');

const listStyle = {
  padding: '12px 0',
  backgroundColor: `${COLOR.bgLightGray}`,
  '& li': {
    display: 'none',
  },
};

const ListWrapper = styled.div`
  @supports (max-height: constant(safe-area-inset-top) -constant(safe-area-inset-bottom)) {
    max-height: calc(100vh - (380px + constant(safe-area-inset-top) + constant(safe-area-inset-bottom)));
  }
  @supports (max-height: env(safe-area-inset-top) - env(safe-area-inset-bottom)) {
    max-height: calc(100vh - (380px + env(safe-area-inset-top) + env(safe-area-inset-bottom)));
  }

  ${hiddenScrollBar({ x: 'visible' })};
`;

export const Icon = styled.div<{ url?: string }>`
  min-width: 24px;
  height: 24px;
  background: ${(props) => (props.url ? `url(${props.url}) no-repeat 50% 50%` : '')};
`;

export interface Option {
  id: number;
  contentsProductNo: number;
  description: string | null;
  imageUrl: string;
  isSoldOut: boolean;
  isPurchaseStatus: boolean;
  isToday: boolean;
  prices: {
    retailPrice: number | null;
    basePrice: number;
    discountedPrice: number | null;
    discountedRate: number;
  };
  value: GroupMemberSubOption;
}

interface Props {
  open: boolean;
  optionsIndex: number;
  optionTitle: string;
  options: GroupMemberSubOption[];
  selectedValue: string;
  clickOpenOptionList(index: number): void;
  clickOptionItem({ optionsIndex, option, optionPosition, optionTitle }: HandleChangeOptionProps): void;
}

export default function ContentList({
  open,
  clickOpenOptionList,
  optionsIndex,
  optionTitle,
  options,
  selectedValue,
  clickOptionItem,
}: Props) {
  const optionItems = options.map((it, i) => {
    const description = it.description ?? '';

    const isToday = TODAY === it.description;

    return {
      id: i,
      contentsProductNo: it.contentsProductNo ?? 0,
      description,
      imageUrl: it.imageUrl ?? '',
      isSoldOut: it.isSoldOut ?? false,
      isPurchaseStatus: it.isPurchaseStatus ?? true,
      isToday,
      prices: {
        retailPrice: it.prices?.retailPrice ?? null,
        basePrice: it.prices?.basePrice ?? 0,
        discountedPrice: it.prices?.discountedPrice ?? null,
        discountedRate: it.prices?.discountedRate ?? 0,
      },
      value: it,
    };
  });

  const isProductOption = optionsIndex !== 0;

  const selectedOption = optionItems.find((it) => it.description === selectedValue);

  const disabledText = getDealDisabledText({
    isPurchaseStatus: selectedOption?.isPurchaseStatus ?? true,
    isSoldOut: selectedOption?.isSoldOut ?? false,
  });

  const selectedOptionText =
    (disabledText ? `(${disabledText}) ` : '') + getFormattedDate(selectedOption?.description ?? '');

  return (
    <>
      <List disablePadding>
        <SelectedOptionItem
          index={optionsIndex}
          open={open}
          selectedOptionText={selectedOptionText}
          isToday={selectedOption?.isToday ?? false}
          isProductOption={isProductOption}
          clickOpenOptionList={clickOpenOptionList}
        />
      </List>
      <ListWrapper>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" sx={listStyle}>
            {optionItems.map((option, optionPosition) => (
              <ContentListItem
                key={optionPosition}
                option={option}
                selected={option.value.description === selectedOption?.description}
                disabled={option.isSoldOut || !option.isPurchaseStatus}
                isSoldOut={option.isSoldOut}
                isPurchaseStatus={option.isPurchaseStatus}
                onClickOption={() =>
                  clickOptionItem({
                    optionsIndex,
                    option,
                    optionPosition,
                    optionTitle,
                  })
                }
              />
            ))}
          </List>
        </Collapse>
      </ListWrapper>
    </>
  );
}
