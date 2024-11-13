import { fireEvent, render } from '@testing-library/react';

import Select from './Select';

describe('Select', () => {
  const placeholder = '동물은 선택해주세요';
  const options = [
    { name: '강아지', value: 'dog' },
    { name: '고양이', value: 'cat' },
  ];

  const handleChange = jest.fn();

  given('value', () => undefined);

  const renderSelect = () =>
    render(<Select placeholder={placeholder} options={options} value={given.value} onChange={handleChange} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when value is undefined', () => {
    it('renders placeholder', () => {
      const { container } = renderSelect();

      expect(container).toHaveTextContent(placeholder);
    });
  });

  context('when value exists', () => {
    given('value', () => options[0]);

    it('renders name of value', () => {
      const { container } = renderSelect();

      expect(container).toHaveTextContent(options[0].name);
    });
  });

  describe('Changing value', () => {
    it('calls onChange handler with value', () => {
      const { getByText } = renderSelect();

      fireEvent.click(getByText(placeholder));

      fireEvent.click(getByText(options[0].name));

      expect(handleChange).toBeCalledWith(options[0]);
    });
  });
});
