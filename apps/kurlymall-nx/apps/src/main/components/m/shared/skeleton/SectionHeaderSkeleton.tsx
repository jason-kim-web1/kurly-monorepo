import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const SectionHeader = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const Title = styled(SkeletonItem)`
  width: 100px;
  height: 23px;
`;
const SubTitle = styled(SkeletonItem)`
  width: 150px;
  height: 18px;
  margin-top: 4px;
`;
const More = styled(SkeletonItem)`
  width: 72px;
  height: 18px;
`;

interface Props {
  isSubTitle?: boolean;
  isMore?: boolean;
}

export default function SectionHeaderSkeleton({ isSubTitle = true, isMore = true }: Props) {
  return (
    <SectionHeader>
      <div>
        <Title />
        {isSubTitle ? <SubTitle /> : null}
      </div>
      {isMore ? <More /> : null}
    </SectionHeader>
  );
}
