import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';
import { CAUTION_CONTENT } from '../../../../productsDetail/constants';

const Container = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR.kurlyGray450};
  cursor: pointer;
  > .row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    > .title-text {
      font-weight: 700;
      color: ${COLOR.kurlyGray450};
      margin-bottom: 8px;
    }
    > .description-list {
      > li {
        padding-left: 10px;
        font-weight: 400;
        letter-spacing: 0;
        margin-bottom: 4px;
        &:last-child {
          margin-bottom: 0;
        }
        &::before {
          overflow: hidden;
          display: inline-block;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: ${COLOR.kurlyGray450};
          margin: 8px 7px 0 -9px;
          content: '';
          vertical-align: top;
        }
      }
    }
    > .caution-text {
      margin-top: 4px;
      letter-spacing: 0;
      color: ${COLOR.invalidRed};
    }
  }
`;

const TextAreaPlaceHolder = () => (
  <Container>
    {CAUTION_CONTENT.map((dataItem, dataIndex) => {
      const { title, descriptions, cautionText } = dataItem;
      return (
        <div key={dataIndex} className="row">
          <p className="title-text">{title}</p>
          <ul className="description-list">
            {descriptions.map((descriptionItem, descriptionIndex) => (
              <li key={descriptionIndex}>{descriptionItem}</li>
            ))}
          </ul>
          {cautionText ? <p className="caution-text">{`※ ${cautionText}`}</p> : null}
        </div>
      );
    })}
  </Container>
);

export default TextAreaPlaceHolder;
