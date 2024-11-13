import { fireEvent, render, screen } from '@testing-library/react';

import { useRouter } from 'next/router';

import SuccessAction from './SuccessAction';
import useNavigator from '../../../shared/hooks/useNavigator';

jest.mock('../../../shared/hooks/useNavigator');
jest.mock('next/router');

describe.skip('SuccessAction', () => {
  const renderSuccessAction = () => render(<SuccessAction />);

  const goToMyMembership = jest.fn();
  const goToHome = jest.fn();

  beforeEach(() => {
    (useNavigator as jest.Mock).mockReturnValue({
      goToMyMembership,
      goToHome,
    });
    (useRouter as jest.Mock).mockReturnValue({
      isReady: true,
    });
  });

  it('버튼을 볼 수 있다.', () => {
    renderSuccessAction();

    expect(screen.getByText('쇼핑하러 가기')).toBeInTheDocument();
    expect(screen.getByText('확인')).toBeInTheDocument();
  });

  context('router 가 준비되지 않았다면', () => {
    it('아무것도 render 하지 않는다.', () => {
      (useRouter as jest.Mock).mockReturnValueOnce({
        isReady: false,
      });

      const { container } = renderSuccessAction();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('"확인" 을 누르면', () => {
    it('"마이 컬리멤버스" 페이지로 이동하는 handler 함수가 실행된다.', () => {
      renderSuccessAction();

      const button = screen.getByText('확인');

      fireEvent.click(button);

      expect(goToMyMembership).toBeCalled();
    });
  });
});
