import { isEmpty } from 'lodash';

import InquiryBoardItem from './InquiryBoardItem';
import { ProductInquiryPostItem } from '../types';
import BoardTableBodyLoading from './BoardTableBodyLoading';
import BoardTableBodyMessage from './BoardTableBodyMessage';
import useProductInquiry from '../hooks/useProductInquiry';
import BoardTableBodyError from './BoardTableBodyError';

interface Props {
  items: ProductInquiryPostItem[];
  pageSize: number;
  loading: boolean;
  isError: boolean;
}

export default function BoardTableBody({ items, pageSize, loading, isError }: Props) {
  const { handleClickItem } = useProductInquiry();

  if (loading) {
    return <BoardTableBodyLoading count={pageSize} />;
  }

  if (isError) {
    return <BoardTableBodyError />;
  }

  if (isEmpty(items)) {
    return <BoardTableBodyMessage message="등록된 문의가 없습니다." />;
  }

  return (
    <tbody>
      {items.map((item) => (
        <InquiryBoardItem
          key={item.id}
          id={item.id}
          type={item.type}
          subject={item.subject}
          contents={item.contents}
          createdAt={item.createdAt}
          memberName={item.memberName}
          comments={item.comments}
          commentsCount={item.commentsCount}
          isSecret={item.isSecret}
          toggleSelected={item.expanded}
          onClick={handleClickItem(item, item.isSecret && !item.isMyPost)}
          isMyPost={item.isMyPost}
        />
      ))}
    </tbody>
  );
}
