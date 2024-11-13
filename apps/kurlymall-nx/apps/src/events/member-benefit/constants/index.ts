import { MEMBER_BENEFIT_PATH, MYPAGE_PATH, getPageUrl } from '../../../shared/constant';
import { GradeName } from '../../../shared/enums';
import { RESOURCE_URL } from '../../../shared/configs/config';

export enum FriendShareType {
  Kakao = 'KAKAO',
  Join = 'JOIN',
  Event = 'EVENT',
}

export interface MemberBenefitNavMenu {
  name: string;
  url: string;
  mobileUri?: string;
}

export interface BenefitTitleText {
  title: string;
  text: string;
}

export interface LoversBenefitList {
  id: GradeName;
  orderPriceSum: number;
  reviewPoint?: string;
  pointRate: number;
  gift?: string;
  benefitPrice: number;
  benefitPriceSum: string;
}

export interface BenefitBannerInfo {
  title: string;
  text: string;
  url: string;
  imgUrl: string;
}

export interface LoversCaution {
  title: string;
  list: string[];
}

export interface LoversBenefitShare {
  shareTitle: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  buttonTitle: string;
  linkUrl: string;
}

// 메타 태그 정보
export const LOVERS_META_INFO = {
  title: '컬리 러버스',
  description: '마켓컬리를 사랑해주시는 회원 여러분께 감사의 마음을 담아 매월 실용적이고 다채로운 혜택을 전합니다',
  image: `${RESOURCE_URL}/images/event/lovers/200201/mobile/img_main.jpg`,
};

export const MEMBERS_META_INFO = {
  title: '컬리멤버스',
  description: '부담없이 누리는 컬리의 0원 멤버십, 컬리멤버스! 매달 나에게 딱 맞는 혜택을 골라보세요.',
};

export const VIP_META_INFO = {
  title: 'VIP 제도',
  description:
    '컬리에서 2024년 상반기 동안 구매 금액을 기준으로 2024년 하반기 VIP를 선정하여 프라이빗 서비스를 제공합니다.',
};

// 다음달 예상등급 배너
export const NEXT_GRADE_BENEFIT_INFO: BenefitBannerInfo = {
  title: '다음 달 혜택이 궁금하신가요?',
  text: '나의 예상 등급 미리 보기',
  url: getPageUrl(MYPAGE_PATH.nextGrade),
  imgUrl: `${RESOURCE_URL}/images/event/fixed/common/thum-lovers.png`,
};

// 친구초대 이벤트 링크
export const FRIEND_SHARE_LINK_URL = 'https://we.kurly.com/CFrST5JKrnb';

// 상단 네비게이션 메뉴
export const MEMBER_BENEFIT_NAVMENU: MemberBenefitNavMenu[] = [
  {
    name: MEMBER_BENEFIT_PATH.members.name,
    url: MEMBER_BENEFIT_PATH.members.uri,
  },
  {
    name: MEMBER_BENEFIT_PATH.vip.name,
    url: MEMBER_BENEFIT_PATH.vip.uri,
  },
  {
    name: MEMBER_BENEFIT_PATH.friend.name,
    url: MEMBER_BENEFIT_PATH.friend.uri,
  },
  {
    name: MEMBER_BENEFIT_PATH.payment.name,
    url: MEMBER_BENEFIT_PATH.payment.uri,
  },
];

// 컬리 러버스 혜택
export const LOVERS_TOP_INFO: BenefitTitleText = {
  title: '컬리 러버스 혜택',
  text: '고객님께 받은 사랑을 혜택으로 돌려드려요. 매월 실적에 따라 달라지는 실용적이고 다채로운 혜택을 확인해보세요.',
};

export const LOVERS_BENEFIT_CAUTION: LoversCaution[] = [
  {
    title: '회원 등급 적용',
    list: [
      '매월 1일에 전월 실적(전월 결제 금액+전월 적립금 사용액)을 기준으로 새로운 등급이 적용됩니다.',
      '전월 실적은 주문 금액에서 할인, 쿠폰을 제외한 금액으로, 적립금 사용액은 전월 실적에 포함됩니다.',
      'KURLY LOVERS는 당사의 사정에 따라 변경 또는 중지될 수 있으며, 명백한 오남용이 발견될 시에는 혜택 이용에 제한을 받으실 수 있습니다.',
    ],
  },
  {
    title: '적립금 및 쿠폰',
    list: [
      '주문 적립금은 배송비를 제외한 결제금액에 각 고객등급별 적립률을 곱한 금액으로, 배송완료 후 7일 뒤에 지급됩니다.',
      '일부 상품은 적립금이 지급되지 않습니다. (상품 상세에서 확인 가능)',
      '주문 취소 시, 지급 되었던 적립금은 자동 차감됩니다.',
      '베스트 후기에는 더블 후기 적립금 혜택이 적용되지 않습니다.',
      '추가 혜택은 월 중 지급되며, 혜택 지급 시 SMS 수신 동의 해주신 고객님께 문자 개별 안내드릴 예정입니다..',
    ],
  },
  {
    title: '적립금 사용',
    list: [
      '적립금의 유효기한은 지급일로부터 6개월입니다.',
      '소멸기한이 1개월 내로 임박한 적립금은 PC / Mobile [마이컬리]에서 확인하실 수 있습니다.',
      '적립금은 자동으로 유효기한이 적게 남은 금액부터 사용됩니다.',
      '적립금 유효기한은 2018년 4월 1일부터 적용되며, 그 이전에 받으신 적립금은 유효기한이 없습니다.',
    ],
  },
];

