import Lottie from 'react-lottie-player';
import styled from '@emotion/styled';

import { Asset } from '../../../interfaces/EventConfig';
import NextImage from '../../NextImage';

interface Props {
  type: Asset['type'];
  url: Asset['url'];
}

const Wrapper = styled.div`
  div {
    width: 100px;
    height: 44px;
  }
`;

const SeasonalLogo = ({ type, url }: Props) => {
  if (type === 'lottie') {
    return (
      <Wrapper>
        <Lottie loop play path={url} />
      </Wrapper>
    );
  }
  return <NextImage src={url} width={58} height={30} alt="시즈널이벤트 로고" />;
};

export default SeasonalLogo;
