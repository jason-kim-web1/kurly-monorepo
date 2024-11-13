import { useState } from 'react';

import TermsModal from '../../../shared/modals/TermsModal';

type GiftDeliveryTermsProps = {
  termsContent?: string;
};

function GiftDeliveryTerms({ termsContent }: GiftDeliveryTermsProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="privacy-agreement">
        <button onClick={() => setOpenModal(true)} />
      </div>
      <TermsModal html={termsContent} open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default GiftDeliveryTerms;
