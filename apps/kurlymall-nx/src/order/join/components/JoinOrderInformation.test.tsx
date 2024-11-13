import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../../util/testutil';
import JoinOrderInformation from './JoinOrderInformation';

describe('JoinOrderInformation test', () => {
  const renderJoinOrderInformation = (preloadedState = {}) =>
    renderWithProviders(<JoinOrderInformation />, { preloadedState });

  context('함께구매 정보가 없으면', () => {
    it('아무것도 보이지 않는다.', () => {
      const { container } = renderJoinOrderInformation({
        checkout: {
          joinOrder: null,
        },
      });

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('생성고객 주문서이면', () => {
    it('모집해야 하는 인원 수를 볼 수 있다.', () => {
      const requiredPeopleCount = 2;

      renderJoinOrderInformation({
        checkout: {
          joinOrder: {
            type: 'CREATED',
            requiredPeopleCount,
          },
        },
      });

      expect(screen.queryByText('함께구매 모집을 시작합니다.')).toBeInTheDocument();
      expect(
        screen.queryByText(`${requiredPeopleCount}명이 모집되면 배송이 시작됩니다.`, { exact: false }),
      ).toBeInTheDocument();
    });
  });

  context('참여고객 주문서이면', () => {
    it('참여 인원 수를 볼 수 있다.', () => {
      const requiredPeopleCount = 2;
      const joinedPeopleCount = 0;

      renderJoinOrderInformation({
        checkout: {
          joinOrder: {
            type: 'JOINED',
            requiredPeopleCount,
            joinedPeopleCount,
          },
        },
      });

      expect(screen.queryByText('함께구매에 참여합니다.')).toBeInTheDocument();
      expect(
        screen.queryByText(`함께구매 성공까지 ${requiredPeopleCount - joinedPeopleCount}명 남았어요`, { exact: false }),
      ).toBeInTheDocument();
    });
  });
});
