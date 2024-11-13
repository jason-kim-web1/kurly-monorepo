import { format } from 'date-fns';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { ProductInquiryItemType, ProductInquiryPostComment } from '../types';
import InquiryBoardPostItemContents from './InquiryBoardPostItemContents';
import RawHTML from '../../../../shared/components/layouts/RawHTML';
import { ListSecretBlackIcon, ListSecretIcon } from '../../../../shared/images';

const Tr = styled.tr`
  height: 64px;
  border-bottom: 1px solid ${COLOR.bg};
  line-height: 19px;
  letter-spacing: -0.5px;
`;

const Subject = styled.td<{ isSecret: boolean }>`
  text-align: left;
  padding: 0 20px;
  cursor: pointer;
  ${({ isSecret }) => (isSecret ? `color: ${COLOR.kurlyGray450}` : '')}
`;

const MemberName = styled.td`
  text-align: center;
  color: ${COLOR.kurlyGray450};
`;

const CreatedDate = styled.td`
  text-align: center;
  color: ${COLOR.kurlyGray450};
`;

const Status = styled.td<{ complete: boolean }>`
  text-align: center;
  color: ${({ complete }) => (complete ? COLOR.kurlyPurple : COLOR.kurlyGray450)};
`;

const NoticeTr = styled.tr`
  border-bottom: 1px solid ${COLOR.bg};
`;

const NoticeTd = styled.td`
  padding: 10px 20px;
  background-color: ${COLOR.kurlyGray100};
  border-bottom: 1px solid ${COLOR.bg};
`;

const NoticeIcon = styled.span`
  display: inline-block;
  border-radius: 4px;
  margin-right: 12px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${COLOR.kurlyGray600};
  background-color: rgba(102, 102, 102, 0.06);
`;

const SecretSubject = styled.div`
  display: flex;
  align-items: center;
`;

const SecretIcon = styled.span<{ isMyPost: boolean }>`
  display: block;
  width: 14px;
  height: 14px;
  background: url(${({ isMyPost }) => (isMyPost ? ListSecretBlackIcon : ListSecretIcon)}) no-repeat;
  margin-left: 6px;
`;

interface Props {
  id: number;
  type: ProductInquiryItemType;
  subject: string;
  contents: string;
  memberName: string;
  createdAt: string;
  comments: ProductInquiryPostComment[];
  commentsCount: number;
  isSecret: boolean;
  toggleSelected: boolean;
  isMyPost: boolean;
  onClick(): void;
}

export default function InquiryBoardItem({
  id,
  subject,
  createdAt,
  onClick,
  type,
  isMyPost,
  comments,
  commentsCount,
  memberName,
  contents,
  isSecret,
  toggleSelected,
}: Props) {
  const isComplete = commentsCount > 0;

  const getStatusText = () => {
    if (type !== 'POST') {
      return '-';
    }

    return isComplete ? '답변완료' : '답변대기';
  };

  return (
    <>
      <Tr onClick={onClick}>
        <Subject isSecret={isSecret && !isMyPost}>
          {type === 'NOTICE' && <NoticeIcon>공지</NoticeIcon>}
          {isSecret ? (
            <SecretSubject>
              <span>{isMyPost ? subject : '비밀글입니다.'}</span>
              <SecretIcon isMyPost={isMyPost} />
            </SecretSubject>
          ) : (
            subject
          )}
        </Subject>
        <MemberName>{memberName}</MemberName>
        <CreatedDate>{format(new Date(createdAt), 'yyyy.MM.dd')}</CreatedDate>
        <Status complete={isComplete}>{getStatusText()}</Status>
      </Tr>
      {toggleSelected && type === 'NOTICE' && (
        <NoticeTr>
          <NoticeTd colSpan={4}>
            <RawHTML html={contents} />
          </NoticeTd>
        </NoticeTr>
      )}
      {toggleSelected && type === 'POST' && (
        <InquiryBoardPostItemContents postId={id} contents={contents} comments={comments} isMyPost={isMyPost} />
      )}
    </>
  );
}
