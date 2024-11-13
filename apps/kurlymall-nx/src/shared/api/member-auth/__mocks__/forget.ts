export const postFindIdByEmail = async () => ({
  name: '홍길동',
  email: 'gildong.hong@kurlycorp.com',
  members: [
    {
      memberId: 'honggildong***',
      status: 'ACTIVE',
      joinedAt: '2021-09-11T07:04:21.964652',
    },
    {
      memberId: 'hgd1***',
      status: 'INACTIVE',
      joinedAt: '2021-06-14T07:04:21.964722',
    },
    {
      memberId: 'hong2***',
      status: 'ACTIVE',
      joinedAt: '2021-09-14T04:04:21.964746',
    },
  ],
});

export const postFindIdByPhone = async () => ({
  members: [
    {
      memberId: 'honggildong***',
      status: 'ACTIVE',
      joinedAt: '2021-09-11T07:04:21.964652',
    },
    {
      memberId: 'hgd1***',
      status: 'INACTIVE',
      joinedAt: '2021-06-14T07:04:21.964722',
    },
    {
      memberId: 'hong2***',
      status: 'ACTIVE',
      joinedAt: '2021-09-14T04:04:21.964746',
    },
  ],
});

export const postMembersToEmail = async () => '';

export const postFindPasswordByPhone = async () => 'abcde';

export const postFindPasswordByEmail = async () => {};
