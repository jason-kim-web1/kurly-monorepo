import { AxiosError } from 'axios';

import { getErrorMessage } from './getErrorMessage';

type WrongAxiosErrorDataType = null;

const wrongErrorModel1 = {};

const wrongErrorModel2 = {
  response: {
    data: null,
  },
};

const defaultMessage = '일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.';

const message = '잘못된 후기 등록방식입니다.';

describe('getErrorMessage', () => {
  it('error 객체에 response 없고 지정한 message가 없다면 defaultMessage를 반환한다.', () => {
    const error = wrongErrorModel1 as AxiosError<WrongAxiosErrorDataType>;

    expect(getErrorMessage(error)).toEqual(defaultMessage);
  });

  it('error 객체에 response.data.message가 없고 지정한 message가 없다면 defaultMessage를 반환한다.', () => {
    const error = wrongErrorModel2 as AxiosError<WrongAxiosErrorDataType>;

    expect(getErrorMessage(error)).toEqual(defaultMessage);
  });

  it('error 객체에 response.data.message가 없고 지정한 message가 있다면 message를 반환한다.', () => {
    const error = wrongErrorModel2 as AxiosError<WrongAxiosErrorDataType>;

    expect(getErrorMessage(error, message)).toEqual(message);
  });

  it('올바른 error 객체를 가진 경우 error 객체의 메시지를 반환한다.', () => {
    const error = { response: { data: { message: '후기가 중복으로 등록되었습니다.' } } } as AxiosError;

    expect(getErrorMessage(error)).toEqual('후기가 중복으로 등록되었습니다.');
  });
});
