import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { useDispatch } from 'react-redux';

import { DealProduct, DirectOrderType } from '../../../types';
import COLOR from '../../../../../shared/constant/colorset';

import Dropdown from '../../../../../shared/components/Input/Dropdown';
import SelectedProductItem from './selected-product/SelectedProductItem';
import Alert from '../../../../../shared/components/Alert/Alert';
import DropdownItem from '../../shared/DropdownItem';
import { useAppSelector } from '../../../../../shared/store';
import { selectedDealProducts } from '../../../selectors';
import { updateDealProductQuantity } from '../../../slice';

const DropDownWrapper = styled.div`
  width: 432px;

  .MuiOutlinedInput-root {
    height: 40px;
    font-family: 'Noto Sans KR';
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

const CartOptionItemWrapper = styled.div`
  margin-top: 20px;
`;

interface OptionsProps {
  id: number;
  value: string;
  name: string;
}

interface Props {
  dealProducts: DealProduct[];
  directOrderType: DirectOrderType;
}

export default function MultiSelectedProductItem({ dealProducts, directOrderType }: Props) {
  const dispatch = useDispatch();

  const options = dealProducts.map<OptionsProps>((it) => ({
    id: it.no,
    value: it.no.toString(),
    name: it.name,
    itemDisabled: !it.isPurchaseStatus || it.isSoldOut,
    textWrapper: (
      <DropdownItem
        description={it.name}
        discountedPrice={it.discountedPrice}
        basePrice={it.basePrice}
        retailPrice={it.retailPrice}
        isSoldOut={it.isSoldOut}
        isPurchaseStatus={it.isPurchaseStatus}
        membershipLabels={it.membershipLabels}
        pointBanner={it.pointBanner}
      />
    ),
  }));

  const handleChangeOption = async ({ value }: { value: string }) => {
    const productNo = Number(value);

    const target = dealProducts.find((it) => it.no === productNo);

    if (!target) {
      return;
    }

    if (target.quantity > 0) {
      await Alert({ text: '이미 추가된 옵션입니다.' });
      return;
    }

    dispatch(
      updateDealProductQuantity({
        targetProductNo: productNo,
        quantity: target.minEa,
      }),
    );
  };

  const selectedDeals = useAppSelector(selectedDealProducts);

  return (
    <>
      <DropDownWrapper>
        <Dropdown
          options={options}
          onChange={handleChangeOption}
          placeholder="상품을 선택해주세요"
          displayPlaceholder={false}
          fontSize={12}
          direction="up"
          isItemLineType
        />
      </DropDownWrapper>
      {!isEmpty(selectedDeals) && (
        <CartOptionItemWrapper>
          {selectedDeals.map((it) => (
            <SelectedProductItem key={it.no} dealProduct={it} directOrderType={directOrderType} isDisplayRemove />
          ))}
        </CartOptionItemWrapper>
      )}
    </>
  );
}
