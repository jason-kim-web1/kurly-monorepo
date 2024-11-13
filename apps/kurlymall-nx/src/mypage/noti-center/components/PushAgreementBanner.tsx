import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Switch, SwitchProps } from '@mui/material';

import COLOR from '../../../shared/constant/colorset';
import { ArrowRight } from '../../../shared/icons';
import usePushAgreement from '../../../shared/hooks/usePushAgreement';
import { amplitudeService } from '../../../shared/amplitude';
import SelectMarketingInformationAgreement from '../../../shared/amplitude/events/SelectMarketingInformationAgreement';
import MarketingInformationAgreementSuccess from '../../../shared/amplitude/events/MarketingInformationAgreementSuccess';
import SystemNotificationOnSuccess from '../../../shared/amplitude/events/SystemNotificationOnSuccess';
import SelectSystemNotificationOffAlert from '../../../shared/amplitude/events/SelectSystemNotificationOffAlert';

const Wrapper = styled.div<{ showing?: boolean }>`
  flex-shrink: 0;
  overflow: hidden;
  max-height: ${({ showing = true }) => (showing ? '200px' : '0')};
  transition: all 500ms ease-in-out;
`;

const Container = styled.div`
  padding: 16px 20px 0 20px;
`;

const Banner = styled.div`
  width: 100%;
  padding: 12px 12px 12px 14px;
  border-radius: 6px;
  background: #f5f5f5;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

const IOSSwitch = styled((props: SwitchProps) => <Switch disableRipple {...props} />)(() => ({
  width: 44,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: COLOR.kurlyPurple,
        opacity: 1,
        border: 0,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E3E3E3',
    opacity: 1,
  },
}));

const ColumnFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BannerText = styled.span`
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
`;
const BannerSubText = styled.span`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: ${COLOR.kurlyGray500};
`;

export default function PushAgreementBanner() {
  const { isLoading, deviceAgreement, setDeviceNotificationOn, registerMarketingReceivePermission } =
    usePushAgreement();

  const [marketingPushOn, setMarketingPushOn] = useState(false);

  useEffect(() => {
    setMarketingPushOn(deviceAgreement?.marketingPushAgreement || false);
  }, [deviceAgreement?.marketingPushAgreement]);

  const onClickDeviceNotiOn = async () => {
    amplitudeService.logEvent(new SelectSystemNotificationOffAlert('알림센터', '설정 변경하기'));
    const result = await setDeviceNotificationOn();
    if (result) {
      amplitudeService.logEvent(new SystemNotificationOnSuccess('알림센터'));
    }
  };

  const onChangeMarketingPushOn = async (event: unknown, checked: boolean) => {
    amplitudeService.logEvent(new SelectMarketingInformationAgreement('notification', true));
    setMarketingPushOn(checked);
    if (checked) {
      const result = await registerMarketingReceivePermission();
      if (result) {
        amplitudeService.logEvent(new MarketingInformationAgreementSuccess('notification'));
      } else {
        setMarketingPushOn(false);
      }
    }
  };

  const [bannerType, setBannerType] = useState<'DEVICE_SETTING' | 'MARKETING_PUSH'>();

  useEffect(() => {
    if (deviceAgreement) {
      if (!deviceAgreement.pushAgreement) {
        setBannerType('DEVICE_SETTING');
      } else if (!deviceAgreement.marketingPushAgreement) {
        setBannerType('MARKETING_PUSH');
      }
    }
  }, [deviceAgreement]);

  if (isLoading || !deviceAgreement) {
    return null;
  }

  return (
    <Wrapper showing={!deviceAgreement.pushAgreement || !deviceAgreement.marketingPushAgreement}>
      <Container>
        {bannerType === 'DEVICE_SETTING' ? (
          <Banner onClick={onClickDeviceNotiOn}>
            <BannerText>기기 알림 켜고, 재입고/배송 소식 받기!</BannerText>
            <ArrowRight width={18} height={18} stroke={COLOR.kurlyGray800} />
          </Banner>
        ) : (
          bannerType === 'MARKETING_PUSH' && (
            <Banner>
              <ColumnFlexContainer>
                <BannerText>푸시 알림 켜고 쿠폰/이벤트 소식 받기</BannerText>
                <BannerSubText>알림 수신 고객은 월 4천원 더 할인 받는 중!</BannerSubText>
              </ColumnFlexContainer>
              <IOSSwitch checked={marketingPushOn} onChange={onChangeMarketingPushOn} />
            </Banner>
          )
        )}
      </Container>
    </Wrapper>
  );
}
