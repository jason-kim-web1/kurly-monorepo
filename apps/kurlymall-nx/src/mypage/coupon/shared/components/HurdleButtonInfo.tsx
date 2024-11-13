import { Typography } from '@thefarmersfront/kpds-react';

interface Props {
  name: string;
}

export default function HurdleButtonInfo({ name }: Props) {
  return (
    <div>
      <Typography variant="$largeSemibold" className="name">
        {name}
      </Typography>
      <Typography variant="$largeRegular" className="text">
        해당 상품 주문 시 쿠폰을 사용하실 수 있으며, 쿠폰 할인은 하단의 쿠폰 적용대상에 적용됩니다.
      </Typography>
    </div>
  );
}
