import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { isPC } from '../../../../util/window/getDevice';

import SkeletonLoading from '../../../shared/components/Loading/SkeletonLoading';
import { fadeVariant } from '../../../shared/styles/motions';
import Repeat from '../../../shared/components/Repeat';

const Event = styled.div`
  width: ${isPC ? '1050px' : '100%'};
  margin: 0 auto 10px;
  height: ${isPC ? '200px' : '37.5vw'};
  > div > span {
    height: 100%;
  }
`;

function LoadingEventItem() {
  return (
    <Event>
      <SkeletonLoading width={1050} />
    </Event>
  );
}

const Container = styled(motion.div)`
  padding-top: ${isPC ? 0 : '44px'};
`;

export default function LoadingEvent() {
  return (
    <Container initial="initial" animate="animate" exit="exit" variants={fadeVariant}>
      <Repeat count={10}>
        <LoadingEventItem />
      </Repeat>
    </Container>
  );
}
