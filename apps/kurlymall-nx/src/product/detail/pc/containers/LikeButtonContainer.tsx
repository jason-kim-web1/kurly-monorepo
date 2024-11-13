import { LikeOn, LikeOff } from '../../../../shared/images';

import Button from '../../../../shared/components/Button/Button';
import usePickProduct from '../../hooks/usePickProduct';

export default function LikeButtonContainer() {
  const { isActiveLike, toggleLike } = usePickProduct();

  return (
    <Button
      theme="tertiary"
      text=""
      width={56}
      height={56}
      radius={3}
      styleIcon={{ src: isActiveLike ? LikeOn : LikeOff }}
      onClick={toggleLike}
    />
  );
}
