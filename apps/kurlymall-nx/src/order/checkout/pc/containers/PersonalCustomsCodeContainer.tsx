import styled from '@emotion/styled';

import { Title } from '../components/Title';
import Detail from '../components/PersonalCustomsCodeDetail/Detail';
import usePersonalCustomsCode from '../../shared/hooks/usePersonalCustomsCode';
import InformationRow from '../../../../shared/components/layouts/InformationRow';
import LoadingPersonalCustomsCode from '../components/PersonalCustomsCodeDetail/LoadingPersonalCustomsCode';
import GuideTooltip from '../../shared/components/GuideTooltip';

const Wrapper = styled.div`
  padding-bottom: 20px;
  span {
    line-height: 24px;
  }
`;

const PersonalCustomsCodeContainer = () => {
  const { showSkeleton, TooltipMessage } = usePersonalCustomsCode();

  return (
    <div id="personal-customs-code-container">
      <Title title="개인통관고유부호 정보">
        <GuideTooltip title="개인통관고유부호 안내" content={TooltipMessage} />
      </Title>
      {showSkeleton ? (
        <LoadingPersonalCustomsCode />
      ) : (
        <Wrapper>
          <InformationRow title="개인통관고유부호">
            <Detail />
          </InformationRow>
        </Wrapper>
      )}
    </div>
  );
};

export default PersonalCustomsCodeContainer;
