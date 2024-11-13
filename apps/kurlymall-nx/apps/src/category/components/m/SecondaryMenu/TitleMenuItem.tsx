import Link from 'next/link';
import styled from '@emotion/styled';

import { Typography } from '@thefarmersfront/kpds-react';

import { css } from '@emotion/react';

import { vars } from '@thefarmersfront/kpds-css';

import { PrimaryCategory } from '../../../../shared/reducers/category';
import { IconArrowRight16x16, NoMainImageLogo } from '../../../../shared/images';
import NextImage from '../../../../shared/components/NextImage';

interface Props extends Pick<PrimaryCategory, 'isNew' | 'name'> {
  link: string;
  icon: PrimaryCategory['mobileIconV2Url'];
  onClick: () => void;
}

const Wrapper = styled.div`
  padding: 0.5rem 0 0.5rem 0.375rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${vars.color.background.$background1};
  transition: background-color 0.2s ease-out;
  justify-content: space-between;

  &:active {
    background-color: ${vars.color.main.$secondaryContainer};
  }
`;

const Text = styled(Typography)`
  flex: 1;
  min-width: 0;
  color: ${vars.color.text.$primary};
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const IconImage = styled(NextImage)`
  flex: 0;
`;

const IconWrapper = styled.div`
  display: block;
  flex: 0 0 ${vars.spacing.$32};
  width: ${vars.spacing.$32};
  height: ${vars.spacing.$32};
  border-radius: 50%;
`;

const linkStyle = css`
  display: block;

  :not(:last-of-type) {
    margin-bottom: ${vars.spacing.$4};
  }
`;

const RoundIconImage = styled(IconImage)`
  background-color: ${vars.color.background.$background3};
  border-radius: 50%;
`;

export default function TitleMenuItem({ name, link, icon, onClick }: Props) {
  return (
    <Link href={link} passHref>
      <a href={link} onClick={onClick} css={linkStyle}>
        <Wrapper>
          <IconWrapper>
            <RoundIconImage src={icon || NoMainImageLogo} alt={''} width={32} height={32} objectFit={'fill'} />
          </IconWrapper>

          <Text variant={'$xxlargeSemibold'}>{name}</Text>
          <IconImage src={IconArrowRight16x16} alt={''} width={16} height={16} objectFit={'fill'} />
        </Wrapper>
      </a>
    </Link>
  );
}
