import { fireEvent, render, screen } from '@testing-library/react';

import PopupNoticeButtons from './PopupNoticeButtons';
import { MainPopupNoticeButton } from '../../../interfaces/PopupNotice.interface';

const buttonClickEvent = jest.fn();

describe('PopupNoticeButtons', () => {
  const renderComponent = () => render(<PopupNoticeButtons buttons={given.buttons} onClickClose={buttonClickEvent} />);

  context('when buttons are empty', () => {
    given('buttons', () => []);

    it('renders nothing', () => {
      const { container } = renderComponent();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('버튼 프로피터가 있으면', () => {
    const testButtons = [
      { label: 'hello', noShowHours: 2 },
      { label: 'hello2', noShowHours: 2 },
    ];
    given<MainPopupNoticeButton[]>('buttons', () => testButtons);

    it('버튼을 렌더링하고 클릭시 이벤트가 실행된다', () => {
      renderComponent();

      testButtons.forEach(({ label }) => {
        const button = screen.getByRole('button', { name: label });
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(buttonClickEvent).toBeCalled();
      });
    });
  });
});
