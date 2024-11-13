import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useEffect } from 'react';

import { isEmpty } from 'lodash';

import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import CloseButton from '../../../../../src/shared/components/Button/CloseButton';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import Profile from './Profile';
import { AppState } from '../../../../shared/store';
import Alert from '../../../../../src/shared/components/Alert/Alert';
import { loadMyInfo } from '../../slice';
import Loading from '../../../../shared/components/Loading/Loading';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectBackButton } from '../../../../shared/amplitude/events/mykurly-style/SelectBackButton';

const Container = styled.div``;

const contentsStyle = `
  .popup-title {
    white-space: pre;
  }
  .popup-footer {
    flex-direction: column;
    padding: 0 24px;
    margin-top: 30px;
    height: auto;
  }
  .popup-footer button {
    width: 100%;
    height: 48px;
    border: 1px solid #ddd;
    border-radius: 6px;
    margin: 0;
    color: #333;
  }
  .popup-footer button:last-of-type {
    color: #fff;
    background: #5F0080;
    border: none;
    margin: 8px 0 24px 0;
  }
`;

export default function ProfileContainer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const profileId = router.query.siteId as string;
  const {
    loading,
    myKurlyStyleInformation: { sites },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  useEffect(() => {
    if (isEmpty(sites)) {
      dispatch(loadMyInfo());
    }
  }, [dispatch]);

  const result = sites.find(({ id }) => id === profileId);

  const clickCloseButtonInListLayout = useCallback(async () => {
    void amplitudeService.logEvent(new SelectBackButton({ selectionType: 'cancel', profileType: profileId }));
    const { isConfirmed } = await Alert({
      text: '저장을 누르지 않고 종료 시 변경된 내용은 저장되지 않습니다. 종료하시겠습니까?',
      confirmButtonText: '종료',
      cancelButtonText: '아니요',
      showCancelButton: true,
      allowOutsideClick: false,
    });

    if (isConfirmed) {
      router.back();
    }
  }, [profileId, router]);

  const clickCloseButtonInStepLayout = useCallback(async () => {
    void amplitudeService.logEvent(new SelectBackButton({ selectionType: 'X', profileType: profileId }));
    const { isConfirmed } = await Alert({
      title: '아직 입력하지 않은 정보가 있습니다.\n모든 질문에 답변 후 저장해주세요.',
      contentsStyle,
      confirmButtonText: '이어서 입력하기',
      cancelButtonText: '다음에 하기',
      showCancelButton: true,
      allowOutsideClick: false,
    });

    if (!isConfirmed) {
      router.back();
    }
  }, [profileId, router]);

  if (loading || !result) {
    return <Loading />;
  }

  const { hasProfile, name } = result;

  return (
    <AuthContainer loginRequired>
      <MobileHeader visibleBanner={false}>
        <HeaderButtons position="left">
          <CloseButton onClick={hasProfile ? clickCloseButtonInListLayout : clickCloseButtonInStepLayout} />
        </HeaderButtons>
        <HeaderTitle>{name}</HeaderTitle>
      </MobileHeader>
      <Container>
        <Profile profileId={profileId} hasProfile={hasProfile} />
      </Container>
    </AuthContainer>
  );
}
