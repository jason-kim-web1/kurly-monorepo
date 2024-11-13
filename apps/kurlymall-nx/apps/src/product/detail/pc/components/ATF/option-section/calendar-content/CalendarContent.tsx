import styled from '@emotion/styled';

import useGroupProduct from '../../../../../hooks/useGroupProduct';

import type { DealProduct, GroupKey, GroupMember } from '../../../../../types';
import CalendarDropdown from './CalendarDropdown';
import DealProductStepper from '../../../../../shared/DealProductStepper';
import ProductInfoItemWrapper from '../../ProductInfoItemWrapper';
import useDealProduct from '../../../../../hooks/useDealProduct';
import { useAppSelector } from '../../../../../../../shared/store';

const CalendarDropdownWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;

interface Props {
  groupKeys: GroupKey[];
  groupMembers: GroupMember[];
  dealProduct: DealProduct;
}

export default function CalendarContent({ groupKeys, groupMembers, dealProduct }: Props) {
  const productNo = useAppSelector(({ productDetail }) => productDetail.no);
  const contentType = useAppSelector(({ productDetail }) => productDetail.contentType);
  const { changeQuantity } = useDealProduct(productNo, dealProduct, contentType);
  const { optionList, changeOptionItem } = useGroupProduct({ productNo, groupKeys, groupMembers });
  const optionTitle = optionList.map((option) => option.title).join('·');

  const handleChangeQuantity = (quantity: number) => changeQuantity(quantity);

  return (
    <>
      <ProductInfoItemWrapper title={`${optionTitle} 선택`} titleLineHeight={40}>
        <CalendarDropdownWrapper>
          {optionList.map((option, index) => (
            <CalendarDropdown
              key={index}
              optionTitle={option.title}
              options={option.options}
              selectedOption={option.selectedOption}
              changeOptionItem={changeOptionItem}
            />
          ))}
        </CalendarDropdownWrapper>
      </ProductInfoItemWrapper>
      <ProductInfoItemWrapper title="구매수량" titleLineHeight={30}>
        <DealProductStepper contentType={contentType} dealProduct={dealProduct} onChange={handleChangeQuantity} />
      </ProductInfoItemWrapper>
    </>
  );
}
