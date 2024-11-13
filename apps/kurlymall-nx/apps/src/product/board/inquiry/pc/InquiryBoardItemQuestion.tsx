import { useDispatch } from 'react-redux';

import InquiryBoardItemContent from './InquiryBoardItemContent';
import InquiryBoardItemFunctions from './InquiryBoardItemFunctions';
import useProductInquiry from '../hooks/useProductInquiry';
import { reloadProductInquiryBoard } from '../../../detail/slice';
import { useAppSelector } from '../../../../shared/store';
import Alert from '../../../../shared/components/Alert/Alert';

interface Props {
  postId: number;
  content: string;
  isComplete: boolean;
  isMyPost: boolean;
}

export default function InquiryBoardItemQuestion({ postId, isComplete, content, isMyPost }: Props) {
  const { no } = useAppSelector(({ productDetail }) => productDetail);
  const { deleteItem, modifyItem } = useProductInquiry();
  const dispatch = useDispatch();

  const handleClickEdit = () => {
    if (!isMyPost) {
      return;
    }

    modifyItem(postId);
  };

  const handleClickDelete = async () => {
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
    await deleteItem(postId, no);
    dispatch(reloadProductInquiryBoard());
  };

  return (
    <InquiryBoardItemContent content={content} type="Question">
      {isMyPost && !isComplete && (
        <InquiryBoardItemFunctions onClickEdit={handleClickEdit} onClickDelete={handleClickDelete} />
      )}
    </InquiryBoardItemContent>
  );
}
