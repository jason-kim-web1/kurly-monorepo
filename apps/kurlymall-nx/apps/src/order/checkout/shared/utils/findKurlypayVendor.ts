import { head } from 'lodash';

import { EasyPaymentType, KurlypayVendor } from '../../../../shared/interfaces';

const findKurlypayVendor = ({ vendors }: { vendors: KurlypayVendor[] }) => {
  return (
    vendors.find((vendor) => !vendor.isDisabled && vendor.paymentType !== EasyPaymentType.ADD_PLCC) ?? head(vendors)
  );
};

export default findKurlypayVendor;
