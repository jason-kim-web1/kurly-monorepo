import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useEffect } from 'react';

import useToggle from '../../../../order/checkout/shared/hooks/useToggle';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { MypageInfoForm } from '../../interfaces/MyInfoForm.interface';

import { MYINFO_PERSONAL_INFO_AGREE } from '../../../../order/shared/shared/constants/terms';
import COLOR from '../../../../shared/constant/colorset';

import { ArrowPurple } from '../../../../shared/images';
import Checkbox from '../../../../shared/components/Input/Checkbox';
import TermsViewModal from '../../../../shared/modals/TermsViewModal';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
`;

const checkboxStyle = css`
  padding: 0;
  font-size: 14px;
`;

const Text = styled.span`
  color: ${COLOR.kurlyGray450};
`;

const ViewButton = styled.a`
  margin-left: 5px;
  padding-right: 10px;
  background: url(${ArrowPurple}) no-repeat 100% 50%;
  color: ${COLOR.kurlyPurple};
  cursor: pointer;
`;

const SubCheckboxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 0 0 24px;

  label:first-of-type {
    padding-right: 80px;
  }
`;

const BgLine = styled.div`
  height: 1px;
  background-color: ${COLOR.kurlyGray450};
`;

export default function MyInfoAgreeForm() {
  const {
    values: { agreed },
    handleSelect,
  } = useFormEvent<MypageInfoForm>();

  const { isOpen, open, close } = useToggle();

  const handleChangeSelect = ({ key, checked }: { key: string; checked: boolean }) => {
    // 이벤트 전체 동의를 선택할 경우
    if (key === 'SignupEventAll') {
      handleSelect({ name: 'agreed.OptionalTermsOfSms.checked', value: checked });
      handleSelect({ name: 'agreed.OptionalTermsOfMailing.checked', value: checked });
    }

    handleSelect({ name: `agreed.${key}.checked`, value: checked });
  };

  useEffect(() => {
    const isCheckedSubEvent = Object.values(agreed)
      .filter(({ key: filterKey }) => ['OptionalTermsOfSms', 'OptionalTermsOfMailing'].includes(filterKey))
      .every(({ checked }) => checked);

    handleSelect({ name: 'agreed.SignupEventAll.checked', value: isCheckedSubEvent });
  }, [agreed, handleSelect]);

  return (
    <>
      <InputGroup label="선택약관동의">
        <CheckboxContainer>
          <CheckboxWrapper>
            <Checkbox
              label="개인정보 수집·이용 동의"
              checked={agreed.OptionalTermsOfPrivacy.checked}
              onChange={() =>
                handleChangeSelect({ key: 'OptionalTermsOfPrivacy', checked: !agreed.OptionalTermsOfPrivacy.checked })
              }
              css={checkboxStyle}
            />
            <Text>(선택)</Text>
          </CheckboxWrapper>
          <ViewButton onClick={open}>약관보기</ViewButton>
          <TermsViewModal open={isOpen} onClose={close} params={MYINFO_PERSONAL_INFO_AGREE} />
        </CheckboxContainer>
      </InputGroup>

      <BgLine />

      <InputGroup label="이용약관동의" colspan={true}>
        <CheckboxWrapper>
          <Checkbox
            label="무료배송, 할인쿠폰 등 혜택/정보 수신 동의"
            checked={agreed.SignupEventAll.checked}
            onChange={() => handleChangeSelect({ key: 'SignupEventAll', checked: !agreed.SignupEventAll.checked })}
            css={checkboxStyle}
          />
          <Text>(선택)</Text>
        </CheckboxWrapper>
        <SubCheckboxWrapper>
          <Checkbox
            id="OptionalTermsOfSms"
            label="SMS"
            checked={agreed.OptionalTermsOfSms.checked}
            onChange={() =>
              handleChangeSelect({ key: 'OptionalTermsOfSms', checked: !agreed.OptionalTermsOfSms.checked })
            }
            css={checkboxStyle}
          />
          <Checkbox
            id="OptionalTermsOfMailing"
            label="이메일"
            checked={agreed.OptionalTermsOfMailing.checked}
            onChange={() =>
              handleChangeSelect({ key: 'OptionalTermsOfMailing', checked: !agreed.OptionalTermsOfMailing.checked })
            }
            css={checkboxStyle}
          />
        </SubCheckboxWrapper>
      </InputGroup>
    </>
  );
}
