import { HeaderSearchIcon, Search30x30x333 } from '../../images';

import Icon from './Icon';

interface Props {
  className?: string;
  color?: string;
}

export default function SearchIcon({ className, color }: Props) {
  return <Icon className={className} src={color ? Search30x30x333 : HeaderSearchIcon} alt="검색 아이콘" />;
}
