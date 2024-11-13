import { TextButton, Typography } from '@thefarmersfront/kpds-react';
import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import Tooltip from '../../../../shared/components/KPDS/Tooltip';
import { zIndex } from '../../../../shared/styles';
import { CART_DELIVERY_GROUP } from '../../constants/CartDeliveryGroup';
import useDeliveryGroup from '../../hooks/useDeliveryGroup';
import { isPC } from '../../../../../util/window/getDevice';
import useUnavailableTitle from '../../hooks/useUnavailableTitle';

const UNAVAILABLE_ITEM_NOTICE = [
  '샛별only 상품의 경우, 택배지역에서는 주문이 불가합니다.',
  '품절, 판매 종료시 구매가 불가합니다.',
];

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: ${zIndex.checkoutGuideTooltip};
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  > p {
    margin-right: ${vars.spacing.$4};
  }
`;

const Text = styled.p`
  position: relative;
  color: ${vars.color.text.$tertiary};
  padding-left: ${vars.spacing.$12};

  ~ p {
    margin-top: ${vars.spacing.$4};
  }

  ::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 0;
    width: ${vars.spacing.$4};
    height: ${vars.spacing.$4};
    border-radius: 50%;
    background-color: ${vars.color.background.$background5};
  }
`;

export default function UnavailableItemTitle() {
  const { getDisplayName } = useDeliveryGroup();
  const { onDeleteAllUnavailableOrders } = useUnavailableTitle();

  return (
    <Wrapper>
      <Title>
        <Typography variant={`$xxlargeSemibold`}>{getDisplayName(CART_DELIVERY_GROUP.UNAVAILABLE_ORDERS)}</Typography>
        <Tooltip isPC={isPC} customStyle={isPC ? { left: '200px' } : undefined}>
          {UNAVAILABLE_ITEM_NOTICE.map((content) => (
            <Text key={content}>
              <Typography variant={'$largeRegular'} as={'span'}>
                {content}
              </Typography>
            </Text>
          ))}
        </Tooltip>
      </Title>
      <TextButton
        _type={'quaternary'}
        _style={'normal'}
        size={'small'}
        weight={'semibold'}
        onClick={onDeleteAllUnavailableOrders}
      >
        전체삭제
      </TextButton>
    </Wrapper>
  );
}
