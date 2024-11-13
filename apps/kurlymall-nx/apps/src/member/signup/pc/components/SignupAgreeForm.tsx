import { css } from '@emotion/react';

import styled from '@emotion/styled';

import { isUndefined } from 'lodash';

import { useDispatch } from 'react-redux';

import { useCallback, useEffect, useState } from 'react';

import COLOR from '../../../../shared/constant/colorset';

import { Arrow, ArrowPurple } from '../../../../shared/images';
import Checkbox from '../../../../shared/components/Input/Checkbox';
import { TermsPolicy } from '../../../../order/shared/shared/constants/terms';

import { isMobileDevice, isMobileWeb, isPC } from '../../../../../util/window/getDevice';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { initialAgreedData, NormalSignupFormInterface } from '../../interfaces/NormalSignupForm.interface';
import TermsViewModal from '../../../../shared/modals/TermsViewModal';
import useToggle from '../../../../order/checkout/shared/hooks/useToggle';
import { SIGNUP_AGREE } from '../../constants';

const styles = {
  checkboxAll: css`
    padding: 0;
    font-weight: ${isPC ? '500' : '600'};
    font-size: ${isPC ? '18px' : '16px'};
  `,
  checkboxLabel: css`
    padding: 0;
    font-size: 14px;
  `,
  subCheckboxLabel: css`
    font-size: 14px;
    padding-right: 60px;

    &:last-of-type {
      padding-right: 0;
    }
  `,
};

const CheckboxContainer = styled.div<{ termsKey: string }>`
  display: flex;
  padding: 8px 0;
  ${({ termsKey }) =>
    termsKey === 'SignupEventAll'
      ? css`
          flex-direction: column;
        `
      : css`
          justify-content: space-between;
          align-items: center;
        `}
  &:first-of-type {
    align-items: flex-start;
    flex-direction: column;
    padding-top: 12px;
  }
`;

const CheckboxHint = styled.p`
  font-size: ${isPC ? '12px' : '14px'};
  color: ${COLOR.kurlyGray600};
  padding-top: ${isPC ? '4px' : '11px'};
  padding-left: ${isPC ? '36px' : '0'};
`;

const CheckboxRequiredText = styled.span`
  padding-left: 5px;
  color: ${COLOR.kurlyGray450};
  word-break: keep-all;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TermsModalButton = styled.a`
  padding-right: ${isPC ? '22px' : 0};
  color: ${COLOR.kurlyPurple};
  letter-spacing: 0;
  &:after {
    content: '';
    display: inline-block;
    margin-left: ${isPC ? '4px' : 0};
    width: ${isPC ? '6px' : '20px'};
    height: ${isPC ? '9px' : '20px'};
    background: url(${isPC ? ArrowPurple : Arrow}) no-repeat 50% 50%;
    background-size: 6px 9px;
  }
`;

const SubCheckboxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 24px;
`;

const SplitBar = styled.div`
  width: 100%;
  border-bottom: 1px solid ${COLOR.bg};
  margin: 8px 0 10px;
`;

const terms: TermsPolicy[] = SIGNUP_AGREE;

