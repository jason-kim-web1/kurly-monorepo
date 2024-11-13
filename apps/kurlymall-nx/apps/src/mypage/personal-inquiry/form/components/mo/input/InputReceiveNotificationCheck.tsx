import styled from '@emotion/styled';

import { ChangeEvent } from 'react';

import { useDispatch } from 'react-redux';

import Checkbox from '../../../../../../shared/components/Input/Checkbox';
import Alert from '../../../../../../shared/components/Alert/Alert';
import ArrowRight from '../../../../../../shared/components/icons/ArrowRight';
import COLOR from '../../../../../../shared/constant/colorset';
import { getPageUrl, MYPAGE_PATH } from '../../../../../../shared/constant';
import { redirectTo } from '../../../../../../shared/reducers/page';
import { ReceiveNotificationNotices } from '../../shared/constants';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Input = styled.input`
  padding: 13px 16px;
  background-color: ${COLOR.kurlyGray100};
  border: 1px solid ${COLOR.kurlyGray200};
  height: 42px;
  ::placeholder {
    color: ${COLOR.disabled};
  }
`;

const Header = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: 29,
  paddingBottom: 12,
});

const Description = styled.span({
  fontSize: '0.75rem',
  color: '#999999',
  padding: '15px 0 19px 0',
});

const InfoChange = styled.div`
  display: flex;
`;

const Text = styled.span({
  fontSize: '.875rem',
});

const CheckboxWrap = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

interface InputReceiveNotificationCheckProps {
  memberMobileMasked: string;
  checked: boolean;
  handleChange(e: ChangeEvent): void;
}

export default function InputReceiveNotificationCheck({
  memberMobileMasked,
  checked,
  handleChange,
}: InputReceiveNotificationCheckProps) {
  const dispatch = useDispatch();

  const onClickChangeInfo = async () => {
    Alert({
      text: '개인정보를 수정하시겠습니까? \n' + ' 작성 중 문의 내용이 있다면, \n' + ' 저장되지 않습니다.',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '확인',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.myInfo) }));
      }
    });
  };

  return (
    <Container>
      <Header>
        <Text>휴대폰</Text>
        <InfoChange>
          <Text onClick={onClickChangeInfo}>정보 변경</Text>
          <ArrowRight />
        </InfoChange>
      </Header>
      <Input type="text" disabled placeholder={memberMobileMasked} />
      <Description>
        {ReceiveNotificationNotices.map((notice) => (
          <div key={notice}>{`※ ${notice}`}</div>
        ))}
      </Description>
      <CheckboxWrap>
        <Checkbox
          id="InputAllowsNotificationCheck"
          name="allowsNotification"
          label=""
          checked={checked}
          onChange={handleChange}
          isFullSize={false}
        />
        <Text>알림메세지 받기</Text>
      </CheckboxWrap>
    </Container>
  );
}
