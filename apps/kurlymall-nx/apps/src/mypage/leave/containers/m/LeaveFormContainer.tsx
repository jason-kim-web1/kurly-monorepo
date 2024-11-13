import { FormEvent, useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import LeaveInfo from '../../shared/components/LeaveInfo';
import LeavePasswordCheckForm from '../../shared/components/LeavePasswordCheckForm';
import MobileSelectForm from '../../components/m/MobileSelectForm';
import { InputEventType } from '../../interface/Leave.interface';
import { handleChange } from '../../reducers/leave.slice';
import { useAppSelector } from '../../../../shared/store';
import Alert from '../../../../shared/components/Alert/Alert';
import Button from '../../../../shared/components/Button/Button';
import { useLeaveKurly } from '../../hooks/useLeaveKurly';
import { loadSession } from '../../../../shared/reducers/auth';
import UnavailableGuide from '../../components/m/UnavailableGuide';
import ActiveServiceInfo from '../../components/m/ActiveServiceInfo';
import MobileFooter from '../../../../shared/components/layouts/MobileFooter';
import { useWebview } from '../../../../shared/hooks';

const Container = styled.div`
  overflow: hidden;
  padding-bottom: 20px;
`;

const BoxContent = styled.div`
  padding: 0 20px 20px;
  border-top: 10px solid ${COLOR.bg};
  background-color: ${COLOR.kurlyWhite};
`;

const ButtonWrap = styled.div`
  padding-top: 30px;
`;

const ActiveServiceWrap = styled.div<{ webview: boolean }>`
  padding: 0 20px;

  ${({ webview }) =>
    !webview &&
    css`
      footer {
        bottom: 45px;
      }
    `}
`;

const GuideButtonWrap = styled.div``;

export default function LeaveFormContainer() {
  const dispatch = useDispatch();
  const webview = useWebview();

  const { handleLeaveKurly, handleClickKurlyPayCancel, handleClickMembersCancel } = useLeaveKurly();

  const {
    form: { password, reasonComment },
    reasonCode,
    isKurlyPay,
    isKurlyMembers,
  } = useAppSelector(({ leave }) => leave);

  const [reasonCodeValue, setReasonCodeValue] = useState<Array<string>>([reasonCode.value]);

  useEffect(() => {
    setReasonCodeValue([reasonCode.value]);
    dispatch(loadSession());
  }, [dispatch, reasonCode.value]);

  const onChange = useCallback(
    (event: InputEventType) => {
      dispatch(handleChange(event));
    },
    [dispatch],
  );

  const onSubmit = async () => {
    if (isEmpty(password)) {
      await Alert({
        text: '비밀번호를 입력하여 주십시요.',
      });
      return;
    }

    if (isEmpty(reasonCode.value)) {
      await Alert({
        text: '탈퇴 사유를 선택하여 주세요.',
      });
      return;
    }

    const { isConfirmed } = await Alert({
      text: '회원 탈퇴를 하시면 회원님의 모든 데이터(개인 정보, 포인트 등)가 삭제됩니다. 그래도 회원을 탈퇴하시겠습니까?',
      showCancelButton: true,
    });

    if (isConfirmed) {
      await handleLeaveKurly({ password, reasonComment, reasonCodes: reasonCodeValue });
    }
  };

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();
    await onSubmit();
  };

  return (
    <Container>
      {isKurlyPay || isKurlyMembers ? (
        <>
          <UnavailableGuide />
          <form onSubmit={handleSubmit}>
            <ActiveServiceWrap webview={webview}>
              <ActiveServiceInfo
                isKurlyPay={isKurlyPay}
                isSubscribed={isKurlyMembers}
                handleClickKurlyPayCancel={handleClickKurlyPayCancel}
                handleClickMembersCancel={handleClickMembersCancel}
              />
              <GuideButtonWrap>
                <MobileFooter>
                  <Button text="탈퇴하기" disabled={isKurlyPay || isKurlyMembers} radius={3} onClick={handleSubmit} />
                </MobileFooter>
              </GuideButtonWrap>
            </ActiveServiceWrap>
          </form>
        </>
      ) : (
        <>
          <BoxContent>
            <LeaveInfo />
          </BoxContent>
          <BoxContent>
            <form onSubmit={handleSubmit}>
              <LeavePasswordCheckForm onChange={onChange} />
              <MobileSelectForm />
              <ButtonWrap>
                <Button text="탈퇴하기" radius={3} onClick={handleSubmit} />
              </ButtonWrap>
            </form>
          </BoxContent>
        </>
      )}
    </Container>
  );
}
