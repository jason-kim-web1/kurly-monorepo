import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import useInterestFree from '../hooks/queries/useInterestFree';
import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.div`
  background-color: ${COLOR.kurlyGray100};
  border-radius: 4px;
  padding: 4px 14px 10px;
  margin-bottom: 8px;

  ${isPC &&
  css`
    margin-bottom: 16px;
    padding-bottom: 8px;
  `}
`;

const List = styled.div`
  display: flex;
  column-gap: 4px;
  font-size: 14px;
  line-height: 21px;
  padding: ${isPC ? '12px 0 8px' : '12px 0 6px'};
  ~ div {
    border-top: 1px solid ${COLOR.kurlyGray200};
  }
`;

const CreditCardName = styled.p`
  color: ${COLOR.kurlyGray800};
  flex-basis: 72px;
  flex-shrink: 0;
`;

const InterestFreePlan = styled.p`
  color: ${COLOR.kurlyGray450};
`;

const InterestFreePlanWrapper = styled.div<{ hasMultiBenefit: boolean }>`
  ${({ hasMultiBenefit }) =>
    hasMultiBenefit &&
    css`
      line-height: 24px;
    `}
`;

export default function InterestFreePlans() {
  const { interestFreeList } = useInterestFree();

  return (
    <Wrapper>
      {interestFreeList?.map(({ name, interestBenefits }, cartNameIndex) => (
        <>
          <List key={`Interest-free-cart-name-${cartNameIndex}`}>
            <CreditCardName>{name}</CreditCardName>
            <InterestFreePlanWrapper hasMultiBenefit={interestBenefits.length > 1}>
              {interestBenefits?.map((month, planIndex) => (
                <InterestFreePlan key={`${name}'s-interest-free-plan-${planIndex}`}>{month}</InterestFreePlan>
              ))}
            </InterestFreePlanWrapper>
          </List>
        </>
      ))}
    </Wrapper>
  );
}
