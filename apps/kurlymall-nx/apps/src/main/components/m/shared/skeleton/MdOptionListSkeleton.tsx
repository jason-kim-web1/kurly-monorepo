import styled from '@emotion/styled';

import ProductListLoading from '../../md-choices/ProductListLoading';
import COLOR from '../../../../../shared/constant/colorset';

const Contents = styled.div`
  padding: 16px 16px 24px;
  justify-content: space-between;
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const TextLine = styled(SkeletonItem)<{ widthPercent: number; sizeHeight: number }>`
  width: ${({ widthPercent }) => widthPercent}%;
  height: ${({ sizeHeight }) => sizeHeight}px;
`;

const Space = styled.div<{ sizeHeight: number }>`
  height: ${({ sizeHeight }) => sizeHeight}px;
`;

export default function MdOptionListSkeleton() {
  return (
    <Contents>
      <Option>
        <TextLine widthPercent={25} sizeHeight={14} />
        <TextLine widthPercent={20} sizeHeight={14} />
        <TextLine widthPercent={20} sizeHeight={14} />
        <TextLine widthPercent={25} sizeHeight={14} />
      </Option>
      <ProductListLoading />
      <Space sizeHeight={8} />
      <TextLine widthPercent={100} sizeHeight={48} />
    </Contents>
  );
}
