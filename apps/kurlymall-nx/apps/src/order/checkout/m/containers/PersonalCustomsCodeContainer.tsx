import styled from '@emotion/styled';

import { Divider } from '../../../../shared/components/Divider/Divider';
import Detail from '../components/PersonalCustomsCodeDetail/Detail';
import usePersonalCustomsCode from '../../shared/hooks/usePersonalCustomsCode';
import LoadingPersonalCustomsCode from '../components/Loading/LoadingPersonalCustomsCode';
import GuideTooltip from '../../shared/components/GuideTooltip';

const Wrapper = styled.div`
  padding: 20px 20px 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const PersonalCustomsCodeContainer = () => {
  const { showSkeleton, TooltipMessage } = usePersonalCustomsCode();

  return (
    <>
      <div id="personal-customs-code-container">
        <Wrapper>
          <TitleWrapper>
            <Title>개인통관고유부호</Title>
            <GuideTooltip title="개인통관고유부호 안내" content={TooltipMessage} />
          </TitleWrapper>
          {showSkeleton ? <LoadingPersonalCustomsCode /> : <Detail />}
        </Wrapper>
      </div>
      <Divider />
    </>
  );
};

export default PersonalCustomsCodeContainer;
