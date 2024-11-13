import { fireEvent, render } from '@testing-library/react';

import { FrontDoorMethod } from '../../../../../../shared/enums';

import FrontDoorMethodField from './FrontDoorMethodField';
import { FrontDoorMethodTextMap } from '../../../../../../shared/constant';

describe('FrontDoorMethodField', () => {
  const handleChange = jest.fn();

  given('frontDoorMethod', () => FrontDoorMethod.PASSWORD);
  given('frontDoorDetail', () => '');

  const renderFrontDoorMethodField = () =>
    render(
      <FrontDoorMethodField
        onChange={handleChange}
        frontDoorMethod={given.frontDoorMethod}
        frontDoorDetail={given.frontDoorDetail}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('공동현관 출입 방법을 선택할 수 있는 버튼을 볼 수 있다', () => {
    const { getByLabelText } = renderFrontDoorMethodField();

    expect(getByLabelText(FrontDoorMethodTextMap.PASSWORD)).toBeInTheDocument();
    expect(getByLabelText(FrontDoorMethodTextMap.FREE)).toBeInTheDocument();
    expect(getByLabelText(FrontDoorMethodTextMap.CALL_SECURITY_OFFICE)).toBeInTheDocument();
    expect(getByLabelText(FrontDoorMethodTextMap.ETC)).toBeInTheDocument();
  });

  context('공동현관 출입방법 중 하나를 선택하면', () => {
    it('handleChange 이벤트가 발생한다.', () => {
      const { getByLabelText } = renderFrontDoorMethodField();

      fireEvent.click(getByLabelText(FrontDoorMethodTextMap.FREE));

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: 'frontDoorMethod',
          value: FrontDoorMethod.FREE,
        }),
      );
    });
  });

  context('"공동현관 비밀번호" 를 선택 했을 때', () => {
    given('frontDoorMethod', () => FrontDoorMethod.PASSWORD);

    it('공동현관 비밀번호를 입력할 수 있는 입력창을 볼 수 있다.', () => {
      const { getByLabelText, getByPlaceholderText } = renderFrontDoorMethodField();

      fireEvent.click(getByLabelText(FrontDoorMethodTextMap.PASSWORD));

      expect(getByPlaceholderText('출입에 필요한 버튼을 모두 입력해주세요.')).toBeInTheDocument();
    });

    it('입력 요소에 글자를 입력하면 handleChange 함수가 실행된다', () => {
      const { getByPlaceholderText } = renderFrontDoorMethodField();

      fireEvent.change(getByPlaceholderText('출입에 필요한 버튼을 모두 입력해주세요.'), {
        target: { value: '1234' },
      });

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: 'frontDoorDetail',
          value: '1234',
        }),
      );
    });

    context('frontDoorDetail 값이 있다면', () => {
      given('frontDoorDetail', () => '1234');

      it('해당 값이 입력되어 있다', () => {
        const { getByPlaceholderText } = renderFrontDoorMethodField();

        const input = getByPlaceholderText('출입에 필요한 버튼을 모두 입력해주세요.');

        expect(input).toHaveValue('1234');
      });
    });
  });

  context('"경비실 호출" 를 선택 했을 때', () => {
    given('frontDoorMethod', () => FrontDoorMethod.CALL_SECURITY_OFFICE);

    it('경비실 호출 방법을 입력할 수 있는 입력창을 볼 수 있다.', () => {
      const { getByLabelText, getByPlaceholderText } = renderFrontDoorMethodField();

      fireEvent.click(getByLabelText(FrontDoorMethodTextMap.CALL_SECURITY_OFFICE));

      expect(getByPlaceholderText(/경비실 호출 방법을 자세히 입력해주세요./)).toBeInTheDocument();
    });

    it('입력 요소에 글자를 입력하면 handleChange 함수가 실행된다', () => {
      const { getByPlaceholderText } = renderFrontDoorMethodField();

      fireEvent.change(getByPlaceholderText(/경비실 호출 방법을 자세히 입력해주세요./), {
        target: { value: '1234' },
      });

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: 'frontDoorDetail',
          value: '1234',
        }),
      );
    });

    context('frontDoorDetail 값이 있다면', () => {
      given('frontDoorDetail', () => '1234');

      it('해당 값이 입력되어 있다', () => {
        const { getByPlaceholderText } = renderFrontDoorMethodField();

        const input = getByPlaceholderText(/경비실 호출 방법을 자세히 입력해주세요./);

        expect(input).toHaveValue('1234');
      });
    });
  });

  context('"기타" 를 선택했을 때', () => {
    given('frontDoorMethod', () => FrontDoorMethod.ETC);

    it('기타 정보를 입력할 수 있는 입력창을 볼 수 있다.', () => {
      const { getByLabelText, getByPlaceholderText } = renderFrontDoorMethodField();

      fireEvent.click(getByLabelText(FrontDoorMethodTextMap.ETC));

      expect(getByPlaceholderText('출입방법을 상세히 기재해주세요.')).toBeInTheDocument();
    });

    it('정보를 입력하면 handleChange 함수가 실행된다', () => {
      const { getByPlaceholderText } = renderFrontDoorMethodField();

      fireEvent.change(getByPlaceholderText('출입방법을 상세히 기재해주세요.'), {
        target: { value: '테스트 입력' },
      });

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: 'frontDoorDetail',
          value: '테스트 입력',
        }),
      );
    });

    context('frontDoorDetail 값이 있다면', () => {
      given('frontDoorDetail', () => '테스트 입력 중');

      it('해당 값이 입력되어 있다', () => {
        const { getByLabelText } = renderFrontDoorMethodField();

        const textarea = getByLabelText('textarea-message');

        expect(textarea).toHaveValue('테스트 입력 중');
      });
    });
  });
});
