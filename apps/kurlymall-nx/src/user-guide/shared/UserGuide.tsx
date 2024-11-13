import UserGuideItem from './UserGuideItem';
import { guideItemList } from './content/userGuideItems';

export default function UserGuide() {
  return (
    <>
      {guideItemList.map(({ title, iconSrc, iconAltText, content, description }) => (
        <div key={title} className="wrapper">
          <div className="section">
            <UserGuideItem
              title={title}
              iconSrc={iconSrc}
              iconAltText={iconAltText}
              content={content}
              description={description}
            />
          </div>
        </div>
      ))}
    </>
  );
}
