import AssociationNumberCopy from './AssociationNumberCopy';
import AssociationCouponPopup from './AssociationCouponPopup';
import { VIPBody } from '../shared/type';
import { WrappedAssociation } from '../shared/styled';
import Buttons from '../../../marketing/components/Buttons';
import Notice from '../../../marketing/components/Notice';
import BlindText from '../../../marketing/components/BlindText';
import Images from '../../../marketing/components/Images';

type AssociationProps = {
  type: string;
  title: string;
  body?: VIPBody;
};

export default function Association({ type, title, body }: AssociationProps) {
  const { images, notices, benefit, styles, buttons, id } = body || {};

  return (
    <WrappedAssociation backgroundColor={styles?.backgroundColor} id={id}>
      <BlindText text={`<h1>${title}</h1>`} />
      <Images images={images} />
      {benefit && benefit.type === 'random-number' ? <AssociationNumberCopy identifier={benefit.identifier} /> : null}
      {benefit && benefit.type === 'keyword' ? (
        <AssociationCouponPopup maxCount={benefit.maxCount || 0} couponCode={benefit.code} />
      ) : null}
      {buttons && buttons.length > 0 ? <Buttons buttons={buttons} type={type} /> : null}
      {notices ? <Notice notices={notices} /> : null}
    </WrappedAssociation>
  );
}
