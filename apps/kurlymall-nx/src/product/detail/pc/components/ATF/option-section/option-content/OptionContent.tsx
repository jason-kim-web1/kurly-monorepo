import useGroupProduct from '../../../../../hooks/useGroupProduct';

import { DealProduct, GroupKey, GroupMember } from '../../../../../types';

import OptionItemList from './OptionItemList';
import ProductInfoItemWrapper from '../../ProductInfoItemWrapper';
import DealProductStepper from '../../../../../shared/DealProductStepper';
import { useAppSelector } from '../../../../../../../shared/store';
import useDealProduct from '../../../../../hooks/useDealProduct';

interface Props {
  groupKeys: GroupKey[];
  groupMembers: GroupMember[];
  dealProduct: DealProduct;
}

export default function OptionContent({ groupKeys, groupMembers, dealProduct }: Props) {
  const productNo = useAppSelector(({ productDetail }) => productDetail.no);
  const contentType = useAppSelector(({ productDetail }) => productDetail.contentType);
  const { changeQuantity } = useDealProduct(productNo, dealProduct, contentType);
  const { optionList, changeOptionItem } = useGroupProduct({ productNo, groupKeys, groupMembers });

  const handleChangeQuantity = (quantity: number) => changeQuantity(quantity);

  return (
    <>
      {optionList.map((option) => (
        <OptionItemList
          key={option.title}
          title={option.title}
          descriptionType={option.descriptionType}
          options={option.options}
          selectedOption={option.selectedOption}
          changeOptionItem={changeOptionItem}
        />
      ))}
      <ProductInfoItemWrapper title="구매수량" titleLineHeight={30}>
        <DealProductStepper contentType={contentType} dealProduct={dealProduct} onChange={handleChangeQuantity} />
      </ProductInfoItemWrapper>
    </>
  );
}
