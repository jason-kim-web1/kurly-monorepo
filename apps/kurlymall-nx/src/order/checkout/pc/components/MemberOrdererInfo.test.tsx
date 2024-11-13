import { render } from '@testing-library/react';

import MemberOrdererInfo from './MemberOrdererInfo';

describe('MemberOrdererInfo 테스트', () => {
  given('receiverInfo', () => ({
    name: '',
    phone: '',
    email: '',
  }));

  const renderMemberOrdererInfo = () => render(<MemberOrdererInfo receiverInfo={given.receiverInfo} />);

  context('주문자 정보가 있으면', () => {
    given('receiverInfo', () => ({
      name: '이름',
      phone: '01012345678',
      email: 'email',
    }));

    it('이름, 휴대폰 번호, 이메일을 볼 수 있다', () => {
      const { container } = renderMemberOrdererInfo();
      const { name, phone, email } = given.receiverInfo;

      expect(container).toHaveTextContent(name);
      expect(container).toHaveTextContent(phone);
      expect(container).toHaveTextContent(email);
    });
  });
});
