import { fetchEMoneyList } from '../../shared/api/mypage/emoney';
import snakeToCamel from '../../shared/utils/snakeToCamelCase';

export interface EMoneyListResponseData {
  data: {
    totalEmoney: number;
    expireDate: number;
    expirePoint: number;
    emoneyLists: {
      ordno: number;
      regDate: number;
      point: number;
      detail: string;
      expireDate: number;
      orderType: string;
    }[];
  };
  paging: {
    total: number;
    nextPageNo: number;
  };
}

export async function getEMoneyList(pageNo: number) {
  const data = await fetchEMoneyList({ pageNo });
  return snakeToCamel<EMoneyListResponseData>(data);
}
