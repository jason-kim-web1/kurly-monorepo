import { isEmpty } from 'lodash';
import styled from '@emotion/styled';

import { motion } from 'framer-motion';

import type { PublicPartnerBrandItem, PublicPartnerBrandItemMeta } from '../../../../shared/api/partners';
import NextImage from '../../../../shared/components/NextImage';
import ColorSet from '../../../../shared/constant/colorset';
import { BASE_BREAK_POINT } from '../../constants';
import { brandListVariant } from '../../utils/motions';
import { useBrandList } from '../../hooks/useLorealQuery';

const Section = styled(motion.section)`
  margin-bottom: 24px;
  padding: 0 30px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    padding: 0 12px;
  }
`;

const BrandGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(26.666%, 1fr));
  grid-auto-rows: minmax(32.266vw, auto);
  row-gap: 8px;
  column-gap: 7px;
  transition: grid-template-columns 300ms ease-out;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    grid-auto-columns: minmax(100px, auto);
    grid-template-columns: repeat(4, minmax(100px, 1fr));
    grid-auto-rows: minmax(121px, auto);
    grid-gap: 8px;
  }
`;

const BrandGridItem = styled.li`
  background: ${ColorSet.kurlyWhite};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    width: 100px;
    height: 121px;
  }
`;

const BrandIconWrap = styled.div`
  padding-left: 13px;
  padding-right: 14px;
  width: 100%;
  height: 66.1175%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    height: 80px;
  }
`;

const BrandIcon = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BrandInnerContentDivider = styled.hr`
  border: none;
  height: 1px;
  width: 100%;
  background-color: ${ColorSet.bgLightGray};
`;

const BrandNameWrap = styled.div`
  height: 33.05785%;
  overflow: hidden;
  padding: 6px 12px;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${ColorSet.kurlyGray600};
  padding-inline-start: 14px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    height: 40px;
    letter-spacing: -0.5px;
    font-size: 12px;
  }
`;

const BrandListSection = () => {
  const { brandList } = useBrandList();

  if (isEmpty(brandList)) {
    return null;
  }

  const renderBrandImage = (name: PublicPartnerBrandItem['name'], meta: PublicPartnerBrandItemMeta) => {
    if (isEmpty(name) || isEmpty(meta) || isEmpty(meta.imageUrl)) {
      return null;
    }
    const { imageUrl } = meta;
    return (
      <BrandIcon>
        <NextImage src={imageUrl} layout="fill" objectFit="contain" alt={name} unoptimized disableImageDrag />
      </BrandIcon>
    );
  };
  return (
    <Section initial="initial" animate="animate" variants={brandListVariant}>
      <BrandGrid>
        {brandList.map((item, index) => {
          const { name, mappingKey, meta } = item;
          const key = `${mappingKey}-${index}`;
          return (
            <BrandGridItem key={key}>
              <BrandIconWrap>{renderBrandImage(name, meta)}</BrandIconWrap>
              <BrandInnerContentDivider />
              <BrandNameWrap>{name}</BrandNameWrap>
            </BrandGridItem>
          );
        })}
      </BrandGrid>
    </Section>
  );
};

export default BrandListSection;
