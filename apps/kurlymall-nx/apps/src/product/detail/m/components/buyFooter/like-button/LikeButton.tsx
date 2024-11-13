import { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import Lottie from 'react-lottie-player';

import COLOR from '../../../../../../shared/constant/colorset';

import usePickProduct from '../../../../hooks/usePickProduct';

import * as ActiveLikeLottie from './activeLikeLottie.json';
import * as UnActiveLikeLottie from './unActiveLikeLottie.json';
import { MobileLikeOn, MobileLikeOff } from '../../../../../../shared/images';
import { useAppSelector } from '../../../../../../shared/store';

const Button = styled.button`
  width: 54px;
  height: 52px;
  padding: 10px;
  border-radius: 6px;
  border: solid 1px ${COLOR.kurlyGray250};
  background-color: ${COLOR.kurlyWhite};
`;

const DefaultLikeIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const styles = {
  lottie: {
    width: '100%',
    height: '100%',
  },
};

interface Props {
  isReferrerReviewDetail?: boolean;
}

export default function LikeButton({ isReferrerReviewDetail }: Props) {
  const { isGuest } = useAppSelector(({ auth }) => auth);

  const { isActiveLike, toggleLike } = usePickProduct(isReferrerReviewDetail);

  const [playLottie, setPlayLottie] = useState(false);

  const lottieOption = {
    loop: false,
    play: true,
    animationData: isActiveLike ? ActiveLikeLottie : UnActiveLikeLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const onClickLike = useCallback(() => {
    if (!isGuest && !playLottie) {
      setTimeout(() => {
        setPlayLottie(true);
      }, 120);
    }

    toggleLike();
  }, [isGuest, playLottie, toggleLike]);

  return (
    <Button onClick={onClickLike}>
      {playLottie ? (
        <Lottie {...lottieOption} style={styles.lottie} />
      ) : (
        <DefaultLikeIcon src={isActiveLike ? MobileLikeOn : MobileLikeOff} />
      )}
    </Button>
  );
}
