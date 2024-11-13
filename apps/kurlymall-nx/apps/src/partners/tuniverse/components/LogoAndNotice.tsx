import { KURLY_MEMBERS_BANNER_3 } from '../../../shared/constant';
import NextImage from '../../../shared/components/NextImage';
import { DotGray800, kurlyNaviLogoMW, TUniverseLogo } from '../../../shared/images';
import { HeaderText, Notice, WrapImg, WrapLogo } from '../shared/styled';
import { Close } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';

const LogoAndNotice = () => {
  return (
    <>
      <WrapLogo>
        <NextImage src={kurlyNaviLogoMW} alt="마켓컬리 로고" width={53} height={28} objectFit="contain" />
        <Close
          className="center-icon"
          width={16}
          height={16}
          fill={COLOR.kurlyPurple}
          stroke={COLOR.kurlyPurple}
          strokeWidth="2"
        />
        <NextImage src={TUniverseLogo} alt="T 우주패스 로고" width={60} height={25} objectFit="contain" />
      </WrapLogo>
      <HeaderText>
        T 우주패스 고객님,
        <br />
        <b>컬리멤버스 연결페이지</b>입니다
      </HeaderText>
      <WrapImg>
        <NextImage src={KURLY_MEMBERS_BANNER_3} layout="fill" objectFit="cover" alt="컬리멤버스" />
      </WrapImg>
      <Notice>
        <div className="item">
          <img src={DotGray800} alt="dot-gray" />
          <span>우주패스 가입, 해지 등 상품에 대한 세부 유의사항은 T우주에서 확인해주세요.</span>
        </div>
        <div className="item">
          <img src={DotGray800} alt="dot-gray" />
          <span>
            컬리 회원이 아니라면, <b>회원가입 완료 후 발송된 문자내 링크를 클릭하여 연결페이지로 진입해주세요.</b>{' '}
            로그인 후 컬리멤버스를 연결해야 정상적으로 완료됩니다.
          </span>
        </div>
      </Notice>
    </>
  );
};

export default LogoAndNotice;
