import { amplitudeService } from '../../../shared/amplitude';
import { SharePurchaseTogetherLink } from '../../../shared/amplitude/events';
import useToggle from '../../checkout/shared/hooks/useToggle';
import { JoinOrderMeta } from '../../common/interface/JoinOrderMeta';
import copyText from '../../common/utils/copyText';

const useJoinOrderInfo = ({ joinOrderMeta }: { joinOrderMeta: JoinOrderMeta }) => {
  const { isOpen, toggle } = useToggle(true);
  const { joinOrderShareLink, type, code } = joinOrderMeta;

  const handleClickCopyLinkButton = () => {
    copyText({
      text: joinOrderShareLink,
      messageOnSuccess: '링크가 복사되었습니다.',
    });

    amplitudeService.logEvent(
      new SharePurchaseTogetherLink({
        selectionType: '주문내역',
        orderType: type,
        joinOrderCode: code,
      }),
    );
  };

  return { isOpen, toggle, handleClickCopyLinkButton };
};

export default useJoinOrderInfo;
