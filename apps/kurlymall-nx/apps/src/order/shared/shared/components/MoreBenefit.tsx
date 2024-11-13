import styled from '@emotion/styled';

import { useEffect, useCallback, useMemo } from 'react';

import { css } from '@emotion/react';

import { isEmpty } from 'lodash';

import useToggle from '../../../checkout/shared/hooks/useToggle';

import COLOR from '../../../../shared/constant/colorset';
import { ArrowDown, ArrowUp } from '../../../../shared/icons';

import usePaymentMethods, { Event } from '../hooks/usePaymentMethods';
import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.div`
  margin-top: ${isPC ? 17 : 15}px;
`;

const MoreBenefitButton = styled.button`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding-top: ${isPC ? 11 : 15}px;
`;

const MoreBenefitText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR.kurlyGray800};
`;

const Wrap = styled.div`
  word-break: break-all;
  ~ div {
    margin-top: ${isPC ? 7 : 10}px;
  }
`;

const ServiceTitle = styled.p`
  padding-bottom: ${isPC ? 4 : 3}px;
  font-size: 13px;
  font-weight: ${isPC ? 500 : 600};
  line-height: 18px;
  color: ${COLOR.pointText};
`;

const SubTitle = styled.p<{ hasVendorName?: boolean }>`
  padding-bottom: ${isPC ? 2 : 3}px;
  font-size: 13px;
  line-height: 18px;
  font-weight: ${isPC ? 500 : 600};
  color: ${COLOR.pointText};
  ${({ hasVendorName }) =>
    hasVendorName &&
    css`
      font-weight: 400;
      color: ${COLOR.kurlyGray700};
    `};
`;

const Description = styled.p`
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
  line-height: 16px;
  font-weight: 400;
  padding-bottom: ${isPC ? 2 : 3}px;
`;

interface Props {
  event: Event[];
}

export default function MoreBenefit({ event }: Props) {
  const { filteredAllEvents } = usePaymentMethods();

  const { isOpen, close, toggle } = useToggle();
  const toggleEvent = !isOpen ? event : event.concat(filteredAllEvents);
  const hasAnotherBenefit = useMemo(() => filteredAllEvents.length > 0, [filteredAllEvents]);

  const sliceDescriptions = useCallback(
    (descriptions: string[]) => {
      const isSliceDescriptions = !isOpen && descriptions.length > 3 && hasAnotherBenefit;

      if (isSliceDescriptions) {
        const result = descriptions.slice(0, 2);
        result.push(descriptions[2] + ' ...');

        return result.slice(0, 3);
      }

      return descriptions;
    },
    [isOpen, hasAnotherBenefit],
  );

  useEffect(() => {
    if (isOpen) {
      close();
    }
  }, [event]);

  if (isEmpty(toggleEvent)) {
    return null;
  }

  return (
    <Wrapper>
      {toggleEvent?.map(({ vendorName, title, descriptions }, index) => (
        <Wrap key={`${title}-${index}`}>
          {vendorName && <ServiceTitle>{vendorName}</ServiceTitle>}
          <SubTitle hasVendorName={!!vendorName}>{title}</SubTitle>
          {sliceDescriptions(descriptions)?.map((it, i) => (
            <Description key={`${it}-${i}`}>{it}</Description>
          ))}
        </Wrap>
      ))}
      {hasAnotherBenefit && (
        <MoreBenefitButton onClick={toggle}>
          <MoreBenefitText>{isOpen ? '혜택 접기' : '혜택 더보기'}</MoreBenefitText>
          {isOpen ? (
            <ArrowUp stroke={COLOR.kurlyGray800}></ArrowUp>
          ) : (
            <ArrowDown stroke={COLOR.kurlyGray800}></ArrowDown>
          )}
        </MoreBenefitButton>
      )}
    </Wrapper>
  );
}
