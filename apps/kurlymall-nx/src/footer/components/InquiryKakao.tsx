import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { loadInquiryKakao } from '../../shared/reducers/InquiryKakao';

import { useAppSelector } from '../../shared/store';

import { isPC, isWebview } from '../../../util/window/getDevice';
import appService from '../../shared/services/app.service';
import { DialogProps } from '../../shared/services/serviceCode';
import Alert from '../../shared/components/Alert/Alert';
import deepLinkUrl from '../../shared/constant/deepLink';
import COLOR from '../../shared/constant/colorset';
import { amplitudeService } from '../../shared/amplitude';
import { SelectBottomKakaoButton } from '../../shared/amplitude/events/footer';
import { KAKAO_CS_URL } from '../../shared/configs/config';

const KakaoInquiryButton = styled.button`
  display: block;
  width: 140px;
  height: 40px;
  border: 1px solid ${COLOR.kurlyGray250};
  border-radius: 3px;
  line-height: 39px;
  text-align: center;
`;

export default function InquiryKakao(props: unknown) {
  const dispatch = useDispatch();
  const { code, okButtonActionUrl, title, message, cancelButtonTitle, okButtonTitle, isKakaoUrl } = useAppSelector(
    ({ inquirykakao }) => inquirykakao,
  );

  useEffect(() => {
    dispatch(loadInquiryKakao());
  }, [dispatch]);

  /**
   * okButtonActionUrl 에 'https://api.happytalk.io/' 문자열 체크하는 이유는 카카오톡으로 보내기 위해서. 만약 오전 7 ~ 오후 7시 사이가 아니라면 1:1 문의하기로 이동됨
   */

  const appServiceUse = () => {
    if (!code) {
      window.location.href = okButtonActionUrl;
      return;
    }

    const sendData: DialogProps = {
      code,
      title,
      message,
      cancel_button_title: cancelButtonTitle,
      ok_button_title: okButtonTitle,
      ok_button_action_url: !isKakaoUrl ? KAKAO_CS_URL : deepLinkUrl.PERSONAL_INQUIRY,
    };

    appService.postDialog(sendData);
  };

  const webServiceUse = () => {
    if (!isKakaoUrl) {
      Alert({
        text: message,
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(okButtonActionUrl, '_blank');
        }
      });
      return;
    }

    Alert({
      title: title,
      text: message,
      showCancelButton: !isPC,
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }
      if (!isPC) {
        window.location.href = okButtonActionUrl;
        return;
      }
      window.open(okButtonActionUrl, '_blank');
    });
  };

  const handleClickKakao = () => {
    void amplitudeService.logEvent(new SelectBottomKakaoButton());

    if (isWebview()) {
      appServiceUse();
      return;
    }
    webServiceUse();
  };

  return (
    <KakaoInquiryButton onClick={handleClickKakao} {...props}>
      카카오톡 문의
    </KakaoInquiryButton>
  );
}
