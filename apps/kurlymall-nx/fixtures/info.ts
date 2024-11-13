import { MemberBenefitPolicy, MemberPointBenefit } from '../src/shared/interfaces';

export const memberInfoFixture = {
  memberNo: 123456,
  id: 'kurly',
  name: '컬리 회원',
  email: 'kurly@kurlycorp.com',
  mobile: '010-1234-1234',
  grade: 0,
  gradeName: '일반',
  vipInfo: undefined,
};

export const memberPointBenefitFixture: MemberPointBenefit = {
  grade: '오늘만 적립',
  policy: MemberBenefitPolicy.MEMBER_BENEFIT_POLICY,
  percent: 5,
  description: '오늘만 적립',
};

export const memberBenefitsFixture = [
  {
    description: '적립 5%',
    model: 'MEMBER_BENEFIT_POLICY',
    name: '오늘만 10배적립!',
    tag: '오늘만 10배적립!',
    type: 'point',
    value: 5,
  },
  {
    description: '20,000원 이상 무료 배송',
    model: 'MEMBER_BENEFIT_POLICY',
    name: '오늘만 깜짝 무배!',
    tag: '오늘만 깜짝 무배!',
    type: 'delivery',
    value: 20000,
  },
  {
    description: '',
    model: 'MEMBER_GROUP_POLICY',
    name: '일반',
    tag: null,
    type: 'special',
    value: null,
  },
];
