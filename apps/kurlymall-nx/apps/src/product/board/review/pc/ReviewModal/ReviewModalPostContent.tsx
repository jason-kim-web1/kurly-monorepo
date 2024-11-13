import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { format, parseISO } from 'date-fns';
import { isEmpty } from 'lodash';
import type { QueryKey } from '@tanstack/react-query';

import { QuestionMark } from '../../../../../shared/icons';
import { multiMaxLineText } from '../../../../../shared/utils';
import COLOR from '../../../../../shared/constant/colorset';
import type { ProductReview } from '../../ProductReview.service';
import HelpfulButton from '../HelpfulButton';
import { useAppSelector } from '../../../../../shared/store';
import { hiddenScrollBar } from '../../../../../shared/utils/hidden-scrollbar';
import { Badges } from '../../../../review/components/Badges';

interface Props extends Omit<ProductReview, 'images'> {
  queryKey: QueryKey;
  reviewType: 'POST' | 'IMAGE';
  sortType?: 'RECOMMEND' | 'RECENTLY';
}

const AboutUser = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 11px;
`;

const Alert = styled.div`
  position: absolute;
  display: none;
  left: 0;
  right: 0;
  bottom: -78px;
  padding: 12px;
  width: 343px;
  border: 1px solid ${COLOR.kurlyGray800};
  border-radius: 4px;
  background-color: ${COLOR.kurlyWhite};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const BeautyProfile = styled.span`
  display: block;
  padding-top: 2px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray800};
`;

const ContentsWrap = styled.div`
  max-height: 343px;
  margin-top: 10px;
  overflow-y: scroll;
  ${hiddenScrollBar()};
`;

const Contents = styled.p`
  word-break: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
`;

const DealProductName = styled.span`
  display: block;
  padding-top: 2px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
  ${multiMaxLineText(1)}
`;

const DistinctContentsNotice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;

  > svg {
    margin-top: 2px;
  }

  :hover div {
    display: block;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 14px;
`;

const Position = styled.div`
  position: relative;
`;

const ProductName = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const RegistrationDate = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const UserName = styled.span`
  margin-top: -2px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  width: 343px;
  overflow: hidden;
`;

export default function ReviewModalPostContent({
  queryKey,
  contents,
  contentsProductNo,
  dealProductName,
  hasLiked,
  id,
  likeCount,
  profiles,
  registrationDate,
  reviewer,
  reviewType,
  sortType,
  type,
  reviewerGrade,
  isMembership,
}: Props) {
  const { query } = useRouter();
  const productSites = useAppSelector(({ productDetail }) => productDetail.productSites);

  return (
    <Wrapper>
      <AboutUser>
        <Badges type={type} grade={reviewerGrade} isMembership={isMembership} />
        <UserName>{reviewer}</UserName>
      </AboutUser>
      {!isEmpty(profiles.beautyProfile) && productSites.includes('BEAUTY') ? (
        <BeautyProfile>{profiles.beautyProfile}</BeautyProfile>
      ) : null}
      <Position>
        <ProductName>
          <DealProductName>{dealProductName}</DealProductName>
          {!!query.productCode && Number(query.productCode) !== contentsProductNo && (
            <DistinctContentsNotice>
              <QuestionMark stroke={COLOR.kurlyGray350} fill={COLOR.kurlyGray350} />
              <Alert>
                이 후기는 판매구성이 다르지만 본품이 동일한 상품을 구매 후 작성된 후기입니다. 판매구성에 따라 용량,
                구성, 상품명 등 일부 정보가 상이할 수 있습니다.
              </Alert>
            </DistinctContentsNotice>
          )}
        </ProductName>
      </Position>
      <ContentsWrap>
        <Contents>{contents}</Contents>
      </ContentsWrap>
      <Footer>
        <RegistrationDate>
          {registrationDate ? format(parseISO(registrationDate), 'yyyy.MM.dd') : <span />}
        </RegistrationDate>
        <HelpfulButton
          queryKey={queryKey}
          reviewId={id}
          reviewType={reviewType}
          sortType={sortType}
          count={likeCount}
          isChecked={hasLiked}
        />
      </Footer>
    </Wrapper>
  );
}
