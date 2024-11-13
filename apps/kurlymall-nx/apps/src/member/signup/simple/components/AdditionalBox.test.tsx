import { render, fireEvent } from '@testing-library/react';

import AdditionalBox from './AdditionalBox';

describe('Additional Box', () => {
  const handleChangeInput = jest.fn();
  const handleChangeRadio = jest.fn();

  given('selectedValue', () => '');

  const renderAdditionalBox = () =>
    render(
      <AdditionalBox
        selectedValue={given.selectedValue}
        recommender=""
        eventName=""
        onChangeRadio={handleChangeRadio}
        onChangeInput={handleChangeInput}
      />,
    );

  it('renders additional box', () => {
    renderAdditionalBox();
  });

  describe('Clicking radio', () => {
    it('call handleChangeRadio', () => {
      const { getByLabelText } = renderAdditionalBox();

      fireEvent.click(getByLabelText('추천인 아이디'));

      expect(handleChangeRadio).toBeCalled();
    });
  });

  context('when selectedValue is "RECOMMENDER_ID"', () => {
    given('selectedValue', () => 'RECOMMENDER_ID');

    it('shows "추천인 아이디" input box', () => {
      const { getByPlaceholderText } = renderAdditionalBox();

      expect(getByPlaceholderText('추천인 아이디를 입력해주세요')).toBeInTheDocument();
    });

    describe('Changing recommender id', () => {
      it('calls onChange handler', () => {
        const { getByPlaceholderText } = renderAdditionalBox();

        fireEvent.change(getByPlaceholderText('추천인 아이디를 입력해주세요'), {
          target: { name: 'recommender', value: 'test12345' },
        });

        expect(handleChangeInput).toBeCalled();
      });
    });
  });

  context('when selectedValue is "EVENT_NAME"', () => {
    given('selectedValue', () => 'EVENT_NAME');

    it('shows "참여 이벤트명" input box', () => {
      const { getByPlaceholderText } = renderAdditionalBox();

      expect(getByPlaceholderText('참여 이벤트명을 입력해주세요')).toBeInTheDocument();
    });

    describe('Changing eventname', () => {
      it('calls onChange handler', () => {
        const { getByPlaceholderText } = renderAdditionalBox();

        fireEvent.change(getByPlaceholderText('참여 이벤트명을 입력해주세요'), {
          target: { name: 'eventName', value: 'blackweek' },
        });

        expect(handleChangeInput).toBeCalled();
      });
    });
  });
});
