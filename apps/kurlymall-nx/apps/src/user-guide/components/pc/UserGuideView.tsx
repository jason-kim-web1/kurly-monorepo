import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import UserGuide from '../../shared/UserGuide';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 960px;
  margin: 0 auto;
  padding-top: 100px;
  justify-content: space-between;

  .wrapper {
    display: flex;
    flex-basis: 470px;
    flex-shrink: 0;
    flex-direction: column;
  }

  .section {
    background-color: ${COLOR.kurlyWhite};
    height: 380px;
    padding: 58px 0 0 60px;
    margin-bottom: 20px;
  }

  .itemWrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 13px;
  }

  .title {
    font-weight: 500;
    font-size: 24px;
    color: ${COLOR.kurlyGray800};
    line-height: 36px;
  }

  .icon {
    width: 135px;
    margin-top: -28px;
    margin-right: 30px;
  }

  .content {
    padding-bottom: 31px;
    width: 370px;
    color: ${COLOR.kurlyGray700};
    line-height: 27px;
    font-size: 18px;

    .highlighted {
      font-weight: 500;
    }

    .arrow {
      width: 7px;
      height: auto;
      margin: 7px 3px 2px 4px;
      vertical-align: top;
    }
  }

  .description {
    color: ${COLOR.kurlyGray450};
    font-size: 14px;
    line-height: 18px;
  }
`;

export default function UserGuideView() {
  return (
    <Container>
      <UserGuide />
    </Container>
  );
}
