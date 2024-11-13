import { Fragment, memo, useState } from 'react';

import { StyledNoticeWrapper } from '../shared/styled';
import { ContentBody } from '../shared/type';
import { isPC } from '../../../util/window/getDevice';

type NoticeProps = { notices?: ContentBody['notices']; hasFolding?: boolean };

function Notice({ notices, hasFolding = true }: NoticeProps) {
  const [isFolding, setIsFolding] = useState(true);

  if (!notices) return null;

  return (
    <StyledNoticeWrapper
      className={isPC ? 'pc' : 'mobile'}
      styles={notices.styles}
      hasFolding={hasFolding}
      isFolding={isFolding}
    >
      <button className="notice-title" onClick={() => setIsFolding(!isFolding)}>
        {notices.title}
      </button>
      <ul className="notices">
        {notices.list?.map(({ main, sub }) => (
          <Fragment key={main}>
            <li className="main" dangerouslySetInnerHTML={{ __html: main }} />
            {sub && sub.length > 0 ? (
              <ul className="sub">
                {sub?.map((s) => (
                  <li key={s} dangerouslySetInnerHTML={{ __html: s }} />
                ))}
              </ul>
            ) : null}
          </Fragment>
        ))}
      </ul>
    </StyledNoticeWrapper>
  );
}

export default memo(Notice);
