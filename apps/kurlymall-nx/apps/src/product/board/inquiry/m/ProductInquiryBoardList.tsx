import styled from '@emotion/styled';

import { useInView } from 'react-intersection-observer';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { ProductInquiryPostItem } from '../types';
import COLOR from '../../../../shared/constant/colorset';
import ProductInquiryListItem from './ProductInquiryListItem';
import useProductInquiry from '../hooks/useProductInquiry';
import ProductInquiryListError from './ProductInquiryListError';
import ProductInquiryListNoticeItem from './ProductInquiryListNoticeItem';
import ProductInquiryListLoading from './ProductInquiryListLoading';
import { deleteProductInquiryItem } from '../../../detail/slice';
import { isWebview } from '../../../../../util/window/getDevice';
import useProductInquiryWebview from '../hooks/useProductInquiryWebview';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectEditProductInquiry } from '../../../../shared/amplitude/events/product/SelectEditProductInquiry';
import { getFusionQueryId } from '../../../detail/shared/utils/productDetailEvent';
import { useAppSelector } from '../../../../shared/store';
import Alert from '../../../../shared/components/Alert/Alert';

const Container = styled.div`
  position: relative;
  min-height: 80vh;
`;

const ObservingBlock = styled.div`
  height: 10px;
`;

const EmptyInquiryBlock = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.kurlyGray400};
  text-align: center;
  padding: 124px 0;
`;

interface Props {
  items: ProductInquiryPostItem[];
  loading: boolean;
  isError: boolean;
  productNo: number;
  productName: string;
  loadNextPage(): void;
  moveToFormPage(): void;
}

export default function ProductInquiryBoardList({
  items,
  loading,
  isError,
  loadNextPage,
  moveToFormPage,
  productNo,
  productName,
}: Props) {
  const { ref, inView } = useInView();
  const { deleteItem, modifyItem, handleClickItem } = useProductInquiry();
  const { openRegisterPage } = useProductInquiryWebview(productNo, productName);
  const { queryId } = useAppSelector(({ productList }) => productList);
  const dispatch = useDispatch();

  const handleClickEdit = (item: ProductInquiryPostItem) => () => {
    const { id, isMyPost } = item;

    if (!isMyPost) {
      return;
    }

    try {
      amplitudeService.logEvent(
        new SelectEditProductInquiry({
          fusionQueryId: getFusionQueryId(queryId),
        }),
      );
    } catch (e) {}

    if (isWebview()) {
      openRegisterPage(item);
      return;
    }

    modifyItem(id);
    moveToFormPage();
  };

  const handleClickDelete =
    ({ id, isMyPost }: ProductInquiryPostItem) =>
    async () => {
      if (!isMyPost) {
        return;
      }
      const { isConfirmed } = await Alert({
        text: '작성한 문의를 삭제 하시겠습니까?',
        showConfirmButton: true,
        showCancelButton: true,
      });
      if (!isConfirmed) {
        return;
      }
      await deleteItem(id, productNo);
      dispatch(deleteProductInquiryItem(id));
    };

  useEffect(() => {
    if (inView) {
      loadNextPage();
    }
  }, [inView, loadNextPage]);

  if (isError) {
    return <ProductInquiryListError />;
  }

  const userInquiryList = items.filter((item) => item.type !== 'NOTICE');

  return (
    <Container>
      {loading && <ProductInquiryListLoading />}
      {items.map(
        (item) =>
          item.type === 'NOTICE' && (
            <ProductInquiryListNoticeItem key={item.id} item={item} onClick={handleClickItem(item, false)} />
          ),
      )}
      {!loading && userInquiryList.length === 0 ? (
        <EmptyInquiryBlock>등록된 문의가 없습니다.</EmptyInquiryBlock>
      ) : (
        userInquiryList.map((userInquiry) => (
          <ProductInquiryListItem
            key={userInquiry.id}
            item={userInquiry}
            onClick={handleClickItem(userInquiry, userInquiry.isSecret && !userInquiry.isMyPost)}
            onClickEdit={handleClickEdit(userInquiry)}
            onClickDelete={handleClickDelete(userInquiry)}
          />
        ))
      )}
      <ObservingBlock ref={ref} />
    </Container>
  );
}
