/**
 * 웹뷰에서 브랜치 이벤트를 전송할 때 contentItems의 key 값이 $ 표시로 시작하는 경우 $ 표시를 제거합니다.
 *
 * @param { contentItems } contentItems 브랜치 이벤트의 contentItems
 * @return { string } JSON string
 */
export const convertContentItems = (contentItems: unknown) => {
  if (!contentItems || !Array.isArray(contentItems)) {
    return JSON.stringify([]);
  }

  return JSON.stringify(
    contentItems.map((contentItem) => {
      const temp: { [key: string]: unknown } = {};
      for (const [key, value] of Object.entries(contentItem)) {
        temp[key[0] === '$' ? key.substring(1) : key] = value;
      }
      return temp;
    }),
  );
};
