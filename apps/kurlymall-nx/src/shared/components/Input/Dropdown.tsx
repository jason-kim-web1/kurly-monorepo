import { ReactElement, useRef } from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@material-ui/core';

import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';

const useStyles = makeStyles({
  select: {
    fontFamily: 'Noto Sans KR',
    'div.MuiPaper-root': {
      transition: 'none !important',
      fontFamily: 'Noto Sans KR',
    },
    '&.MuiSvgIcon-root': {
      color: `${COLOR.kurlyGray800}`,
      '&.Mui-disabled': {
        color: `${COLOR.kurlyGray450}`,
      },
    },
    '& .MuiSelect-iconOutlined': {
      right: '10px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: `${COLOR.lightGray} !important`,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: `${COLOR.lightGray}`,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
    },
  },
});

const TextWrapper = styled.p`
  display: flex;
  justify-content: space-between;
  padding: 11.5px 16px;
`;

export interface Option {
  id: number;
  value: any;
  name: string;
  itemDisabled?: boolean;
  itemDisabledText?: string;
  textWrapper?: ReactElement;
}

interface Props {
  options: Option[];
  onChange(option: Option): void;
  placeholder?: string;
  displayPlaceholder?: boolean;
  selectedValue?: Option;
  direction?: 'down' | 'up';
  disabled?: boolean;
  fontSize?: number;
  anchorOrigin?: number;
  isItemLineType?: boolean;
}

export default function Dropdown({
  options,
  onChange,
  placeholder,
  displayPlaceholder = true,
  selectedValue,
  direction = 'down',
  disabled,
  fontSize = 14,
  anchorOrigin = 48,
  isItemLineType = false,
}: Props) {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (event: any) => {
    const { target } = event;
    onChange(target);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        height: 'fit-content',
        padding: 0,
        boxShadow: 'none',
        borderRadius: 0,
        border: `1px solid ${COLOR.lightGray}`,
        fontFamily: 'Noto Sans KR',
      },
      sx: {
        '& ul': {
          padding: 0,
          '& > li': {
            fontFamily: 'Noto Sans KR',
          },
        },
        '& ul li.Mui-selected:not(.placeholder)': {
          fontWeight: '600',
          backgroundColor: COLOR.kurlyWhite,
          color: COLOR.kurlyPurple,
        },
        '& ul li.MuiMenuItem-root:not(:last-of-type)': {
          borderBottom: isItemLineType ? `1px solid ${COLOR.bg}` : 'none',
        },
        '& .MuiMenuItem-root:hover': {
          backgroundColor: COLOR.kurlyGray100,
          fontFamily: 'Noto Sans KR',
        },
        '& .MuiMenuItem-root.Mui-selected:hover': {
          backgroundColor: COLOR.kurlyGray100,
        },
      },
    },
  };

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <Select
          ref={ref}
          className={classes.select}
          disabled={disabled}
          displayEmpty
          value={selectedValue?.value ?? ''}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            const selectedOption = options.find((option) => option.value === selected);

            if (!selectedOption) {
              return placeholder;
            }

            const itemDisabledText = selectedOption.itemDisabledText ? `(${selectedOption.itemDisabledText})` : '';

            return `${itemDisabledText} ${selectedOption.name}`;
          }}
          MenuProps={{
            ...MenuProps,
            anchorOrigin: {
              vertical: direction === 'down' ? anchorOrigin : 6,
              horizontal: 'center',
            },
            transformOrigin: {
              vertical: direction === 'down' ? 'top' : 'bottom',
              horizontal: 'center',
            },
          }}
          sx={{
            fontSize,
            height: '44px',
            borderColor: '#ddd',
            borderRadius: 0,
            '&:focus': {
              outline: 'none',
            },
            '&.Mui-disabled': {
              backgroundColor: COLOR.kurlyGray100,
            },
          }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {displayPlaceholder && placeholder && (
            <MenuItem
              className="placeholder"
              disabled
              value=""
              sx={{
                fontSize,
                padding: '0 16px',
                lineHeight: '44px',
                fontFamily: 'Noto Sans KR',
                color: COLOR.kurlyGray800,
                cursor: 'pointer',
                '&:disabled': {
                  background: 'transprant',
                },
              }}
            >
              {placeholder}
            </MenuItem>
          )}
          {options.map(({ name, id, value, textWrapper }) => (
            <MenuItem
              key={id}
              value={value}
              disabled={false}
              sx={{
                fontSize,
                padding: 0,
                color: COLOR.kurlyGray800,
                whiteSpace: 'normal',
                cursor: 'pointer',
                '&:hover': {
                  background: COLOR.bgLightGray,
                },
                '&:focus': {
                  background: 'white',
                },
              }}
            >
              {textWrapper || <TextWrapper>{name}</TextWrapper>}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
