import styled from '@emotion/styled';
import { TextButton } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';

import { useSelfOrderCancel } from '../../common/hooks/useSelfOrderCancel';
import Progress from '../../../shared/icons/kpds/progress';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: ${vars.spacing.$12};
  border-top: 1px solid ${vars.color.line.$line1};
  margin-top: 20px;
`;

const GroupCancelButton = styled(TextButton)`
  margin-top: 8px;
`;

export function GruopOrderCancelButton({ groupOrderNo }: { groupOrderNo: number }) {
  const { cancelOrderBySelf, isCancelLoading } = useSelfOrderCancel({ groupOrderNo });

  return (
    <ButtonWrapper onClick={cancelOrderBySelf}>
      <GroupCancelButton
        disabled={isCancelLoading}
        _type={'secondary'}
        size={'medium'}
        weight={'semibold'}
        _style={'normal'}
      >
        {isCancelLoading ? <Progress /> : '전체 상품 주문 취소'}
      </GroupCancelButton>
    </ButtonWrapper>
  );
}
