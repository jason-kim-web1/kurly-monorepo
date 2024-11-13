import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { SearchIcon } from '../../../shared/images';

import { MainSite } from '../../../main/interfaces/MainSection.interface';

const Container = styled.div`
  width: 100%;
  height: 62px;
  padding: 10px 16px;
  background-color: ${COLOR.kurlyWhite};
`;

const SearchFormContainer = styled.div`
  display: flex;
  height: 42px;
  border-radius: 6px;
  position: relative;
  align-items: center;
  background-color: ${COLOR.bg};
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  letter-spacing: -0.05em;
  background-color: ${COLOR.bg};
  padding-right: 40px;
  caret-color: ${COLOR.kurlyPurple};

  ::placeholder {
    color: ${COLOR.kurlyGray450};
    opacity: 1;
  }
`;

const SearchButton = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  margin: 12px 8px 12px 6px;
  background: url(${SearchIcon}) 50% 50% no-repeat;
  background-size: 20px 20px;
`;

interface Props {
  site: MainSite;
  onFocusEvent(value: boolean): void;
}

export default function SearchFormBefore({ site, onFocusEvent }: Props) {
  const placeholder = site === 'MARKET' ? '검색어를 입력해 주세요' : '뷰티 상품을 검색하세요';

  return (
    <Container>
      <SearchFormContainer>
        <SearchButton />
        <Input placeholder={placeholder} onFocus={() => onFocusEvent(true)} onBlur={() => onFocusEvent(false)} />
      </SearchFormContainer>
    </Container>
  );
}
