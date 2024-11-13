import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';

import BaseWrapper from '../../../common/components/BaseWrapper';
import Divider from '../../../common/components/Divider';
import ProductItem from '../../../common/components/ProductItem';
import { OrderDetail } from '../../interface/OrderDetail';
import { isPC } from '../../../../../util/window/getDevice';
import ReAddAllButton from './ReAddAllButton';
import OrderGroupActionButtons from './OrderGroupActionButtons';
import OrderStatusBar from '../../../common/components/OrderStatusBar';
import DeliveryTrackingButton from './DeliveryTrackingButton';

const Wrapper = styled(BaseWrapper)`
  padding: ${vars.spacing.$16};
`;

const Title = styled(Typography)`
  padding: ${isPC ? `${vars.spacing.$20} 0 ${vars.spacing.$12}` : `${vars.spacing.$32} 0 ${vars.spacing.$12}`};
  color: ${vars.color.text.$primary};
`;
const ProductList = styled.div<{ isLast: boolean }>`
  > div {
    margin-bottom: ${vars.spacing.$20};
  }

  > button {
    margin-bottom: ${({ isLast }) => (isLast ? vars.spacing.$6 : vars.spacing.$20)};
  }
`;

interface Props {
  groupOrderNo: OrderDetail['groupOrderNo'];
  deliveryGroups: OrderDetail['deliveryGroups'];
}

const OrderDeliveryGroupList = ({ groupOrderNo, deliveryGroups }: Props) => {
  return (
    <>
      <Title variant="$xxxlargeSemibold">주문상품</Title>
      <Wrapper>
        {deliveryGroups.map(
          (
            {
              orderStatus,
              deliveryMessage,
              deliveryCompletedImageUrl,
              deliveryPolicy,
              dealProducts,
              partnerName,
              orderNos,
              invoices,
              isSelfCancelable,
              reviewStatusType,
            },
            index,
          ) => (
            <Fragment key={index}>
              <OrderStatusBar
                orderStatus={orderStatus}
                deliveryMessage={deliveryMessage}
                deliveryCompletedImageUrl={deliveryCompletedImageUrl}
                hasExtraMarginTop={index === 0}
              />
              {dealProducts.map((dealProduct, dealProductIndex) => (
                <ProductList key={dealProduct.dealProductNo} isLast={dealProductIndex === dealProducts.length - 1}>
                  <ProductItem data={{ deliveryPolicy, dealProduct, partnerName, isOrderDetailPage: true }} />
                  {/* 딜상품 단위 배송조회 버튼 */}
                  {(orderStatus === '배송중' || orderStatus === '배송완료') && (
                    <DeliveryTrackingButton invoiceOfDealProduct={dealProduct.invoice} />
                  )}
                </ProductList>
              ))}
              <OrderGroupActionButtons
                orderStatus={orderStatus}
                groupOrderNo={groupOrderNo}
                orderNos={orderNos}
                invoices={invoices}
                deliveryPolicy={deliveryPolicy}
                isSelfCancelable={isSelfCancelable}
                reviewStatusType={reviewStatusType}
              />
              {index !== deliveryGroups.length - 1 && (
                <Divider width="100%" height="1px" margin={`${vars.spacing.$20} 0`} />
              )}
            </Fragment>
          ),
        )}
        <ReAddAllButton groupOrderNo={groupOrderNo} />
      </Wrapper>
    </>
  );
};

export default OrderDeliveryGroupList;
