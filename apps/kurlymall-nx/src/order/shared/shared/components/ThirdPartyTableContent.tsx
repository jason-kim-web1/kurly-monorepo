import { SellerType, TermsInfo } from '../../../../shared/interfaces/UserTerms';
import { ThirdPartyTableCell } from './ThirdPartyTableCell';

export function ThirdPartyTableContent({
  personalInfo,
  isPickupOrder,
}: {
  personalInfo: TermsInfo[];
  isPickupOrder: boolean;
}) {
  return (
    <>
      {personalInfo.map(({ type, names }) => (
        <tbody key={`${type}-${names}`}>
          {type === SellerType.ALCOHOL && (
            <ThirdPartyTableCell type={SellerType.ALCOHOL_DEFAULT} names={'관할세무서'} />
          )}
          {isPickupOrder && <ThirdPartyTableCell type={SellerType.PICKUP} names={names} />}
          {(!isPickupOrder || type !== SellerType.ALCOHOL) && <ThirdPartyTableCell type={type} names={names} />}
        </tbody>
      ))}
    </>
  );
}
