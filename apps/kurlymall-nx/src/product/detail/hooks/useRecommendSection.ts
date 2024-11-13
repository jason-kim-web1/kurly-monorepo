import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { useAppSelector } from '../../../shared/store';
import { AdProductItemList, ClickedTogetherItemList, getRecommendProducts } from '../../service/product.service';

const useRecommendSection = (productNo: number) => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const query = useQuery({
    queryKey: ['product', 'detail', 'recommend', productNo],
    queryFn: () => getRecommendProducts(productNo),
    enabled: hasSession,
  });
  const { data } = query;
  const adProducts: AdProductItemList = get(data, 'adProducts', []);
  const clickedTogethers: ClickedTogetherItemList = get(data, 'clickedTogethers.items', []);
  const selectionPolicy = get(data, 'clickedTogethers.selectionPolicy', '');
  return {
    ...query,
    adProducts,
    clickedTogethers,
    selectionPolicy,
  };
};

export { useRecommendSection };
