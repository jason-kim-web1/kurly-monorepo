import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Divider = styled.div`
  padding-bottom: 10px;
  border-bottom: 2px solid ${COLOR.kurlyGray800};
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
  line-height: 17px;
  text-align: right;
`;

const Icon = styled.span`
  color: ${COLOR.loversTag};
`;

export default function HeaderDivider() {
  return (
    <Divider>
      <Icon>*</Icon> 필수입력사항
    </Divider>
  );
}
