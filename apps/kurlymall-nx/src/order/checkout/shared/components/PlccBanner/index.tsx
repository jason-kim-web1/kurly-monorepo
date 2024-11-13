import styled from '@emotion/styled';
import { useCallback } from 'react';
import Lottie from 'react-lottie-player';

import { isPC, isWebview } from '../../../../../../util/window/getDevice';
import { KURLY_URL } from '../../../../../shared/configs/config';
import { EVENT_PATH } from '../../../../../shared/constant';

import COLOR from '../../../../../shared/constant/colorset';
import appService from '../../../../../shared/services/app.service';

import * as animationDataLeft from './LottiePlccBannerLeft.json';
import * as animationDataRight from './LottiePlccBannerRight.json';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  min-height: 40px;
  overflow: hidden;
  border-radius: ${isPC ? 3 : 6}px;
  background-color: ${COLOR.plccBanner};
`;

const BannerText = styled.p`
  text-align: center;
  margin: 6px 0;
  word-break: keep-all;
`;

const Description = styled(BannerText)`
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.5px;
  font-weight: ${isPC ? 400 : 600};
  color: ${COLOR.kurlyGray800};

  span {
    font-weight: ${isPC ? 500 : 600};
    color: ${COLOR.kurlyPurple};
  }
`;

const PlccName = styled(BannerText)`
  font-size: 11px;
  line-height: 12px;
  color: ${COLOR.kurlyGray450};
`;

const styles = {
  lottie: {
    maxWidth: '67px',
  },
};

export default function PlccBanner() {
  const handleClickBanner = useCallback(() => {
    const PLCC_EVENT_URL = `${KURLY_URL}/shop/event/kurlyEvent.php?htmid=event/2023/0403/plcc`;

    if (isWebview()) {
      appService.openWebview({
        url: PLCC_EVENT_URL,
        title: EVENT_PATH.plcc.name,
        is_modal: true,
      });
      return;
    }

    window.location.assign(PLCC_EVENT_URL);
  }, []);

  const optLottie = {
    loop: true,
    play: true,
  };

  return (
    <Wrapper onClick={handleClickBanner}>
      <Lottie style={styles.lottie} animationData={animationDataLeft} {...optLottie} />
      <div>
        <Description>
          {'다음 주문에'} <span>{'3만원 할인'}</span> {'받기'}
        </Description>
        <PlccName>{'컬리카드'}</PlccName>
      </div>
      <Lottie style={styles.lottie} animationData={animationDataRight} {...optLottie} />
    </Wrapper>
  );
}
