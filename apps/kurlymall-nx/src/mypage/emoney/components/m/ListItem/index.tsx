import { CSSProperties } from 'react';
import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import { addComma } from '../../../../../shared/services';

import { checkMinus } from '../../../utils';
import { getFormattedDate } from '../../../../../shared/utils/date';

const Container = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 19px 10px 16px;
  background-color: ${COLOR.kurlyWhite};
  border-bottom: 2px solid ${COLOR.bg};
  &:last-child {
    border-bottom: 0;
  }
  > .point-info {
    flex-basis: 60%;
    > .title {
      display: -webkit-box;
      overflow: hidden;
      margin-bottom: 7px;
      font-weight: 400;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
    }
    > .date {
      font-size: 14px;
      letter-spacing: 0;
      line-height: 1.5;
      color: ${COLOR.kurlyGray600};
    }
  }
  > .price {
    flex-basis: 40%;
    display: flex;
    justify-content: end;
    letter-spacing: 1px;
    font-size: 16px;
    line-height: 20px;
    &.plus {
      font-weight: 700;
    }
  }
`;

interface Props {
  detail: string;
  regDate: number;
  expireDate: number;
  point: number;
  style?: CSSProperties;
}

export default function ListItem(props: Props) {
  const { detail, regDate, point, style } = props;
  const isPositiveInteger = !checkMinus(point);
  return (
    <Container style={style}>
      <div className="point-info">
        <div className="title">{detail}</div>
        <div className="date">{getFormattedDate(regDate, 'yyyy.MM.dd')}</div>
      </div>
      <div className={`price ${isPositiveInteger ? 'plus' : ''}`}>
        {`${isPositiveInteger ? '+' : ''}${addComma(point)} 원`}
      </div>
    </Container>
  );
}
