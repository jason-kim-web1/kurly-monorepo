import { useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';
import { ArrowPurple } from '../../../../shared/images';

import { useWebview } from '../../../../shared/hooks';
import ButtonGroup from '../../../../shared/components/Button/ButtonGroup';
import { ButtonProps } from '../../../../shared/components/Button/Button';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import { MypageInfoForm } from '../../interfaces/MyInfoForm.interface';
import { isWebview } from '../../../../../util/window/getDevice';
import { MYPAGE_PATH, getPageUrl } from '../../../../shared/constant';
import { redirectTo } from '../../../../shared/reducers/page';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 72px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 14%,
    ${COLOR.kurlyWhite} 100%,
    ${COLOR.kurlyWhite} 100%
  );
`;

const mobileStyle = css`
  bottom: 45px;
  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    bottom: calc(45px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    bottom: calc(45px + env(safe-area-inset-bottom));
  }
`;

const LeaveButton = styled.button`
  margin-left: 5px;
  padding-right: 10px;
  margin-bottom: ${isWebview() ? '30px' : '0px'};
  background: url(${ArrowPurple}) no-repeat 100% 50%;
  color: ${COLOR.kurlyPurple};
`;

interface Props {
  onSubmit: () => void;
}

export default function MobileMyInfoModifySubmit({ onSubmit }: Props) {
  const {
    context: { isSubmitting },
  } = useFormEvent<MypageInfoForm>();

  const webview = useWebview();
  const dispatch = useDispatch();

  const handleClickLeave = () => {
    dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.leave) }));
  };

  const modifyButton: ButtonProps = useMemo(() => {
    return {
      text: '수정 하기',
      height: 48,
      radius: 3,
      isSubmitLoading: isSubmitting,
      onClick: onSubmit,
    };
  }, [isSubmitting, onSubmit]);

  return (
    <Container>
      <LeaveButton type="button" onClick={handleClickLeave}>
        탈퇴하기
      </LeaveButton>
      <ButtonGroup css={!webview && mobileStyle} isFixed contents={[modifyButton]} />
    </Container>
  );
}