export const LOVERS_BENEFIT_SHARE_TITLE: BenefitTitleText = {
  title: '컬리 러버스의 혜택을',
  text: '친구에게도 소개해주세요!',
};

export const LOVERS_SHARE_KAKAO_NAME = '카카오톡 공유하기';

export const LOVERS_SHARE_BLOG_NAME = '네이버 블로그 공유하기';

export const LOVERS_SHARE_LINK_NAME = '링크 공유하기';

export const LOVERS_BENEFIT_SHARE: LoversBenefitShare = {
  shareTitle: '컬리 러버스의 혜택을 친구에게도 소개해주세요!',
  imageUrl: `${RESOURCE_URL}/images/event/lovers/200201/mobile/img_main.jpg`,
  imageWidth: 750,
  imageHeight: 920,
  buttonTitle: '마켓컬리 구경가기',
  linkUrl: MEMBER_BENEFIT_PATH.lovers.uri,
};

// 친구초대
export const FRIEND_SHARE_IMAGE_PC = `${RESOURCE_URL}/images/event/fixed/220207/pc/share_friend_v2.png`;
export const FRIEND_SHARE_IMAGE_MO = `${RESOURCE_URL}/images/event/fixed/220207/m/share_friend.png`;

export const FRIEND_SHARE_BUTTON_TEXT = {
  [FriendShareType.Kakao]: '카카오톡으로 가입 혜택 알려주기',
  [FriendShareType.Join]: '가입 혜택 링크 복사하기',
  [FriendShareType.Event]: '이벤트 링크 복사',
};

export const FRIEND_NOTICE_POINT_INFO = `
  <strong>적립금 지급 기준</strong>
  <p>초대한 친구가 가입 후 <span class="underline">7일 이내 첫 구매 배송을 받아야 합니다.</span> (배송완료일을 기준으로 함)</p>
`;

export const FRIEND_NOTICE_POINT_VALID = `
  <strong>적립금 유효기간</strong>
  <p>- 추천인 : 지급일로부터 6개월 후에 소멸됩니다.</p>
  <p>- 피추천인 : 지급일로부터 7일 후에 소멸됩니다.</p>
`;

export const FRIEND_DEFAULT_NOTICE = [
  '가입 화면에서 추천인 ID를 입력해 주세요. (가입 완료 후 추천인 입력 불가)',
  'ID는 대소문자 및 띄어쓰기를 구분해 정확히 입력해 주세요.',
  '적립금은 친구의 첫 구매 배송이 완료된 날로부터 이틀 뒤 오후 7시 이전에 지급됩니다. (영업일 기준)',
  '적립금은 추천인과 친구 모두에게 지급됩니다.',
  '초대할 수 있는 친구의 수는 제한이 없으나, 적립금은 이벤트에 따라 변경 및 제한될 수 있습니다.',
  '주문 취소 시 적립금은 지급되지 않습니다.',
  '적립금 지급 후 주문 취소 및 환불 시 적립금이 회수될 수 있습니다.',
  '혜택을 위해 동일인이 중복 가입할 경우 적립금이 지급되지 않을 수 있습니다.',
  '추천인과 친구의 주소지, 연락처 등이 동일할 경우, 적립금이 지급되지 않을 수 있습니다.',
  '기존에 친구 초대로 가입한 친구가 해지/탈퇴 후 다시 친구 초대를 통해 재가입할 경우, 적립금은 지급되지 않습니다.',
  '애플 정책상의 이유로, 애플 계정 간편가입 시에는 친구 추천 이벤트에 참여하실 수 없습니다.',
  '금전적인 이득을 위해 비정상적인 방법으로 이벤트에 참여할 경우 적립금이 지급되지 않거나 회수될 수 있습니다.',
  '친구 초대 이벤트는 당사의 사정에 의해 사전 고지 없이 변경 혹은 중단될 수 있습니다.',
];

// 장바구니
export const CART_BENEFIT_IMAGE_PC = {
  main: `${RESOURCE_URL}/images/event/cart/230215/pc/main.png`,
  cartTitle: `${RESOURCE_URL}/images/event/cart/230215/pc/event1_tit.png`,
  cartContent: `${RESOURCE_URL}/images/event/cart/230215/pc/event1_img.png?v=1`,
  copyButton: `${RESOURCE_URL}/images/event/cart/230215/pc/event1_btn.png`,
  instagram: `${RESOURCE_URL}/images/event/cart/230215/pc/event2_img.png?v=1`,
  naverBlog: `${RESOURCE_URL}/images/event/cart/230215/pc/event3_img.png?v=2`,
};

