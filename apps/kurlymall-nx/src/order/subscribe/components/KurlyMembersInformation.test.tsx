import { screen, render } from '@testing-library/react';

import KurlyMembersInformation from './KurlyMembersInformation';

describe.skip('KurlyMembersInfomation component', () => {
  context('name 값이 없으면', () => {
    it('스켈레톤 이미지를 노출한다.', () => {
      render(<KurlyMembersInformation />);

      expect(screen.getByTestId('kurly-members-infomation-skeleton')).toBeInTheDocument();
    });
  });

  context('결제수단 변경 주문서이면', () => {
    it('변경페이지 멤버십 안내 문구를 볼 수 있다.', () => {
      render(<KurlyMembersInformation isChangePayment />);

      expect(screen.queryByText(/다음 결제일부터/i)).toBeInTheDocument();
      expect(screen.queryByText(/변경된 수단으로 결제됩니다./i)).toBeInTheDocument();
    });
  });

  it('신청페이지 멤버십 안내 문구를 볼 수 있다.', () => {
    render(<KurlyMembersInformation />);

    expect(screen.queryByText(/컬리멤버스를/i)).toBeInTheDocument();
    expect(screen.queryByText(/지금 바로 시작하세요/i)).toBeInTheDocument();
  });
});
