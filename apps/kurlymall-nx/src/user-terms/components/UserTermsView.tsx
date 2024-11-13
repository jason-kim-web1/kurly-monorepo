import { useState, useEffect, useCallback } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../shared/constant/colorset';
import RawHTML from '../../shared/components/layouts/RawHTML';
import Alert from '../../shared/components/Alert/Alert';
import { MemberPartners } from '../../shared/interfaces/UserTerms';
import { fetchThirdPartyTerms } from '../../shared/api/user-terms/terms';

const MobileContainer = styled.div`
  counter-reset: section;
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  line-height: 1.5;
  letter-spacing: 0;
  h3 {
    padding: 20px;
    font-weight: 400;
    font-size: 14px;
    background-color: ${COLOR.kurlyWhite};
  }
  h4 {
    padding: 10px 10px 10px 20px;
    border-top: 10px solid ${COLOR.bgLightGray};
    background-color: ${COLOR.kurlyWhite};
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    :before {
      counter-increment: section;
      content: '제' counter(section) '장';
      display: inline-block;
      padding-right: 20px;
      font-weight: 400;
      color: ${COLOR.kurlyGray600};
      vertical-align: top;
    }
  }
  table {
    width: 100%;
    margin: 10px 0;
    font-size: 12px;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid ${COLOR.kurlyGray350};
  }
  th {
    padding: 5px;
    border: 1px solid ${COLOR.kurlyGray350};
    border-bottom: 0;
    background-color: ${COLOR.bg};
  }
  td {
    padding: 5px;
    border: 1px solid ${COLOR.kurlyGray350};
    border-bottom: none;
    background-color: ${COLOR.kurlyWhite};
    text-align: center;
    li {
      font-weight: 600;
      text-decoration: underline;
    }
  }
  hr {
    border: none;
    height: 24px;
  }
  .box {
    padding: 0 20px 10px;
    background-color: ${COLOR.kurlyWhite};

    > hr:first-of-type {
      height: 0;
    }
  }
  .no_border {
    border-top: none;
  }
`;

const PcContainer = styled.div`
  counter-reset: section;
  width: 1050px;
  margin: 0 auto;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0;

  & > div {
    background-color: ${COLOR.kurlyWhite};
  }
  h3 {
    padding: 10px;
    border-bottom: 50px solid ${COLOR.bgLightGray};
    font-weight: 400;
    font-size: 14px;
  }
  h4 {
    padding: 10px;
    border-top: 10px solid ${COLOR.bgLightGray};
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    :before {
      counter-increment: section;
      content: '제' counter(section) '장';
      display: inline-block;
      padding-right: 20px;
      font-weight: 400;
      color: ${COLOR.kurlyGray600};
      vertical-align: top;
    }
  }
  table {
    width: 100%;
    margin: 15px 0;
    font-size: 16px;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid ${COLOR.bg};
  }
  th {
    padding: 9px 5px;
    background-color: ${COLOR.bgLightGray};
    border: 1px solid ${COLOR.bg};
    border-bottom: 0;
    font-size: 12px;
    white-space: nowrap;
  }
  td {
    padding: 8px 5px;
    border: 1px solid ${COLOR.bg};
    border-bottom: none;
    background-color: ${COLOR.kurlyWhite};
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    li {
      font-weight: 500;
      text-decoration: underline;
    }
  }
  hr {
    border: none;
    height: 24px;
  }
  .box {
    padding: 10px;
    border-top: 1px solid ${COLOR.bg};
  }
  .no_border {
    border-top: none;
  }
`;

interface Props {
  html: string;
  isMobile?: boolean;
}

export default function UserTermsView({ isMobile = false, html }: Props) {
  const [isLoad, setIsLoad] = useState(false);
  const [thirdParty, setThirdParty] = useState<MemberPartners[]>([]);

  const Container = isMobile ? MobileContainer : PcContainer;

  const getThirdPartys = useCallback(async () => {
    const data = await fetchThirdPartyTerms();
    setThirdParty(data);
  }, []);

  useEffect(() => {
    void getThirdPartys();
  }, [getThirdPartys]);

  const handleThirdPartyView = useCallback(async () => {
    const thirdPartyCompany = thirdParty.map(({ partnerStoreName }) => partnerStoreName);
    const itemText = thirdPartyCompany.join(', ');
    await Alert({
      text: itemText,
    });
  }, [thirdParty]);

  const convertThirdParty = (name: string) => {
    return `<a href="#none" class="third_party">${name}</a>`;
  };

  const customizeHtml = html
    .replace(/ data-tomark-pass=\"\"/gi, '')
    .replace(/(<\/h4>)/gi, '</h4><div class="box">')
    .replace(/(<h4)/g, '</div><h4')
    .replace(/(<\/div><h4)/, '<h4')
    .replace(/(<td><\/td>)/gi, '<td class="no_border"></td>')
    .replace(/(상품 및 서비스 제공업체)/, convertThirdParty('상품 및 서비스 제공업체'));

  useEffect(() => {
    const thirdParties = document.querySelector('.third_party');

    if (!isLoad && !!thirdParties) {
      setIsLoad(true);
      return;
    }

    thirdParties?.addEventListener('click', (event) => {
      event.preventDefault();
      void handleThirdPartyView();
    });
  }, [isLoad, customizeHtml, handleThirdPartyView]);

  return (
    <Container>
      <RawHTML html={customizeHtml} />
    </Container>
  );
}
