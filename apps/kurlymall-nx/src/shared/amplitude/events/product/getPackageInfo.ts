import { DEFAULT_GROUP_CONTENT_NO, DEFAULT_NORMAL_CONTENT_NO } from '../../../constant/productNo';

interface GetProductPackageInfo {
  isGroupProduct: boolean;
  no: number;
  name: string;
}

export function getPackageInfo({ isGroupProduct, no, name }: GetProductPackageInfo) {
  if (isGroupProduct) {
    return {
      packageId: null,
      packageName: null,
    };
  }

  if (no > DEFAULT_NORMAL_CONTENT_NO && no < DEFAULT_GROUP_CONTENT_NO) {
    return {
      packageId: no - DEFAULT_NORMAL_CONTENT_NO,
      packageName: name,
    };
  }

  return {
    packageId: null,
    packageName: null,
  };
}
