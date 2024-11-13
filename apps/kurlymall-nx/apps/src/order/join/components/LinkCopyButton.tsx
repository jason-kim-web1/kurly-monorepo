import styled from '@emotion/styled';

import Button from '../../../shared/components/Button/Button';
import { Clip } from '../../../shared/icons/Clip';
import { useAppSelector } from '../../../shared/store';
import copyLink from '../../../shared/utils/copyLink';
import { amplitudeService } from '../../../shared/amplitude';
import { SharePurchaseTogetherLink } from '../../../shared/amplitude/events';

const Wrapper = styled.div`
  margin-bottom: 20px;
  svg {
    margin-right: 4px;
  }
`;

export default function LinkCopyButton() {
  const joinOrderMeta = useAppSelector(({ payments }) => payments.paymentsResult.joinOrderMeta);

  const handleClickCopyLink = () => {
    if (!joinOrderMeta) {
      return;
    }

    const { joinOrderShareLink, type, code } = joinOrderMeta;

    copyLink({ link: joinOrderShareLink });

    amplitudeService.logEvent(
      new SharePurchaseTogetherLink({
        selectionType: '주문완료',
        orderType: type,
        joinOrderCode: code,
      }),
    );
  };

  return (
    <Wrapper>
      <Button text="링크 복사하기" height={48} radius={100} icon={<Clip />} onClick={handleClickCopyLink} />
    </Wrapper>
  );
}
