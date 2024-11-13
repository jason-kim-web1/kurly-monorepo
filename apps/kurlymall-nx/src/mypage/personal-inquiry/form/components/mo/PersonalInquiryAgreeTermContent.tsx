import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import { inquiryTitle, warningArray, noticeArray } from '../../shared/constants/inquiry-text';

const Content = styled.div`
  margin-top: 5px;
  font-family: SFProText, sans-serif;
  font-size: 0.938rem;
`;

const Title = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
  padding-bottom: 1.25rem;
`;

const Item = styled.div`
  padding-bottom: 1rem;
  span {
    color: ${COLOR.kurlyGray600};
    line-height: 20px;
  }
  > .item-title {
    font-size: 1rem;
    font-weight: 600;
    color: ${COLOR.kurlyGray800};
  }
  ul {
    padding-left: 1rem;
    padding-top: 1rem;
    position: relative;
    > li {
      list-style: none;
      padding-bottom: 0.5rem;
      &.style-none {
        list-style: none;
      }
      :before {
        position: absolute;
        content: '•';
        left: 0;
        color: ${COLOR.kurlyGray600};
      }
    }
  }
`;

const Warning = styled.div`
  display: flex;
  padding-bottom: 1.25rem;
  span {
    color: ${COLOR.invalidRed};
  }
  > .prefix {
    margin-right: .5rem;
  },
`;

export default function PersonalInquiryAgreeTermContent() {
  return (
    <Content>
      {inquiryTitle && <Title>{inquiryTitle}</Title>}
      {warningArray?.map(({ text }) => (
        <Warning key={text}>
          <span className="prefix"> ※ </span>
          <span>{text}</span>
        </Warning>
      ))}
      {noticeArray?.map(({ title, content }) => (
        <Item key={title}>
          <span className="item-title">{title}</span>
          <ul>
            {content.map((item) => (
              <li key={item}>
                <span className="item-content">{item}</span>
              </li>
            ))}
          </ul>
        </Item>
      ))}
    </Content>
  );
}
