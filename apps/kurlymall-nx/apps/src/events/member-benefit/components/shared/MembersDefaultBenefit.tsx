import styled from '@emotion/styled';

import { DefaultBenefitList } from '../../../../shared/api/events/member/benefit.api';
import { BenefitIconType } from '../../shared/constants';
import { BenefitIconK } from '../../../../shared/icons/BenefitIconK';
import { BenefitIconPercent } from '../../../../shared/icons/BenefitIconPercent';
import { BenefitIconGift } from '../../../../shared/icons/BenefitIconGift';
import COLOR from '../../../../shared/constant/colorset';

const INFO_ICON: BenefitIconType = {
  ['k']: <BenefitIconK />,
  ['percent']: <BenefitIconPercent />,
  ['gift']: <BenefitIconGift />,
};

const InfoBox = styled.div<{ styleColorBg: string }>`
  margin-bottom: 20px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${({ styleColorBg }) => styleColorBg};
  color: ${COLOR.benefitGray};

  .item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-weight: 600;
    line-height: 20px;

    & > svg {
      min-width: 18px;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

interface Props {
  defaultBenefit: {
    title: string;
    list: DefaultBenefitList[];
    styleColorBg: string;
  };
}

export default function MembersDefaultBenefit({ defaultBenefit }: Props) {
  const { title, list, styleColorBg } = defaultBenefit;

  return (
    <>
      <h3 className="sub-title">{title}</h3>
      <InfoBox styleColorBg={styleColorBg}>
        {list.map(({ text, icon }) => (
          <div className="item" key={text}>
            {icon && INFO_ICON[icon]}
            {text}
          </div>
        ))}
      </InfoBox>
    </>
  );
}
