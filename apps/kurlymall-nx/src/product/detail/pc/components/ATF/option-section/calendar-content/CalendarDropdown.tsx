import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { isEmpty } from 'lodash';

import { format } from 'date-fns';

import COLOR from '../../../../../../../shared/constant/colorset';

import { GroupMemberSubOption } from '../../../../../types';
import { ChangeOptionItemProps, SelectedOptionType } from '../../../../../hooks/useGroupProduct';

import { getDealDisabledText, getFormattedDate } from '../../../../../shared/utils/productDetailState';

import Dropdown from '../../../../../../../shared/components/Input/Dropdown';
import DropdownItem from '../../../../shared/DropdownItem';

const TODAY = format(new Date(), 'yyyy-MM-dd');

const listItem = css`
  .MuiOutlinedInput-root {
    .MuiSelect-select {
      padding-left: 16px;
      font-size: 12px;
      color: ${COLOR.kurlyGray800};
      letter-spacing: -0.5px;
    }
    .MuiSvgIcon-root {
      color: ${COLOR.kurlyGray800};
    }
    .MuiOutlinedInput-notchedOutline {
      margin-bottom: -1px;
    }
  }
`;

const Container = styled.div``;

interface Props {
  optionTitle: string;
  options: GroupMemberSubOption[];
  selectedOption: SelectedOptionType;
  changeOptionItem({ option, optionPosition, optionsType }: ChangeOptionItemProps): void;
}

export default function CalendarDropdown({ optionTitle, options, selectedOption, changeOptionItem }: Props) {
  if (isEmpty(options)) {
    return null;
  }

  const optionItems = options.map((it, index) => {
    const description = getFormattedDate(it.description ?? '');

    const itemDisabledText =
      getDealDisabledText({
        isPurchaseStatus: it.isPurchaseStatus ?? true,
        isSoldOut: it.isSoldOut ?? false,
      }) ?? '';

    const isToday = TODAY === it.description;

    return {
      id: index,
      value: { ...it, optionPosition: index },
      name: description,
      itemDisabledText,
      isToday,
      textWrapper: (
        <DropdownItem
          description={description + (isToday ? '(오늘)' : '')}
          basePrice={it.prices?.basePrice ?? 0}
          retailPrice={it.prices?.retailPrice ?? null}
          discountedPrice={it.prices?.discountedPrice ?? null}
          isSoldOut={it.isSoldOut ?? false}
          isPurchaseStatus={it.isPurchaseStatus ?? true}
          isGroupProduct={true}
        />
      ),
    };
  });

  const selectedValue = optionItems.find(
    (option) => option.name === getFormattedDate(selectedOption.description ?? ''),
  );

  return (
    <Container className="reservation" css={listItem}>
      <Dropdown
        selectedValue={selectedValue}
        options={optionItems}
        onChange={(option) => {
          changeOptionItem({
            option: option.value,
            optionPosition: option.value.optionPosition,
            optionsType: optionTitle,
          });
        }}
        isItemLineType
      />
    </Container>
  );
}
