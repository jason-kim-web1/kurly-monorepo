import { css } from '@emotion/css';

import type { NoResultInfoSectionViewModel } from '../../factory';
import { Section } from '../../shared/components/Section';
import COLOR from '../../../../../shared/constant/colorset';

const sectionStyle = css`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const titleStyle = css`
  color: ${COLOR.kurlyGray800};
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 23px;
`;

const descriptionStyle = css`
  color: ${COLOR.kurlyGray400};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
`;

type Props = {
  section: NoResultInfoSectionViewModel;
};

const NoResultInfoSection = ({ section }: Props) => {
  const {
    _type,
    data: { headerDescription, footerDescription },
  } = section;
  return (
    <Section type={_type} className={sectionStyle}>
      <h3 className={titleStyle}>{headerDescription}</h3>
      <p className={descriptionStyle}>{footerDescription}</p>
    </Section>
  );
};

export { NoResultInfoSection };
