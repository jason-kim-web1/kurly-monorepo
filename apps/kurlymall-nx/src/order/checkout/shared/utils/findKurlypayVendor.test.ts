import findKurlypayVendor from './findKurlypayVendor';
import { disableKurlypayVendorWithKB, KurlypayAddVendor, KurlypayPlccLottieVendor } from '../../../../../fixtures';

describe('findKurlypayVendor', () => {
  context('컬리페이 결제수단 목록에서', () => {
    it('disable 상태가 아니고, plcc추가 카드가 아닌 첫 번째 컬리페이 결제수단을 찾아 return 한다.', () => {
      const vendors = [disableKurlypayVendorWithKB, KurlypayPlccLottieVendor, KurlypayAddVendor];

      const result = findKurlypayVendor({ vendors });

      expect(result).toEqual(KurlypayAddVendor);
    });
  });
});
