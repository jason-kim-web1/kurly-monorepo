import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Icon, Typography } from '@thefarmersfront/kpds-react';

import { useAppSelector } from '../../../../shared/store';
import useCurrentAddressQuery from '../../queries/useCurrentAddressQuery';
import usePcCartAddress from '../../hooks/usePcCartAddress';
import Star from '../../../../shared/icons/kpds/Bullet/Star';
import AddressContents from '../Address/AddressContents';

const Wrapper = styled.div`
  padding: ${vars.spacing.$20} ${vars.spacing.$20} 36px ${vars.spacing.$20};
  background-color: ${vars.color.background.$background1};
  border-radius: ${vars.radius.$16};
  margin-bottom: ${vars.spacing.$16};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${vars.spacing.$16};

  p {
    margin-left: ${vars.spacing.$4};
  }
`;

const Contents = styled.button`
  width: 100%;
  text-align: left;
`;

const DeliveryNoticeMessage = styled(Typography)`
  margin-top: ${vars.spacing.$8};
  display: flex;
  align-items: center;
  color: ${vars.color.text.$tertiary};

  svg {
    margin-right: ${vars.spacing.$2};
  }
`;

export default function Address() {
  const { hasSession, isGuest } = useAppSelector(({ auth }) => ({
    isGuest: auth.isGuest,
    hasSession: auth.hasSession,
  }));
  const { isLoading } = useCurrentAddressQuery();
  const { deliveryNoticeText, handleClickCartAddress } = usePcCartAddress();

  if (isGuest || isLoading || !hasSession) {
    return null;
  }

  return (
    <Wrapper>
      <Title>
        <Icon type="Location" size={20} ratio="1:1" fill={vars.color.main.$secondary} style="stroke" />
        <Typography variant={'$xxlargeSemibold'}>배송지</Typography>
      </Title>
      <Contents onClick={handleClickCartAddress}>
        <AddressContents />
        {deliveryNoticeText && (
          <DeliveryNoticeMessage variant={'$largeRegular'}>
            <Star fill={vars.color.text.$tertiary} />
            {deliveryNoticeText}
          </DeliveryNoticeMessage>
        )}
      </Contents>
    </Wrapper>
  );
}
