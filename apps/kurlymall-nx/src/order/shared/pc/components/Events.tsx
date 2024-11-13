import { isEmpty } from 'lodash';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import MoreBenefit from '../../shared/components/MoreBenefit';
import useEvent from '../../shared/hooks/useEvent';
import InterestFree from '../../shared/components/InterestFree';

const Container = styled.div`
  margin-top: 20px;
  padding: 16px 20px;
  background-color: ${COLOR.kurlyGray100};
  border-radius: 6px;
`;

const GuideWapper = styled.div`
  display: flex;
  font-size: 13px;
  color: ${COLOR.kurlyGray600};
  height: 18px;
  font-weight: 400;
  justify-content: space-between;
  align-items: center;
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
