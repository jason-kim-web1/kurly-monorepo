import { useCallback } from 'react';

import { css } from '@emotion/react';

import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';

import Alert from '../Alert/Alert';
import KakaoTalkIcon from '../icons/KakaoTalkIcon';

import { amplitudeService } from '../../amplitude';
import { AmplitudeEvent } from '../../amplitude/AmplitudeEvent';
import { fetchKakao } from '../../api';
import { isWebview } from '../../../../util/window/getDevice';
import { useLink } from '../../hooks/useLink';
import appService from '../../services/app.service';
import { Payload } from '../../amplitude/events/mypage';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.25rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 6px;
  background-color: ${COLOR.kakaoBtn};
`;

const kakaoTalkIcon = css`
  margin-right: 6px;
`;

interface Props {
  amplitude?: AmplitudeEvent<Payload>;
  className?: string;
}

export default function KakaoInquiryButton({ amplitude, className }: Props) {
  const redirect = useLink();

  const handleClickKakaoInquiry = useCallback(async () => {
    if (amplitude) {
      amplitudeService.logEvent(amplitude);
    }

    const { code, message, okButtonActionUrl, title, isKakaoUrl } = await fetchKakao();

    const defaultMessage = code ? `${title}\n${message}` : '';
    const toastMessage = isKakaoUrl ? message : defaultMessage;

    if (toastMessage) {
      const { isConfirmed } = await Alert({
        text: message,
        showConfirmButton: true,
        showCancelButton: true,
      });

      if (!isConfirmed) {
        return;
      }
    }

    if (isWebview()) {
      switch (code) {
        case 'WVD1000':
          redirect(okButtonActionUrl, true);
          break;
        case 'WVD1001':
        case 'WVD1002':
          window.open('kurly://compose/inquiry', '_blank');
          break;
        default:
          appService.closeWebview();
      }
      return;
    }

    redirect(okButtonActionUrl, true);
  }, [amplitude, redirect]);

  return (
    <>
      <Button onClick={handleClickKakaoInquiry} className={className}>
        <KakaoTalkIcon css={kakaoTalkIcon} />
        카카오톡
      </Button>
    </>
  );
}
