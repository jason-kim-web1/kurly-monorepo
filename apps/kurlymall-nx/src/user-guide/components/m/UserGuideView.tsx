import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import UserGuide from '../../shared/UserGuide';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto;
  padding-top: 10px;
  justify-content: space-between;

  .wrapper {
    background-color: ${COLOR.kurlyWhite};
    padding: 20px;
    margin: 0 0 8px;
    width: 100%;
  }

  .title {
    font-weight: 700;
    font-size: 18px;
    color: ${COLOR.kurlyGray800};
    line-height: 24px;
  }

  .icon {
    display: none;
  }

  .content {
    padding-top: 10px;
    color: ${COLOR.kurlyGray700};
    line-height: 20px;

    .highlighted {
      font-weight: 700;
    }

    .arrow {
      width: 7px;
      height: auto;
      margin: 4px 2px 0;
      vertical-align: top;
    }
  }

  .description {
    padding-top: 15px;
    color: ${COLOR.kurlyGray450};
    font-size: 12px;
    line-height: 16px;
  }
`;

export default function UserGuideView() {
  return (
    <Container>
      <UserGuide />
    </Container>
  );
}
