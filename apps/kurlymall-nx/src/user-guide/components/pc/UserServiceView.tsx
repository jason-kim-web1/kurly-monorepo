import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import { PurpleArrowRight } from '../../../shared/images';
import { serviceItemList } from '../../shared/content/userServiceItems';

const UserServiceContainer = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  padding: 30px 0 50px 45px;

  .wrapper {
    width: 470px;
    margin-right: 20px;
  }

  .description {
    line-height: 16px;
    color: ${COLOR.kurlyGray600};
    padding-bottom: 10px;
  }

  .link {
    padding-right: 11px;
    background: url(${PurpleArrowRight}) no-repeat 100%;
    background-size: 8px 12px;
    color: ${COLOR.kurlyPurple};
  }
`;

export default function UserServiceView() {
  return (
    <UserServiceContainer>
      {serviceItemList.map(({ description, pageName, link }) => (
        <div key={description} className="wrapper">
          <p className="description">{description}</p>
          <span className="link">
            <a href={link.pc}>{pageName}</a>
          </span>
        </div>
      ))}
    </UserServiceContainer>
  );
}
