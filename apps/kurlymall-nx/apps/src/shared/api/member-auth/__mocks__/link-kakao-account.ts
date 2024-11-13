export const postInterlinkableAccount = async () => ({
  matchingData: '010-9411-****',
  members: [
    {
      memberNo: '1',
      memberId: 'marketkurl***',
    },
    {
      memberNo: '2',
      memberId: 'kurly5***',
    },
    {
      memberNo: '3',
      memberId: 'market5***',
    },
    {
      memberNo: '4',
      memberId: 'marketkurly***',
    },
    {
      memberNo: '5',
      memberId: 'kurly5***',
    },
  ],
});

export const postLinkKakaoAccount = async () => '';

export const postKakaoLogin = async () => ({
  success: true,
  message: '',
  data: {
    accessToken: 'abcde',
    tokenType: 'bearer',
    expiresIn: 3600,
  },
});
