import { memberIcon, orderIcon, deliveryIcon, cancelIcon } from '../../../shared/images';

interface GuideItem {
  title: string;
  iconSrc: string;
  iconAltText: string;
  content: string;
  description?: string;
}

export const guideItemList: GuideItem[] = [
  {
    title: '회원 / 혜택',
    iconSrc: memberIcon,
    iconAltText: '회원 아이콘 이미지',
    content: `컬리에 회원가입을 하시면<br />
      가입 즉시 게시판 이용 및 각종 할인 쿠폰과<br />
      적립금, 이벤트 혜택을 받으실 수 있습니다.<br />
      쿠폰과 적립금은 로그인 하신 후<br />
      마이페이지에서 확인하실 수 있습니다.`,
  },
  {
    title: '주문 / 결제',
    iconSrc: orderIcon,
    iconAltText: '장바구니 아이콘 이미지',
    content: `상품 주문은<br />
      <span class="highlighted">장바구니에 상품 담기
      <img class="arrow" src="https://res.kurly.com/freshsolutions/pc/service/service/ico_arrow_x2.png"></img>
      회원 혹은 비회원 주문
      <img class="arrow" src="https://res.kurly.com/freshsolutions/pc/service/service/ico_arrow_x2.png"></img><br />
      주문서 작성
      <img class="arrow" src="https://res.kurly.com/freshsolutions/pc/service/service/ico_arrow_x2.png"></img>
      결제 방법 선택 및 결제
      <img class="arrow" src="https://res.kurly.com/freshsolutions/pc/service/service/ico_arrow_x2.png"></img><br />
      주문 완료</span>로 이루어집니다.`,
    description: '비회원 주문인 경우 주문번호를 메모해 두시기 바랍니다.',
  },
  {
    title: '배송',
    iconSrc: deliveryIcon,
    iconAltText: '배송 차량 아이콘 이미지',
    content: `컬리는 싱싱한 유기농 상품을<br />
      고객님의 식탁까지 빠르고 안전하게<br />
      배달하기 위해 항상 노력합니다.<br />
      특히 샛별배송을 받으시는 경우,<br />
      배송 요청사항란에 특수정보를 기입해주셔야<br />
      보다 안전한 배송이 가능합니다.`,
  },
  {
    title: '취소 / 교환 / 환불',
    iconSrc: cancelIcon,
    iconAltText: '배송 박스 아이콘 이미지',
    content: `주문취소는 배송 단계별로 방법이 상이합니다.<br />
      - [주문완료] 상태일 경우에만 주문 취소 가능합니다.<br />
      - [마이컬리 > 주문 내역 상세페이지]에서 직접<br />취소하실 수 있습니다.<br />
      받으신 상품의 이상이 있거나 궁금한 사항이<br />
      있다면 언제든지 1:1문의 게시판 에 문의해주세요.`,
  },
];
