import { reviewGuideImage1, reviewGuideImage2, reviewGuideImage3 } from '../../../shared/images';

const ReviewGuideDescription = () => (
  <>
    제품의 <span>맛·향·크기·사용감</span> 등을 설명해주세요{'\n'}
    <strong>좋았던 점, 아쉬웠던 점</strong>도 솔직하게 얘기해주세요
  </>
);

export const reviewGuideContents = {
  title: '후기는 이렇게 작성해 보세요',
  description: <ReviewGuideDescription />,
  imageGuides: [
    {
      imageUrl: reviewGuideImage1,
      imageDescription: '상품을 활용한\n나만의 레시피 사진',
    },
    {
      imageUrl: reviewGuideImage2,
      imageDescription: '박스 안에 숨겨진\n리얼 상품 사진',
    },
    {
      imageUrl: reviewGuideImage3,
      imageDescription: '분위기를 느낄 수\n있는 플레이팅',
    },
  ],
};

export const ReviewPolicyTable = () => {
  return (
    <table>
      <tbody>
        <tr>
          <td>글 후기</td>
          <td>50원</td>
        </tr>
        <tr>
          <td>사진 후기</td>
          <td>100원</td>
        </tr>
        <tr>
          <td>베스트 후기</td>
          <td colSpan={2}>5000원</td>
        </tr>
      </tbody>
    </table>
  );
};

export const reviewGuidePolicy = [
  '-월의 기준은 작성한 달의 1일~말일입니다.',
  '-옵션 상품은 1개 이상의 종류를 가진 상품일 때, 각 상품을 의미합니다.',
  '예시) 곰탕 2종 상품(맑은 곰탕, 진한 곰탕) : 각각 구매 했을 경우 2건 모두에 적립금 지급',
  '*작성하신 후기는 일주일 이내에 적립금이 지급됩니다.',
  '*작성 당일의 후기를 기준으로 적립금이 지급됩니다.(이후 수정시 적립금 지급액에 영향을 주지 않습니다.)',
  '*비공개 후기는 적립금이 지급되지 않습니다.',
];

export const bestReviewGuideList = [
  '1. 선정 건 수: 일주일 최대 100건 내외',
  '2. 혜택: 선정 시 적립금 5,000원',
  '3. 지급 일시: 매주 수요일(지급일이 공휴일의 경우 전 영업일)',
  '*베스트 선정된 후기는 후기 게시판에서 확인하실 수 있습니다.',
  '*베스트 선정된 후기는 수정 또는 비공개로 변경하실 수 없습니다.',
];

export const reviewPointNote = [
  '컬리는 믿을 수 있는 후기문화를 함께 만들어가고자 합니다. 따라서 후기 내용이 아래에 해당하는 경우에는 검토 후 삭제 및 적립금 회수 조치될 수 있습니다.',
  '1. 욕설, 폭력성, 음란성, 상업성 등 업체나 타인에게 불쾌한 내용을 작성한 경우',
  '2. 구매한 상품과 무관한 내용이나 동일 문자/단순 초성의 반복 등 부적합한 내용을 작성한 경우',
  '3. 상품의 기능이나 효과 등에 오해의 소지가 있는 내용을 작성한 경우',
  '4. 저작권, 초상권 등 타인의 권리를 침해하는 이미지, 동영상을 사용한 경우',
  '5. 구매한 상품이 아닌 캡쳐 사진, 포장 박스 사진 등 상품과 관련 없는 이미지, 동영상을 사용한 경우',
  '또한, 비정상적인 방법을 통해 후기를 작성하고 적립금을 취득한 경우 작성자에 법적 책임의 소지가 있음을 알려드립니다.',
];
