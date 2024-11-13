import styled from '@emotion/styled';

import { createStyles, makeStyles } from '@material-ui/core';
import { ListItemButton, ListItemText } from '@mui/material';

import { Icon } from './ContentList';
import {
  Calendar24x24C333,
  Close24x24C333,
  Open24x24C333,
  Option24x24C333,
} from '../../../../../../../../shared/images';

const IconWrapper = styled.span`
  margin-left: 4px;
`;

const ItemTextWrapper = styled.div`
  width: 259px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
`;

const useStyles = makeStyles(() =>
  createStyles({
    ListHeaderText: {
      fontSize: '15px',
      fontWeight: 600,
      lineHeight: '20px',
    },
  }),
);

const listItemStyle = {
  gap: '12px',
  height: '60px',
  fontSize: '15px',
  fontWeight: 600,
  padding: '0 16px 0 20px',
  '& .MuiTypography-root': {
    fontFamily:
      '-apple-system, "BlinkMacSystemFont", "AppleSDGothicNeo", "Apple SD Gothic Neo", "Helvetica", "Noto Sans KR", "malgun gothic", "맑은 고딕", sans-serif',
  },

  '.MuiTouchRipple-root': {
    display: 'none',
  },
};

interface Props {
  index: number;
  isProductOption: boolean;
  open: boolean;
  selectedOptionText: string | null;
  isToday: boolean;
  clickOpenOptionList(index: number): void;
}

export default function SelectedOptionItem({
  index,
  isProductOption,
  open,
  selectedOptionText,
  isToday,
  clickOpenOptionList,
}: Props) {
  const classes = useStyles();

  const text = selectedOptionText + (isToday ? '(오늘)' : '');

  return (
    <ListItemButton onClick={() => clickOpenOptionList(index)} sx={listItemStyle}>
      <Icon url={isProductOption ? Option24x24C333 : Calendar24x24C333} />
      <ListItemText classes={{ primary: classes.ListHeaderText }} primary={<ItemTextWrapper>{text}</ItemTextWrapper>} />
      <IconWrapper>{open ? <Icon url={Close24x24C333} /> : <Icon url={Open24x24C333} />}</IconWrapper>
    </ListItemButton>
  );
}
