import { fireEvent, render } from '@testing-library/react';

import SelectBox from './SelectBox';

describe('SelectBox', () => {
  given('value', () => '');
  given('disabled', () => false);
  given('options', () => [
    { name: '동물을 선택해주세요', value: '' },
    { name: '강아지', value: 'dog' },
    { name: '고양이', value: 'cat' },
  ]);

  const handleChange = jest.fn();

  const renderNativeSelect = () => {
    const name = 'animal';

    const result = render(
      <SelectBox
        name={name}
        value={given.value}
        options={given.options}
        disabled={given.disabled}
        onChange={handleChange}
      />,
    );
    const { container } = result;
    return {
      ...result,
      selectElement: container.querySelector<HTMLSelectElement>(`[name="${name}"]`)!,
    };
  };

  context('without value', () => {
    given('value', () => undefined);

    it('renders default value', () => {
      const { getByDisplayValue } = renderNativeSelect();

      expect(getByDisplayValue('동물을 선택해주세요')).toBeInTheDocument();
    });
  });

  context('with value', () => {
    given('value', () => 'dog');

    it('renders dog', () => {
      const { getByDisplayValue } = renderNativeSelect();

      expect(getByDisplayValue('강아지')).toBeInTheDocument();
    });
  });

  context('when disabled', () => {
    given('disabled', () => true);

    it('renders disabled select', () => {
      const { selectElement } = renderNativeSelect();

      expect(selectElement.disabled).toBe(true);
    });
  });

  context('when options is not given', () => {
    given('options', () => undefined);

    it('renders', () => {
      const { selectElement } = renderNativeSelect();

      expect(selectElement).toBeInTheDocument();
    });
  });

  context('when disabled is not given', () => {
    given('disabled', () => undefined);

    it('renders disabled select', () => {
      const { selectElement } = renderNativeSelect();

      expect(selectElement.disabled).toBe(false);
    });
  });

  describe('Changing value', () => {
    it('calls onChange handler', () => {
      const { selectElement } = renderNativeSelect();

      fireEvent.change(selectElement, { target: { value: 'dog' } });

      expect(handleChange).toBeCalled();
    });
  });
});
