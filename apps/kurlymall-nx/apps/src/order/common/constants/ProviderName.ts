export const PROVIDER_NAME = {
  CJ: 'CJT',
  CJT: 'CJT',
  FRS: 'FRS',
  LTT: 'LTT',
} as const;

export type ProviderName = typeof PROVIDER_NAME[keyof typeof PROVIDER_NAME];

export const PROVIDER_NAME_TEXT: Record<ProviderName, string> = {
  CJT: 'CJ',
  FRS: '넥스트마일',
  LTT: '롯데택배',
};
