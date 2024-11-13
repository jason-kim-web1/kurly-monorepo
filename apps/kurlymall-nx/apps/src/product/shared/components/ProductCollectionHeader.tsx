import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { eq, isEmpty } from 'lodash';

import { useProductCollectionGroupAmplitudeEvents } from '../providers/ProductCollectionGroupAmplitudePropertyProvider';
import { useAppSelector } from '../../../shared/store';
import { getSearchParamsString } from '../../../shared/utils/queryStringSiteConverter';

interface Props {
  code: string;
  title: string;
  subtitle?: string;
}

const InfoWrap = styled.div<{ onlyTitle: boolean }>`
  display: flex;
  padding: ${({ onlyTitle }) =>
    onlyTitle
      ? `${vars.spacing.$4} ${vars.spacing.$16} ${vars.spacing.$4} ${vars.spacing.$20}`
      : `0 ${vars.spacing.$16} 0 ${vars.spacing.$20}`};
  gap: ${vars.spacing.$16};
  align-items: center;
`;

const TitleWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: ${vars.spacing.$2};
`;

const Heading = styled.h2`
  overflow: hidden;
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TitleText = styled(Typography)`
  color: ${vars.color.text.$primary} !important;
`;

const SubTitle = styled(Typography)`
  color: ${vars.color.text.$tertiary} !important;
  overflow-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ButtonWrap = styled.div`
  flex: 0 0 auto;
  min-width: 0;
`;

const ButtonAll = styled.button`
  font-family: ${vars.font.body};
  border: solid 1px ${vars.color.$gray200};
  background-color: ${vars.color.$whiteInverse};
  color: ${vars.color.$gray900};
  padding: ${vars.spacing.$6} ${vars.spacing.$12};
  border-radius: 16px;
  white-space: nowrap;
  transition: background-color 0.2s ease-out;
  font-weight: ${vars.fontWeight.$regular};
  line-height: ${vars.lineHeight.$18};

  &:active,
  &:hover {
    background-color: ${vars.color.$gray50};
  }
`;

const ProductCollectionHeader = ({ code, title, subtitle }: Props) => {
  const site = useAppSelector(({ main }) => main.site);
  const link = `/collections/${code}${getSearchParamsString({ site: eq(site, 'BEAUTY') ? site.toLowerCase() : null })}`;

  const router = useRouter();
  const { handleSelectCollection } = useProductCollectionGroupAmplitudeEvents();

  const handleClickMore = () => {
    handleSelectCollection({
      selectionType: 'title',
      collectionId: code,
    });

    void router.push(link);
  };

  return (
    <InfoWrap onlyTitle={isEmpty(subtitle)}>
      <TitleWrap>
        <Heading>
          <TitleText variant={'$xxlargeSemibold'} as={'span'}>
            {title}
          </TitleText>
        </Heading>
        <SubTitle variant={'$largeRegular'}>{subtitle}</SubTitle>
      </TitleWrap>
      <ButtonWrap>
        <Link href={link} passHref>
          <ButtonAll onClick={handleClickMore}>전체보기</ButtonAll>
        </Link>
      </ButtonWrap>
    </InfoWrap>
  );
};

export { ProductCollectionHeader };
