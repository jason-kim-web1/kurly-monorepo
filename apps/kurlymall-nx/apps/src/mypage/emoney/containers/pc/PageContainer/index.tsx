import { useState, useEffect } from 'react';

import DashBoard from '../../../components/pc/DashBoard';
import ListContainer from '../../../containers/pc/ListContainer';

import { usePaging } from '../../../context/pc/PagingContext';

import { calculateMaxPage } from '../../../constants';
import useEMoneyListQuery from '../../../hooks/pc/useEMoneyListQuery';

export default function PageContainer() {
  const [totalPoint, setTotalPoint] = useState(0);
  const [expiredPoint, setExpiredPoint] = useState(0);
  const {
    actions: { setMaxPage },
  } = usePaging();

  const { data, isSuccess } = useEMoneyListQuery();

  useEffect(() => {
    if (!data) {
      return;
    }
    const {
      paging: { total },
      data: { totalEmoney, expirePoint: dataExpirePoint },
    } = data;
    setMaxPage(calculateMaxPage(total));
    setTotalPoint(totalEmoney);
    setExpiredPoint(dataExpirePoint);
  }, [data, isSuccess, setMaxPage]);

  return (
    <>
      <DashBoard total={totalPoint} expire={expiredPoint} />
      <ListContainer />
    </>
  );
}
