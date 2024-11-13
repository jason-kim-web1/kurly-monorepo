import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Text = styled.li`
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
  line-height: 16px;
  letter-spacing: -0.5px;
  padding-bottom: 4px;

  &:last-child {
    padding-bottom: 0;
  }
`;

const List = styled.ul`
  padding-top: 20px;
`;

const contents = [
  '※ 픽업 파트너 및 요일별로 픽업 기간이 상이하므로 픽업일자를 꼭 확인하고 방문해 주세요.',
  '※ 픽업기간 내에 매장에 방문하지 않는 경우, 상품 수령이 불가합니다.',
  '※ 단순변심에 의한 교환 및 환불이 불가능하며, 고객님의 책임 있는 사유로 상품의 멸실 또는 훼손된 경우 취소 / 반품 / 교환이 불가능합니다.',
  '※ 더 자세한 내용은 상품고시 반품/교환 내용을 참고 부탁드립니다.',
];

export default function PickupTerms() {
  return (
    <List>
      {contents.map((content) => (
        <Text key={content}>{content}</Text>
      ))}
    </List>
  );
}
