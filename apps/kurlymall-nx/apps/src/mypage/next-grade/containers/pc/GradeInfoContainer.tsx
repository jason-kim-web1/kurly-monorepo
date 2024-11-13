import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import GradeTopInfo from '../../components/pc/GradeTopInfo';
import GradeList from '../../components/pc/GradeList';
import GradeNotice from '../../components/shared/GradeNotice';

const Container = styled.div`
  min-width: 1050px;
  padding: 70px 0 80px;
  background-color: ${COLOR.kurlyGray150};
  color: ${COLOR.kurlyGray700};
`;

const ContentWrap = styled.div`
  width: 1050px;
  margin: 0 auto;
  padding: 50px 22px 22px 23px;
  background-color: ${COLOR.kurlyWhite};
`;

export default function GradeInfoContainer() {
  return (
    <Container>
      <ContentWrap>
        <GradeTopInfo />
        <GradeList />
      </ContentWrap>
      <GradeNotice />
    </Container>
  );
}
