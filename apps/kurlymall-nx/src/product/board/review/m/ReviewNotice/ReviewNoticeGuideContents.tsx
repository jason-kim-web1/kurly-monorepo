import styled from '@emotion/styled';

import {
  bestReviewGuideList,
  reviewGuidePolicy,
  reviewPointNote,
  ReviewPolicyTable,
} from '../../../../../mypage/review/constants/ReviewGuideContents';

import COLOR from '../../../../../shared/constant/colorset';

const Wrapper = styled.article`
  background-color: ${COLOR.kurlyWhite};
  overflow-y: scroll;

  h2 {
    position: sticky;
    top: 0;
    left: 0;
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: ${COLOR.kurlyGray800};
    padding: 24px 24px 16px;
    background-color: ${COLOR.kurlyWhite};
    border-radius: 12px 12px 0 0;
  }
`;

const GuideContents = styled.div`
  padding: 0 24px 16px;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.5px;
    color: ${COLOR.kurlyGray600};
  }

  h3 {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: ${COLOR.kurlyGray800};
    margin-top: 16px;
  }

  table {
    width: 100%;
    text-align: center;
    border: 1px solid ${COLOR.lightGray};
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: ${COLOR.kurlyGray800};
    margin-top: 8px;

    tr {
      border: 1px solid ${COLOR.lightGray};

      td {
        width: 116px;
        height: 36px;
        padding: 10px 0;
        border: 1px solid ${COLOR.lightGray};
      }
    }
  }

  ul {
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.5px;
    color: ${COLOR.kurlyGray600};
    margin-top: 8px;
  }
`;

const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 56px;
  background-color: ${COLOR.kurlyWhite};
  border-top: 1px solid ${COLOR.bgLightGray};
  border-radius: 0 0 12px 12px;
  button {
    width: 84px;
    height: 40px;
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
    color: ${COLOR.kurlyPurple};
  }
`;

interface Props {
  onDismiss?(): void;
}

export default function ReviewNoticeGuideContents({ onDismiss }: Props) {
  return (
    <Wrapper>
      <h2>후기 적립 안내</h2>
      <GuideContents>
        <p>후기 작성은 배송완료일로부터 30일 이내 가능합니다.</p>
        <h3>적립금 지급 정책</h3>
        <ReviewPolicyTable />
        <h3>동일상품(동일옵션)의 후기는 작성일 기준으로 월 1회만 적립금이 지급됩니다.</h3>
        <ul>
          {reviewGuidePolicy.map((guide, i) => (
            <li key={`review-policy-${i}`}>{guide}</li>
          ))}
        </ul>
        <h3>베스트 후기</h3>
        <ul>
          {bestReviewGuideList.map((guide, i) => (
            <li key={`best-guide-${i}`}>{guide}</li>
          ))}
        </ul>
        <h3>후기 적립금 지급 유의 사항</h3>
        <ul>
          {reviewPointNote.map((guide, i) => (
            <li key={`point-guide-${i}`}>{guide}</li>
          ))}
        </ul>
      </GuideContents>
      {onDismiss ? (
        <ButtonWrapper>
          <button onClick={onDismiss}>확인</button>
        </ButtonWrapper>
      ) : null}
    </Wrapper>
  );
}
