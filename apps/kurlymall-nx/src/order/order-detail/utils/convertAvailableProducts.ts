import { DeliveryGroups } from '../../common/interface/DeliveryGroup';
import { ReorderProduct } from '../../../shared/interfaces';

export const convertAvailableProducts = ({
  availableProducts,
  deliveryGroups,
}: {
  availableProducts: ReorderProduct[];
  deliveryGroups: DeliveryGroups;
}) => {
  return availableProducts.map((product) => {
    const foundProduct = deliveryGroups
      .find(({ dealProducts }) => dealProducts.find(({ dealProductNo }) => dealProductNo === product.dealProductNo))
      ?.dealProducts.find(({ dealProductNo }) => dealProductNo === product.dealProductNo);

    return {
      ...product,
      categoryIds: foundProduct?.categoryIds || [],
      productPrice: (foundProduct?.displayPrice || 0) - (foundProduct?.displayDiscountPrice || 0),
    };
  });
};
