import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Divider = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${COLOR.kurlyGray800};
`;

export default function FooterDivider() {
  return <Divider />;
}
