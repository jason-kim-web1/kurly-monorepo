import { isEmpty } from 'lodash';

import RawHTML from '../../shared/components/layouts/RawHTML';

interface Props {
  title: string;
  iconSrc?: string;
  iconAltText?: string;
  content: string;
  description?: string;
}

export default function UserGuideItem({ title, iconSrc, iconAltText, content, description }: Props) {
  return (
    <div>
      <div className="itemWrapper">
        <span className="title">{title}</span>
        <img src={iconSrc} alt={iconAltText} className="icon" />
      </div>
      <div className="content">
        <RawHTML html={content} />
      </div>
      {!isEmpty(description) && <p className="description">{description}</p>}
    </div>
  );
}
