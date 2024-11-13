import { memo } from 'react';
import styled from '@emotion/styled';

import { addComma } from '../../../../../shared/services';
import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${COLOR.lightGray};
  margin-bottom: 40px;
  > .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 34px 60px 36px;
    flex-grow: 1;
    &:first-of-type {
      border-right: 1px solid ${COLOR.lightGray};
    }
    > .label {
      color: ${COLOR.kurlyBlack};
      line-height: 20px;
      font-size: 14px;
    }
    > .price {
      color: ${COLOR.kurlyPurple};
      line-height: 30px;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0;
      > .unit {
        font-weight: 400;
      }
    }
  }
`;

interface EMoneyDashboardContentItem {
  label: string;
  key: keyof Props;
}

const EMONEY_DASHBOARD_CONTENT: EMoneyDashboardContentItem[] = [
  {
    label: '현재 적립금',
    key: 'total',
  },
  {
    label: '소멸예정 적립금',
    key: 'expire',
  },
];

interface Props {
  total: number;
  expire: number;
}

const DashBoard = (props: Props) => (
  <Container>
    {EMONEY_DASHBOARD_CONTENT.map((item, index) => {
      const { label, key } = item;
      return (
        <dl key={`emoney-dashboard-${index}`} className="item">
          <dt className="label">{label}</dt>
          <dd className="price">
            {addComma(props[key])} <span className="unit">원</span>
          </dd>
        </dl>
      );
    })}
  </Container>
);

export default memo(DashBoard);
