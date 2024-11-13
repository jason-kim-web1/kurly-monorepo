import { useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';

import { GenderType } from '../types/genderType';
import { RadioStyle } from '../enums/RadioStyle.enum';
import Radio from '../../../../shared/components/Input/Radio';
import { AppState } from '../../../../shared/store';

import { updateGender } from '../../slice';

export const radioStyle = {
  [RadioStyle.default]: isPC
    ? css`
        border: 1px solid ${COLOR.lightGray};
      `
    : css`
        background: ${COLOR.bgLightGray};
        color: ${COLOR.kurlyGray450};
      `,
  [RadioStyle.selected]: isPC
    ? css`
        color: ${COLOR.kurlyPurple};
        border: 1px solid ${COLOR.kurlyPurple};
      `
    : css`
        background: ${COLOR.kurlyPurple};
        color: ${COLOR.kurlyWhite};
      `,
};

const Wrapper = styled.div`
  display: flex;
  ${isPC
    ? css`
        height: 48px;
        margin-top: 42px;
        align-items: flex-start;
      `
    : css`
        height: 57px;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid ${COLOR.bgLightGray};
      `};
`;

const Title = styled.div`
  ${isPC
    ? css`
        flex-shrink: 0;
        width: 205px;
        font-weight: 500;
      `
    : css`
        font-size: 16px;
      `};
`;

const Contents = styled.div`
  ${isPC &&
  css`
    position: relative;
    width: 402px;
  `};
`;

const GenderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  & > label {
    justify-content: center;
    span {
      margin: 0;
    }
    ${isPC
      ? css`
          width: 197px;
          height: 48px;
          border-radius: 4px;
          text-align: center;
        `
      : css`
          margin-left: 8px;
          text-align: center;
          width: 58px;
          height: 34px;
          padding: 11px 0 10px;
          border-radius: 30px;
          font-weight: 600;
          span {
            font-size: 14px;
          }
        `};
  }
`;

interface Props {
  setValidateGender: (isValid: boolean) => void;
}

export default function Gender({ setValidateGender }: Props) {
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState<GenderType | ''>('');

  const {
    myKurlyStyleInformation: { gender },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  const onChange = useCallback(({ value }: { name: string; value: GenderType }) => {
    setSelectedValue(value);
  }, []);

  useEffect(() => {
    if (gender) {
      setSelectedValue(gender);
    }
  }, [gender]);

  useEffect(() => {
    setValidateGender(!isEmpty(selectedValue));

    if (selectedValue) {
      dispatch(updateGender(selectedValue));
    }
  }, [setValidateGender, dispatch, selectedValue]);

  return (
    <Wrapper>
      <Title>성별</Title>
      <Contents>
        <GenderWrapper>
          <Radio
            value="MALE"
            id="MALE"
            name="gender"
            label={isPC ? '남성' : '남'}
            visibleIcon={false}
            selectedValue={selectedValue}
            onChange={onChange}
            css={selectedValue === 'MALE' ? radioStyle.selected : radioStyle.default}
          />
          <Radio
            value="FEMALE"
            id="FEMALE"
            name="gender"
            label={isPC ? '여성' : '여'}
            visibleIcon={false}
            selectedValue={selectedValue}
            onChange={onChange}
            css={selectedValue === 'FEMALE' ? radioStyle.selected : radioStyle.default}
          />
        </GenderWrapper>
      </Contents>
    </Wrapper>
  );
}
