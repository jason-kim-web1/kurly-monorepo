import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { useDispatch } from 'react-redux';

import { DealProduct } from '../../../../../types';
import COLOR from '../../../../../../../shared/constant/colorset';

import Dropdown from '../../../../../../../shared/components/Input/Dropdown';
import Alert from '../../../../../../../shared/components/Alert/Alert';
import CartOptionItem from '../Item/CartOptionItem';
import DropdownItem from '../../../../shared/DropdownItem';
import { useAppSelector } from '../../../../../../../shared/store';
import { selectedDealProducts } from '../../../../../selectors';
import { updateDealProductQuantity } from '../../../../../slice';
import ProductInfoItemWrapper from '../../ProductInfoItemWrapper';

const CartOptionItemWrap = styled.div`
  margin-top: 6px;
`;

const ValueWrapper = styled.div`
  .MuiOutlinedInput-root {
    height: 40px;
  }

  > .MuiSelect-select {
    font-size: 12px;
    color: ${COLOR.kurlyGray800};
    letter-spacing: -0.5px;
    padding: 0 16px;
  }

  .MuiSelect-iconOutlined {
    color: ${COLOR.kurlyGray800};
  }
`;

// TODO remove duplicated component MultiSelectedProductItem.tsx
interface Props {
  contentNo: number;
  dealProducts: DealProduct[];
}

export default function MultiDeal({ contentNo, dealProducts }: Props) {
  const dispatch = useDispatch();

  const options = dealProducts.map((it) => ({
    id: it.no,
    value: it.no.toString(),
    name: it.name,
    itemDisabled: !it.isPurchaseStatus || it.isSoldOut,
    textWrapper: (
      <DropdownItem
        description={it.name}
        discountedPrice={it.discountedPrice}
        membershipLabels={it.membershipLabels}
        basePrice={it.basePrice}
        retailPrice={it.retailPrice}
        isSoldOut={it.isSoldOut}
        isPurchaseStatus={it.isPurchaseStatus}
        isGroupProduct={false}
        pointBanner={it.pointBanner}
      />
    ),
  }));

  const handleChangeOption = async ({ value }: { value: string }) => {
    const targetDealNo = Number(value);

    const target = dealProducts.find((it) => it.no === targetDealNo);

    if (!target) {
      return;
    }

    if (target.quantity > 0) {
      await Alert({ text: '이미 추가된 옵션입니다.' });
      return;
    }

    dispatch(
      updateDealProductQuantity({
        targetProductNo: targetDealNo,
        quantity: target.minEa,
      }),
    );
  };

  const selectedDeals = useAppSelector(selectedDealProducts);

  return (
    <ProductInfoItemWrapper title="상품 선택" titleLineHeight={40}>
      <ValueWrapper>
        <Dropdown
          options={options}
          onChange={handleChangeOption}
          placeholder="상품을 선택해주세요"
          displayPlaceholder={false}
          anchorOrigin={44}
          fontSize={12}
          isItemLineType={true}
        />
        {!isEmpty(selectedDeals) && (
          <CartOptionItemWrap>
            {selectedDeals.map((dealProduct) => (
              <CartOptionItem key={dealProduct.no} contentNo={contentNo} dealProduct={dealProduct} />
            ))}
          </CartOptionItemWrap>
        )}
      </ValueWrapper>
    </ProductInfoItemWrapper>
  );
}
