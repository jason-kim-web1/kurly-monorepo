import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import { WritableReviewListData } from '../../../types';
import { asset10x16C999 } from '../../../../../shared/images';
import { useReviewDialogActions } from '../../../contexts/ReviewDialogContext';

const Wrap = styled.div`
  padding-top: 20px;
  padding-left: 3px;
  margin-bottom: 30px;
`;

const NoticeTitle = styled.h3`
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  color: ${COLOR.kurlyGray600};
`;

const Item = styled.li`
  position: relative;
  padding-left: 11px;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: ${COLOR.kurlyGray450};
  ::before {
    content: '•';
    position: absolute;
    left: 1px;
    top: -1px;
    display: inline-block;
    font-size: 10px;
  }
`;

const NoticeContent = styled.li`
  position: relative;
  padding-left: 11px;
  font-weight: 400;
  line-height: 21px;
  color: ${COLOR.kurlyGray450};
  :before {
    content: '';
    position: absolute;
    left: 1px;
    top: -1px;
    width: 10px;
    height: 21px;
    background: url(${asset10x16C999}) no-repeat 50% 50%;
    line-height: 21px;
  }
`;

const NoticeDetailButton = styled.button`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;
  color: ${COLOR.kurlyGray700};
  margin-top: 6px;
  margin-left: 11px;
`;

interface Props {
  reserveNotice: WritableReviewListData['reserveNotice'];
}

export const ReviewBenefitNotice = ({ reserveNotice }: Props) => {
  const { openBenefitGuideDialog } = useReviewDialogActions();
  if (reserveNotice) {
    const { title, contents } = reserveNotice;
    return (
      <Wrap>
        <NoticeTitle>{title}</NoticeTitle>
        <ul>
          {contents.map((content, index) => (
            <NoticeContent key={`content-${index}`} dangerouslySetInnerHTML={{ __html: content }} />
          ))}
        </ul>
        <NoticeDetailButton onClick={openBenefitGuideDialog}>자세히 보기</NoticeDetailButton>
      </Wrap>
    );
  }
  return (
    <Wrap>
      <NoticeTitle>사진후기 100원, 글후기 50원 적립금 혜택이 있어요.</NoticeTitle>
      <ul>
        <Item>퍼플, 더퍼플은 2배 적립 (사진 200원, 글 100원) / 주간 베스트 후기로 선정 시 5,000원을 추가 적립</Item>
        <Item>후기 작성은 배송완료일로부터 30일 이내 가능합니다.</Item>
        <Item>작성하신 후기는 확인 후 적립금이 지급됩니다. (영업일 기준 평균 1~2일 소요)</Item>
      </ul>
    </Wrap>
  );
};
