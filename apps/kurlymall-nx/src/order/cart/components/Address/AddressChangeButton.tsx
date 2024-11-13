import { Button, Typography } from '@thefarmersfront/kpds-react';

import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

const Wrapper = styled(Button)`
  flex-shrink: 0;
  margin-left: ${vars.spacing.$24};
`;

/**
 * 배송지 변경 클릭 이벤트는 더 넓은 범위의 클릭 영역을 제공하기 위해, 상위 컴포넌트에서 처리하고 있습니다.
 * 해당 컴포넌트는 단순 UI만 제공합니다.
 *
 * 클릭 이벤트를 처리하는 곳
 * - PC : src/order/cart/components/pc/Address.tsx
 * - MW : src/order/cart/components/m/Address.tsx
 */
export default function AddressChangeButton() {
  return (
    <Wrapper _type="secondary" _style="stroke" color="light" size="small" shape="square">
      <Typography variant="$largeSemibold" as="span">
        변경
      </Typography>
    </Wrapper>
  );
}
