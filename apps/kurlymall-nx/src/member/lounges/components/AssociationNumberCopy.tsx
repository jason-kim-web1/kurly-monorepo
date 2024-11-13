import useRandomNumberBenefitQuery from '../hooks/useRandomNumberBenefitQuery';
import copyLink from '../../../shared/utils/copyLink';
import { StyledAssociationNumberCopy } from '../shared/styled';
import { isPC } from '../../../../util/window/getDevice';

type AssociationNumberCopyProps = {
  identifier?: string;
};

function AssociationNumberCopy({ identifier }: AssociationNumberCopyProps) {
  const { data } = useRandomNumberBenefitQuery(identifier);

  return (
    <StyledAssociationNumberCopy className={isPC ? 'pc' : 'mobile'}>
      <div className="div-coupon-area">
        <p>쿠폰 번호 등록</p>
        <div className="div-coupon-list">
          {data?.map(({ title, couponNumber }) => (
            <div className="div-coupon-item" key={couponNumber}>
              <div className="div-coupon-item__title">{title}</div>
              <div className="div-coupon-item__input">
                <span>{couponNumber}</span>
                <button
                  onClick={() =>
                    copyLink({
                      link: couponNumber,
                      successCopyLinkText: '쿠폰 번호가 클립보드에 복사되었습니다.',
                    })
                  }
                >
                  복사
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledAssociationNumberCopy>
  );
}

export default AssociationNumberCopy;
