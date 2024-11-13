import { memo } from 'react';
import styled from '@emotion/styled';

import { addComma } from '../../../../../shared/services';
import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.section`
  padding: 18px 10px 20px;
  margin: 10px 0;
  background-color: ${COLOR.kurlyWhite};
  box-sizing: border-box;
  text-align: center;
  > dl {
    margin-bottom: 12px;
    letter-spacing: 0.5px;
    > dt {
      font-size: 14px;
      font-weight: bold;
      color: ${COLOR.kurlyGray600};
      margin-bottom: 4px;
    }
    > dd {
      font-size: 18px;
      line-height: 18px;
      font-weight: 700;
      color: ${COLOR.kurlyGray800};
    }
    &:last-child {
      margin-bottom: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      > dt {
        margin-bottom: 0;
        font-weight: normal;
        letter-spacing: 0;
        font-size: 12px;
        line-height: 15px;
        color: ${COLOR.kurlyGray600};
        letter-spacing: 0;
        margin-right: 5px;
      }
      > dd {
        font-size: 12px;
        line-height: 15px;
        font-weight: 700;
        color: ${COLOR.kurlyGray600};
        letter-spacing: 0;
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

const DashBoardMobile = (props: Props) => (
  <Container>
    {EMONEY_DASHBOARD_CONTENT.map((item, index) => {
      const { label, key } = item;
      return (
        <dl key={`emoney-dashboard-${index}`} className="item">
          <dt className="label">{label}</dt>
          <dd className="price">{`${addComma(props[key])} 원`}</dd>
        </dl>
      );
    })}
  </Container>
);

export default memo(DashBoardMobile);
