export enum ScreenName {
  RECOMMENDATION = 'recommendation', // 컬리추천
  NEW_PRODUCT = 'new_product', // 신상품
  POPULAR_PRODUCT = 'popular_product', // 베스트
  BARGAIN = 'bargain', // 알뜰쇼핑
  EVENT_LIST = 'event_list', // 이벤트
  BENEFIT_LIST = 'benefit_list', // 뷰티 이벤트
  BRAND_LIST = 'brand_list', // 뷰티 브랜드관
  CAROUSEL_LIST = 'carousel_list', // 캐러셀 가로형 전체보기 상세 목록

  RECIPE_LIST = 'recipe_list', // 레시피
  RECIPE_DETAIL = 'recipe_detail', // 레시피 상세

  ANNOUNCE = 'announce', // 공지사항

  CATEGORY = 'category', // 카테고리
  CATEGORY_PRODUCT_LIST = 'category_product_list', // 카테고리 상품 목록
  COLLACTION_PRODUCT_LIST = 'collaction_product_list', // 컬렉션 상세
  GIFT_LIST = 'gift_list', // 선물하기

  SEARCH = 'search', // 검색
  SEARCH_PRODUCT_LIST = 'search_product_list', // 검색 결과 목록

  STARRED = 'starred', // 추천

  MY_KURLY = 'my_kurly', // 마이컬리

  MY_KURLY_STYLE = 'my_kurly_style', // 마이컬리 스타일
  PROFILE_SETTING = 'profile_setting', // 프로필 최초 설정 시 화면(각 문항이 단계별로 나눠짐)
  PROFILE_SETTING_SUCCESS = 'profile_setting_success', // 프로필 설정 완료 화면
  PROFILE_SETTING_EDIT = 'profile_setting_edit', // 프로필 설정 변경 시(각 문항이 한 화면에 보임)

