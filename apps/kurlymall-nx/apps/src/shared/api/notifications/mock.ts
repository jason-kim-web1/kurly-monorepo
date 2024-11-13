import { NotificationCategory, NotificationItem, NotificationType } from '../../interfaces/Notification';
import { KURLY_URL } from '../../configs/config';

const mockOrderNo = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('orderno') : null;

const sampleList: {
  title: string;
  contents: string;
  imageUrl?: string;
  landingLink?: string;
  notificationType: NotificationType;
  notificationCategory: NotificationCategory;
}[] = [
  {
    title: '🚚 배송 완료 안내',
    contents: '주문하신 상품을 문앞에 배송 완료하였습니다.\n배송위치 확인하기 >',
    imageUrl: 'https://newsimg.sedaily.com/2020/06/05/1Z3WR5E6JZ_6.jpg',
    landingLink: `${KURLY_URL}/mypage/order/${mockOrderNo || '123'}`,
    notificationType: 'INFORMATION',
    notificationCategory: 'PAYMENT_DELIVERY',
  },
  {
    title: '재입고 알림 신청하신 [또보겠지떡볶이집]의 재고가 충전어쩌구저쩌구',
    contents: '구매 시점에 따라 품절이 발생할 수 있으니 양해 바랍니다.',
    imageUrl: 'https://product-image.kurly.com/product/image/f3575442-22d2-4375-acad-1cd4e8a1cf37.jpg',
    landingLink: `${KURLY_URL}/goods/5054623`,
    notificationType: 'INFORMATION',
    notificationCategory: 'RESTOCKED',
  },
  {
    title: '[안내] 보냉백을 문 앞에 놓아주세요',
    contents: '주문하신 상품이 신선하게 배송 됩니다',
    imageUrl: 'https://product-image.kurly.com/product/image/7e6eece4-21f6-491e-9271-705b78054b5d.jpg',
    landingLink: `${KURLY_URL}/mypage/order/${mockOrderNo || '123'}`,
    notificationType: 'INFORMATION',
    notificationCategory: 'PAYMENT_DELIVERY',
  },
  {
    title: '[고객센터] 1:1 문의 답변 등록 안내',
    contents: '등록하신 1:1 문의에 답변이 등록되었습니다',
    landingLink: `${KURLY_URL}/mypage/inquiry/list`,
    notificationType: 'INFORMATION',
    notificationCategory: 'CUSTOMER_CENTER',
  },
  {
    title: '긴글테스트 사진,링크없음',
    contents:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    notificationType: 'INFORMATION',
    notificationCategory: 'PAYMENT_DELIVERY',
  },
  {
    title: '긴글테스트',
    contents:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl: 'https://newsimg.sedaily.com/2020/06/05/1Z3WR5E6JZ_6.jpg',
    notificationType: 'INFORMATION',
    notificationCategory: 'PAYMENT_DELIVERY',
  },
  {
    title: '긴글테스트2',
    contents:
      '가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하',
    imageUrl: 'https://newsimg.sedaily.com/2020/06/05/1Z3WR5E6JZ_6.jpg',
    notificationType: 'INFORMATION',
    notificationCategory: 'PAYMENT_DELIVERY',
  },
  {
    title:
      '333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333',
    contents:
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    imageUrl: 'https://newsimg.sedaily.com/2020/06/05/1Z3WR5E6JZ_6.jpg',
    notificationType: 'INFORMATION',
    notificationCategory: 'PAYMENT_DELIVERY',
  },
  {
    title: '긴글테스트4',
    contents:
      '22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
    imageUrl: 'https://newsimg.sedaily.com/2020/06/05/1Z3WR5E6JZ_6.jpg',
    notificationType: 'INFORMATION',
    notificationCategory: 'PAYMENT_DELIVERY',
  },
];

function makeMockList(length: number, startDate: Date = new Date()): NotificationItem[] {
  const date = startDate;
  const result: NotificationItem[] = [];

  for (let i = length; i--; i > 0) {
    const sample = sampleList[i % sampleList.length];

    result.push({
      ...sample,
      id: i,
      createdAt: new Date(date.toISOString()),
    });

    date.setHours(date.getHours() - 6);
  }
  return result;
}

const mockQuery = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('mock') : null;
const tempMock = makeMockList(Number(mockQuery) || 0);

export function getNotificationsMock(page: number, size: number, notificationCategory?: NotificationCategory) {
  if (!mockQuery || process.env.NODE_ENV === 'production') {
    return;
  }
  const list = notificationCategory
    ? tempMock.filter((x) => x.notificationCategory === notificationCategory)
    : tempMock;

  const startIdx = page * size;
  const last = startIdx + size >= list.length;
  return {
    number: page,
    last,
    content: list.slice(startIdx, startIdx + size),
  };
}
