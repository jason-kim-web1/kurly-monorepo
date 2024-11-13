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
import IntroduceContentWrap from '../../components/pc/IntroduceContentWrap';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import IntroduceTextBox from '../../components/shared/IntroduceTextBox';
import RawHTML from '../../../shared/components/layouts/RawHTML';

const Container = styled.div`
  padding-bottom: 20px;
`;

const IconLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  padding: 34px 15px 65px;
  border-top: 1px solid ${COLOR.kurlyGray250};
`;

const InnerLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 305px;
  height: 48px;
  margin: 0 0 18px;
  font-weight: 500;
  font-size: 16px;
  color: ${COLOR.kurlyPurple};

  &::after {
    position: absolute;
    top: 15px;
    right: 0;
    width: 11px;
    height: 17px;
    background: url(${INTRODUCE_IMAGE_URL.icoArrowPurple}) no-repeat;
    content: '';
  }
`;

export default function QualityStandardContainer() {
  return (
    <Container>
      <IntroduceImageBox
        imageUrl={INTRODUCE_IMAGE_URL.qualityStandardMain}
        height={240}
        fontSize={32}
        text={'나와 내 가족이 사고 싶은 상품을 판매합니다.'}
      />
      <IntroduceContentWrap>
        {QUALITY_STANDARD.map(({ id, title, text, lists }) => (
          <div key={id}>
            <IntroduceTextBox>
              <IntroduceTitle fontWeight={500} fontSize={20}>
                {title}
              </IntroduceTitle>
              <IntroduceText fontSize={16} align={'justify'}>
                <RawHTML html={text} />
              </IntroduceText>
            </IntroduceTextBox>
            {lists && (
              <IconLists>
                {lists.map(({ name, url }) => (
                  <Link key={name} href={url} passHref>
                    <InnerLink href={url}>
                      {name === INTRODUCE_PATH.gmoFood.name && <GmoFood />}
                      {name === INTRODUCE_PATH.japaneseFood.name && <JapanFood />}
                      {name === INTRODUCE_PATH.infantFood.name && <InfantFood />}
                      {name === INTRODUCE_PATH.foodAdditive.name && <AdditivesFood />}
                      {name === INTRODUCE_PATH.pesticideUse.name && <PesticideUse />}
                      {name === INTRODUCE_PATH.petFood.name && <PetFood />}
                      {name === INTRODUCE_PATH.ecoOrganic.name && <OrganicIcon />}
                      {name === INTRODUCE_PATH.ecoPlantationBreeding.name && <GrowthIcon />}
                      {name === INTRODUCE_PATH.productionProcess.name && <ProcessIcon />}
                      {name === INTRODUCE_PATH.safetyHygiene.name && <SafetyIcon />}
                      {name === INTRODUCE_PATH.areaProducer.name && <ProducerIcon />}
                      {name === INTRODUCE_PATH.healthFunctionalFood.name && <HealthIcon />}
                      {name === INTRODUCE_PATH.specialProduct.name && <SpecialIcon />}
                      {name}
                    </InnerLink>
                  </Link>
                ))}
              </IconLists>
            )}
          </div>
        ))}
      </IntroduceContentWrap>
    </Container>
  );
}
