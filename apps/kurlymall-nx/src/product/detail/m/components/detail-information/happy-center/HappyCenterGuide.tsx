import { useEffect, useState, ReactNode } from 'react';
import { isEmpty } from 'lodash';
import Link from 'next/link';

import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

import KakaoInquiryButton from '../KakaoInquiryButton';
import deepLinkUrl from '../../../../../../shared/constant/deepLink';
import { isWebview } from '../../../../../../../util/window/getDevice';

const Container = styled.ul`
  padding: 43px 0 19px;
`;

const HappyCenterGuideItem = styled.li`
  padding-bottom: 30px;

  &:last-of-type {
    padding-bottom: 0;
  }
`;

const HappyCenterGuideItemTitle = styled.strong`
  display: block;
  font-weight: 600;
  font-size: 15px;
  color: ${COLOR.kurlyPurple};
  line-height: 19px;
  text-align: center;
`;

const ItemSub = styled.span`
  display: block;
  padding: 6px 0 12px;
  font-weight: 400;
  font-size: 12px;
  color: ${COLOR.kurlyGray800};
  line-height: 17px;
  text-align: center;
  white-space: pre-line;
`;

const ItemNotice = styled.strong`
  display: block;
  padding: 16px 20px 7px;
  font-weight: 400;
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
  line-height: 17px;
  text-align: center;
  white-space: pre-line;
`;

const ItemLink = styled.a`
  display: block;
  width: 150px;
  height: 34px;
  margin: 1px auto 0;
  border: 1px solid ${COLOR.btnGray};
  border-radius: 18px;
  background-color: ${COLOR.btnGray};
  font-size: 13px;
  color: ${COLOR.kurlyGray800};
  line-height: 30px;
  text-align: center;
`;

type GuideItem = {
  title: string;
  renderContent: ReactNode;
};

type GuideList = GuideItem[];

const createHappyCenterGuides = (isWebViewEnv: boolean): GuideList => [
  {
    title: '전화 문의 1644-1107',
    renderContent: <ItemSub>월~토요일 오전 7시 - 오후 6시</ItemSub>,
  },
  {
    title: '카카오톡 문의',
    renderContent: (
      <>
        <ItemSub>
          월~토요일 오전 7시 - 오후 6시{'\n'}
          일/공휴일 오전 7시 - 오후 1시
        </ItemSub>
        <ItemLink>
          <KakaoInquiryButton />
        </ItemLink>
        <ItemNotice>
          ※ 카카오톡에서 {"'"}컬리{"'"}를 검색 후{'\n'}
          대화창에 문의 및 불편사항을 남겨주세요.
        </ItemNotice>
      </>
    ),
  },
  {
    title: '홈페이지 문의',
    renderContent: (
      <>
        <ItemSub>
          365일{'\n'}
          로그인{' > '}마이컬리{' > '}1:1 문의
        </ItemSub>
        <Link href={isWebViewEnv ? deepLinkUrl.PERSONAL_INQUIRY : '/m/mypage/inquiry/form'} passHref>
          <ItemLink>문의 작성하기</ItemLink>
        </Link>
        <ItemNotice>※ 고객센터 운영 시간에 순차적으로 답변해드리겠습니다.</ItemNotice>
      </>
    ),
  },
  {
    title: '교환 및 환불 안내',
    renderContent: (
      <>
        <ItemSub>
          교환 및 환불이 필요하신 경우 고객행복센터로 문의해주세요.{'\n'}
          아래 항목을 누르면 자세한 정책을 보실 수 있습니다.
        </ItemSub>
      </>
    ),
  },
];

export default function HappyCenterGuide() {
  const [guideList, setGuideList] = useState<GuideList>([]);

  useEffect(() => {
    setGuideList(createHappyCenterGuides(isWebview()));
  }, []);

  if (isEmpty(guideList)) {
    return null;
  }

  return (
    <Container>
      {guideList.map(({ title, renderContent }) => (
        <HappyCenterGuideItem key={title}>
          <HappyCenterGuideItemTitle>{title}</HappyCenterGuideItemTitle>
          {renderContent}
        </HappyCenterGuideItem>
      ))}
    </Container>
  );
}
