import { findNotAllowText } from '.';
import { validateAddressDetail, validateAddressInfo } from './validate-address-field';

describe('validateAddressDetail 테스트', () => {
  context('addressDetail 가 비어있으면', () => {
    given('addressDetail', () => '');

    it('에러 메세지를 반환하지 않는다.', () => {
      const { errorMessage, documentId } = validateAddressDetail(given.addressDetail);

      expect(errorMessage).toBe('');
      expect(documentId).toBe('');
    });
  });

  context('addressDetail 가 허용불가 문자열이 있으면', () => {
    given('addressDetail', () => '뷁');

    it('주소에 사용할 수 없는 문자가 있습니다. 에러 메세지를 반환한다.', () => {
      const { errorMessage, documentId } = validateAddressDetail(given.addressDetail);

      expect(errorMessage).toBe(
        `주소에 사용할 수 없는 문자가 있습니다. 다시 확인해주세요.\n${findNotAllowText(given.addressDetail)}`,
      );
      expect(documentId).toBe('addressDetail');
    });
  });

  context('addressDetail 가 올바르면', () => {
    given('addressDetail', () => '강남구 컬리');

    it('에러 메세지를 반환하지 않는다.', () => {
      const { errorMessage, documentId } = validateAddressDetail(given.addressDetail);

      expect(errorMessage).toBe('');
      expect(documentId).toBe('');
    });
  });
});

describe('validateAddressInfo 테스트', () => {
  context('addressDetail 가 비어있으면', () => {
    given('addressInfo', () => ({
      name: '김컬리',
      mobile: '01012312333',
      addressDetail: '',
    }));

    it('에러 메세지를 반환하지 않는다.', () => {
      const { errorMessage, documentId } = validateAddressInfo(given.addressInfo);

      expect(errorMessage).toBe('');
      expect(documentId).toBe('');
    });
  });

  context('addressDetail 가 허용불가 문자열이 있으면', () => {
    given('addressInfo', () => ({
      name: '',
      mobile: '',
      addressDetail: '뷁',
    }));

    it('주소에 사용할 수 없는 문자가 있습니다. 에러 메세지를 반환한다.', () => {
      const { errorMessage, documentId } = validateAddressInfo(given.addressInfo);

      expect(errorMessage).toBe(
        `주소에 사용할 수 없는 문자가 있습니다. 다시 확인해주세요.\n${findNotAllowText(
          given.addressInfo.addressDetail,
        )}`,
      );
      expect(documentId).toBe('addressDetail');
    });
  });

  context('name 가 비어있으면', () => {
    given('addressInfo', () => ({
      name: '',
      mobile: '',
      addressDetail: '강남구 컬리',
    }));

    it('에러 메세지를 반환하지 않는다.', () => {
      const { errorMessage, documentId } = validateAddressInfo(given.addressInfo);

      expect(errorMessage).toBe('');
      expect(documentId).toBe('');
    });
  });

  context('name 가 허용불가 문자열이 있으면', () => {
    given('addressInfo', () => ({
      name: '뷁',
      mobile: '',
      addressDetail: '강남구 컬리',
    }));

    it('이름에 사용할 수 없는 문자가 있습니다. 에러 메세지를 반환한다.', () => {
      const { errorMessage, documentId } = validateAddressInfo(given.addressInfo);

      expect(errorMessage).toBe(
        `이름에 사용할 수 없는 문자가 있습니다. 다시 확인해주세요.\n${findNotAllowText(given.addressInfo.name)}`,
      );
      expect(documentId).toBe('name');
    });
  });

  context('mobile 가 비어있으면', () => {
    given('addressInfo', () => ({
      name: '김컬리',
      mobile: '',
      addressDetail: '강남구 컬리',
    }));

    it('에러 메세지를 반환하지 않는다.', () => {
      const { errorMessage, documentId } = validateAddressInfo(given.addressInfo);

      expect(errorMessage).toBe('');
      expect(documentId).toBe('');
    });
  });

  context('mobile 가 올바른 휴대폰 형식이 아니면', () => {
    given('addressInfo', () => ({
      name: '김컬리',
      mobile: '01212341234',
      addressDetail: '강남구 컬리',
    }));

    it('휴대폰 번호를 정확히 입력해주세요. 에러 메세지를 반환한다.', () => {
      const { errorMessage, documentId } = validateAddressInfo(given.addressInfo);

      expect(errorMessage).toBe('휴대폰 번호를 정확히 입력해주세요.');
      expect(documentId).toBe('mobile');
    });
  });

  context('모든 값이 올바르면', () => {
    given('addressInfo', () => ({
      name: '김컬리',
      mobile: '01012341234',
      addressDetail: '강남구 컬리',
    }));

    it('에러 메세지를 반환하지 않는다.', () => {
      const { errorMessage, documentId } = validateAddressInfo(given.addressInfo);

      expect(errorMessage).toBe('');
      expect(documentId).toBe('');
    });
  });
});
