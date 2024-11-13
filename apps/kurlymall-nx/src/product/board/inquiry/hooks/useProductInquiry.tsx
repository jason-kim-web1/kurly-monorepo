import { useDispatch } from 'react-redux';

import { ProductInquiryPostItem } from '../types';
import { notify } from '../../../../shared/reducers/page';
import { modifyProductInquiryForm, toggleExpandInquiryBoardItem } from '../../../detail/slice';
import { deleteProductInquiry } from '../../../../shared/api/product/inquiry';
import { useAppSelector } from '../../../../shared/store';
import { amplitudeService } from '../../../../shared/amplitude';
import { getFusionQueryId } from '../../../detail/shared/utils/productDetailEvent';
import { SelectProductInquiryDetail } from '../../../../shared/amplitude/events/product/SelectProductInquiryDetail';
import { SelectDeleteProductInquiry } from '../../../../shared/amplitude/events/product/SelectDeleteProductInquiry';
import { ignoreError } from '../../../../shared/utils/general';

export default function useProductInquiry() {
  const { queryId } = useAppSelector(({ productList }) => productList);
  const { inquiry } = useAppSelector(({ productDetail }) => productDetail);
  const dispatch = useDispatch();

  const handleClickItem = (item: ProductInquiryPostItem, isSecret: boolean) => () => {
    if (!item.expanded) {
      try {
        amplitudeService.logEvent(
          new SelectProductInquiryDetail({
            isSecret,
            item,
            fusionQueryId: getFusionQueryId(queryId),
          }),
        );
      } catch {}
    }

    if (isSecret) {
      dispatch(notify('비밀글입니다.'));
      return;
    }
    dispatch(toggleExpandInquiryBoardItem(item));
  };

  const deleteItem = async (itemId: number, productNo: number) => {
    ignoreError(() => {
      amplitudeService.logEvent(
        new SelectDeleteProductInquiry({
          fusionQueryId: getFusionQueryId(queryId),
        }),
      );
    });
    try {
      await deleteProductInquiry({ productNo, postId: itemId });
    } catch (err) {
      dispatch(notify(err.message));
    }
  };

  const modifyItem = (itemId: number) => {
    const target = inquiry.items.find((item) => item.id === itemId);

    if (!target) {
      return;
    }

    const { subject, contents, isSecret } = target;

    dispatch(
      modifyProductInquiryForm({
        postId: itemId,
        open: true,
        subject,
        content: contents,
        isSecret,
        mode: 'edit',
      }),
    );
  };

  return { handleClickItem, deleteItem, modifyItem };
}
