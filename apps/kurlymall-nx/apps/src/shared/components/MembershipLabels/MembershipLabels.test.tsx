import { render } from '@testing-library/react';

import MembershipLabels from './MembershipLabels';
import { MembershipLabel } from '../../interfaces';

describe('MembershipLabels component test', () => {
  const renderMembershipLabels = ({ labels }: { labels: MembershipLabel[] }) =>
    render(<MembershipLabels labels={labels} />);

  context('빈 배열이면', () => {
    it('아무것도 보이지 않는다.', () => {
      const { container } = renderMembershipLabels({ labels: [] });

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('멤버십 레이블 목록이 있으면', () => {
    it.each`
      labels | text
      ${[{
    text: '러버스',
    textColor: '#111111',
    backgroundColor: '#FFFFFF',
    borderColor: '#5F0080',
  }]} | ${'러버스'}
      ${[{
    text: '멤버십',
    textColor: '#111111',
    backgroundColor: '#4DBED7',
    borderColor: '#4DBED7',
  }]} | ${'멤버십'}
      ${[{
    text: '더퍼플',
    textColor: '#111111',
    backgroundColor: '#FFFFFF',
    borderColor: '#5F0080',
  }, {
    text: '라벤더',
    textColor: '#111111',
    backgroundColor: '#FFFFFF',
    borderColor: '#5F0080',
  }]} | ${'더퍼플, 라벤더'}
    `('$text 라벨을 볼 수 있다.', ({ labels }) => {
      const { getByText } = renderMembershipLabels({ labels });

      labels.forEach(({ text, textColor, backgroundColor, borderColor }: MembershipLabel) => {
        expect(getByText(text)).toBeInTheDocument();
        expect(getByText(text)).toHaveStyle(
          `color: ${textColor}; background-color: ${backgroundColor}; border: 1px solid ${borderColor}`,
        );
      });
    });
  });
});
