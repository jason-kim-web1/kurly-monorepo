import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { isPC } from '../../../../../util/window/getDevice';
import { GRADE_NOTICE } from '../../constants';
import RawHTML from '../../../../shared/components/layouts/RawHTML';

const Container = styled.div`
  width: ${isPC ? '1050px' : 'auto'};
  margin: 0 auto;
  padding: ${isPC ? '70px 0 0' : '10px 30px 20px'};
`;

const Title = styled.strong`
  display: block;
  padding-top: 17px;
  font-size: 14px;
  line-height: 18px;
  ${!isPC && `color: ${COLOR.kurlyGray800}`};
`;

const Info = styled.div`
  padding-bottom: 10px;

  p {
    position: relative;
    padding: ${isPC ? '10px 0 0' : '8px 0 0 9px'};
    font-size: 12px;
    line-height: 16px;
    ${!isPC && `color: ${COLOR.kurlyGray600}`};

    &:before {
      display: inline-block;
      position: ${isPC ? 'static' : 'absolute'};
      top: 7px;
      left: 0;
      margin-right: 4px;
      content: ${isPC ? "'-'" : "'•'"};
    }
  }
`;

export default function GradeNotice() {
  return (
    <Container>
      {GRADE_NOTICE.map(({ title, content }) => (
        <div key={title}>
          <Title>{title}</Title>
          <Info>
            <RawHTML html={content} />
          </Info>
        </div>
      ))}
    </Container>
  );
}
