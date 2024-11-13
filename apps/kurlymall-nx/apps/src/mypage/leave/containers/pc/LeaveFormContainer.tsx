import { FormEvent, useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import { css } from '@emotion/react';

import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import COLOR from '../../../../shared/constant/colorset';

import { InputEventType } from '../../interface/Leave.interface';
import { handleChange } from '../../reducers/leave.slice';
import LeaveInfo from '../../shared/components/LeaveInfo';
import LeavePasswordCheckForm from '../../shared/components/LeavePasswordCheckForm';
import SelectForm from '../../components/pc/SelectForm';
import { useAppSelector } from '../../../../shared/store';
import Alert from '../../../../shared/components/Alert/Alert';
import Button from '../../../../shared/components/Button/Button';
import { useLeaveKurly } from '../../hooks/useLeaveKurly';
import { loadSession } from '../../../../shared/reducers/auth';
import ActiveServiceInfo from '../../components/pc/ActiveServiceInfo';

const Container = styled.div`
  width: 640px;
  margin: 0 auto;
`;

const Title = styled.div`
  padding: 50px 0 51px;
  border-bottom: 2px solid ${COLOR.kurlyGray800};
  font-weight: 500;
  font-size: 28px;
  letter-spacing: -1px;
  text-align: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0 60px;
`;

const buttonStyle = css`
  width: 120px;
  margin: 0 4px;
  border-radius: 3px;

  > span {
    font-size: 14px;
  }
`;

export default function LeaveFormContainer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleLeaveKurly, handleClickKurlyPayCancel, handleClickMembersCancel } = useLeaveKurly();

  const {
    form: { password, reasonComment },
    reasonCodes,
    isKurlyPay,
    isKurlyMembers,
  } = useAppSelector(({ leave }) => leave);

  useEffect(() => {
    dispatch(loadSession());
  }, [dispatch]);

  const onChange = useCallback(
    (event: InputEventType) => {
      dispatch(handleChange(event));
    },
    [dispatch],
  );

  const onSubmit = async () => {
    if (isEmpty(password)) {
      Alert({
        text: '비밀번호를 입력하여 주십시요.',
      });
      return;
    }

    if (isEmpty(reasonCodes)) {
      Alert({
        text: '서비스 불편사항을 1개 이상 체크하여 주세요\n해당사항은 개선사항에 반영됩니다.',
      });
      return;
    }

    const { isConfirmed } = await Alert({
      text: '회원 탈퇴를 하시면 회원님의 모든 데이터(개인 정보, 포인트 등)가 삭제됩니다.\n그래도 회원을 탈퇴하시겠습니까?',
      showCancelButton: true,
    });

    if (isConfirmed) {
      await handleLeaveKurly({ password, reasonComment, reasonCodes });
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
          <Title>회원탈퇴 불가 안내</Title>
          <ActiveServiceInfo
            isKurlyPay={isKurlyPay}
            isSubscribed={isKurlyMembers}
            handleClickKurlyPayCancel={handleClickKurlyPayCancel}
            handleClickMembersCancel={handleClickMembersCancel}
          />
          <form onSubmit={handleSubmit}>
            <ButtonWrap>
              <Button text="취소" theme="secondary" height={44} css={buttonStyle} onClick={router.back} />
              <Button
                type="submit"
                text="탈퇴"
                disabled={isKurlyPay || isKurlyMembers}
                height={44}
                css={buttonStyle}
                onClick={handleSubmit}
              />
            </ButtonWrap>
          </form>
        </>
      ) : (
        <>
          <Title>회원탈퇴안내</Title>
          <LeaveInfo />
          <form onSubmit={handleSubmit}>
            <LeavePasswordCheckForm onChange={onChange} />
            <SelectForm onChange={onChange} />
            <ButtonWrap>
              <Button text="취소" theme="secondary" height={44} css={buttonStyle} onClick={router.back} />
              <Button type="submit" text="탈퇴" height={44} css={buttonStyle} onClick={handleSubmit} />
            </ButtonWrap>
          </form>
        </>
      )}
    </Container>
  );
}
