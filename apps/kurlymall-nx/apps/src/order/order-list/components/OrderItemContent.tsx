import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { css } from '@emotion/react';

import { Icon, Typography } from '@thefarmersfront/kpds-react';

import { DealProducts } from '../../common/interface/DealProduct';
import { DeliveryPolicy } from '../../common/interface/DeliveryGroup';
import ProductItem from '../../common/components/ProductItem';
import SlideToggleWrapper from '../../../shared/components/motion/SlideToggleWrapper';
import { useOrderItemContent } from '../hook/useOrderItemContent';

const ItemListWrapper = styled.div`
  margin-top: ${vars.spacing.$16};
`;

const ToggleWrapper = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${vars.spacing.$18};
  color: ${vars.color.text.$quaternary};

  ${({ isOpen }) =>
    isOpen &&
    css`
      > i {
        transform: rotate(180deg);
      }
    `}
`;

const ToggleButtonText = styled(Typography)`
  padding-right: ${vars.spacing.$4};
`;

interface Props {
  dealProducts: DealProducts;
  deliveryPolicy: DeliveryPolicy;
  partnerName: string;
}

export default function OrderItemContent({ dealProducts, deliveryPolicy, partnerName }: Props) {
  const { isOpen, toggle, orderItems, isShowPreviewItems, moreItems, buttonText } = useOrderItemContent({
    dealProducts,
  });

  const renderOrderItems = (items: DealProducts) => {
    return items.map((dealProduct, index) => (
      <ItemListWrapper key={index}>
        <ProductItem data={{ deliveryPolicy, dealProduct, partnerName }} />
      </ItemListWrapper>
    ));
  };

  return (
    <>
      {renderOrderItems(orderItems)}
      {isShowPreviewItems && (
        <>
          <SlideToggleWrapper opened={isOpen}>{renderOrderItems(moreItems)}</SlideToggleWrapper>
          <ToggleWrapper onClick={toggle} isOpen={isOpen}>
            <ToggleButtonText variant="$largeSemibold">{buttonText}</ToggleButtonText>
            <Icon type="ArrowBottom" size={16} ratio="1:1" fill={vars.color.text.$quaternary} />
          </ToggleWrapper>
        </>
      )}
    </>
  );
}
