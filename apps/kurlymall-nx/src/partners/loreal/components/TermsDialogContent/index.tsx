import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { BASE_BREAK_POINT } from '../../constants';
import type { PartnerPrivacyPolicy } from '../../../../shared/api/partners';

const TableWrap = styled.table`
  margin-bottom: 16px;
  text-align: center;
`;

const HeaderColumn = styled.th`
  padding: 10px 2vw;
  border: 1px solid ${COLOR.lightGray};
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
  background-color: ${COLOR.kurlyGray100};
  word-break: break-all;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    letter-spacing: -0.5px;
    font-weight: 500;
    padding: 10px;
  }
`;

const Column = styled.td`
  width: calc(100% / 4);
  padding: 10px 2vw;
  border: 1px solid ${COLOR.lightGray};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  word-break: break-all;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    letter-spacing: -0.5px;
    padding: 10px;
  }
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray600};
  text-align: left;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    letter-spacing: -0.5px;
  }
`;

const TermsDialogContent = ({ recipient, purpose, items, period, description }: PartnerPrivacyPolicy) => {
  return (
    <>
      <TableWrap>
        <thead>
          <tr>
            <HeaderColumn>제공받는자</HeaderColumn>
            <HeaderColumn>제공 목적</HeaderColumn>
            <HeaderColumn>제공 항목</HeaderColumn>
            <HeaderColumn>보유 기간</HeaderColumn>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Column>{recipient}</Column>
            <Column>{purpose}</Column>
            <Column>{items}</Column>
            <Column>{period}</Column>
          </tr>
        </tbody>
      </TableWrap>
      <Description>{description}</Description>
    </>
  );
};

export default TermsDialogContent;
