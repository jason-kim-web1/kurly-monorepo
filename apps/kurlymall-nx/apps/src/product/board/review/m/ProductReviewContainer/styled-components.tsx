import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

export const Badge = styled.div`
  display: inline-block;
  width: 30px;
  height: 20px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: ${COLOR.kurlyGray800};
  background-color: ${COLOR.kurlyGray150};
`;

export const Button = styled.button`
  width: 100%;
  height: 42px;
  border: 1px solid;
  border-radius: 6px;
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: ${COLOR.kurlyPurple};
`;

export const Main = styled.main`
  padding-bottom: 16px;

  ::before {
    content: '';
    display: block;
    width: 100vw;
    height: 8px;
    margin-left: -16px;
    background-color: ${COLOR.bg};
  }
`;

export const ReviewBenefitNotice = styled.div`
  padding: 4px 0 12px;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: ${COLOR.kurlyGray800};
`;

export const ReviewBenefitNoticeList = styled.ul`
  padding-left: 6px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};
`;

export const ReviewBenefitNoticeItem = styled.li`
  line-height: 22px;
  list-style-type: '·';
  list-style-position: outside;
  padding-inline-start: 3px;
`;

export const Section = styled.section`
  padding: 16px 16px 0;
`;
