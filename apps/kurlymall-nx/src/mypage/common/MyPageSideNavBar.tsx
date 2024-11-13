import styled from '@emotion/styled';

import Link from 'next/link';

import { BOARD_PATH, getPageUrl, GIFT_PATH, INQUIRY_PATH, MY_KURLY_STYLE, MYPAGE_PATH } from '../../shared/constant';
import SideNavigationBar from '../../shared/components/navigation/SideNavigationBar';
import { MenuTitleTextMap } from '../menu-section/constants';
import COLOR from '../../shared/constant/colorset';
import ArrowRight from '../../shared/icons/ArrowRight';

const navigationOptions = {
  customerService: {
    title: '고객센터',
    lists: [
      {
        id: 0,
        text: MenuTitleTextMap.notice,
        url: getPageUrl(BOARD_PATH.notice),
      },
      {
        id: 1,
        text: MenuTitleTextMap.faq,
        url: getPageUrl(BOARD_PATH.faq),
      },
      {
        id: 2,
        text: MenuTitleTextMap.inquiry,
        url: getPageUrl(INQUIRY_PATH.inquiry),
        subMenu: [getPageUrl(INQUIRY_PATH.form)],
      },
      {
        id: 3,
        text: MenuTitleTextMap.bulkOrder,
        url: getPageUrl(MYPAGE_PATH.bulkOrder),
      },
    ],
  },
  myKurly: {
    title: '마이컬리',
    lists: [
      {
        id: 0,
        text: MenuTitleTextMap.order,
        url: getPageUrl(MYPAGE_PATH.orderList),
      },
      {
        id: 1,
        text: MenuTitleTextMap.gift,
        url: getPageUrl(GIFT_PATH.list),
      },
      {
        id: 2,
        text: MenuTitleTextMap.favorite,
        url: getPageUrl(MYPAGE_PATH.favorite),
      },
      {
        id: 3,
        text: MenuTitleTextMap.pick,
        url: getPageUrl(MYPAGE_PATH.pick),
      },
      {
        id: 4,
        text: MenuTitleTextMap.address,
        url: getPageUrl(MYPAGE_PATH.address),
      },
      {
        id: 5,
        text: MenuTitleTextMap.review,
        url: getPageUrl(MYPAGE_PATH.review),
      },
      {
        id: 6,
        text: MenuTitleTextMap.kurlypay,
        url: '',
      },
      {
        id: 7,
        text: MenuTitleTextMap.qna,
        url: getPageUrl(MYPAGE_PATH.productInquiry),
      },
      {
        id: 8,
        text: MenuTitleTextMap.emoney,
        url: getPageUrl(MYPAGE_PATH.emoney),
      },
      {
        id: 9,
        text: MenuTitleTextMap.coupon,
        url: getPageUrl(MYPAGE_PATH.coupon),
      },
      {
        id: 10,
        text: MenuTitleTextMap.myKurlyStyle,
        url: getPageUrl(MY_KURLY_STYLE.myKurlyStyle),
      },
      {
        id: 11,
        text: MenuTitleTextMap.info,
        url: getPageUrl(MYPAGE_PATH.myInfo),
      },
    ],
  },
};

const NeedHelp = styled.a`
  width: 100%;
  height: 60px;
  padding: 0 14px 0 20px;
  margin-top: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.kurlyGray100};
  line-height: 20px;
`;

const NeedHelpContents = styled.div`
  display: flex;
  flex-direction: column;
  color: ${COLOR.kurlyGray800};
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Text = styled.span`
  font-size: 12px;
`;

export default function MyPageSideNavBar() {
  return (
    <SideNavigationBar title={navigationOptions.myKurly.title} options={navigationOptions.myKurly.lists}>
      <Link href={INQUIRY_PATH.inquiry.uri} passHref>
        <NeedHelp>
          <NeedHelpContents>
            <Title>도움이 필요하신가요 ?</Title>
            <Text>1:1 문의하기</Text>
          </NeedHelpContents>
          <ArrowRight width={19} height={19} strokeWidth={1.8} stroke={COLOR.kurlyGray800} />
        </NeedHelp>
      </Link>
    </SideNavigationBar>
  );
}
