import styled from '@emotion/styled';

import Link from 'next/link';

import { BOARD_PATH, getPageUrl, INQUIRY_PATH, MYPAGE_PATH } from '../../shared/constant';
import SideNavigationBar from '../../shared/components/navigation/SideNavigationBar';
import COLOR from '../../shared/constant/colorset';
import ArrowRight from '../../shared/icons/ArrowRight';
import { MenuTitleTextMap } from '../../mypage/menu-section/constants';

const navigationOptions = {
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

export default function BoardSideNavBar() {
  return (
    <SideNavigationBar title={navigationOptions.title} options={navigationOptions.lists}>
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
