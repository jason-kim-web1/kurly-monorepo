import styled from '@emotion/styled';

import { addComma } from '../../../../../shared/services';
import COLOR from '../../../../../shared/constant/colorset';

import { checkMinus } from '../../../utils';
import { getFormattedDate } from '../../../../../shared/utils/date';

const Container = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  padding: 16px 0;
  border-bottom: 1px solid ${COLOR.bg};
  color: ${COLOR.kurlyBlack};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  &:last-child {
    border-bottom: 1px solid ${COLOR.lightGray};
  }
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
    color: ${COLOR.kurlyPurple};
    font-weight: 500;
    &.minus {
      color: #9b9b9b;
    }
  }
`;

interface Props {
  regDate: number;
  expireDate?: number;
  point: number;
  detail: string;
}

export default function ListItem(props: Props) {
  const { regDate, expireDate, point, detail } = props;
  const isMinus = checkMinus(point);
  return (
    <Container>
      <div className="reg-date">{getFormattedDate(regDate)}</div>
      <div className="detail">{detail}</div>
      <div className="expire-date">{getFormattedDate(expireDate)}</div>
      <div className={`point ${isMinus ? 'minus' : ''}`}>{`${isMinus ? '' : '+'}${addComma(point)} 원`}</div>
    </Container>
  );
}
