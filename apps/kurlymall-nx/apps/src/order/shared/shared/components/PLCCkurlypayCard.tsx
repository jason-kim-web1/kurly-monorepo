import styled from '@emotion/styled';

import LottieKurlypayPLCCButton from './LottieKurlypayPLCCButton';

import COLOR from '../../../../shared/constant/colorset';
import useIssuanceKurlypayCard from '../../../checkout/shared/hooks/useIssuanceKurlypayCard';
import { isPC } from '../../../../../util/window/getDevice';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectAddPaymentMethod } from '../../../../shared/amplitude/events';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: ${isPC ? '130px' : '36.1111vw'};
  border-radius: 6px;
  border: 1px solid ${COLOR.plccCardBorder};
  background-color: ${COLOR.plccCardBackground};
`;

const Text = styled.div`
  padding-bottom: 8px;
`;

const Content = styled.p`
  font-size: 14px;
  line-height: 20px;
`;

const Benefit = styled.span`
  font-weight: 600;
  color: ${COLOR.kurlyPurple};
`;

const LottieButton = styled(LottieKurlypayPLCCButton)`
  width: 103px;
  height: 36px;
`;

export default function PLCCkurlypayCard() {
  const { handleCardFormSubmit } = useIssuanceKurlypayCard();

  const handleClick = () => {
    amplitudeService.logEvent(
      new SelectAddPaymentMethod({
        selectionType: 'plcc',
      }),
    );

    handleCardFormSubmit();
  };

  return (
    <Wrapper>
      <Text>
        <Content>
          컬리카드로 결제하고
          <br />
          <Benefit>최대 5%</Benefit> 적립 받으세요
        </Content>
      </Text>
      <LottieButton className="lottie-kurlypay-button" play={true} onClick={handleClick} />
    </Wrapper>
  );
}
