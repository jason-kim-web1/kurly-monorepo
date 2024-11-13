import { css } from '@emotion/css';
import Link from 'next/link';
import { head } from 'lodash';
import { ForwardedRef, forwardRef } from 'react';

import type { BannerNoResultSectionViewModel, BannerNoResultSectionItemViewModel } from '../../factory';
import NextImage from '../../../../../shared/components/NextImage';
import { AspectRatio } from '../../../../../shared/components/AspectRatio';
import { ImpressionSection } from '../../shared/components/ImpressionSection';
import { ImpressionSectionItem } from '../../shared/components/ImpressionSectionItem';
import { useLogger } from '../../../../contexts/LogSearchContext';

const sectionStyle = css`
  padding: 0 16px;
`;

const bannerImageStyle = css`
  border-radius: 6px;
  overflow: hidden;
`;

type SectionItemProps = {
  data: BannerNoResultSectionItemViewModel;
  onClick: () => void;
};

const BannerNoResultSectionItemImpl = ({ data, onClick }: SectionItemProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { mobileLink, eventBannerMobileUrl } = data;
  return (
    <Link href={mobileLink} passHref prefetch={false}>
      <a ref={ref} href={mobileLink} onClick={onClick}>
        <AspectRatio ratio={343 / 116} className={bannerImageStyle}>
          <NextImage layout="fill" objectFit="cover" src={eventBannerMobileUrl} />
        </AspectRatio>
      </a>
    </Link>
  );
};

const BannerNoResultSectionItem = forwardRef(BannerNoResultSectionItemImpl);

type Props = {
  section: BannerNoResultSectionViewModel;
};

const BannerNoResultSection = ({ section }: Props) => {
  const {
    data: { items },
  } = section;
  // TOFIX: ViewModel 정책 반영 > BANNER_NO_RESULT 은 현재 하나의 배너만 노출
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
    <ImpressionSection section={section} className={sectionStyle}>
      <ImpressionSectionItem section={section} item={banner}>
        <BannerNoResultSectionItem data={banner} onClick={handleClick} />
      </ImpressionSectionItem>
    </ImpressionSection>
  );
};

export { BannerNoResultSection };
