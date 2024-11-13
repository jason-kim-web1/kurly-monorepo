import Alert from '../../../shared/components/Alert/Alert';
import { KAKAO_SHARE_KEY } from '../../../shared/configs/config';
import useLoadKakao from '../../../shared/hooks/useLoadKakao';

export default function useFriendBenefitShare() {
  useLoadKakao();

  const handleClickMembersKaKao = async (kakaoTemplateId: number) => {
    const kakao = window.Kakao;

    if (!kakao) {
      await Alert({ text: '현재 카카오톡 공유하기를 사용할 수 없습니다.' });
      return;
    }
    if (!kakao.isInitialized()) {
      kakao.init(KAKAO_SHARE_KEY);
    }

    kakao.Share.sendCustom({
      templateId: kakaoTemplateId,
      installTalk: true,
    });
  };

  return {
    handleClickMembersKaKao,
  };
}
