/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { format } from 'date-fns';

import { take } from 'lodash';
import { css } from '@emotion/react';

import BreadCrumbs from './BreadCrumbs';
import InquiryQnaContent from './InquiryQnaContent';
import InquiryFunctions from './InquiryFunctions';
import AnswerStatusText from '../../../../shared/components/AnswerStatusText';
import InquiryQnaContentComment from '../../../../shared/components/InquiryQnaContentComment';
import { BoardList } from '../../../../../../board/components/pc/List';

import {
  PersonalInquiryListItemState,
  UserInquiryContentCommentResponseData,
  UserInquiryContentImageData,
} from '../../../types';

import usePersonalInquiryItem from '../../../../hook/usePersonalInquiryItem';
import { MemberOrderProductData } from '../../../../shared/types';
import COLOR from '../../../../../../shared/constant/colorset';
import { OrderType } from '../../../../../../shared/constant/order';

const styles = {
  title: css`
    width: 620px;
    padding: 20px;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    border-bottom: 1px solid ${COLOR.bg};
  `,
  status: css`
    width: 100px;
    text-align: center;
    font-size: 14px;
    line-height: 22px;
    border-bottom: 1px solid ${COLOR.bg};
  `,
  functions: css`
    margin-top: 20px;
  `,
};

const Title = styled.div(
  ({ expanded }: { expanded: boolean }) => `
  overflow: hidden;
  display: block;
  width: 580px;
  cursor: pointer;
  ${
    !expanded &&
    `
    white-space: nowrap;
    text-overflow: ellipsis;
  `
  }
`,
);

const Text = styled.span`
  color: ${COLOR.kurlyGray450};
`;

const Contents = styled.div`
  padding: 20px 20px 30px;
  background-color: ${COLOR.kurlyGray100};
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
    <>
      <BoardList.Contents.ExpandLink onClick={onClickItem}>
        <BoardList.Contents.LineBreak>
          <BoardList.Contents.View styles={styles.title}>
            <Title expanded={expanded}>{title}</Title>
          </BoardList.Contents.View>
          <BoardList.Contents.View styles={styles.status}>
            <Text>{format(new Date(date), 'yyyy.MM.dd')}</Text>
          </BoardList.Contents.View>
          <BoardList.Contents.View styles={styles.status}>
            <AnswerStatusText status={status} />
          </BoardList.Contents.View>
        </BoardList.Contents.LineBreak>
      </BoardList.Contents.ExpandLink>
      <BoardList.Contents.ExpandView isOpen={expanded}>
        <Contents>
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
              css={styles.functions}
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
        </Contents>
      </BoardList.Contents.ExpandView>
    </>
  );
}
