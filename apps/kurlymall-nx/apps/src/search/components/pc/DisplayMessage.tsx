import styled from '@emotion/styled';

import { RefObject } from 'react';

import { useRouter } from 'next/router';

import Link from 'next/link';

import type {
  AlternativeSuggestion,
  DisplayMessageContent,
  SpellingCorrection,
  DisplayMessage as DisplayMessageType,
} from '../../shared/types';
import COLOR from '../../../shared/constant/colorset';
import { DEFAULT_SEARCH_DESCRIPTION } from '../../shared/constants';
import { getKeywordToShow } from '../../shared/utils/getKeywordToShow';
import { useSearchData } from '../../contexts/SearchDataProvider';
import { getQvtQuery } from '../../shared/utils/getQvtQuery';

const TitleWrapper = styled.div`
  margin-top: 50px;
  text-align: center;
`;

const TitleHeader = styled.h1`
  font-size: 28px;
  line-height: 35px;
  letter-spacing: -0.5px;
`;

const KeywordWrapper = styled.div`
  max-width: 840px;
  display: inline-block;
  vertical-align: top;
`;

const Keyword = styled.span`
  font-weight: 500;
  color: ${COLOR.kurlyPurple};

  &.footer {
    text-decoration: underline;
    color: ${COLOR.kurlyGray450};
  }
`;

const Description = styled.span`
  font-weight: 400;
`;

const TitleFooter = styled.span`
  display: inline-block;
  font-size: 15px;
  line-height: 21px;
  margin-top: 10px;
`;

const TitleFooterLink = styled.a`
  display: inline-block;
  font-size: 15px;
  line-height: 21px;
  margin-top: 10px;
  color: ${COLOR.kurlyGray450};
  cursor: pointer;
  text-decoration: underline;
`;

interface HeaderProps extends DisplayMessageContent {
  headerRef: RefObject<HTMLHeadingElement>;
}

const HeaderDisplayMessage = ({ headerRef, keyword, description }: HeaderProps) => {
  const displayedHeaderKeyword = getKeywordToShow(keyword);

  return (
    <TitleHeader ref={headerRef}>
      {"'"}
      <KeywordWrapper>
        <Keyword>{displayedHeaderKeyword}</Keyword>
      </KeywordWrapper>
      {"'"}
      <Description>{description}</Description>
    </TitleHeader>
  );
};

const SpellingCorrectionFooter = ({
  footer,
  searchKeyword,
}: Pick<SpellingCorrection, 'footer'> & { searchKeyword: string }) => {
  const router = useRouter();
  const { pathname } = router;
  const { keyword, description } = footer;
  const displayedFooterKeyword = getKeywordToShow(keyword);
  const { site } = useSearchData();

  return (
    <Link
      href={{
        pathname,
        query: getQvtQuery({ sword: searchKeyword, site }),
      }}
      prefetch={false}
      passHref
    >
      <TitleFooterLink>
        <KeywordWrapper>
          <Keyword className="footer">{displayedFooterKeyword}</Keyword>
        </KeywordWrapper>
        <Description>{description}</Description>
      </TitleFooterLink>
    </Link>
  );
};

const AlternativeSuggestionFooter = ({ footer }: Pick<AlternativeSuggestion, 'footer'>) => {
  const { description } = footer;

  return <TitleFooter>{description}</TitleFooter>;
};

interface Props {
  displayMessage?: DisplayMessageType;
  searchKeyword: string;
  headerRef: RefObject<HTMLHeadingElement>;
}

export const DisplayMessage = ({ displayMessage, searchKeyword, headerRef }: Props) => {
  if (!displayMessage) {
    const displayedKeyword = getKeywordToShow(searchKeyword);

    return (
      <TitleWrapper>
        <HeaderDisplayMessage
          headerRef={headerRef}
          keyword={displayedKeyword}
          description={DEFAULT_SEARCH_DESCRIPTION}
        />
      </TitleWrapper>
    );
  }

  if (displayMessage.type === 'SPELLING_CORRECTION') {
    const {
      header: { keyword: headerKeyword, description: headerDescription },
      footer,
    } = displayMessage;

    return (
      <TitleWrapper>
        <HeaderDisplayMessage headerRef={headerRef} keyword={headerKeyword} description={headerDescription} />
        <SpellingCorrectionFooter footer={footer} searchKeyword={searchKeyword} />
      </TitleWrapper>
    );
  }

  if (displayMessage.type === 'ALTERNATIVE_SUGGESTION') {
    const {
      header: { keyword: headerKeyword, description: headerDescription },
      footer,
    } = displayMessage;

    return (
      <TitleWrapper>
        <HeaderDisplayMessage headerRef={headerRef} keyword={headerKeyword} description={headerDescription} />
        <AlternativeSuggestionFooter footer={footer} />
      </TitleWrapper>
    );
  }

  return null;
};
