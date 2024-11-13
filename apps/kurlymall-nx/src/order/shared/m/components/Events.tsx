import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';

import MoreBenefit from '../../shared/components/MoreBenefit';

import InterestFree from '../../shared/components/InterestFree';
import useEvent from '../../shared/hooks/useEvent';

const Container = styled.div`
  margin-top: 10px;
  padding: 15px 16px;
  border-radius: 6px;
  background-color: ${COLOR.bgLightGray};
`;

const GuideWapper = styled.div`
  display: flex;
  font-size: 13px;
  color: ${COLOR.kurlyGray600};
  height: 18px;
  align-items: center;
  font-weight: 500;
  justify-content: space-between;
`;

export default function Events() {
  const { eventList, onlyInterestFree } = useEvent();

  if (isEmpty(eventList) && !onlyInterestFree) {
    return null;
  }

  return (
    <Container>
      <GuideWapper>
        <span>혜택안내</span>
        <InterestFree />
      </GuideWapper>
      <MoreBenefit event={eventList} />
    </Container>
  );
}
