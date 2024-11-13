import { head } from 'lodash';
import Link from 'next/link';
import { ForwardedRef, forwardRef } from 'react';

import type { BannerSectionViewModel, BannerSectionItemViewModel } from '../../factory';
import NextImage from '../../../../../shared/components/NextImage';
import { AspectRatio } from '../../../../../shared/components/AspectRatio';
import { ImpressionSection } from '../../shared/components/ImpressionSection';
import { ImpressionSectionItem } from '../../shared/components/ImpressionSectionItem';
import { useLogger } from '../../../../contexts/LogSearchContext';

type SectionItemProps = {
  data: BannerSectionItemViewModel;
  onClick: () => void;
};

const SectionItemImpl = ({ data, onClick }: SectionItemProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { title, link, eventBannerMobileUrl } = data;
  return (
    <Link href={link}>
      <a ref={ref} href={link} onClick={onClick}>
        <AspectRatio ratio={375 / 126}>
          <NextImage src={eventBannerMobileUrl} layout="fill" objectFit="cover" alt={title} disableImageDrag />
        </AspectRatio>
      </a>
    </Link>
  );
};

const SectionItem = forwardRef(SectionItemImpl);

type Props = {
  section: BannerSectionViewModel;
};

const BannerSection = ({ section }: Props) => {
  const { data } = section;
  const { items } = data;
  const banner = head(items);
  const { logSelectSectionItem } = useLogger();

  const handleClick = () => {
    if (!banner) {
      return;
    }
    logSelectSectionItem(section, banner);
  };

  if (!banner) {
    return null;
  }

  return (
    <ImpressionSection section={section}>
      <ImpressionSectionItem section={section} item={banner}>
        <SectionItem data={banner} onClick={handleClick} />
      </ImpressionSectionItem>
    </ImpressionSection>
  );
};

export { BannerSection };
