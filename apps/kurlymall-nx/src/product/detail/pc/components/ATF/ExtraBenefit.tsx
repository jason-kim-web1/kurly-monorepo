import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import ArrowRight from '../../../../../shared/icons/ArrowRight';
import parsePlccContentStrToElement from '../../../shared/utils/parsePlccContentStrToElements';
import { useBenefitBanner } from '../../../hooks/useBenefitBanner';
import { PointBanner } from '../../../types';
import PointBannerText from '../../../../../shared/components/product/pointBannerText/PointBannerText';

const PointBannerWrapper = styled.div`
  line-height: 19px;
  height: 19px;
  letter-spacing: -0.5px;
  margin-top: 14px;
`;

const BenefitBannerWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  min-height: 38px;
  padding: 10px 14px 10px 16px;
  background-color: ${COLOR.toolTip}14;
  border-radius: 4px;
  margin-top: 12px;
`;

const BenefitBannerText = styled.p`
  font-weight: 400;
  line-height: 16px;
  color: ${COLOR.kurlyGray800};
  letter-spacing: -0.5px;
  font-size: 13px;
  > strong {
    font-weight: 500;
    color: ${COLOR.kurlyPurple};
  }
`;

interface Props {
  pointBanner: PointBanner;
}

export default function ExtraBenefit({ pointBanner }: Props) {
  const { isShowBenefitBanner, benefits, handleClickBenefitBanner } = useBenefitBanner();
  const renderBenefitBanner = () => {
    if (!isShowBenefitBanner) {
      return null;
    }

    return benefits.map((benefit, i) => {
      const { contents } = benefit;
      return (
        <button key={`benefit-${i}`} onClick={handleClickBenefitBanner(contents)}>
          <BenefitBannerWrapper>
            <BenefitBannerText
              dangerouslySetInnerHTML={{
                __html: parsePlccContentStrToElement(contents),
              }}
            />
            <ArrowRight width={24} height={24} stroke={COLOR.kurlyPurple} />
          </BenefitBannerWrapper>
        </button>
      );
    });
  };

  return (
    <>
      {pointBanner && pointBanner.isShow ? (
        <PointBannerWrapper>
          <PointBannerText pointBanner={pointBanner} />
        </PointBannerWrapper>
      ) : null}
      {renderBenefitBanner()}
    </>
  );
}
