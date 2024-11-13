import { useDispatch } from 'react-redux';

import { useState } from 'react';

import { addOrderProductItems, modifySearchInfo, OrderProductSearchInfoState } from '../slice';
import { getMemberOrderData } from '../service/personalInquiry.service';

export default function useOrderProductList(
  searchInfo: OrderProductSearchInfoState,
  foldOptionPredict?: (pageNo: number, index: number) => boolean,
) {
  const { startDate, endDate, pageSize, keyword, orderNo } = searchInfo;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const setPage = (pageNumber: number) => dispatch(modifySearchInfo({ pageNo: pageNumber }));

  const loadOrderProductItems = async (pageNo: number) => {
    let last, totalPages, items;
    try {
      setLoading(true);
      const data = await getMemberOrderData({
        startDate,
        endDate,
        pageSize,
        keyword,
        orderNo,
        foldOptionPredict,
        pageNo,
      });

      last = data.last;
      totalPages = data.totalPages;
      items = data.items;
    } catch (err) {
      setError(err);
      return;
    } finally {
      setLoading(false);
    }

    setPage(pageNo);
    dispatch(modifySearchInfo({ last, totalPages }));
    dispatch(addOrderProductItems(items));
  };

  return {
    loadOrderProductItems,
    loading,
    setPage,
    error,
  };
}
