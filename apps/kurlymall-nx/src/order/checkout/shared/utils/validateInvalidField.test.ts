import { findNotAllowText, reformattedString } from '../../../../shared/utils';
import { checkInvalidField, findErrorField } from './validateInvalidField';

describe('validateInvalidField 테스트', () => {
  describe('빈 문자열 검증', () => {
    context('빈 문자열 검증이 없다면', () => {
      given('params', () => ({
        fieldName: 'fieldName',
        value: '',
        documentId: 'fieldDocumentId',
      }));

      it('빈 문자열에도 에러 메세지가 없다.', () => {
        const { errorMessage, documentId } = checkInvalidField(given.params);

        expect(errorMessage).toBe('');
        expect(documentId).toBe('');
      });
    });

    context('빈 문자열에 대한 검증이 있다면', () => {
      given('params', () => ({
        fieldName: 'fieldName',
        value: '',
        documentId: 'fieldDocumentId',
        emptyMessage: '빈 문자열이 있습니다.',
      }));

      it('빈 문자열이 있을 시 emptyMessage 를 에러 메세지로 반환한다.', () => {
        const { errorMessage, documentId } = checkInvalidField(given.params);

        expect(errorMessage).toBe(given.params.emptyMessage);
        expect(documentId).toBe(given.params.documentId);
      });
    });
  });

  describe('정규식 통과 여부 검증', () => {
    context('정규식이 올바르지 않으면', () => {
      given('params', () => ({
        fieldName: 'fieldName',
        value: '010',
        invalidRegex: true,
        documentId: 'fieldDocumentId',
        emptyMessage: '빈 문자열이 있습니다.',
        correctMessage: '허용 불가능 문자열이 있습니다.',
      }));

      it('correctMessage 를 에러메세지로 반환한다.', () => {
        const { errorMessage, documentId } = checkInvalidField(given.params);

        expect(errorMessage).toBe(given.params.correctMessage);
        expect(documentId).toBe(given.params.documentId);
      });
    });

    context('정규식이 올바르면', () => {
      given('params', () => ({
        fieldName: 'fieldName',
        value: '김',
        invalidRegex: false,
        documentId: 'fieldDocumentId',
        emptyMessage: '빈 문자열이 있습니다.',
        correctMessage: '허용 불가능 문자열이 있습니다.',
      }));

      it('에러메세지를 빈 값으로 반환한다.', () => {
        const { errorMessage, documentId } = checkInvalidField(given.params);

        expect(errorMessage).toBe('');
        expect(documentId).toBe('');
      });
    });
  });

  describe('허용 불가 문자열 검증', () => {
    context('showNotAllowedText 이 true 이면', () => {
      given('params', () => ({
        fieldName: 'fieldName',
        value: '뷁',
        documentId: 'fieldDocumentId',
        emptyMessage: '빈 문자열이 있습니다.',
        correctMessage: '허용 불가능 문자열이 있습니다.',
        showNotAllowedText: true,
      }));

      it('에러메세지에 어떤 문자열이 들어오면 안되는지 같이 반환한다.', () => {
        const { errorMessage, documentId, reformattedField } = checkInvalidField(given.params);

        const { correctMessage, value, fieldName } = given.params;
        const notAllowedText = findNotAllowText(value);

        expect(errorMessage).toBe(`${correctMessage}\n${notAllowedText?.join(' ')}`);
        expect(documentId).toBe(given.params.documentId);
        expect(reformattedField).toStrictEqual({
          value: fieldName,
          text: reformattedString(value, notAllowedText),
        });
      });
    });

    context('showNotAllowedText 이 false 이면', () => {
      given('params', () => ({
        fieldName: 'fieldName',
        value: '뷁',
        documentId: 'fieldDocumentId',
        emptyMessage: '빈 문자열이 있습니다.',
        correctMessage: '허용 불가능 문자열이 있습니다.',
        showNotAllowedText: false,
      }));

      it('에러메세지 어떤 문자열이 들어오면 안되는지 보여주지 않는다.', () => {
        const { errorMessage, documentId } = checkInvalidField(given.params);

        expect(errorMessage).toBe(given.params.correctMessage);
        expect(documentId).toBe(given.params.documentId);
      });
    });
  });
});

describe('findErrorField 테스트', () => {
  context('에러 필드가 없다면', () => {
    given('params', () => ({
      fieldName: 'fieldName',
      value: '123',
      emptyMessage: '빈 문자열이 있습니다.',
      documentId: 'fieldDocumentId',
    }));

    it('false 를 반환한다.', () => {
      const result = findErrorField(given.params);

      expect(result).toBeFalsy();
    });
  });

  context('에러 필드가 있다면', () => {
    given('params', () => ({
      fieldName: 'fieldName',
      value: '',
      emptyMessage: '빈 문자열이 있습니다.',
      documentId: 'fieldDocumentId',
    }));

    it('true 를 반환한다.', () => {
      const result = findErrorField(given.params);

      expect(result).toBeTruthy();
    });
  });
});
