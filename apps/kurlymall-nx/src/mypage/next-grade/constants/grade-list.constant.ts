import { isAfter } from 'date-fns';

import { GradeList } from '../interfaces';
import { GradeName } from '../../../shared/enums';

// 4월1일 이전 기존 일반 적립률 노출 처리를 위한 시간 -> 선배포를 위한 임시 방편으로 4월1일 이후에는 해당코드 수정
export const isNormalPointExcludeTime = isAfter(new Date(), new Date('2023-04-01T00:00:00+09:00'));

export const GRADE_LIST: { [key in GradeName]: GradeList } = {
  [GradeName.Normal]: {
    gradeName: GradeName.Normal,
    text: '15만원 미만',
    point: '0.1% 적립',
    amount: 0,
  },
  [GradeName.Friends]: {
    gradeName: GradeName.Friends,
    text: '15만원 이상',
    point: '1% 적립',
    amount: 150000,
  },
  [GradeName.White]: {
    gradeName: GradeName.White,
    text: '30만원 이상',
    point: '3% 적립',
    amount: 300000,
  },
  [GradeName.Lavender]: {
    gradeName: GradeName.Lavender,
    text: '50만원 이상',
    point: '5% 적립',
    amount: 500000,
  },
  [GradeName.Purple]: {
    gradeName: GradeName.Purple,
    text: '100만원 이상',
    point: '7% 적립',
    amount: 1000000,
    review: '더블 후기 적립금',
  },
  [GradeName.ThePurple]: {
    gradeName: GradeName.ThePurple,
    text: '150만원 이상',
    point: '7% 적립',
    amount: 1500000,
    review: '더블 후기 적립금',
    gift: '월별 기프트',
    link: '/shop/main/html.php?htmid=event/kurly.htm&name=lovers&pageScroll=0',
  },
  [GradeName.Welcome]: {
    gradeName: GradeName.Welcome,
    text: '',
    point: '',
    amount: 0,
  },
};
