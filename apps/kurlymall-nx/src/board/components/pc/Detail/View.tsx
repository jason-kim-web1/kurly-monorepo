import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import RawHTML from '../../../../shared/components/layouts/RawHTML';

interface HeaderViewProps {
  source?: string;
}

const ViewWrapper = styled.div`
  padding: 30px 10px 100px;
  border-bottom: 1px ${COLOR.kurlyGray500} solid;
`;

export default function View({ source }: HeaderViewProps) {
  return (
    <ViewWrapper>
      <RawHTML html={source ?? ''} />
    </ViewWrapper>
  );
}
