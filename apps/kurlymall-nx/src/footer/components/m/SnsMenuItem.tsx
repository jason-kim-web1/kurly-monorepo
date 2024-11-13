import styled from '@emotion/styled';

import { SnsItem } from '../../content/footerInfo';

const Item = styled.li`
  flex: 0 0 25px;
  margin-right: 12px;
`;

const Image = styled.img`
  display: block;
  width: 25px;
  height: 25px;
`;

interface Props {
  menu: SnsItem;
}

export default function SnsListItem({ menu }: Props) {
  const { imgPc, link, title } = menu;

  return (
    <Item key={imgPc}>
      <a href={link} target="_blank" rel="noreferrer">
        <Image src={imgPc} alt={title} />
      </a>
    </Item>
  );
}
