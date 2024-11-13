import styled from '@emotion/styled';

import { isWebview } from '../../../../../../util/window/getDevice';
import Alert from '../../../../../shared/components/Alert/Alert';
import ArrowRightGray from '../../../../../shared/components/icons/cart/ArrowRightGray';
import ArrowRightPurple from '../../../../../shared/components/icons/cart/ArrowRightPurple';
import { KAKAO_CS_URL } from '../../../../../shared/configs/config';
import COLOR from '../../../../../shared/constant/colorset';
import appService from '../../../../../shared/services/app.service';

const styles = {
  arrow: {
    marginLeft: '4px',
  },
};

const Button = styled.button<{ theme: 'gray' | 'purple' }>`
  font-size: 14px;
  ${({ theme }) =>
    theme === 'gray'
      ? `
    font-weight: 600;
    color: ${COLOR.kurlyGray450};
  `
      : `
    color: ${COLOR.kurlyPurple};
  `}
`;

const Wrap = styled.span`
  display: flex;
  align-items: center;
`;

interface Props {
  theme?: 'gray' | 'purple';
  className?: string;
}

export default function KakaoLink({ theme = 'gray', className }: Props) {
  const handleClickKakaoLink = async () => {
    const { isConfirmed } = await Alert({
      text: '카카오톡으로 이동하시겠습니까?',
      showCancelButton: true,
    });
    if (!isConfirmed) {
      return;
    }

    if (isWebview()) {
      appService.openWebview({ url: KAKAO_CS_URL });
      return;
    }
    window.open(KAKAO_CS_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button theme={theme} onClick={handleClickKakaoLink} type="button" css={className}>
      <Wrap>
        쿠폰 사용 문의 (카카오톡) {theme === 'gray' && <ArrowRightGray />}
        {theme === 'purple' && <ArrowRightPurple css={styles.arrow} />}
      </Wrap>
    </Button>
  );
}
