import Link from 'next/link';

import { Icon } from '@thefarmersfront/kpds-react';

import { vars } from '@thefarmersfront/kpds-css';

import { HurdleLink, HurdleText } from '../styled/common';
import HurdleButtonInfo from './HurdleButtonInfo';
import useClickCouponDetail from '../hooks/useClickCouponDetail';
import { CategoryType } from '../interfaces/Coupon.interfaces';

interface Props {
  name: string;
  url: string;
  isLinkAvailable: boolean;
  categories?: CategoryType;
  contentsProductNo?: string;
  dealProductName?: string;
}

export default function HurdleButton({
  name,
  isLinkAvailable,
  url,
  categories,
  contentsProductNo,
  dealProductName,
}: Props) {
  const { handleClickAmplitude } = useClickCouponDetail();

  if (!isLinkAvailable) {
    return (
      <HurdleText>
        <HurdleButtonInfo name={name} />
      </HurdleText>
    );
  }

  return (
    <Link href={url} passHref prefetch={false}>
      <HurdleLink
        onClick={() =>
          handleClickAmplitude({
            url,
            primaryCategoryId: categories?.code ?? null,
            secondaryCategoryId: categories?.subCategory?.code ?? null,
            dealName: dealProductName ?? null,
            contentId: contentsProductNo ?? null,
          })
        }
      >
        <HurdleButtonInfo name={name} />
        <Icon type="ArrowRight" size={35} ratio="1:2" fill={vars.color.main.$secondary} />
      </HurdleLink>
    </Link>
  );
}
