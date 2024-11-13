import { css } from '@emotion/css';
import { chain } from 'lodash';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { KeywordConvertInfoSectionViewModel } from '../../factory';
import { ImpressionSection } from '../../shared/components/ImpressionSection';
import { useSearchData } from '../../../../contexts/SearchDataProvider';
import { getKeywordToShow } from '../../../../shared/utils/getKeywordToShow';
import { isNotEmpty } from '../../../../../shared/utils/lodash-extends';
import { getQvtQuery } from '../../../../shared/utils/getQvtQuery';
import COLOR from '../../../../../shared/constant/colorset';

const sectionStyle = css`
  padding: 12px 20px 16px;
`;

const messageStyle = css`
  padding-bottom: 4px;
  line-height: 19px;
`;

const textBoldStyle = css`
  font-weight: 600;
`;

const textPurpleStyle = css`
  color: ${COLOR.loversLavender};
`;

const anchorStyle = css`
  font-size: 13px;
  line-height: 18px;
  text-decoration: underline;
  color: ${COLOR.kurlyGray450};
`;

type Props = {
  section: KeywordConvertInfoSectionViewModel;
};

const KeywordConvertInfoSection = ({ section }: Props) => {
  const { pathname } = useRouter();
  const { site, searchKeyword } = useSearchData();
  const { data } = section;
  const { headerKeyword, headerDescription, footerKeyword, footerDescription } = data;
  const actualHeaderKeyword = getKeywordToShow(headerKeyword);
  const actualFooterKeyword = footerKeyword ? getKeywordToShow(footerKeyword) : '';
  const shouldRenderFooterKeyword = isNotEmpty(footerKeyword);
  const qvtHref = useMemo(() => {
    const query = getQvtQuery({ sword: searchKeyword, site });
    const queryString = chain(query)
      .entries()
      .filter(([, v]) => isNotEmpty(v))
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
      .value();
    return `${pathname}?${queryString}`;
  }, [pathname, searchKeyword, site]);

  return (
    <ImpressionSection section={section} className={sectionStyle}>
      <p className={messageStyle}>
        <span className={[textBoldStyle, textPurpleStyle].join(' ')}>{actualHeaderKeyword}</span>
        {headerDescription}
      </p>
      {shouldRenderFooterKeyword ? (
        <Link href={qvtHref} prefetch={false} passHref>
          <a href={qvtHref} className={anchorStyle}>
            <span className={textBoldStyle}>{actualFooterKeyword}</span>
            {footerDescription}
          </a>
        </Link>
      ) : (
        <p className={messageStyle}>{footerDescription}</p>
      )}
    </ImpressionSection>
  );
};

export { KeywordConvertInfoSection };
