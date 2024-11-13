export const getKeywordToShow = (keyword: string) => {
  return keyword.length > 9 ? `${keyword.slice(0, 9)}..` : keyword;
};
