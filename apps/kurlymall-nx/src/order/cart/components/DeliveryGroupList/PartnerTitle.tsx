import { Typography } from '@thefarmersfront/kpds-react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { multiMaxLineText } from '../../../../shared/utils';

const Wrapper = styled.div`
  display: flex;
  padding: ${vars.spacing.$16} ${vars.spacing.$0} ${vars.spacing.$12};
`;

const PartnerName = styled(Typography)`
  color: ${vars.color.text.$tertiary};
  ${multiMaxLineText(1)};
`;

export default function PartnerTitle({ partnerName }: { partnerName: string }) {
  return (
    <Wrapper>
      <PartnerName variant={`$xlargeSemibold`}>{partnerName}</PartnerName>
    </Wrapper>
  );
}
