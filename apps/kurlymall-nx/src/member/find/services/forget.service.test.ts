import {
  findIdByEmail,
  findIdByPhone,
  findPasswordByPhone,
  sendMembersToEmail,
  sendVerificationNumber,
  sendVerificationNumberWithId,
  findPasswordByEmail,
  resetPassword,
  verifyToken,
} from '.';

jest.mock('../../../shared/api/member-auth/forget');
jest.mock('../../../shared/api/member-auth/certification');
jest.mock('../../../shared/api/member-auth/password-change');

describe('Forgot service', () => {
  describe('findIdByEmail', () => {
    it('returns members', async () => {
      const { name, email, members } = await findIdByEmail({
        name: '홍길동',
        email: 'gildong.hong@kurlycorp.com',
      });

      expect(name).toBe('홍길동');
      expect(email).toBe('gildong.hong@kurlycorp.com');
      expect(members.length > 0).toBe(true);
      expect(members[0].joinedAt).toMatch(/\d{4}\.\d{2}\.\d{2}/);
    });
  });

  describe('findIdByPhone', () => {
    it('returns members', async () => {
      const { members } = await findIdByPhone({
        name: '홍길동',
        phone: '01011221122',
        verificationNumber: '123456',
      });

      expect(members.length > 0).toBe(true);
      expect(members[0].joinedAt).toMatch(/\d{4}\.\d{2}\.\d{2}/);
    });
  });

  describe('findPasswordByPhone', () => {
    it('returns members', async () => {
      const token = await findPasswordByPhone({
        phone: '01011221122',
        verificationNumber: '1234567',
      });

      expect(token).not.toBeUndefined();
    });
  });

  describe('findPasswordByEmail', () => {
    it('returns nothing', async () => {
      await findPasswordByEmail({
        id: 'user',
        email: 'uesr@test.com',
      });
    });
  });

  describe('sendVerificationNumber', () => {
    it('returns nothing', async () => {
      await sendVerificationNumber({
        name: '홍길동',
        phone: '01012345678',
        verificationNumber: '',
      });
    });
  });

  describe('sendMembersToEmail', () => {
    it('returns nothing', async () => {
      await sendMembersToEmail({
        name: '홍길동',
        email: 'test@email.com',
      });
    });
  });

  describe('sendVerificationNumberWithId', () => {
    it('returns nothing', async () => {
      await sendVerificationNumberWithId({
        id: 'tester',
        phone: '01012345678',
      });
    });
  });

  describe('resetPassword', () => {
    it('returns nothing', async () => {
      await resetPassword({
        token: 'abcde',
        password: 'abcde12345!',
      });
    });
  });

  describe('verifyToken', () => {
    it('returns true', async () => {
      const valid = await verifyToken('abcde');

      expect(valid).toBe(true);
    });
  });
});
