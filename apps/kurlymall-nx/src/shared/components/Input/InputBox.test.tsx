import { fireEvent, render } from '@testing-library/react';

import { NUMBER_DENY_REGEX } from '../../constant/regex';

import InputBox from './InputBox';

describe('InputBox', () => {
  given('label', () => 'label');
  given('readOnly', () => false);
  given('placeholder', () => 'placeholder');
  given('maxLength', () => 20);
  given('type', () => 'text');
  given('disabled', () => false);
  given('required', () => false);
  given('hasDeleteButton', () => false);
  given('isError', () => false);
  given('isSuccess', () => false);
  given('helperText', () => null);
  given('value', () => 'Render Value');
  given('height', () => 48);

  const handleFocus = jest.fn();
  const handleChange = jest.fn();
  const handleBlur = jest.fn();

  const renderInputBox = () =>
    render(
      <InputBox
        name="testInput"
        label={given.label}
        value={given.value}
        placeholder={given.placeholder}
        maxLength={given.maxLength}
        denyPattern={given.denyPattern}
        type={given.type}
        hasDeleteButton={given.hasDeleteButton}
        isError={given.isError}
        isSuccess={given.isSuccess}
        readOnly={given.readOnly}
        disabled={given.disabled}
        required={given.required}
        helperText={given.helperText}
        height={given.height}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
      />,
    );

  describe('렌더링 테스트', () => {
    it('label 을 볼 수 있다', () => {
      const { container } = renderInputBox();

      expect(container).toHaveTextContent(given.label);
    });

    it('value 를 볼 수 있다', () => {
      const { getByDisplayValue } = renderInputBox();

      expect(getByDisplayValue(given.value)).toBeInTheDocument();
    });

    it('placeholder 를 볼 수 있다', () => {
      const { getByPlaceholderText } = renderInputBox();

      expect(getByPlaceholderText(given.placeholder)).toBeInTheDocument();
    });

    context('에러 상태가 되면', () => {
      given('isError', () => true);
      it('보더 색이 #f03f40 으로 변경된다', () => {
        const { getByTestId } = renderInputBox();
        expect(getByTestId('input-box')).toHaveStyle('border:1px solid #f03f40');
      });
    });

    context('성공 상태가 되면', () => {
      given('isSuccess', () => true);
      it('보더 색이 #0e851a 으로 변경된다', () => {
        const { getByTestId } = renderInputBox();
        expect(getByTestId('input-box')).toHaveStyle('border:1px solid #0e851a');
      });
    });

    context('disabled 상태가 되면', () => {
      given('disabled', () => true);
      it('컬러 색이 #999 으로 변경된다', () => {
        const { getByTestId } = renderInputBox();
        expect(getByTestId('input-box')).toHaveStyle('color:#999');
      });
    });

    context('required 가 되면', () => {
      given('required', () => true);

      it('* 를 볼 수 있다', () => {
        const { container } = renderInputBox();

        expect(container).toHaveTextContent('*');
      });
    });

    context('helperText 가 있으면', () => {
      given('helperText', () => 'helperTexthelperText');

      it('helperText 를 볼 수 있다', () => {
        const { container } = renderInputBox();

        expect(container).toHaveTextContent(given.helperText);
      });
    });
  });

  describe('포커스 상태 제어', () => {
    context('포커스 상태가 되면', () => {
      it('handleFocus 가 호출된다', () => {
        const { getByTestId } = renderInputBox();

        fireEvent.focus(getByTestId('input-box'));

        expect(handleFocus).toBeCalled();
      });
    });

    context('블러 하면', () => {
      it('handleBlur 가 호출된다', () => {
        const { getByTestId } = renderInputBox();

        fireEvent.blur(getByTestId('input-box'));

        expect(handleBlur).toBeCalled();
      });
    });
  });

  describe('글자 입력 제어', () => {
    context('글자를 입력 하면', () => {
      given('maxLength', () => 5);

      it('handleChange 가 호출된다', () => {
        const { getByTestId } = renderInputBox();

        fireEvent.change(getByTestId('input-box'), {
          target: { value: 'test' },
        });

        expect(handleChange).toBeCalledWith({
          name: 'testInput',
          value: 'test',
        });
      });

      it('maxLength 이상으로 쓸 수 없다', () => {
        const { getByTestId } = renderInputBox();

        fireEvent.change(getByTestId('input-box'), {
          target: { value: '1234567890' },
        });

        expect(handleChange).toBeCalledWith({
          name: 'testInput',
          value: '12345',
        });
      });
    });

    context('글자 입력 시 허용 불가 정규식이 있으면', () => {
      given('denyPattern', () => NUMBER_DENY_REGEX);

      it('정규식에 맞는 문자만 볼 수 있다', () => {
        const { getByTestId } = renderInputBox();

        fireEvent.change(getByTestId('input-box'), {
          target: { value: 'test' },
        });

        expect(handleChange).toBeCalledWith({
          name: 'testInput',
          value: '',
        });
      });
    });
  });
});
