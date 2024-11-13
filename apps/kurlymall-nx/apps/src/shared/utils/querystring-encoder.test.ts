import { encodeQueryString } from './querystring-encoder';

describe('encodeQueryString', () => {
  context('오브젝트에 데이터가 들어가있으면', () => {
    it('쿼리스트링으로 변환하여 return 한다.', () => {
      const sampleObject = {
        test: '테스트 메세지',
        lgd: 'tsf_t20220513',
        testRespCode: '0000',
        testBillKey: 'YC+CWEy5uwIyOJA=',
        testFinanceName: 'NH MASTER',
        Amount: '0',
      };

      const result = encodeQueryString(sampleObject);

      expect(result).toBe(
        '?test=%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EB%A9%94%EC%84%B8%EC%A7%80&lgd=tsf_t20220513&testRespCode=0000&testBillKey=YC%2BCWEy5uwIyOJA%3D&testFinanceName=NH%20MASTER&Amount=0',
      );
    });
  });

  context('오브젝트가 빈 오브젝트면', () => {
    it('빈 문자열을 return 한다.', () => {
      const sampleObject = {};

      const result = encodeQueryString(sampleObject);

      expect(result).toBe('');
    });
  });
});