export const CART_BENEFIT_IMAGE_MO = {
  main: `${RESOURCE_URL}/images/event/cart/230215/m/main.png`,
  cartTitle: `${RESOURCE_URL}/images/event/cart/230215/m/event1_tit.png`,
  cartContent: `${RESOURCE_URL}/images/event/cart/230215/m/event1_img.png?v=1`,
  copyButton: `${RESOURCE_URL}/images/event/cart/230215/m/event1_btn.png`,
  instagram: `${RESOURCE_URL}/images/event/cart/230215/m/event2_img.png?v=2`,
  naverBlog: `${RESOURCE_URL}/images/event/cart/230215/m/event3_img.png?v=1`,
};

export const CART_BENEFIT_TEXT = {
  mainTitle: '#오늘도컬리 하면 매일 5천원 드려요!',
  mainText: '고객님의 SNS에 컬리로 장 본 일상을 올려주세요. 선정을 통해 매일 20분께 적립금 5천원을 드려요.',
  cartTitle: '장바구니 이벤트',
  cartContent: `
    <dl>
      <dt>참여 기한</dt>
      <dd>배송받은 날짜로부터 1개월 이내</dd>
      <dt>선정 대상</dt>
      <dd>
        아래 참여 방법으로 포스팅 하신 분들 중
        매일 20명 선정
      </dd>
      <dt>참여 방법</dt>
      <dd>
        구매 상품의 인증샷 또는 활용샷 올리고,
        #마켓컬리 #오늘도컬리 #ID_나의마켓컬리아이디
        3가지 해시태그를 본문에 남겨주세요
      </dd>
    </dl>
  `,
  cartContentImgAlt: '예시) 마켓컬리 ID가 kurly123이라면, #마켓컬리 #오늘도컬리 #ID_kurly123',
  copyPlaceholder: '마켓컬리 아이디를 입력해주세요',
  copyButtonImgAlt: '내 마켓컬리 아이디 입력하고 해시태그 복사한 다음 업로드하면 참여완료',
  copyButton: `해시태그 복사하기`,
  instagramTitle: '인스타그램 참여 예시',
  instagramContent:
    'kurly123, 맛있는 우리 집 식탁, 좋아요 124개 kurly123 오늘 점심은 컬리 KF365 앞다리살로 만든 우리 집 단골 밥도둑 제육볶음! 밥투정하던 아이들이 두 그릇씩 먹는 제 필살기 메뉴예요. #마켓컬리 #오늘도컬리 #id_kurly123',
  instagramNotice: `유의 사항 인스타그램 비공개 계정은 참여가 불가능합니다. 본문에 해시태그를 꼭! 달아주세요.`,
  naverBlogTitle: '네이버 블로그 참여 예시',
  naverBlogContent:
    '컬리러버의 집밥 일기 [3/17] 오늘도 컬리 집밥 일기 #마켓컬리 #오늘도컬리 #id_kurly123 안녕하세요 이웃님들! 요새 향긋한 달래가 철이잖아요. 자주 해 먹던 소불고기에 달래를 살짝 얹어보았어요. 제 식탁에도 봄이 찾아왔어요!',
};

export const CART_BENEFIT_NOTICE_CRITERION = [
  '배송 완료 일자로부터 1개월 이내의 주문 건에 한해서만 참여 가능합니다.',
  '전체 공개 계정에 한해 지급됩니다. (친구 공개 & 비공개 계정은 적립 불가)',
  '실제 상품의 인증샷을 올려 주셔야 하며 구매내역 캡처 화면으로는 이벤트 참여가 불가합니다.',
  '참여 기준을 충족하기 위해 이미 올린 게시물을 수정하거나,<br>비공개 게시물을 공개로 전환할 경우 적립금이 지급되지 않습니다.',
  '띄어쓰기 / 엔터 / 괄호 등으로 인해 해시태그를 오기재할 경우  적립금이 지급되지 않습니다.',
  '인스타그램 참여 시, 본문이 아닌 댓글로 해시태그를 달아주신 경우 적립금이 지급되지 않습니다.',
  '해당 이벤트는 마켓컬리 ID당 1일 1회 참여하실 수 있습니다.',
  '마켓컬리 ID 기입 시 대소문자 구분을 반드시 해주시기 바랍니다.',
];

export const CART_BENEFIT_NOTICE_POINT = [
  '이벤트 참여 기준에 모두 충족되었을 경우에만 적립금이 지급 됩니다.',
  '당사 사정에 따라 이벤트는 조기 종료 또는 연장될 수 있습니다.',
  '금전적인 이득을 취하기 위하여 비정상적인 방법으로 이벤트에 참여한 것으로 간주될 경우,<br>적립금이 지급되지 않습니다.',
  '오늘도컬리 이벤트 적립금은 게시물 작성 시점으로부터 영업일 기준 3일 내로 지급됩니다.',
];

export const GRADE_INFO_UPDATE_DATE = new Date('2023-08-01T00:00:00+09:00'); // 08.01 00시 외부 제휴 혜택 반영
