import { ChangeEvent, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { Section, CouponPackLabel, CouponPackInput } from '../shared/styled';
import CheckFlatIcon from '../../../shared/components/Input/CheckboxFlatIcon';
import { CLASS_NAME_DEVICE } from '../shared/constants';
import { BenefitMetaList, CouponMetaList } from '../../../shared/api/membership/api.type';
import CouponPackBottom from './CouponPackBottom';
import getDuplicateCoupons from '../../../shared/utils/getDuplicateCoupons';

const Container = styled.div`
  &.mobile {
    padding-bottom: 101px;

    @supports (padding-bottom: constant(safe-area-inset-bottom)) {
      padding-bottom: calc(101px + constant(safe-area-inset-bottom));
    }
    @supports (padding-bottom: env(safe-area-inset-bottom)) {
      padding-bottom: calc(101px + env(safe-area-inset-bottom));
    }
  }
`;

interface Props {
  isLoading: boolean;
  selectedBenefitOptionId: number;
  providedBenefitOptionId: number;
  couponMetaList: CouponMetaList[];
}

function ShowBenefitMetaList({ benefitMetaList }: { benefitMetaList: BenefitMetaList[] }) {
  const benefitList = useMemo(
    () =>
      getDuplicateCoupons<BenefitMetaList>({
        coupons: benefitMetaList,
        keyProperty: ['value', 'type', 'description'],
        typeProperty: 'type',
      }),
    [benefitMetaList],
  );

  return (
    <>
      {benefitList.map(({ id, description, value, duplicateCoupons }) => (
        <li key={id} className="item">
          <div>
            {value}
            {duplicateCoupons.length > 0 ? ` ${duplicateCoupons.length + 1}장` : null}
            <div className="text">{description}</div>
          </div>
        </li>
      ))}
    </>
  );
}

export default function CouponPack({
  isLoading,
  selectedBenefitOptionId,
  providedBenefitOptionId,
  couponMetaList,
}: Props) {
  const [selected, setSelected] = useState(selectedBenefitOptionId);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(Number(event.target.value));
  };

  const selectedCode = useMemo(
    () => couponMetaList.find(({ benefitOptionId }) => benefitOptionId === selected)?.benefitOptionCode,
    [couponMetaList, selected],
  );

  return (
    <Container className={CLASS_NAME_DEVICE}>
      <Section>
        {couponMetaList.map(
          ({ benefitOptionId, benefitOptionName, benefitOptionDescription, benefitOptionCode, benefitMetaList }) => (
            <CouponPackLabel
              key={`${benefitOptionCode}${benefitOptionName}`}
              htmlFor={`${benefitOptionId}`}
              className={CLASS_NAME_DEVICE}
              selected={selected === benefitOptionId}
            >
              <div className="top-info">
                <div>
                  <div className="title">
                    {benefitOptionName}
                    {providedBenefitOptionId === benefitOptionId && <span className="badge">이용중</span>}
                  </div>
                  <div className="text">{benefitOptionDescription}</div>
                </div>
                <CheckFlatIcon checked={selected === benefitOptionId} />
              </div>
              <ul>
                <ShowBenefitMetaList benefitMetaList={benefitMetaList} />
              </ul>
              <CouponPackInput
                type="radio"
                id={`${benefitOptionId}`}
                name="couponpackType"
                checked={selected === benefitOptionId}
                value={`${benefitOptionId}`}
                onChange={handleChange}
              />
            </CouponPackLabel>
          ),
        )}
      </Section>
      <CouponPackBottom
        isLoading={isLoading}
        selected={selected}
        selectedBenefitOptionId={selectedBenefitOptionId}
        selectedCode={selectedCode}
      />
    </Container>
  );
}
