import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import COLOR from '../../constant/colorset';

import { amplitudeService } from '../../amplitude';
import { AmplitudeEvent } from '../../amplitude/AmplitudeEvent';
import { isWebview } from '../../../../util/window/getDevice';
import { Payload } from '../../amplitude/events/mypage';
import { INQUIRY_PATH, getPageUrl } from '../../constant';
import { redirectTo } from '../../reducers/page';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.25rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 6px;
  background-color: ${COLOR.kurlyPurple};
  color: ${COLOR.kurlyWhite};
`;

interface Props {
  amplitude?: AmplitudeEvent<Payload>;
  className?: string;
}

export default function PersonalInquiryButton({ amplitude, className }: Props) {
  const dispatch = useDispatch();

  const handleClickPersonalInquiry = async () => {
    if (amplitude) {
      amplitudeService.logEvent(amplitude);
    }

    if (isWebview()) {
      window.open('kurly://compose/inquiry', '_blank');
    } else {
      dispatch(
        redirectTo({
          url: getPageUrl(INQUIRY_PATH.form),
        }),
      );
    }
  };

  return (
    <Button onClick={handleClickPersonalInquiry} className={className}>
      1:1 문의
    </Button>
  );
}
