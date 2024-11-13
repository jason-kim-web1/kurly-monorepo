import styled from '@emotion/styled';
import { Button, Typography } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';

import { OrderDetail } from '../../interface/OrderDetail';
import Progress from '../../../../shared/icons/kpds/progress';
import Divider from '../../../common/components/Divider';
import useReAddAllButton from '../../hooks/useReAddAllButton';

const Wrapper = styled.div`
  margin-bottom: ${vars.spacing.$4};
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

interface Props {
  groupOrderNo: OrderDetail['groupOrderNo'];
}

const ReAddAllButton = ({ groupOrderNo }: Props) => {
  const { isAllDefaultOrderProducts, isLoadingToMutate, handleClick } = useReAddAllButton(groupOrderNo);

  if (!isAllDefaultOrderProducts) return null;

  return (
    <Wrapper>
      <Divider width="100%" height="1px" margin={`${vars.spacing.$20} 0 ${vars.spacing.$16} 0`} />
      <FullWidthButton
        _type="secondary"
        _style="stroke"
        color="light"
        size="large"
        onClick={handleClick}
        disabled={isLoadingToMutate}
      >
        {isLoadingToMutate ? <Progress /> : <Typography variant="$xlargeSemibold">전체상품 다시 담기</Typography>}
      </FullWidthButton>
    </Wrapper>
  );
};

export default ReAddAllButton;
