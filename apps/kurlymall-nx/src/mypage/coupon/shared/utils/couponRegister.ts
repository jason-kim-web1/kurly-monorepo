export const parseCouponKeys = (couponKey: string, maxKeys = 3): string[] => {
  return couponKey.split(';').filter(Boolean).slice(0, maxKeys);
};

export const processResponses = (responses: { message: string; res: string }[], couponKeys: string[]) => {
  const { resList, messageList } = responses.reduce(
    (acc: { resList: string[]; messageList: string[] }, res) => {
      return {
        messageList: [...acc.messageList, res.message],
        resList: [...acc.resList, res.res],
      };
    },
    { messageList: [], resList: [] },
  );

  const message =
    new Set(messageList).size > 1
      ? messageList.map((mes, index) => `${couponKeys[index]}: ${mes}`).join('\n')
      : messageList[0];

  const rejectedKeys = resList.reduce<string[]>((acc, res, index) => {
    if (res === 'rejected') {
      acc.push(couponKeys[index]);
    }
    return acc;
  }, []);

  return { message, rejectedKeys };
};
