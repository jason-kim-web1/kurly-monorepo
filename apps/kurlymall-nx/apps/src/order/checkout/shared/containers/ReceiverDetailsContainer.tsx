import { useAppSelector } from '../../../../shared/store';

import useCheckoutAddress from '../hooks/useCheckoutAddress';

import Loading from '../../../../shared/components/Loading/Loading';
import ReceiverDetailFormPC from '../../pc/components/ReceiverDetails/ReceiverDetailForm';
import ReceiverDetailFormMobile from '../../m/components/ReceiverDetails/ReceiverDetailForm';
import { useCheckoutAddressQuery } from '../hooks/queries';

interface Props {
  isPC?: boolean;
}

export default function ReceiverDetailsContainer({ isPC = false }: Props) {
  const { receiverForm } = useAppSelector(({ checkout }) => ({
    receiverForm: checkout.receiverForm,
  }));

  useCheckoutAddressQuery();
  const { setSameWithOrderer, changeAddressDetail, submitAddress, isSameOrderer } = useCheckoutAddress();

  const handleCancel = () => {
    window.close();
  };

  if (!receiverForm?.address) {
    return <Loading testId="loading" />;
  }

  const ReceiverDetailForm = isPC ? ReceiverDetailFormPC : ReceiverDetailFormMobile;

  return (
    <ReceiverDetailForm
      receiverForm={receiverForm}
      isSameOrderer={isSameOrderer}
      onClickSameOrderer={setSameWithOrderer}
      onChange={changeAddressDetail}
      onSubmit={submitAddress}
      onClickCancel={handleCancel}
    />
  );
}
