import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';
import Button from '../../../../shared/components/Button/Button';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { MypageInfoForm } from '../../interfaces/MyInfoForm.interface';
import { MYPAGE_PATH, getPageUrl } from '../../../../shared/constant';
import { redirectTo } from '../../../../shared/reducers/page';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-top: 40px;
  border-top: 1px solid ${COLOR.bg};

  > button {
    width: 120px;
    height: 44px;
    margin: 0 3px;
    border-radius: 3px;

    > span {
      font-size: 14px;
    }
  }
`;

interface Props {
  onSubmit: () => void;
}
export default function MyInfoModifySubmit({ onSubmit }: Props) {
  const {
    context: { isSubmitting },
  } = useFormEvent<MypageInfoForm>();

  const dispatch = useDispatch();

  const handleClickLeave = () => {
    dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.leave) }));
  };

  return (
    <Container>
      <Button text="탈퇴하기" theme="secondary" onClick={handleClickLeave} />
      <Button type="submit" text="회원정보수정" isSubmitLoading={isSubmitting} onClick={onSubmit} />
    </Container>
  );
}
