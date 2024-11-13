import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Placeholder = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: ${COLOR.kurlyGray350};
  cursor: pointer;
  z-index: 1;
`;

export default function TextareaPlaceholder() {
  return (
    <Placeholder>
      상품 특성에 맞는 후기를 작성해주세요. 예) 레시피, 겉포장 속 실제 구성품 사진, 플레이팅, 화장품 사용자의 피부타입
      등 (최소 10자이상)
    </Placeholder>
  );
}
