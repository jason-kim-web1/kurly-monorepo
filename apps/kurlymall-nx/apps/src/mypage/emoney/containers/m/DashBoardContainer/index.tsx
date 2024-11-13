import { head, isEmpty } from 'lodash';
import { useState, useEffect } from 'react';

import useEMoneyInfiniteQuery from '../../../hooks/m/useEMoneyInfiniteQuery';

import DashBoard from '../../../components/m/DashBoard';

const DashBoardContainer = () => {
  const { data, isSuccess } = useEMoneyInfiniteQuery();
  const [totalPoint, setTotalPoint] = useState<number>(0);
  const [expirePoint, setExpirePoint] = useState<number>(0);

  useEffect(() => {
    if (!isSuccess || !data || !data.pages || isEmpty(data.pages)) {
      return;
    }
    const firstPageResponse = head(data.pages);
    if (!firstPageResponse) {
      return;
    }
    const { totalEmoney, expirePoint: dataExpirePoint } = firstPageResponse.data;
    setTotalPoint(totalEmoney);
    setExpirePoint(dataExpirePoint);
  }, [isSuccess, data]);

  return <DashBoard total={totalPoint} expire={expirePoint} />;
};

export default DashBoardContainer;