  SIMPLE_SHIPPING_ADDRESS_LIST = 'simple_shipping_address_list', // 간편 배송지 관리
  SHIPPING_ADDRESS_LIST = 'shipping_address_list', // 배송지 관리
  DELIVERY_GUIDE = 'delivery_guide', // 배송 안내
  NOTICE_LIST = 'notice_list', // 공지사항
  NOTICE_DETAIL = 'notice_detail', // 공지사항 상세
  FREQUENTLY_ASK_QUESTION = 'frequently_ask_question', // 자주하는 질문
  SERVICE_CENTER = 'service_center', // 고객센터
  SERVICE_GUIDE = 'service_guide', // 이용 안내
  ABOUT_KURLY = 'about_kurly', // 컬리 소개
  NOTIFICATION_SETTING = 'notification_setting', // 알림 설정
  SIGN_UP_BENEFIT = 'sign_up_benefit', // 가입 혜택
  GUEST_ORDER_SEARCH = 'guest_order_search', // 비회원 주문 조회
  PICK_LIST = 'pick_list', // 찜한 상품
  GIFT_HISTORY = 'gift_history', // 선물 내역
  GIFT_ORDER_DETAIL = 'gift_order_detail', // 선물 내역 - 선물 내역 상세보기
  MEMBERSHIP_GUIDE = 'membership_guide', // 전체 등급 보기
  MEMBERSHIP_BENEFIT = 'membership_benefit', // 다음 달 예상 등급 보기
  POINT_HISTORY = 'point_history', // 적립금 내역
  COUPON_LIST = 'coupon_list', // 쿠폰 목록
  FRIEND_INVITATION = 'friend_invitation', // 친구 초대
  MY_WISH_LIST = 'my_wish_list', // 늘사는것
  STOCK_NOTIFICATION_HISTORY = 'stock_notification_history', // 재입고알림내역
  ORDER_HISTORY = 'order_history', // 주문 내역 목록
  ORDER_SHEET_DETAIL = 'order_sheet_detail', // 마이컬리, 주문서 - 주문 내역 상세, //비회원 주문 조회 - 주문 내역 상세
  FREQUENTLY_PURCHASE_PRODUCT_HISTORY = 'frequently_purchase_product_history', // 자주 사는 상품 목록
  MY_REVIEWABLE_LIST = 'my_reviewable_list', // 작성 가능 후기 목록
  MY_REVIEW_HISTORY = 'my_review_history', // 작성 완료 후기 목록
  MY_PRODUCT_INQUIRY_HISTORY = 'my_product_inquiry_history', // 상품 문의 목록
  PERSONAL_INQUIRY_HISTORY = 'personal_inquiry_history', // 1:1 문의 목록
  PERSONAL_INQUIRY_DETAIL = 'personal_inquiry_detail', // 1:1 문의 상세
  PERSONAL_INQUIRY_WRITING = 'personal_inquiry_writing', // 1:1 문의 쓰기
  PERSONAL_INQUIRY_WRITING_NOTICE = 'personal_inquiry_writing_notice', // 1:1 문의 쓰기 - 작성 시 유의사항
  PERSONAL_INQUIRY_WRITING_INQUIRY_TYPE_SELECTION = 'personal_inquiry_writing_inquiry_type_selection', // 1:1 문의 쓰기 - 문의 항목 선택
  PERSONAL_INQUIRY_WRITING_ORDER_HISTORY_SELECTION = 'personal_inquiry_writing_order_history_selection', // 1:1 문의 쓰기 - 주문 내역 선택
  BULK_ORDER_INQUIRY = 'bulk_order_inquiry', // 대량주문 문의
  KURLY_PASS_GUIDE = 'kurly_pass_guide', // 컬리패스
  ACCOUNT_EDIT = 'account_edit', // 개인정보 수정
  LEAVE = 'leave', // 탈퇴
  PRODUCT_LIST = 'product_list', // 상품 목록
  PRODUCT_DETAIL_DESCRIPTION = 'product_detail_description', // 상품 설명
  PRODUCT_DETAIL_IMAGE = 'product_detail_image', // 상품 이미지
  PRODUCT_DETAIL_INFO = 'product_detail_info', // 상품 정보
  PRODUCT_DETAIL_REVIEW = 'product_detail_review', // 상품 후기
  PRODUCT_REVIEW_SUBTAB = 'product_review_subtab', // 상품 상세 조회를 통한 후기 진입
  PRODUCT_DETAIL_INQUIRY = 'product_detail_inquiry', // 상품 문의
  SHARE = 'share', // 공유
  PRODUCT_REVIEW_LIST = 'product_review_list', // 상품 후기 전체 목록
  PRODUCT_REVIEW_DETAIL = 'product_review_detail', // 상품 후기 상세
  PRODUCT_REVIEW_WRITING = 'product_review_writing', // 상품 후기 쓰기
  PRODUCT_REVIEW_WRITING_NOTICE = 'product_review_writing_notice', // 상품 후기 쓰기 - 작성 시 유의사항
  PRODUCT_PHOTO_REVIEW_LIST = 'product_photo_review_list', // 사진 후기 목록
  PRODUCT_INQUIRY_LIST = 'product_inquiry_list', // 상품 문의 전체 목록
  PRODUCT_INQUIRY_DETAIL = 'product_inquiry_detail', // 상품 문의 상세
  PRODUCT_INQUIRY_WRITING = 'product_inquiry_writing', // 상품 문의 쓰기
  PRODUCT_INQUIRY_WRITING_NOTICE = 'product_inquiry_writing_notice', // 상품 문의 쓰기 - 작성 시 유의사항
  PRODUCT_SELECTION = 'product_selection', // 상품 선택
  CART = 'cart', // 장바구니
  ORDER_SHEET = 'order_sheet', // 주문서
  ORDER_CANCEL = 'order_cancel', // 주문 취소
  ORDER_CANCEL_SUCCESS = 'order_cancel_success', // 주문 취소 성공
  ORDER_CANCEL_FAIL = 'order_cancel_fail', // 주문 취소 실패
  PAYMENT_SUCCESS = 'payment_success', // 결제 완료
  FIRST_PAYMENT_SUCCESS = 'first_payment_success', // 결제 완료 (첫 구매)
  PURCHASE_TOGETHER_SUCCESS = 'purchase_together_success', // 함께구매 완료
  SPLASH = 'splash', // 스플래시(앱 오픈)
  SIGN_UP = 'sign_up', // 회원 가입
  SIGN_UP_SUCCESS = 'signup_success', // 회원 가입 완료
  LOGIN = 'login', // 로그인
  FIND_ID = 'find_id', // 아이디 찾기
  FIND_PASSWORD = 'find_password', // 비밀번호 찾기
  SNS_SYNC = 'sns_sync', // 카카오 계정 연결 페이지
  USER_GUIDE = 'user_guide', // 이용안내
  MEMBERSHIP = 'membership', // 컬리멤버스 구독하기
  MEMBERSHIP_INFO = 'membership_info', // 나의 컬리멤버스 정보
  MEMBERSHIP_SUBSCRIBE = 'membership_subscribe', // 컬리멤버스 주문서
  MEMBERSHIP_SUBSCRIBE_SUCCESS = 'membership_subscribe_success', // 컬리멤버스 구독 결제 완료
  MEMBERSHIP_UNSUBSCRIBE = 'membership_unsubscribe', // 컬리멤버스 해지
  MEMBERSHIP_UNSUBSCRIBE_SUCCESS = 'membership_unsubscribe_success',
  MEMBERSHIP_COUPONPACK_OPTION = 'membership_option', // 컬리멤버스 쿠폰팩 선택
  MEMBERSHIP_EVENT_DETAIL = 'membership_event_detail', // 외부광고용 컬리멤버스 - 퍼포먼스 마케팅

  NOTIFICATION_CENTER = 'notification',

  VIP = 'vip',
  VVIP = 'vvip',
}
