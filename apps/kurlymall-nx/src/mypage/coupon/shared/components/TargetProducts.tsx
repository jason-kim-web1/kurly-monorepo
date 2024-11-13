import Link from 'next/link';

import { isEmpty } from 'lodash';

import { Icon, Typography } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';

import { MoreButton, TargetItem, TargetLink, TargetList, TargetText } from '../styled/common';
import { DisplayProducts } from '../interfaces/Coupon.interfaces';
import { isWebview } from '../../../../../util/window/getDevice';
import { makeProductLink } from '../utils/conditionText';
import useClickCouponDetail from '../hooks/useClickCouponDetail';

interface Props {
  viewItemLength: number;
  targetProducts: DisplayProducts[];
  showAll: boolean;
  toggleShowAll: () => void;
}

export default function TargetProducts({ viewItemLength, targetProducts, showAll, toggleShowAll }: Props) {
  const { handleClickAmplitude } = useClickCouponDetail();

  if (isEmpty(targetProducts)) {
    return null;
  }

  const productsToShow = showAll ? targetProducts : targetProducts.slice(0, viewItemLength);

  return (
    <TargetList>
      {productsToShow.map(({ contentsProductNo, dealProductName, siteAttributes }) => (
        <TargetItem key={`${dealProductName}${contentsProductNo}`}>
          {siteAttributes[0] === 'NOW' ? (
            <TargetText className="target">
              <Typography variant="$largeRegular" className="product">
                {dealProductName}
              </Typography>
            </TargetText>
          ) : (
            <Link href={makeProductLink({ webview: isWebview(), contentsProductNo })} passHref prefetch={false}>
              <TargetLink
                onClick={() =>
                  handleClickAmplitude({
                    url: makeProductLink({ webview: isWebview(), contentsProductNo }),
                    contentId: contentsProductNo,
                    dealName: dealProductName,
                  })
                }
              >
                <Typography variant="$largeRegular" className="product">
                  {dealProductName}
                </Typography>
                <Icon type="ArrowRight" size={36} ratio="1:2" fill={vars.color.main.$secondary} />
              </TargetLink>
            </Link>
          )}
        </TargetItem>
      ))}
      {targetProducts.length > viewItemLength && !showAll && (
        <MoreButton onClick={toggleShowAll}>
          <Typography variant="$largeSemibold" className="more-text">
            {`더보기 (${targetProducts.length - viewItemLength})`}
          </Typography>
        </MoreButton>
      )}
    </TargetList>
  );
}
