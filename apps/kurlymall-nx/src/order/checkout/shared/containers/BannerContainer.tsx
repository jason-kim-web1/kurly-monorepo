import { useAppSelector } from '../../../../shared/store';

import PackagingMethodBanner from '../components/PackagingMethodBanner';

export default function BannerContainer({ device }: { device: string }) {
  const selected = useAppSelector(({ checkout }) => checkout.reusablePackage.selected);

  return <PackagingMethodBanner device={device} method={selected ?? 'PAPER'} />;
}
