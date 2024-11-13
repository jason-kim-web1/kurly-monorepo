import styled from '@emotion/styled';

import moment from 'moment';

import { take } from 'lodash';

import AnswerStatusText from '../../../shared/components/AnswerStatusText';
import BreadCrumbs from './BreadCrumbs';
import InquiryQnaContent from './InquiryQnaContent';
import {
  PersonalInquiryListItemState,
  UserInquiryContentCommentResponseData,
  UserInquiryContentImageData,
} from '../../types';
import InquiryQnaContentComment from '../../../shared/components/InquiryQnaContentComment';
import InquiryFunctions from './InquiryFunctions';
import COLOR from '../../../../../shared/constant/colorset';
import usePersonalInquiryItem from '../../../hook/usePersonalInquiryItem';
import { MemberOrderProductData } from '../../../shared/types';
import SlideToggleWrapper from '../../../../../shared/components/motion/SlideToggleWrapper';
import { OrderType } from '../../../../../shared/constant/order';

const Title = styled.div(({ expanded }: { expanded: boolean }) => ({
  fontSize: '15px',
  lineHeight: '20px',
  color: `${COLOR.kurlyGray800}`,
  textOverflow: 'ellipsis',
  overflow: expanded ? 'visible' : 'hidden',
  wordWrap: expanded ? 'break-word' : 'normal',
  whiteSpace: expanded ? 'normal' : 'nowrap',
}));

const Information = styled.div({
  marginTop: '8px',
  fontSize: '13px',
  color: '#999999',
});

const Divider = styled.span({
  width: '1px',
  height: '10px',
  margin: '0 6px',
  display: 'inline-block',
  backgroundColor: '#eeeeee',
});

const Container = styled.div<{ expanded: boolean }>`
  ${({ expanded }) => (expanded ? '' : `border-bottom: 1px solid ${COLOR.kurlyGray150};`)}
`;

const Contents = styled.div({
  padding: '17px 17px',
  backgroundColor: '#fafafa',
  lineHeight: 1.57,
  overflow: 'hidden',
  height: '100%',
});

const TitleInfoWrap = styled.div`
  padding: 1rem 1.25rem;
`;

interface Props {
  id: number;
  status: PersonalInquiryListItemState;
  title: string;
  date: string;
  expanded: boolean;
  contents: string;
  comments: Array<UserInquiryContentCommentResponseData>;
  orderNo: number;
  orderType: OrderType;
  orderProducts: MemberOrderProductData[];
  inquiryTypeName: string;
  inquiryTypeCode: string;
  inquiryTypeSubName: string;
  inquiryTypeSubCode: string;
  images: UserInquiryContentImageData[];
  allowsNotification: boolean;
  onClickItem(): void;
}

export default function InquiryQnaNormal({
  id,
  status,
  title,
  date,
  expanded,
  contents,
  comments,
  onClickItem,
  orderNo,
  orderType,
  orderProducts,
  inquiryTypeName,
  inquiryTypeCode,
  inquiryTypeSubName,
  inquiryTypeSubCode,
  images,
  allowsNotification,
}: Props) {
  const { deleteInquiry, updateInquiry } = usePersonalInquiryItem();

  return (
    <Container onClick={onClickItem} expanded={expanded}>
      <TitleInfoWrap>
        <Title expanded={expanded}>{title}</Title>
        <Information>
          <AnswerStatusText status={status} />
          <Divider />
          {moment(date).format('YYYY.MM.DD')}
        </Information>
      </TitleInfoWrap>
      <SlideToggleWrapper opened={expanded}>
        <Contents>
          <div>
            <BreadCrumbs category={inquiryTypeName} subCategory={inquiryTypeSubName} />
            <InquiryQnaContent
              type="QUESTION"
              text={contents}
              orderNo={orderNo}
              orderProducts={orderProducts}
              images={images}
              orderType={orderType}
            />
            {status !== 'COMPLETE' && (
              <InquiryFunctions
                onClickUpdate={() =>
                  updateInquiry({
                    id,
                    title,
                    contents,
                    orderNo,
                    orderProducts,
                    inquiryTypeCode,
                    inquiryTypeSubCode,
                    images,
                    allowsNotification,
                  })
                }
                onClickDelete={() => deleteInquiry(id)}
              />
            )}
            {take(comments, 1).map((comment) => (
              <InquiryQnaContentComment key={`${comment.id}`} comment={comment} />
            ))}
          </div>
        </Contents>
      </SlideToggleWrapper>
    </Container>
  );
}
