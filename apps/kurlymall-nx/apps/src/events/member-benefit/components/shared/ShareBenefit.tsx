import { BenefitShared } from '../../../../shared/api/events/member/benefit.api';

import { CLASS_NAME_DEVICE } from '../../../../mypage/membership/shared/constants';
import RawHTML from '../../../../shared/components/layouts/RawHTML';
import { ShareKakao } from '../../../../shared/icons/ShareKakao';
import copyLink from '../../../../shared/utils/copyLink';
import { ShareUrl } from '../../../../shared/icons/ShareUrl';
import { ShareArea } from '../../shared/styled';
import useFriendBenefitShare from '../../hooks/useBenefitShare';

interface Props {
  shared: BenefitShared;
}

export default function ShareBenefit({ shared }: Props) {
  const { handleClickMembersKaKao } = useFriendBenefitShare();

  const { title, kakaoTemplateId, link } = shared;

  return (
    <ShareArea className={CLASS_NAME_DEVICE}>
      <h3 className="title">
        <RawHTML html={title} />
      </h3>
      <div className="button-wrap">
        <button onClick={() => handleClickMembersKaKao(kakaoTemplateId)} data-opt="kakaotalk">
          <ShareKakao />
          카카오톡
        </button>
        <div>
          <input type="hidden" value={link} />
          <button
            onClick={() =>
              copyLink({
                link,
                successCopyLinkText: '이 글의 URL이 클립보드에 복사되었습니다.',
              })
            }
          >
            <ShareUrl />
            링크 복사
          </button>
        </div>
      </div>
    </ShareArea>
  );
}
