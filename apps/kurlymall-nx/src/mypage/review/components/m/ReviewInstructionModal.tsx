import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { hiddenScrollBar } from '../../../../shared/utils/hidden-scrollbar';
import COLOR from '../../../../shared/constant/colorset';

const dialogStyle = css`
  .MuiPaper-root {
    width: calc(100% - 48px);
    min-height: 530px;
    margin: 0;
    border-radius: 12px;
    overflow: hidden;
  }
`;

const dialogContentStyle = css`
  &.MuiDialogContent-root {
    padding: 24px 24px 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: ${COLOR.kurlyGray600};
    ${hiddenScrollBar()}
  }

  p {
    padding-bottom: 20px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 6px;
    margin-bottom: 20px;

    li {
      list-style-type: '·';
      list-style-position: outside;
      padding-inline-start: 3px;
    }

    :last-of-type {
      padding-left: 16px;
      color: ${COLOR.invalidRed};

      li {
        list-style-type: '※';
        list-style-position: outside;
        padding-inline-start: 5px;
      }
    }
  }
`;

const dialogActionsStyle = css`
  &.MuiDialogActions-root {
    height: 56px;
    padding: 0;
  }
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  color: ${COLOR.kurlyGray800};
  margin-bottom: 16px;
`;

const Button = styled.button`
  display: flex;
  justify-content: right;
  align-items: center;
  height: 4rem;
  padding: 0 1.5rem;
  font-size: 16px;
  color: ${COLOR.kurlyPurple};
`;

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
}

export default function ReviewInstructionModal({ isOpen, onDismiss }: Props) {
  return (
    <Dialog css={dialogStyle} open={isOpen} fullWidth>
      <DialogContent css={dialogContentStyle}>
        <Title>후기 작성 시 유의사항</Title>
        <p>
          컬리는 믿을 수 있는 후기문화를 함께 만들어가고자 합니다. 식품 등의 표시광고에 대한 법률을 준수하고자 다음과
          같은 부당한 상품평에 대해서는 별도 고지 없이 임시 대처, 비공개 전환, 삭제, 적립금 회수 등의 필요한 조치가 취해
          질 수 있습니다.
        </p>
        <ul>
          <li>개인의 주관적인 의견으로 인해 상품의 기능 및 효과에 대하여 오해의 소지가 있는 내용</li>
          <li>식품/건강기능식품과 관련하여 질병의 예방 및 치료, 체중감량(다이어트)에 효능효과가 있다는 내용</li>
          <li>일반 화장품을 기능성화장품의 효능효과가 있다는 내용을 통한 오인 표현</li>
          <li>의약외품을 의약품으로 오인하게 하는 표현</li>
          <li>생활화학제품을 본래 용도와 다르게 사용하는 내용 및 효능효과를 과장하는 내용</li>
          <li>
            욕설, 폭력성, 음란성, 상업성 등의 게시물 또는 구매 상품과 무관하거나 반복되는 동일 단어나 문장을 사용하여
            판매자나 다른 이용자의 후기 이용을 방해한다고 판단되는 경우
          </li>
          <li>
            구매한 상품이 아닌 캡쳐 사진, 타인 사진 도용, 포장 박스, 퍼플박스, 구매 상품을 구분할 수 없는 전체 사진 등
            상품과 관련 없는 이미지, 동영상을 사용한 경우
          </li>
          <li>본인 또는 타인의 주민등록번호, (휴대)전화번호, 이메일 등 개인정보가 포함된 경우</li>
          <li>그 밖에 상품평으로 인해 다른 회원 또는 제3자에게 피해가 가해질 내용</li>
        </ul>
        <ul>
          <li>
            작성된 글과 첨부된 멀티미디어 파일 등으로 이루어진 각 상품평은 개인의 의견을 반영하므로, 게시된 내용에 대한
            모든 책임은 작성자에게 있습니다. <br />
            또한 비정상적인 방법을 통해 후기를 작성하고 적립금을 취득한 경우 작성자에 법적 책임의 소지가 있음을
            알려드립니다.
          </li>
        </ul>
      </DialogContent>
      <DialogActions css={dialogActionsStyle}>
        <Button onClick={onDismiss}>확인</Button>
      </DialogActions>
    </Dialog>
  );
}
