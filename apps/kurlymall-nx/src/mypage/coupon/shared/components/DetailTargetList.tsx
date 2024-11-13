import { useState } from 'react';

import { isEmpty } from 'lodash';

import { ConditionWrapper, TargetWrapper, TitleText } from '../styled/common';
import ConditionItem from './ConditionItem';
import { makeTargetText } from '../utils/conditionText';
import TargetCategories from './TargetCategories';
import TargetProducts from './TargetProducts';
import useCouponDetailQuery from '../queries/useCouponDetailQuery';
import { TargetList, TargetListType, TargetScope } from '../types/conditionTextType';

interface Props {
  title: string;
  targetList: TargetListType;
}

export default function DetailTargetList({ title, targetList }: Props) {
  const { data } = useCouponDetailQuery();

  const [showAll, setShowAll] = useState(false);

  if (!data) {
    return null;
  }

  const {
    target: { scope, salesOwner, disallowDiscountedProducts, allowedCategories, disallowedCategories },
    displayTarget,
  } = data;

  const salesOwnerText = makeTargetText({ salesOwner });
  const disallowDiscountedProductsText = makeTargetText({ disallowDiscountedProducts });

  const getTargetList = (target: TargetListType) => {
    return {
      [TargetList.DISALLOWED]: {
        products: displayTarget.disallowedProducts,
        categories: displayTarget.disallowedCategories,
        defaultCategories: disallowedCategories ?? [],
      },
      [TargetList.ALLOWED]: {
        products: displayTarget.allowedProducts,
        categories: displayTarget.allowedCategories,
        defaultCategories: allowedCategories ?? [],
      },
    }[target];
  };

  const targetData = getTargetList(targetList);

  const showTargetList = () => {
    if (scope === TargetScope.ALL && (!salesOwnerText || !disallowDiscountedProductsText)) {
      return false;
    }

    return !isEmpty(targetData.products) || !isEmpty(targetData.categories);
  };

  if (!showTargetList()) {
    return null;
  }

  const viewItemLength = title === '제외 대상' ? 5 : 10;

  return (
    <TargetWrapper>
      <TitleText variant="$xxlargeSemibold">{title}</TitleText>
      {title === '적용 대상' && (
        <ConditionWrapper>
          <ConditionItem text={makeTargetText({ salesOwner })} />
          <ConditionItem text={makeTargetText({ disallowDiscountedProducts })} />
        </ConditionWrapper>
      )}
      <TargetCategories
        viewItemLength={viewItemLength}
        categories={targetData.defaultCategories}
        targetCategories={targetData.categories}
        showAll={showAll}
        toggleShowAll={() => setShowAll(!showAll)}
      />
      <TargetProducts
        viewItemLength={viewItemLength}
        targetProducts={targetData.products}
        showAll={showAll}
        toggleShowAll={() => setShowAll(!showAll)}
      />
    </TargetWrapper>
  );
}
