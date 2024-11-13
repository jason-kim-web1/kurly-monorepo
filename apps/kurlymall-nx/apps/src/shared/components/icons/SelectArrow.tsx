import styled from '@emotion/styled';

const Icon = styled.div({
  width: '40px',
  height: '40px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(https://res.kurly.com/mobile/service/goodsview/2011/ico_drop_up.svg)',
});

interface Props {
  className?: string;
}

export default function SelectArrow({ className }: Props) {
  return <Icon className={className} />;
}
