import { MemberBenefitPolicy, MemberBenefitsResponse } from '../../../interfaces';

export const readMemberInfo = jest.fn().mockResolvedValue({
  member_no: 123456,
  member_id: 'kurly',
  name: '컬리 회원',
  email: 'kurly@kurlycorp.com',
  mobile_no: '010-1234-1234',
  grade: 0,
  group_name: '일반',
});

export const readMemberBenefits = jest.fn().mockResolvedValue([
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
]);

// 특별 혜택
export const memberBenefitPolicy: MemberBenefitsResponse = {
  type: 'point',
  tag: '오늘만 적립',
  name: '오늘만 적립',
  model: MemberBenefitPolicy.MEMBER_BENEFIT_POLICY,
  value: 5,
  description: '적립 5%',
};

// 기본 등급별 혜택
export const memberGroupPolicy: MemberBenefitsResponse = {
  type: 'point',
  tag: null,
  name: '라벤더',
  model: MemberBenefitPolicy.MEMBER_GROUP_POLICY,
  value: 5,
  description: '적립 5%',
};

export const readMemberPointBenefit = jest.fn().mockResolvedValue(memberBenefitPolicy);
