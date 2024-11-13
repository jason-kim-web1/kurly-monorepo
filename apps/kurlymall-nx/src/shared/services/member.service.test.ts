import { memberBenefitsFixture, memberInfoFixture, memberPointBenefitFixture } from '../../../fixtures';
import { getMemberInfo, getMemberBenefits, getMemberPointBenefit, verifyNormalUser } from './member.service';

jest.mock('../api/members/info');

describe('Member service', () => {
  describe('getMemberInfo', () => {
    it('returns memberInfo', async () => {
      const data = await getMemberInfo();

      expect(data).toStrictEqual(memberInfoFixture);
    });
  });

  describe('getMemberBenefits', () => {
    it('returns memberBenefits', async () => {
      const data = await getMemberBenefits();

      expect(data).toStrictEqual(memberBenefitsFixture);
    });
  });

  describe('getMemberPointBenefit', () => {
    it('returns memberPointBenefit', async () => {
      const data = await getMemberPointBenefit();

      expect(data).toStrictEqual(memberPointBenefitFixture);
    });
  });

  context('verifyNormalUser', () => {
    it('grade가 Grade.Normal(0)이면 일반등급유저다', () => {
      const isNormalUser = verifyNormalUser(0);
      expect(isNormalUser).toBe(true);
    });

    it('grade가 Grade.Friends(5)이면 일반등급유저가 아니다', () => {
      const isNormalUser = verifyNormalUser(5);
      expect(isNormalUser).toBe(false);
    });
  });
});
