import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import MenuItem from '@mui/material/MenuItem';

import { MenuProps, Select, SelectChangeEvent } from '@mui/material';

import { modifySearchInfo } from '../../../../../slice';
import KeywordSearchUserInput from './KeywordSearchUserInput';

import COLOR from '../../../../../../../../shared/constant/colorset';
import { NUMBER_DENY_REGEX, TEXT_DENY_REGEX } from '../../../../../../../../shared/constant';
import SelectWithModal from '../../../../../../../../shared/components/Input/SelectWithModal';
import { isPC } from '../../../../../../../../../util/window/getDevice';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 2.5rem;
  align-items: center;
  margin-top: 0.625rem;
  background-color: ${COLOR.bgLightGray};
  border-radius: 4px;
  > button {
    height: 100%;
    width: 8rem;
    font-size: 14px;
    background-color: ${COLOR.bgLightGray};
    border: none;
    padding: 0 1rem;
    div {
      width: 30px;
    }
  }
`;

const Separator = styled.div`
  padding-right: 0.5rem;
  font-weight: 300;
  color: ${COLOR.kurlyGray350};
`;

export enum OrderProductSearchTab {
  ProductName = 0,
  OrderNumber = 1,
}

const tabs = [
  {
    value: OrderProductSearchTab.ProductName,
    displayName: '상품명',
    placeholder: '상품명을 입력해주세요',
  },
  {
    value: OrderProductSearchTab.OrderNumber,
    displayName: '주문번호',
    placeholder: '주문번호를 입력해주세요',
  },
];

const useStyles = makeStyles({
  select: {
    border: 'none',
    '& .MuiOutlinedInput-input': {
      fontSize: 14,
      width: 50,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiSvgIcon-root': {
      color: `${COLOR.kurlyGray800}`,
    },
  },
});

const menuProps: Partial<MenuProps> = {
  anchorOrigin: {
    vertical: 48,
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  PaperProps: {
    sx: {
      boxShadow: 'none',
      border: `1px solid ${COLOR.bg}`,
      '& .MuiMenuItem-root': {
        fontSize: 14,
        backgroundColor: 'white',
        '&.Mui-selected': {
          color: COLOR.kurlyPurple,
          backgroundColor: 'white',
        },
        '&.Mui-selected:hover': {
          backgroundColor: 'white',
        },
      },
    },
  },
};

interface Props {
  initialInputValue: string;
  initialTabNumber: number;
  displaySearchIcon: boolean;
}

export default function KeywordSearchBar({ initialInputValue, initialTabNumber, displaySearchIcon }: Props) {
  const [userInputValue, setUserInputValue] = useState<string>(initialInputValue);
  const [tabNumber, setTabNumber] = useState<number>(tabs[initialTabNumber].value);
  const [placeHolder, setPlaceHolder] = useState<string>(tabs[initialTabNumber].placeholder);

  const classes = useStyles();

  const dispatch = useDispatch();

  const changeTabNumber = (newTabNumber: number) => {
    const changedTab = tabs[newTabNumber];
    setPlaceHolder(changedTab.placeholder);
    setTabNumber(newTabNumber);
    setUserInputValue('');
    dispatch(modifySearchInfo({ keyword: null }));
    dispatch(modifySearchInfo({ orderNo: null }));
  };

  const handleChangeTab = (event: SelectChangeEvent) => {
    changeTabNumber(Number(event.target.value));
  };

  const handleChangeSelectModal = ({ value }: { name: string; value: string }) => {
    changeTabNumber(Number(value));
  };

  const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const regex = tabNumber === OrderProductSearchTab.ProductName ? TEXT_DENY_REGEX : NUMBER_DENY_REGEX;

    const filtered = value.replace(regex, '');

    setUserInputValue(filtered);
  };

  const submit = () => {
    if (tabNumber === 0) {
      dispatch(modifySearchInfo({ keyword: userInputValue }));
    } else {
      dispatch(modifySearchInfo({ orderNo: userInputValue }));
    }
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    submit();
  };

  const handleDeleteKeyword = () => {
    setUserInputValue('');
  };

  return (
    <Form onSubmit={handleOnSubmit} id="submit">
      {isPC ? (
        <Select
          value={tabNumber.toString()}
          onChange={handleChangeTab}
          className={classes.select}
          MenuProps={menuProps}
        >
          {tabs.map((tab) => (
            <MenuItem key={tab.value} value={tab.value}>
              {tab.displayName}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <SelectWithModal
          title=""
          placeholder=""
          onSelect={handleChangeSelectModal}
          options={tabs.map((it) => ({
            value: it.value.toString(),
            name: it.displayName,
          }))}
          value={{
            name: tabs[tabNumber].displayName,
            value: tabNumber.toString(),
          }}
        />
      )}
      <Separator>|</Separator>
      <KeywordSearchUserInput
        placeholder={placeHolder}
        onChange={handleUserInputChange}
        inputValue={userInputValue}
        displaySearchIcon={displaySearchIcon}
        onSearch={submit}
        onDelete={handleDeleteKeyword}
      />
    </Form>
  );
}
