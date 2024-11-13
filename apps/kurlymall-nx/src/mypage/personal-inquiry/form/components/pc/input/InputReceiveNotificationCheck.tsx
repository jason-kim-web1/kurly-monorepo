import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

import { css } from '@emotion/react';

import { useDispatch } from 'react-redux';

import Alert from '../../../../../../shared/components/Alert/Alert';
import FormInputRow from './FormInputRow';
import InputBox from '../../../../../../shared/components/Input/InputBox';
import Checkbox from '../../../../../../shared/components/Input/Checkbox';
import COLOR from '../../../../../../shared/constant/colorset';
import { redirectTo } from '../../../../../../shared/reducers/page';
import { getPageUrl, MYPAGE_PATH } from '../../../../../../shared/constant';
import { ReceiveNotificationNotices } from '../../shared/constants';

const Container = styled.div({
  borderTop: '1px solid #ddd',
  borderBottom: '1px solid #ddd',
});

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  width: 160px;
  margin-top: 5px;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 20px;
  padding: 16px 0 4px;
  color: #999;
`;

const MyPageLink = styled.a`
  display: inline-block;
  cursor: pointer;
  &:after {
    display: inline-block;
    width: 6px;
    height: 9px;
    margin-left: 4px;
    background: url('https://res.kurly.com/kurly/ico/2021/arrow_right_6_9_black.svg') 0 0 no-repeat;
    content: '';
  }
`;

const SendMessage = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  label {
    font-size: 14px;
  }
`;

const inputBox = css`
  padding: 0;
  input {
    font-size: 14px;
    font-family: 'Noto Sans KR', sans-serif;
    :disabled {
      color: ${COLOR.kurlyGray350};
    }
  },
`;

interface Props {
  memberMobileMasked: string;
  checked: boolean;
  handleChange(e: ChangeEvent): void;
}

export default function InputReceiveNotificationCheck({ memberMobileMasked, checked, handleChange }: Props) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const { isConfirmed } = await Alert({
      text: '개인정보를 수정하시겠습니까? \n 작성 중 문의 내용이 있다면, \n 저장되지 않습니다.',
      showCancelButton: true,
    });

    if (isConfirmed) {
      dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.myInfo) }));
    }
  };

  return (
    <Container>
      <FormInputRow label="답변 수신" id="inquiryAllowsNotificationCheck" required={false}>
        <InputContainer>
          <InputWrapper>
            <InputBox
              css={inputBox}
              id="inquiryAllowsNotificationCheck"
              width={160}
              height={44}
              value={memberMobileMasked}
              disabled
            />
          </InputWrapper>
          <SendMessage>
            <Checkbox
              css={{ cursor: 'pointer' }}
              id="InputAllowsNotificationCheck"
              name="allowsNotification"
              label="알림메세지 받기"
              checked={checked}
              onChange={handleChange}
            />
          </SendMessage>
          <MyPageLink onClick={handleClick}>개인정보 수정</MyPageLink>
        </InputContainer>
        <Description>
          {ReceiveNotificationNotices.map((notice) => (
            <div key={notice}>{`※ ${notice}`}</div>
          ))}
        </Description>
      </FormInputRow>
    </Container>
  );
}
