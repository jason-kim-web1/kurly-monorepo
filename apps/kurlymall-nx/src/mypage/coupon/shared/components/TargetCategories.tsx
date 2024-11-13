import Link from 'next/link';

import { isEmpty } from 'lodash';

import { Icon, Typography } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';

import { DisplayCategories, CategoryType } from '../interfaces/Coupon.interfaces';
import { MoreButton, TargetItem, TargetLink, TargetList, TargetText } from '../styled/common';
import {
  isIosAccessVersion,
  makeCategoryLink,
  makeCategoryName,
  makePrimaryCategoryId,
  makeSecondaryCategoryId,
} from '../utils/conditionText';
import { getAppVersion, isWebview } from '../../../../../util/window/getDevice';
import { compareIosVersion } from '../constants';
import useClickCouponDetail from '../hooks/useClickCouponDetail';

interface Props {
  viewItemLength: number;
  categories: CategoryType[];
  targetCategories: DisplayCategories[];
  showAll: boolean;
  toggleShowAll: () => void;
}

export default function TargetCategories({
  categories,
  viewItemLength,
  targetCategories,
  showAll,
  toggleShowAll,
}: Props) {
  const { handleClickAmplitude } = useClickCouponDetail();

  if (isEmpty(targetCategories)) {
    return null;
  }

  const categoriesToShow = showAll ? targetCategories : targetCategories.slice(0, viewItemLength);

  const isIosAccessVersionCheck = isIosAccessVersion({
    webview: isWebview(),
    userVer: getAppVersion(),
    compareVer: compareIosVersion,
  });

  return (
    <TargetList>
      {categoriesToShow.map(({ code, name, siteKey, status }) => (
        <TargetItem key={`${name}${code}`}>
          {siteKey !== 'now' && status && isIosAccessVersionCheck ? (
            <Link href={makeCategoryLink({ webview: isWebview(), code, siteKey })} passHref prefetch={false}>
              <TargetLink
                className="target"
                onClick={() =>
                  handleClickAmplitude({
                    url: makeCategoryLink({ webview: isWebview(), code, siteKey }),
                    primaryCategoryId: makePrimaryCategoryId({ categories, displayCode: code }),
                    secondaryCategoryId: makeSecondaryCategoryId({ categories, displayCode: code }),
                  })
                }
              >
                <Typography variant="$largeSemibold" className="category">
                  {makeCategoryName({ categories, displayCode: code, name })}
                </Typography>
                <Icon type="ArrowRight" size={36} ratio="1:2" fill={vars.color.main.$secondary} />
              </TargetLink>
            </Link>
          ) : (
            <TargetText className="target">
              <Typography variant="$largeSemibold" className="category">
                {makeCategoryName({ categories, displayCode: code, name })}
              </Typography>
            </TargetText>
          )}
        </TargetItem>
      ))}
      {targetCategories.length > viewItemLength && !showAll && (
        <MoreButton onClick={toggleShowAll}>
          <Typography variant="$largeSemibold" className="more-text">
            {`더보기 (${targetCategories.length - viewItemLength})`}
          </Typography>
        </MoreButton>
      )}
    </TargetList>
  );
}
