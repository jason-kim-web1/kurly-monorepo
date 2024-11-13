import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { iconInfo } from '../../../../shared/images';

import useRequestState from '../../shared/hooks/useRequestState';
import { RequestStateType } from '../../shared/types/requestStateType';
import COLOR from '../../../../shared/constant/colorset';
import Button from '../../../../shared/components/Button/Button';
import ProgressBar from './ProgressBar';
import ZoomImageLayer from './ZoomImageLayer';
import { REQUEST_NOTICE } from '../../shared/constants/userGuideText';
import { Close } from '../../../../shared/icons';
import { useCompleteRequest, usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';
import { PERSONAL_BOX_COMPLETE_REQUEST } from '../../shared/utils/kurlyPurpleBoxQueryKey';
import useToggle from '../../../../order/checkout/shared/hooks/useToggle';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 440px;
  padding: 45px 30px 30px 30px;
  margin: 0 auto;
  background: ${COLOR.kurlyWhite};
  border-radius: 12px;
  z-index: 10;
  box-sizing: border-box;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 55px;
  height: 55px;
`;

const CloseButtonText = styled.p`
  font-size: 0;
  line-height: 0;
`;

const UploadImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  cursor: zoom-in;
`;

const Title = styled.div<{ requestState: RequestStateType | '' | undefined }>`
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  margin: 33px 0 10px;
  color: ${COLOR.kurlyGray800};
  ${({ requestState }) =>
    requestState === 'REJECTED' &&
    css`
      color: ${COLOR.invalidRed};
    `}
`;

const Message = styled.div`
  font-size: 18px;
  color: ${COLOR.kurlyGray450};
  margin-bottom: 40px;
  white-space: pre;
`;

const NoticeWrapper = styled.dl`
  text-align: left;
  margin-top: 20px;
  padding: 17px 16px 16px 15px;
  border-radius: 6px;
  background-color: ${COLOR.kurlyGray100};
`;

const NoticeTitle = styled.dt`
  padding-left: 20px;
  background: url(${iconInfo}) no-repeat 0 0 / 14px 14px;
  margin-bottom: 10px;
  color: ${COLOR.kurlyGray450};
  font-weight: 500;
}`;

const Description = styled.dd`
  position: relative;
  padding-left: 20px;
  color: ${COLOR.kurlyGray450};
  line-height: 20px;
  ::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: ${COLOR.kurlyGray350};
  }
`;

interface Props {
  handleClosePersonalBoxForm: () => void;
  handleChangeResultForm: (changeResultForm: boolean) => void;
}

export default function ResultForm({ handleClosePersonalBoxForm, handleChangeResultForm }: Props) {
  const queryClient = useQueryClient();
  const { data: personalBox } = usePersonalBox('always');
  const { data: completeRequest } = useCompleteRequest();
  const { title, message } = useRequestState(personalBox?.requestState, completeRequest);
  const { isOpen, toggle } = useToggle();

  const handleClickButton = useCallback(() => {
    if (completeRequest) {
      queryClient.setQueryData(PERSONAL_BOX_COMPLETE_REQUEST, false);
    } else {
      handleChangeResultForm(false);
    }
  }, [completeRequest, handleChangeResultForm, queryClient]);

  return (
    <Wrapper>
      <CloseButton onClick={handleClosePersonalBoxForm} type="button">
        <CloseButtonText>개인 보냉박스 신청 결과 닫기</CloseButtonText>
        <Close />
      </CloseButton>
      {isOpen && <ZoomImageLayer closeZoomLayer={toggle} zoomImage={personalBox?.imageUrl} />}
      <UploadImage src={personalBox?.imageUrl} alt="Upload Image" onClick={toggle} />
      <Title requestState={personalBox?.requestState} data-testid="title">
        {title}
      </Title>
      <Message>{message}</Message>
      {!completeRequest && <ProgressBar />}
      <Button theme="tertiary" text={completeRequest ? '신청 상세보기' : '다시 신청하기'} onClick={handleClickButton} />
      <NoticeWrapper>
        <NoticeTitle>확인해주세요</NoticeTitle>
        {REQUEST_NOTICE.map((description, index) => (
          <Description key={`Request-for-notice-${index}`}>{description}</Description>
        ))}
      </NoticeWrapper>
    </Wrapper>
  );
}
