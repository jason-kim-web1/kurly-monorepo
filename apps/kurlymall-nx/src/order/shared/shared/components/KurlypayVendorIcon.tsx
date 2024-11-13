import KurlypayIcon from '../../../../shared/components/icons/order/checkout/KurlypayIcon';

import COLOR from '../../../../shared/constant/colorset';

export default function KurlypayVendorIcon({ active }: { active: boolean }) {
  return <KurlypayIcon fill={active ? COLOR.kurlyWhite : COLOR.kurlyPurple} />;
}
