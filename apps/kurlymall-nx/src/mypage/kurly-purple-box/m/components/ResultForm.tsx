import styled from '@emotion/styled';

import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import { useQueryClient } from '@tanstack/react-query';

import { iconInfo } from '../../../../shared/images';

import useRequestState from '../../shared/hooks/useRequestState';
import { RequestStateType } from '../../shared/types/requestStateType';
import { KURLY_PURPLE_BOX_PATH, USER_MENU_PATH } from '../../../../shared/constant';
import ProgressBar from './ProgressBar';
import Button from '../../../../shared/components/Button/Button';
import COLOR from '../../../../shared/constant/colorset';
import ZoomImageLayer from './ZoomImageLayer';
import { REQUEST_NOTICE } from '../../shared/constants/userGuideText';
import { useCompleteRequest, usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';
import { PERSONAL_BOX_COMPLETE_REQUEST } from '../../shared/utils/kurlyPurpleBoxQueryKey';
import useToggle from '../../../../order/checkout/shared/hooks/useToggle';
import { isWebview } from '../../../../../util/window/getDevice';
import { redirectTo } from '../../../../shared/reducers/page';

const Wrapper = styled.div`
  padding: 60px 20px 20px;
  text-align: center;
`;

const Footer = styled.div`
  padding-top: 40px;
`;

const UploadImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const Title = styled.div<{ requestState: RequestStateType | '' | undefined }>`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin: 17px 0 8px;
  ${({ requestState }) =>
    requestState === 'REJECTED' &&
    css`
      color: ${COLOR.invalidRed};
    `}
`;

const Message = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR.kurlyGray450};
  white-space: pre;
`;

const NoticeWrapper = styled.dl`
  text-align: left;
  margin-top: 20px;
  padding: 17px 10px 16px 15px;
  border-radius: 6px;
  background-color: ${COLOR.kurlyGray100};
`;

const NoticeTitle = styled.dt`
  padding-left: 20px;
  background: url(${iconInfo}) no-repeat 0 0 / 14px 14px;
  margin-bottom: 10px;
  color: ${COLOR.kurlyGray450};
  font-weight: 500;
`;

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

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  column-gap: 7px;
`;

export default function ResultForm() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data: personalBox } = usePersonalBox();
  const { data: completeRequest } = useCompleteRequest();
  const { title, message } = useRequestState(personalBox?.requestState, completeRequest);
  const { isOpen, toggle } = useToggle();

  const handleClickRetry = useCallback(async () => {
    const redirectUrl = isWebview()
      ? KURLY_PURPLE_BOX_PATH.webviewPersonalBoxRequest.uri
      : KURLY_PURPLE_BOX_PATH.personalBoxRequest.uri;

    dispatch(
      redirectTo({
        url: redirectUrl,
      }),
    );
  }, [dispatch]);

  const handleClickViewRequestState = useCallback(async () => {
    await queryClient.invalidateQueries(PERSONAL_BOX_COMPLETE_REQUEST);
    queryClient.setQueryData(PERSONAL_BOX_COMPLETE_REQUEST, false);
  }, [queryClient]);

  const handleClickGoToMain = useCallback(() => {
    dispatch(
      redirectTo({
        url: USER_MENU_PATH.home.uri,
      }),
    );
  }, [dispatch]);

  return (
    <Wrapper>
      {isOpen && <ZoomImageLayer closeZoomLayer={toggle} zoomImage={personalBox?.imageUrl} />}
      <UploadImage src={personalBox?.imageUrl} alt="Upload Image" onClick={toggle} />
      <Title requestState={personalBox?.requestState}>{title}</Title>
      <Message>{message}</Message>
      <Footer>
        {!completeRequest && (
          <>
            <ProgressBar />
            <Button theme="tertiary" onClick={handleClickRetry} text="다시 신청하기" />
          </>
        )}
        <NoticeWrapper>
          <NoticeTitle>확인해주세요</NoticeTitle>
          {REQUEST_NOTICE.map((description, index) => (
            <Description key={`Request-for-notice-${index}`}>{description}</Description>
          ))}
        </NoticeWrapper>
        {completeRequest && (
          <ButtonWrapper>
            <Button theme="tertiary" onClick={handleClickViewRequestState} text="신청 상세보기" />
            <Button onClick={handleClickGoToMain} text="쇼핑 계속하기" />
          </ButtonWrapper>
        )}
      </Footer>
    </Wrapper>
  );
}