export default function SignupAgreeForm() {
  const dispatch = useDispatch();
  const {
    values: { agreed },
    handleSelect,
  } = useFormEvent<NormalSignupFormInterface>();

  const { isOpen, open, close } = useToggle();
  const [openModalKey, setOpenModalKey] = useState<string | null>(null);

  const onChange = ({ key, checked }: { key: string; checked: boolean }) => {
    // 전체 동의 체크박스를 조작 하였을때
    if (key === 'TermsAgreeAll') {
      const keys = Object.keys(initialAgreedData);
      keys.forEach((name) => {
        handleSelect({ name: `agreed.${name}.checked`, value: checked });
      });
      return;
    }

    if (!checked) {
      // 체크를 끄는 행위인 경우 '전체 동의 체크해제'
      handleSelect({ name: 'agreed.TermsAgreeAll.checked', value: false });
    }

    // // 혜택 알림 체크박스를 선택할 경우 이벤트 상세 체크박스 같이 처리
    if (key === 'SignupEventAll') {
      handleSelect({ name: 'agreed.OptionalTermsOfSms.checked', value: checked });
      handleSelect({ name: 'agreed.OptionalTermsOfMailing.checked', value: checked });
    }

    handleSelect({ name: `agreed.${key}.checked`, value: checked });
  };

  useEffect(() => {
    // 체크 하는 행위 일때 모든 체크박스가 ON 이면 '전체동의 체크'
    const isAllChecked = Object.values(agreed).every(({ key, checked }) => {
      return key === 'TermsAgreeAll' || checked;
    });
    if (isAllChecked && !agreed.TermsAgreeAll.checked) {
      handleSelect({ name: 'agreed.TermsAgreeAll.checked', value: true });
    }

    // 혜택 정보를 선택할때 모두 선택 된 경우 '혜택 알림 동의'
    const isCheckedSubEvent = Object.values(agreed)
      .filter(({ key: filterKey }) => ['OptionalTermsOfSms', 'OptionalTermsOfMailing'].includes(filterKey))
      .every(({ checked }) => checked);
    if (agreed.SignupEventAll.checked !== isCheckedSubEvent) {
      handleSelect({ name: 'agreed.SignupEventAll.checked', value: isCheckedSubEvent });
    }
  }, [agreed, dispatch, handleSelect]);

  const handleOpenTermsModal = useCallback(
    (key: string) => {
      setOpenModalKey(key);
      open();
    },
    [open],
  );

  const handleCloseTermsModal = useCallback(() => {
    setOpenModalKey(null);
    close();
  }, [close]);

  return (
    <>
      <CheckboxContainer termsKey={'TermsAgreeAll'}>
        <Checkbox
          id="TermsAgreeAll"
          label="전체 동의합니다."
          checked={agreed.TermsAgreeAll.checked}
          onChange={() => onChange({ key: 'TermsAgreeAll', checked: !agreed.TermsAgreeAll.checked })}
          css={styles.checkboxAll}
        />
        <CheckboxHint>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</CheckboxHint>
      </CheckboxContainer>
      {(isMobileDevice || isMobileWeb) && <SplitBar />}
      {terms &&
        terms.map(({ key, subject, required, url }) => (
          <CheckboxContainer termsKey={key} key={key}>
            <CheckboxWrapper>
              <Checkbox
                id={key}
                label={subject}
                checked={agreed[key].checked}
                onChange={() => onChange({ key, checked: !agreed[key].checked })}
                css={styles.checkboxLabel}
              />
              {!isUndefined(required) && <CheckboxRequiredText>({required ? '필수' : '선택'})</CheckboxRequiredText>}
            </CheckboxWrapper>

            {url && <TermsModalButton onClick={() => handleOpenTermsModal(key)}>{isPC && '약관보기'}</TermsModalButton>}
            {openModalKey === key && (
              <TermsViewModal open={isOpen} onClose={() => handleCloseTermsModal()} params={{ key, url }} />
            )}

            {key === 'SignupEventAll' && (
              <>
                <SubCheckboxWrapper>
                  <Checkbox
                    id={'OptionalTermsOfSms'}
                    label={'SMS'}
                    checked={agreed.OptionalTermsOfSms.checked}
                    onChange={() =>
                      onChange({ key: 'OptionalTermsOfSms', checked: !agreed.OptionalTermsOfSms.checked })
                    }
                    css={styles.subCheckboxLabel}
                  />
                  <Checkbox
                    id={'OptionalTermsOfMailing'}
                    label={'이메일'}
                    checked={agreed.OptionalTermsOfMailing.checked}
                    onChange={() =>
                      onChange({ key: 'OptionalTermsOfMailing', checked: !agreed.OptionalTermsOfMailing.checked })
                    }
                    css={styles.subCheckboxLabel}
                  />
                </SubCheckboxWrapper>
              </>
            )}
          </CheckboxContainer>
        ))}
    </>
  );
}
