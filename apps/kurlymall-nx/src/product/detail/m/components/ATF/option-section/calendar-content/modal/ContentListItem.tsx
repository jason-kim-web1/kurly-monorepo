import styled from '@emotion/styled';

import { ListItemButton, ListItemText } from '@mui/material';

import COLOR from '../../../../../../../../shared/constant/colorset';

import { Icon, Option } from './ContentList';

import { Arrow24x24C5f0080 } from '../../../../../../../../shared/images';
import { getDealDisabledText, getFormattedDate } from '../../../../../../shared/utils/productDetailState';

const listItemButtonStyle = {
  gap: '12px',
  minHeight: '50px',
  borderRadius: 0,
  padding: '0 30px 0 20px',
  fontSize: '15px',
  lineHeight: '20px',

  '&:focus': {
    outline: 'none',
  },
  /* Mui touch transition animation disable */
  '.MuiTouchRipple-root': {
    display: 'none',
  },
};

const ItemText = styled.div<{ disabled: boolean; selected: boolean }>`
  width: 100%;
  ${({ selected }) =>
    selected
      ? `color: ${COLOR.kurlyPurple}; font-weight: 600; word-break: break-word;`
      : `color: ${COLOR.kurlyGray800}; font-weight: 400; height: 20px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`}
  ${({ disabled }) => disabled && `color: ${COLOR.kurlyGray350}; font-weight: 400; word-break: break-word;`};
`;

interface Props {
  option: Option;
  selected: boolean;
  disabled: boolean;
  isSoldOut: boolean;
  isPurchaseStatus: boolean;
  onClickOption(): void;
}

export default function ContentListItem({
  option,
  selected,
  disabled,
  isSoldOut,
  isPurchaseStatus,
  onClickOption,
}: Props) {
  const { description, isToday } = option;

  const disabledText = getDealDisabledText({
    isPurchaseStatus: isPurchaseStatus ?? true,
    isSoldOut: isSoldOut ?? false,
  });
  const formattedDateText = getFormattedDate(description ?? '');
  const optionText = `${!!disabledText ? `(${disabledText})` : ''} ${formattedDateText}${isToday ? '(오늘)' : ''}`;

  return (
    <ListItemButton onClick={onClickOption} sx={listItemButtonStyle}>
      {selected ? <Icon url={Arrow24x24C5f0080} /> : <Icon />}
      <ListItemText
        disableTypography
        primary={
          <ItemText disabled={disabled} selected={selected}>
            {optionText}
          </ItemText>
        }
      />
    </ListItemButton>
  );
}
