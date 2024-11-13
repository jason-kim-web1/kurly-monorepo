import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';

import useToggle from '../../../../order/checkout/shared/hooks/useToggle';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { MypageInfoForm } from '../../interfaces/MyInfoForm.interface';

import { LinkArrowRight } from '../../../../shared/images';
import { MYINFO_PERSONAL_INFO_AGREE } from '../../../../order/shared/shared/constants/terms';

import Checkbox from '../../../../shared/components/Input/Checkbox';
import TermsViewModal from '../../../../shared/modals/TermsViewModal';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';

const Container = styled.div`
  position: relative;
  padding-top: 16px;

  &:after {
    position: absolute;
    top: 10px;
    left: -20px;
    right: -20px;
    height: 10px;
    background-color: ${COLOR.bg};
    content: '';
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 0;
`;

const checkboxStyle = css`
  padding: 0;
  font-size: 14px;
`;

const Text = styled.span`
  color: ${COLOR.kurlyGray450};
`;

const ViewButton = styled.a`
  width: 40px;
  height: 40px;
  margin-left: 5px;
  font-size: 0;
  line-height: 0;
  background: url(${LinkArrowRight}) no-repeat 100% 50%;
`;

export default function MobileMyInfoAgreeForm() {
  const {
    values: { agreed },
    handleSelect,
  } = useFormEvent<MypageInfoForm>();
  const { isOpen, open, close } = useToggle();

  const handleChangeSelect = ({ key, checked }: { key: string; checked: boolean }) => {
    handleSelect({ name: `agreed.${key}.checked`, value: checked });
  };

  return (
    <Container>
      <InputGroup label="약관 및 마케팅 수신 동의">
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

        <CheckboxWrapper>
          <Checkbox
            label="마케팅 이메일 수신"
            checked={agreed.OptionalTermsOfMailing.checked}
            onChange={() =>
              handleChangeSelect({ key: 'OptionalTermsOfMailing', checked: !agreed.OptionalTermsOfMailing.checked })
            }
            css={checkboxStyle}
          />
          <Text>(선택)</Text>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <Checkbox
            label="마케팅 SMS 수신"
            checked={agreed.OptionalTermsOfSms.checked}
            onChange={() =>
              handleChangeSelect({ key: 'OptionalTermsOfSms', checked: !agreed.OptionalTermsOfSms.checked })
            }
            css={checkboxStyle}
          />
          <Text>(선택)</Text>
        </CheckboxWrapper>
      </InputGroup>
    </Container>
  );
}
