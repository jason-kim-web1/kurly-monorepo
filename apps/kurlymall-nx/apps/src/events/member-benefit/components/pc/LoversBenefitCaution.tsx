import styled from '@emotion/styled';

import { Fragment } from 'react';

import { addMonths, format } from 'date-fns';

import { LoversCaution } from '../../constants';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  display: flex;
  width: 780px;
  margin: 60px auto 0;
  padding: 43px 60px 25px 40px;
  font-weight: 300;
  font-size: 13px;
  line-height: 23px;
  letter-spacing: -0.5px;
  background-color: ${COLOR.bgLightGray};
`;

const CautionTitle = styled.strong`
  min-width: 120px;
  font-weight: 500;
`;

const Title = styled.strong`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const List = styled.ul`
  padding-bottom: 20px;
  font-size: 12px;
  word-break: keep-all;
`;

const ListItem = styled.li`
  position: relative;
  padding-left: 7px;
  color: ${COLOR.kurlyGray450};

  &::before {
    position: absolute;
    top: 10px;
    left: 0;
    width: 3px;
    height: 3px;
    border-radius: 100%;
    background-color: ${COLOR.kurlyGray450};
    content: '';
  }
`;

interface Props {
  isGiftHistoryEmpty: boolean;
  updateDate: string;
  loversCaution: LoversCaution[];
}

export default function LoversBenefitCaution({ isGiftHistoryEmpty, updateDate, loversCaution }: Props) {
  const currentMonth = format(new Date(updateDate), 'M');
  const nextMonth = format(addMonths(new Date(updateDate), 1), 'M');

  return (
    <Container>
      <CautionTitle>확인해주세요!</CautionTitle>
      <div>
        {isGiftHistoryEmpty && ( // 적립금 선물 타입인 경우 GiftHistory가 미노출 되고 확인해주세요 영역에 문구가 추가됨
          <>
            <Title>더퍼플 선물 안내</Title>
            <List>
              <ListItem>
                {currentMonth}월 실적을 기준으로 {nextMonth}월 더퍼플 등급 적용 후 {nextMonth}월 3주차 이내에 안내
                메시지가 발송됩니다.
              </ListItem>
            </List>
          </>
        )}
        {loversCaution.map(({ title, list }) => (
          <Fragment key={title}>
            <Title>{title}</Title>
            <List>
              {list.map((text, index) => (
                <ListItem key={`list-${index}`}>{text}</ListItem>
              ))}
            </List>
          </Fragment>
        ))}
      </div>
    </Container>
  );
}
