import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import { useSearchData } from '../../contexts/SearchDataProvider';
import ExclamationMark from '../../../shared/icons/ExclamationMark';
import { emptyResultText } from '../../shared/constants';

const Wrapper = styled.div`
  margin-bottom: 75px;
`;

const Title = styled.h3`
  margin: 50px auto;
  font-weight: 500;
  font-size: 28px;
  line-height: 35px;
  letter-spacing: -0.5px;
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 480px;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const Emph = styled.span`
  display: inline-block;
  overflow: hidden;
  max-width: 840px;
  color: ${COLOR.kurlyPurple};
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: top;
`;

const ErrorText = styled.span`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 400;
  color: ${COLOR.kurlyGray400};
  text-align: center;
  white-space: pre-line;
`;

export default function SearchListError() {
  const { searchKeyword } = useSearchData();

  return (
    <Wrapper>
      <Title>
        {"'"}
        <Emph>{searchKeyword}</Emph>
        {"'"}에 대한 검색결과
      </Title>
      <ContentWrapper>
        <ExclamationMark width={48} height={48} />
        <ErrorText>{emptyResultText.errorSearchResult}</ErrorText>
      </ContentWrapper>
    </Wrapper>
  );
}
