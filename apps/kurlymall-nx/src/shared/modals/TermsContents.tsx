import styled from '@emotion/styled';

import Terms from '../components/layouts/Terms';
import { LoadingSpinner } from '../components/LoadingSpinner';
import COLOR from '../constant/colorset';
import { isPC } from '../../../util/window/getDevice';

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${isPC ? 540 : 470}px;
`;

export default function TermsContents({ html }: { html?: string }) {
  if (!html) {
    return (
      <LoadingWrapper>
        <LoadingSpinner stroke={COLOR.kurlyGray300} />
      </LoadingWrapper>
    );
  }

  return <Terms html={html} />;
}
