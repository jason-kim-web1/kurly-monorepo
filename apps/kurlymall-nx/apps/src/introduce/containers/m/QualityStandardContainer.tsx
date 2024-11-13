import Link from 'next/link';

import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import { INTRODUCE_PATH } from '../../../shared/constant';
import { INTRODUCE_IMAGE_URL, QUALITY_STANDARD } from '../../constants';
import {
  AdditivesFood,
  GmoFood,
  GrowthIcon,
  HealthIcon,
  InfantFood,
  JapanFood,
  OrganicIcon,
  PesticideUse,
  PetFood,
  ProcessIcon,
  ProducerIcon,
  SafetyIcon,
  SpecialIcon,
} from '../../../shared/icons';
import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/m/IntroduceContentWrap';
import IntroduceTextBox from '../../components/shared/IntroduceTextBox';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import RawHTML from '../../../shared/components/layouts/RawHTML';

const IconLists = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 -18px 40px;
  border-bottom: 1px solid ${COLOR.kurlyGray200};
`;

const InnerLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  border-top: 1px solid ${COLOR.kurlyGray200};
  font-weight: 700;
  color: ${COLOR.kurlyPurple};

  &::after {
    position: absolute;
    top: 19px;
    right: 30px;
    width: 8px;
    height: 10px;
    background: url(${INTRODUCE_IMAGE_URL.icoArrowRight}) no-repeat 50% 50% / cover;
    content: '';
  }
`;

const Text = styled.span`
  margin-left: 9px;
`;

export default function QualityStandardContainer() {
  return (
    <>
      <IntroduceImageBox
        imageUrl={INTRODUCE_IMAGE_URL.qualityStandardMainMo}
        text={'나와 내 가족이 사고 싶은 상품을 판매합니다.'}
      />
      <IntroduceContentWrap>
        {QUALITY_STANDARD.map(({ id, title, text, lists }) => (
          <div key={id}>
            <IntroduceTextBox>
              <IntroduceTitle>{title}</IntroduceTitle>
              <IntroduceText>
                <RawHTML html={text} />
              </IntroduceText>
            </IntroduceTextBox>
            {lists && (
              <IconLists>
                {lists.map(({ name, url }) => (
                  <Link key={name} href={url} passHref>
                    <InnerLink href={url}>
                      {name === INTRODUCE_PATH.gmoFood.name && <GmoFood width={32} height={32} />}
                      {name === INTRODUCE_PATH.japaneseFood.name && <JapanFood width={32} height={32} />}
                      {name === INTRODUCE_PATH.infantFood.name && <InfantFood width={32} height={32} />}
                      {name === INTRODUCE_PATH.foodAdditive.name && <AdditivesFood width={32} height={32} />}
                      {name === INTRODUCE_PATH.pesticideUse.name && <PesticideUse width={32} height={32} />}
                      {name === INTRODUCE_PATH.petFood.name && <PetFood width={32} height={32} />}
                      {name === INTRODUCE_PATH.ecoOrganic.name && <OrganicIcon width={32} height={32} />}
                      {name === INTRODUCE_PATH.ecoPlantationBreeding.name && <GrowthIcon width={32} height={32} />}
                      {name === INTRODUCE_PATH.productionProcess.name && <ProcessIcon width={32} height={32} />}
                      {name === INTRODUCE_PATH.safetyHygiene.name && <SafetyIcon width={32} height={32} />}
                      {name === INTRODUCE_PATH.areaProducer.name && <ProducerIcon width={32} height={32} />}
                      {name === INTRODUCE_PATH.healthFunctionalFood.name && <HealthIcon width={32} height={32} />}
                      {name === INTRODUCE_PATH.specialProduct.name && <SpecialIcon width={32} height={32} />}
                      <Text>{name}</Text>
                    </InnerLink>
                  </Link>
                ))}
              </IconLists>
            )}
          </div>
        ))}
      </IntroduceContentWrap>
    </>
  );
}
