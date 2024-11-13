import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Button, Typography } from '@thefarmersfront/kpds-react';

import BaseWrapper from '../../common/components/BaseWrapper';
import { MobileLink } from '../../../shared/components/Link/MobileLink';
import { useWebview } from '../../../shared/hooks';
import deepLinkUrl from '../../../shared/constant/deepLink';
import { INQUIRY_PATH } from '../../../shared/constant';
import { OrderDetail } from '../interface/OrderDetail';
import { useSelfOrderCancel } from '../../common/hooks/useSelfOrderCancel';

const Wrapper = styled(BaseWrapper)`
  padding: ${vars.spacing.$20} ${vars.spacing.$16};
  margin-top: ${vars.spacing.$20};
`;

const FullWidthButton = styled(Button)`
  width: 100%;
  margin-top: ${vars.spacing.$16};
`;

const ListTypography = styled(Typography)`
  position: relative;
  color: ${vars.color.text.$tertiary};
  padding-left: ${vars.spacing.$10};

  ~ p {
    margin-top: ${vars.spacing.$4};
  }

  &::before {
    position: absolute;
    top: 8px;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: ${vars.color.text.$tertiary};
    content: '';
  }
`;

const InquiryAnchor = styled.a`
  color: ${vars.color.main.$secondary};
  text-decoration: underline;
  line-height: ${vars.lineHeight.$20};
`;

interface Props {
  groupOrderNo: number;
  isSelfCancelable: OrderDetail['isSelfCancelable'];
}

const CancelAllOrders = ({ groupOrderNo, isSelfCancelable }: Props) => {
  const isWebview = useWebview();
  const inquiryPath = isWebview ? deepLinkUrl.PERSONAL_INQUIRY : INQUIRY_PATH.inquiry.uri;
  const { cancelOrderBySelf } = useSelfOrderCancel({ groupOrderNo });

  return (
    <Wrapper>
      <ListTypography variant="$largeRegular">주문취소는 [주문완료] 상태일 경우에만 가능합니다.</ListTypography>
      <ListTypography variant="$largeRegular">
        단, 일부 상품의 경우 [주문완료] 상태이더라도 상품의 특성상 주문취소가 불가능할 수 있습니다.
      </ListTypography>
      <ListTypography variant="$largeRegular">
        문의사항은{' '}
        <MobileLink url={inquiryPath} passHref>
          <InquiryAnchor>1:1문의</InquiryAnchor>
        </MobileLink>
        로 문의해주세요.
      </ListTypography>
      <FullWidthButton
        disabled={!isSelfCancelable}
        onClick={cancelOrderBySelf}
        _type="secondary"
        _style="stroke"
        color="light"
        size="large"
      >
        <Typography variant="$xlargeSemibold">전체 상품 주문 취소</Typography>
      </FullWidthButton>
    </Wrapper>
  );
};

export default CancelAllOrders;
