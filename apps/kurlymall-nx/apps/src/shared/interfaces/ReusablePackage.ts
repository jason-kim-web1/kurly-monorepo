export type ReusablePackageType = 'PAPER' | 'KURLY' | 'PERSONAL';

export interface ReusablePackage {
  viewPackage: boolean;
  defaultSelected: ReusablePackageType | null;
  selected: ReusablePackageType | null;
  available: {
    kurlyBag: boolean;
    personalBag: boolean;
  };
}

export const ReusablePackageTextMap: Record<ReusablePackageType, string> = {
  PAPER: '종이 포장재',
  KURLY: '컬리 퍼플박스',
  PERSONAL: '개인 보냉백',
};
