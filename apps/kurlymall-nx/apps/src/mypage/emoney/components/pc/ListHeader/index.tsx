import { memo } from 'react';
import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 2px solid ${COLOR.kurlyGray800};
  border-bottom: 1px solid ${COLOR.kurlyGray800};
  padding: 20px 0;
  line-height: 20px;
  letter-spacing: -0.5px;
  font-size: 14px;
  font-weight: 700;
  list-style: none;
  text-align: center;
  > .reg-date {
    flex-basis: 14.6%;
  }
  > .detail {
    text-align: left;
    padding-left: 20px;
    flex-basis: 53.4%;
  }
  > .expire-date {
    flex-basis: 14.87%;
  }
  > .point {
    flex-basis: 17%;
  }
`;

const ListHeader = () => (
  <Container>
    <div className="reg-date">날짜</div>
    <div className="detail">내용</div>
    <div className="expire-date">유효기간</div>
    <div className="point">금액</div>
  </Container>
);

export default memo(ListHeader);
