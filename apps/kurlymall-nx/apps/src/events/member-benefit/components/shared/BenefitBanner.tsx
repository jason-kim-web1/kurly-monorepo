import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';
import NextImage from '../../../../shared/components/NextImage';
import { BenefitBannerInfo } from '../../constants';
import ArrowRight from '../../../../shared/icons/ArrowRight';
import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../shared/services/app.service';
import { MYPAGE_PATH } from '../../../../shared/constant';
import { redirectTo } from '../../../../shared/reducers/page';

const BannerLink = styled.button<{ padding?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ padding }) => (padding ? padding : '12px 5px 12px 12px')};
  border-radius: 8px;
  font-weight: 300;
  font-size: 14px;
  background-color: ${COLOR.kurlyGray200};
  color: ${COLOR.kurlyGray600};
  text-align: left;
`;

const BannerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const IconImage = styled.div<{ iconMarginRight?: number }>`
  position: relative;
  width: 56px;
  height: 56px;
  margin-right: ${({ iconMarginRight }) => (iconMarginRight ? iconMarginRight : 20)}px;
`;

const Info = styled.div<{ lineHeight?: number }>`
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : 14)}px;
  letter-spacing: -0.4px;
`;

const Title = styled.strong`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 16px;
  color: ${COLOR.kurlyGray900};
`;

interface Props {
  info: BenefitBannerInfo;
  padding?: string;
  iconMarginRight?: number;
  lineHeight?: number;
}

export default function BenefitBanner({ info, padding, iconMarginRight, lineHeight }: Props) {
  const dispatch = useDispatch();

  const { title, text, url, imgUrl } = info;

  const handleClickLink = () => {
    if (isWebview()) {
      appService.openWebview({
        url: `${window.location.origin}${MYPAGE_PATH.nextGrade.uri}`,
        title: '다음 달 나의 예상 등급',
      });
      return;
    }

    dispatch(redirectTo({ url }));
  };

  return (
    <BannerLink padding={padding} onClick={handleClickLink}>
      <BannerInfo>
        <IconImage iconMarginRight={iconMarginRight}>
          <NextImage src={imgUrl} width={56} height={56} alt="다음 달 예상등급" />
        </IconImage>
        <Info lineHeight={lineHeight}>
          <Title>{title}</Title>
          {text}
        </Info>
      </BannerInfo>
      <ArrowRight stroke={COLOR.kurlyGray900} width={26} height={26} />
    </BannerLink>
  );
}
