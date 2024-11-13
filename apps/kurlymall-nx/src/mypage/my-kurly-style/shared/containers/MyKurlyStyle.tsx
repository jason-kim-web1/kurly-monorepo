import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isEmpty } from 'lodash';

import Button from '../../../../shared/components/Button/Button';

import { isPC } from '../../../../../util/window/getDevice';

import Profile from '../../pc/containers/Profile';
import PrivacyPolicy from '../components/PrivacyPolicy';
import ProfileList from '../../m/components/ProfileList';
import SetProfile from '../components/SetProfile';

import { loadMyInfo, loadPrivacyPolicy, updateHasToddler } from '../../slice';
import { useAppSelector } from '../../../../shared/store';
import { redirectTo } from '../../../../shared/reducers/page';
import { getPageUrl, MY_KURLY_STYLE } from '../../../../shared/constant';
import COLOR from '../../../../shared/constant/colorset';
import { MY_KURLY_STYLE_TITLE } from '../constants/myKurlyStyleText';
import Alert from '../../../../shared/components/Alert/Alert';
import { postMyKurlyStyle } from '../../../../shared/services/myKurlyStyle.service';

const SaveKurlyStyle = styled.div`
  display: flex;
  margin: 0 -8px;
`;

const BottomWrapper = styled.div`
  margin-top: 30px;
`;

const InnerWrapper = styled.div`
  padding: 24px 20px;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  color: ${COLOR.kurlyGray800};
  white-space: pre-wrap;
`;

const ButtonWrapper = styled.div`
  ${isPC
    ? css`
        width: 260px;
        margin: 0 auto 20px;
      `
    : css`
        position: fixed;
        bottom: 8px;
        left: 12px;
        right: 12px;
      `}
`;

export default function MyKurlyStyle() {
  const {
    myKurlyStyleInformation: { birthYear, gender, hasToddler, openProfile, sites },
  } = useAppSelector(({ myKurlyStyle }) => myKurlyStyle);

  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEmpty(sites)) {
      dispatch(loadMyInfo());
    }
  }, [dispatch, sites]);

  useEffect(() => {
    dispatch(loadPrivacyPolicy());
  }, [dispatch]);

  const saveMyKurlyStyle = useCallback(async () => {
    if (birthYear && gender) {
      setLoading(true);
      updateHasToddler(false);
      await postMyKurlyStyle(birthYear, gender, hasToddler, openProfile);
      dispatch(redirectTo({ url: getPageUrl(MY_KURLY_STYLE.success) }));
    } else {
      //birthYear와 gender가 없는 경우에는 해당 함수를 실행하는 버튼은 disabled 상태지만 방어코드를 추가합니다.
      await Alert({
        text: '생년월일과 성별을 입력해주세요.',
      });
      return;
    }
  }, [birthYear, dispatch, gender, hasToddler, openProfile]);

  const changeButtonState = useCallback((isValidYearBirth: boolean, isValidGender: boolean) => {
    setIsDisabled(!isValidYearBirth || !isValidGender);
  }, []);

  return (
    <>
      {isPC ? (
        <>
          <Profile changeButtonState={changeButtonState} />
          <PrivacyPolicy />
          <ButtonWrapper>
            <Button text="완료" disabled={isDisabled} onClick={saveMyKurlyStyle} isSubmitLoading={loading} />
          </ButtonWrapper>
        </>
      ) : (
        <InnerWrapper>
          <Title>{MY_KURLY_STYLE_TITLE}</Title>
          <ProfileList changeButtonState={changeButtonState} />
          <SetProfile />
          <BottomWrapper>
            <PrivacyPolicy />
            <SaveKurlyStyle>
              <Button
                text="완료"
                disabled={isDisabled}
                radius={6}
                onClick={saveMyKurlyStyle}
                isSubmitLoading={loading}
              />
            </SaveKurlyStyle>
          </BottomWrapper>
        </InnerWrapper>
      )}
    </>
  );
}
