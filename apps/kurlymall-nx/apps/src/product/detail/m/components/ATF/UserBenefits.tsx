import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import ArrowRight from '../../../../../shared/icons/ArrowRight';
import parsePlccContentStrToElement from '../../../shared/utils/parsePlccContentStrToElements';
import { useBenefitBanner } from '../../../hooks/useBenefitBanner';
import type { PointBanner } from '../../../types';
import PointBannerText from '../../../../../shared/components/product/pointBannerText/PointBannerText';
import useDeliveryDelayNotice from '../../../hooks/useDeliveryDelayNotice';
import DeliveryDelayNotice from './DeliveryDelayNotice';

const Container = styled.div`
  margin-top: 16px;
`;

const PointBannerWrapper = styled.div`
  line-height: 19px;
`;

const BenefitBannerButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 38px;
  padding: 10px 14px 10px 16px;
  background-color: ${COLOR.toolTip}14;
  border-radius: 4px;
  margin-top: 12px;
`;

const BenefitBenefitText = styled.p`
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
  > strong {
    font-weight: 600;
    color: ${COLOR.kurlyPurple};
  }
`;

interface Props {
  pointBanner: PointBanner;
}

export default function UserBenefits({ pointBanner }: Props) {
  const { isShowBenefitBanner, benefits, handleClickBenefitBanner } = useBenefitBanner();
  const { deliveryDelayNotice } = useDeliveryDelayNotice();

  const renderBenefitBanner = () => {
    if (!isShowBenefitBanner) {
      return null;
    }
    return benefits.map(({ contents }, i) => {
      return (
        <BenefitBannerButton key={`benefit-${i}`} onClick={handleClickBenefitBanner(contents)}>
          <BenefitBenefitText dangerouslySetInnerHTML={{ __html: parsePlccContentStrToElement(contents) }} />
          <ArrowRight width={20} height={20} stroke={COLOR.kurlyPurple} />
        </BenefitBannerButton>
      );
    });
  };

  return (
    <Container>
      {pointBanner && pointBanner.isShow ? (
        <PointBannerWrapper>
          <PointBannerText pointBanner={pointBanner} />
        </PointBannerWrapper>
      ) : null}
      {renderBenefitBanner()}
      {deliveryDelayNotice && <DeliveryDelayNotice description={deliveryDelayNotice} />}
    </Container>
  );
}
