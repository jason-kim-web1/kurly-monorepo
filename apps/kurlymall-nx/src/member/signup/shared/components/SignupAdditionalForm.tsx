import { css } from '@emotion/react';

import styled from '@emotion/styled';

import { useCallback, useMemo } from 'react';

import { isPC } from '../../../../../util/window/getDevice';

import COLOR from '../../../../shared/constant/colorset';
import { InputEventType, NormalSignupFormInterface } from '../../interfaces/NormalSignupForm.interface';

import InputBox from '../../../../shared/components/Input/InputBox';
import Radio from '../../../../shared/components/Input/Radio';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import Button from '../../../../shared/components/Button/Button';
import useVerifyExistent from '../../hook/useVerifyExistent';

const HintText = styled.ul`
  margin-left: 10px;

  li {
    color: ${COLOR.kurlyGray600};
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: -8px;
      top: 9px;
      height: 2px;
      width: 2px;
      background-color: ${COLOR.kurlyGray450};
      border-radius: 50%;
    }
  }
`;

const AdditionalInputWrapper = styled.div`
  width: 100%;
`;

const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${isPC ? 'row' : 'column'};
  > label > span {
    font-size: 14px;
  }
`;

const styles = {
  input: css`
    padding-bottom: 0;
  `,
  hintTextInputGroup: css`
    padding-top: ${isPC ? '0px' : '10px'};
    padding-bottom: ${isPC ? '0px' : '10px'};
  `,
};

export default function SignupAdditionalForm() {
  const {
    values: { joinExtraInputType, joinExtraInput },
    handleChange,
  } = useFormEvent<NormalSignupFormInterface>();

  const { verified, isLoading, setMemberId, handleVerifyExistent, clearVerified } = useVerifyExistent();

  const handleRadioChange = useCallback(
    (event: InputEventType) => {
      clearVerified();

      handleChange({ name: 'joinExtraInput', value: '' });
      handleChange(event);
    },
    [clearVerified, handleChange],
  );

  const handleInputChange = useCallback(
    (event: InputEventType) => {
      clearVerified();
      setMemberId(event.value);

      handleChange(event);
    },
    [clearVerified, handleChange, setMemberId],
  );

  const getExtraHint = [
    '가입 후 7일 이내 첫 주문 배송완료 시, 친구초대 적립금이 지급됩니다.',
    'ID 입력시, 대소문자 및 띄어쓰기에 유의 부탁드립니다.',
    '가입 이후는 수정이 불가능합니다.',
  ];

  const getUserCheckButton = useMemo(() => {
    return (
      <Button
        text={'아이디 확인'}
        theme={'secondary'}
        onClick={handleVerifyExistent}
        disabled={verified}
        isSubmitLoading={isLoading}
      />
    );
  }, [handleVerifyExistent, isLoading, verified]);

  return (
    <>
      <InputGroup
        label={'추가입력 사항'}
        description={isPC ? '추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.' : ''}
      >
        <RadioWrapper>
          <Radio
            label={'친구초대 추천인 아이디'}
            value={'RECOMMEND'}
            name="joinExtraInputType"
            id={'additional-recommender'}
            onChange={handleRadioChange}
            selectedValue={joinExtraInputType}
          />
        </RadioWrapper>
      </InputGroup>
      {joinExtraInputType !== 'NONE' && (
        <AdditionalInputWrapper>
          <InputGroup isEmptyLabel action={getUserCheckButton} actionSize={'large'}>
            <InputBox
              name={'joinExtraInput'}
              placeholder={'추천인 아이디 입력'}
              css={styles.input}
              maxLength={16}
              value={joinExtraInput}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup isEmptyLabel css={styles.hintTextInputGroup}>
            <HintText>
              {getExtraHint.map((hint) => (
                <li key={hint}>{hint}</li>
              ))}
            </HintText>
          </InputGroup>
        </AdditionalInputWrapper>
      )}
    </>
  );
}
