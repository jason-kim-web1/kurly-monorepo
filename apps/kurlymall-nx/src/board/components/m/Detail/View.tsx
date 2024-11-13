import styled from '@emotion/styled';

import RawHTML from '../../../../shared/components/layouts/RawHTML';

interface HeaderViewProps {
  source?: string;
}

const ViewWrapper = styled.div`
  padding: 20px;
`;

export default function View({ source }: HeaderViewProps) {
  return (
    <ViewWrapper>
      <RawHTML html={source ?? ''} />
    </ViewWrapper>
  );
}
