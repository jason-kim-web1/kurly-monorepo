import { ContentType, GroupProduct } from '../../../../types';

import SectionWrapper from '../../SectionWrapper';
import OptionContent from './option/OptionContent';
import CalendarContent from './calendar-content/CalendarContent';

interface Props {
  productNo: number;
  contentType: ContentType;
  groupProduct: GroupProduct;
}

export default function OptionSection({ productNo, contentType, groupProduct }: Props) {
  return (
    <SectionWrapper>
      {contentType === 'OPTION' && (
        <OptionContent
          productNo={productNo}
          groupKeys={groupProduct.groupKeys}
          groupMembers={groupProduct.groupMembers}
        />
      )}
      {contentType === 'CALENDAR' && (
        <CalendarContent
          productNo={productNo}
          groupKeys={groupProduct.groupKeys}
          groupMembers={groupProduct.groupMembers}
        />
      )}
    </SectionWrapper>
  );
}
