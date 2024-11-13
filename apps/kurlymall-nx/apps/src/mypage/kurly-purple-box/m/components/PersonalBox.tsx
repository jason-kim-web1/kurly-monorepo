import styled from '@emotion/styled';
import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import { useQueryClient } from '@tanstack/react-query';

import { redirectTo, redirectToLogin } from '../../../../shared/reducers/page';
import { KURLY_PURPLE_BOX_PATH, getPageUrl } from '../../../../shared/constant';
import { useAppSelector } from '../../../../shared/store';
import Alert from '../../../../shared/components/Alert/Alert';

import { ERROR_MESSAGE, PERSONAL_BOX_AVAILABLE_TEXT } from '../../shared/constants/requestConstant';
import { M_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { PERSONAL_BOX_TEXT } from '../../shared/constants/alternativeText';

import { usePersonalBox, usePersonalBoxAvailable } from '../../shared/hooks/usePersonalBoxQuery';
import PersonalBoxAlternativeText from '../../shared/components/PersonalBoxAlternativeText';
import { PERSONAL_BOX_COMPLETE_REQUEST } from '../../shared/utils/kurlyPurpleBoxQueryKey';

import NextImage from '../../../../shared/components/NextImage';
import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../shared/services/app.service';
import { loadBaseAddressNotification } from '../../../../shared/reducers/shipping-address.slice';

const Wrapper = styled.div`
  position: relative;
`;

const PersonalBoxRequestButton = styled.button`
  position: absolute;
  bottom: 13vw;
  left: 0;
  width: 100%;
  height: 17vw;
  font-size: 0;
  line-height: 0;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 207vw;
`;

export default function PersonalBox() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { isGuest } = useAppSelector(({ auth }) => auth);

  const { data: personalBox, isError: isPersonalBoxError } = usePersonalBox('always');
  const { data: personalBoxAvailable, isError: isAvaliableError } = usePersonalBoxAvailable();

  useEffect(() => {
    if (isGuest) {
      return;
    }
    dispatch(loadBaseAddressNotification());
  }, [isGuest]);

  const handleClickRequest = useCallback(async () => {
    if (isGuest) {
      dispatch(redirectToLogin());
      return;
    }
    if (isPersonalBoxError || isAvaliableError) {
      await Alert({
        text: ERROR_MESSAGE,
      });
      window.location.reload();
      return;
    }
    queryClient.setQueryData(PERSONAL_BOX_COMPLETE_REQUEST, false);
    //개인 보냉박스 신청 여부
    if (isEmpty(personalBox?.requestState)) {
      //신청가능 지역 여부 조회
      if (!personalBoxAvailable) {
        await Alert({
          text: PERSONAL_BOX_AVAILABLE_TEXT,
        });
        return;
      }
      if (isWebview()) {
        appService.openWebview({
          url: `${window.location.origin}${KURLY_PURPLE_BOX_PATH.webviewPersonalBoxRequest.uri}`,
          is_modal: true,
        });
        return;
      }

      dispatch(
        redirectTo({
          url: getPageUrl(KURLY_PURPLE_BOX_PATH.personalBoxRequest),
        }),
      );
      return;
    }
    if (isWebview()) {
      appService.openWebview({
        url: `${window.location.origin}${KURLY_PURPLE_BOX_PATH.webviewPersonalBoxResult.uri}`,
        is_modal: true,
      });
      return;
    }
    dispatch(
      redirectTo({
        url: getPageUrl(KURLY_PURPLE_BOX_PATH.personalBoxResult),
      }),
    );
  }, [dispatch, isAvaliableError, isGuest, isPersonalBoxError, personalBox, personalBoxAvailable, queryClient]);

  return (
    <Wrapper>
      <ImageWrapper>
        <NextImage
          src={`${M_PURPLE_BOX_URL}img_purplebox_18.jpg`}
          alt={PERSONAL_BOX_TEXT}
          layout="fill"
          objectFit="cover"
        />
      </ImageWrapper>
      <PersonalBoxAlternativeText />
      <PersonalBoxRequestButton type="button" onClick={handleClickRequest}>
        신청하기
      </PersonalBoxRequestButton>
    </Wrapper>
  );
}
