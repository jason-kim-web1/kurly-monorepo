type ColorSet =
  | 'kurlyPurple'
  | 'loversThePurple'
  | 'loversPurple'
  | 'loversLavender'
  | 'loversWhite'
  | 'loversFriends'
  | 'shadowGray'
  | 'numBg'
  | 'dropShadow'
  | 'tabHighlight'
  | 'lightGray'
  | 'btnGray'
  | 'bg'
  | 'defaultTagBg'
  | 'bgLightGray'
  | 'tabBg'
  | 'kurlyWhite'
  | 'kurlyGray100'
  | 'kurlyGray150'
  | 'kurlyGray200'
  | 'kurlyGray250'
  | 'kurlyGray300'
  | 'kurlyGray350'
  | 'kurlyGray400'
  | 'kurlyGray450'
  | 'kurlyGray500'
  | 'kurlyGray600'
  | 'kurlyGray700'
  | 'kurlyGray800'
  | 'kurlyGray900'
  | 'kurlyBlack'
  | 'validBlue'
  | 'invalidRed'
  | 'toastFailBg'
  | 'loversTag'
  | 'pointText'
  | 'pointBorder'
  | 'point'
  | 'purple50'
  | 'purple100'
  | 'gradeToolTipBorder'
  | 'gradeToolTipBg'
  | 'gradeGraphBorder'
  | 'gradeGraphBg'
  | 'toolTip'
  | 'kakaoText'
  | 'kakaoBtn'
  | 'cold'
  | 'frozen'
  | 'room'
  | 'kakaoBg'
  | 'naverBg'
  | 'disabled'
  | 'borderColor'
  | 'placeholder'
  | 'kurlyPassRefund'
  | 'filterPurple'
  | 'partnersPurple'
  | 'beautyPurple'
  | 'plccCardBackground'
  | 'plccCardBorder'
  | 'plccBanner'
  | 'kurlymembers'
  | 'joinOrderPeopleColor'
  | 'membersBackground'
  | 'membersBorder'
  | 'benefitGray'
  | 'benefitTextGray'
  | 'mykurlyBg'
  | 'mainPurple'
  | 'mainSecondary'
  | 'dimmed'
  | 'mainReview'
  | 'mainProductCardBorder'
  | 'mainArticleDivider'
  | 'noResultExclamationMark'
  | 'quickFilterPromotionDividerLine';

const COLOR: Record<ColorSet, string> = {
  /** Primary Color */
  kurlyPurple: '#5f0080',
  /** Extended Brand Color */
  loversThePurple: '#4f177a',
  loversPurple: '#641898',
  loversLavender: '#8d4cc4',
  loversWhite: '#a864d8',
  loversFriends: '#cba3e9',
  /** Neutral Color */
  shadowGray: 'rgba(51, 51, 51, .2)',
  numBg: 'rgba(0, 0, 0, .15)',
  dropShadow: 'rgba(0, 0, 0, .1)',
  tabHighlight: 'rgba(0, 0, 0, 0.05)',
  lightGray: '#ddd',
  btnGray: '#f2f2f2',
  bg: '#f4f4f4',
  defaultTagBg: 'rgba(102, 102, 102, .06)',
  bgLightGray: '#f7f7f7',
  tabBg: '#fcfcfc',
  /** Grayscale */
  kurlyWhite: '#fff',
  kurlyGray100: '#fafafa',
  kurlyGray150: '#f5f5f5',
  kurlyGray200: '#eee',
  kurlyGray250: '#e2e2e2',
  kurlyGray300: '#d9d9d9',
  kurlyGray350: '#ccc',
  kurlyGray400: '#b5b5b5',
  kurlyGray450: '#999',
  kurlyGray500: '#808080',
  kurlyGray600: '#666',
  kurlyGray700: '#4c4c4c',
  kurlyGray800: '#333',
  kurlyGray900: '#1a1a1a',
  kurlyBlack: '#000',
  /** Semantic Color */
  validBlue: '#257cd8',
  invalidRed: '#f03f40',
  toastFailBg: '#ffe3e2',
  /** Benefit Color */
  loversTag: '#ee6a7b',
  pointText: '#fa622f',
  pointBorder: '#e8a828',
  point: '#ffbf00',
  purple50: '#f8f1ff',
  purple100: '#E8DBF3',
  /** Grade Benefit Color */
  gradeToolTipBorder: '#efe9f3',
  gradeToolTipBg: '#fbf8fc',
  gradeGraphBorder: '#dcdbdd',
  gradeGraphBg: '#dcdbde',
  /** Tooltip Color */
  toolTip: '#bd76ff',
  /** Element Color */
  kakaoText: '#3c1e1e',
  kakaoBtn: '#ffde00',
  kakaoBg: '#f6e500',
  naverBg: '#00DE5A',
  cold: '#5ec49e',
  frozen: '#6faff3',
  room: '#ff9b5c',
  /** Kakao */
  // 디자인 시스템에는 없으나 자주 쓰이는 컬러
  disabled: '#ccc',
  borderColor: '#ccc',
  placeholder: '#ccc',
  kurlyPassRefund: '#b3130b',
  /** Filter Color */
  filterPurple: '#faf3ff',
  /** Added - partners - MBB */
  partnersPurple: '#A561E1',
  beautyPurple: '#a561e1',
  /** PLCC 카드 */
  plccCardBackground: '#FAF0FF',
  plccCardBorder: '#EAD6F5',
  plccBanner: '#F4ECFF',
  /** 컬리멤버스 **/
  kurlymembers: '#30B2CF',
  membersBackground: '#EAF7FA',
  membersBorder: '#D8F1F6',
  /** 함께구매 */
  joinOrderPeopleColor: '#519ff1',
  /** 회원혜택 */
  benefitGray: '#222',
  benefitTextGray: '#848F9A',
  mykurlyBg: '#f2f5f8',
  /** Main Design Foundation */
  mainPurple: '#672091',
  mainSecondary: '#565E67',
  dimmed: '#BCC4CC',
  mainReview: '#A7B2BC',
  mainProductCardBorder: '#DFE4EB',
  mainArticleDivider: '#ECEFF3',
  noResultExclamationMark: '#CBD1D7',
  quickFilterPromotionDividerLine: '#E9E9E9',
};

export default COLOR;
