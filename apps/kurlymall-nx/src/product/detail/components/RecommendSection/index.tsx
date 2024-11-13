import { memo } from 'react';

import { useRecommendSection } from '../../hooks/useRecommendSection';
import { isNotEmpty } from '../../../../shared/utils/lodash-extends';
import { AdProductSection } from './AdProductSection';
import { ClickedTogetherSection } from './ClickedTogetherSection';
import { ImpressionPolicyContextProvider } from '../../../../shared/context/ImpressionPolicyContext';

type Props = {
  productNo: number;
};

const RecommendSectionImpl = ({ productNo }: Props) => {
  const { adProducts, clickedTogethers, selectionPolicy } = useRecommendSection(productNo);
  const shouldRenderAdProducts = isNotEmpty(adProducts);
  const shouldRenderClickedTogethers = isNotEmpty(clickedTogethers);
  if (!shouldRenderAdProducts && !shouldRenderClickedTogethers) {
    return null;
  }
  return (
    <ImpressionPolicyContextProvider>
      {shouldRenderAdProducts ? <AdProductSection products={adProducts} /> : null}
      {shouldRenderClickedTogethers ? (
        <ClickedTogetherSection products={clickedTogethers} selectionPolicy={selectionPolicy} />
      ) : null}
    </ImpressionPolicyContextProvider>
  );
};

const RecommendSection = memo(RecommendSectionImpl);

export { RecommendSection };
