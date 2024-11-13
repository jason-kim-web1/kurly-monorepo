import styled from '@emotion/styled';

import {
  LOVERS_BENEFIT_SHARE_TITLE,
  LOVERS_SHARE_BLOG_NAME,
  LOVERS_SHARE_KAKAO_NAME,
  LOVERS_SHARE_LINK_NAME,
} from '../../constants';
import LoversKakaoShare from '../../../../shared/icons/LoversKakaoShare';
import LoversNaverBlogShare from '../../../../shared/icons/LoversNaverBlogShare';
import LoversLinkShare from '../../../../shared/icons/LoversLinkShare';
import ScreenOut from '../../../../shared/components/Pagination/ScreenOut';
import useLoversBenefitShare from '../../hooks/useLoversBenefitShare';
import { KURLY_URL } from '../../../../shared/configs/config';

const Container = styled.div`
  padding: 60px 0;
  text-align: center;
`;

const Title = styled.strong<{ titleMarginBottom: number; titleFontSize: number }>`
  display: block;
  margin-bottom: ${({ titleMarginBottom }) => titleMarginBottom}px;
  font-weight: 300;
  font-size: ${({ titleFontSize }) => titleFontSize}px;
  line-height: 1.5;
  letter-spacing: -0.7px;
`;

const EmphText = styled.span`
  font-weight: 500;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const ShareButton = styled.button<{ iconMargin: string }>`
  overflow: hidden;
  margin: ${({ iconMargin }) => iconMargin};
`;

const URLInput = styled.input`
  position: absolute;
  left: -9999px;
`;

interface Props {
  titleMarginBottom?: number;
  titleFontSize?: number;
  iconSize?: number;
  iconMargin?: string;
}

export default function BenefitShareButton({
  titleMarginBottom = 18,
  titleFontSize = 16,
  iconSize = 64,
  iconMargin = '0 4px',
}: Props) {
  const { linkUrl, linkInputRef, handleClickKaKaoShare, handleClickBlogShare, handleClickLinkShare } =
    useLoversBenefitShare();

  return (
    <Container>
      <Title titleMarginBottom={titleMarginBottom} titleFontSize={titleFontSize}>
        {LOVERS_BENEFIT_SHARE_TITLE.title}
        <br />
        <EmphText>{LOVERS_BENEFIT_SHARE_TITLE.text}</EmphText>
      </Title>
      <ButtonWrap>
        <ShareButton onClick={handleClickKaKaoShare} iconMargin={iconMargin}>
          <ScreenOut>{LOVERS_SHARE_KAKAO_NAME}</ScreenOut>
          <LoversKakaoShare width={iconSize} height={iconSize} />
        </ShareButton>
        <ShareButton onClick={handleClickBlogShare} iconMargin={iconMargin}>
          <ScreenOut>{LOVERS_SHARE_BLOG_NAME}</ScreenOut>
          <LoversNaverBlogShare width={iconSize} height={iconSize} />
        </ShareButton>
        <ShareButton onClick={() => handleClickLinkShare(linkInputRef)} iconMargin={iconMargin}>
          <ScreenOut>{LOVERS_SHARE_LINK_NAME}</ScreenOut>
          <URLInput readOnly ref={linkInputRef} type="text" value={`${KURLY_URL}${linkUrl}`} />
          <LoversLinkShare width={iconSize} height={iconSize} />
        </ShareButton>
      </ButtonWrap>
    </Container>
  );
}
