import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';

import COLOR from '../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../shared/utils';

const StyledSkeleton = styled(Skeleton)`
  transform: scale(1, 0.8);
`;

const CardLink = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  padding-right: 14px;
  width: 100%;
`;

const CardTitle = styled.h3`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: -0.2px;
  ${multiMaxLineText(1)};
`;

const CardContents = styled.p`
  margin-bottom: 4px;
  font-weight: 400;
  font-size: 13px;
  line-height: 19px;
  color: ${COLOR.kurlyGray600};
  word-break: keep-all;
`;

const CategoryDateBlock = styled.div`
  display: flex;
  margin-bottom: 4px;
  font-weight: 400;
  color: ${COLOR.kurlyGray450};
  font-size: 12px;
  line-height: 16px;
  align-items: center;
`;

const DividerDot = styled(Skeleton)`
  margin: 0 4px;
  width: 2px;
  height: 2px;
  borderradius: 1px;
  transform: scale(1);
`;

const Thumbnail = styled.div`
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  border-radius: 4px;
  overflow: hidden;
`;

export default function NotiItemSkeleton({ showCategoryName }: { showCategoryName?: boolean }) {
  return (
    <CardLink>
      <Container>
        <CardTitle>
          <StyledSkeleton width={150} />
        </CardTitle>
        <CardContents>
          <StyledSkeleton width={'90%'} />
          <StyledSkeleton width={'60%'} />
        </CardContents>
        <CategoryDateBlock>
          {showCategoryName && (
            <>
              <StyledSkeleton width={40} />
              <DividerDot />
            </>
          )}
          <StyledSkeleton width={60} />
        </CategoryDateBlock>
      </Container>
      <Thumbnail>
        <Skeleton sx={{ borderRadius: 0, height: '100%', transform: 'scale(1)' }} />
      </Thumbnail>
    </CardLink>
  );
}
