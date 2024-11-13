import styled from '@emotion/styled';

import COLOR from '../../../../src/shared/constant/colorset';
import { useWebview } from '../../../../src/shared/hooks';

import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import UserTermsView from '../../../../src/user-terms/components/UserTermsView';
import SelectBox from '../../../../src/shared/components/Input/SelectBox';
import DeliveryLocationContainer from '../../../../src/header/containers/m/DeliveryLocationContainer';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import useUserTerms from '../../../../src/user-terms/hooks/useUserTerms';
import KurlyMembersTermsView from '../../../../src/user-terms/components/KurlyMembersTermsView';
import { TermsMap, termsArray, useScrollTerms } from '../../../../src/user-terms/hooks/useScrollTerms';

const Container = styled.div`
  margin: 0;
  padding-bottom: 10px 0 70px 0;
  background-color: ${COLOR.bg};
`;

const AgreementLayout = styled.div`
  padding: 10px 0 0 0;
  color: ${COLOR.kurlyGray800};
  line-height: 1.5;
  letter-spacing: 0;
`;

const SelectBoxLayout = styled.div`
  padding-bottom: 70px;
`;

const ScrollButtons = styled.div`
  padding: 0 18px;
  display: flex;
  gap: 20px;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;

  button {
    padding: 12px 0;
    color: ${COLOR.kurlyGray600};

    &.active {
      color: ${COLOR.loversPurple};
      border-bottom: 2px solid ${COLOR.loversPurple};
    }
  }
`;

const ViewTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  text-align: left;

  padding: 18px 20px;
  width: 100%;

  background-color: ${COLOR.kurlyWhite};
`;

export default function AgreementPage() {
  const webview = useWebview();
  const { details, value, options, handleChange, kurlyMembersTerms } = useUserTerms('agreement');

  const { activeTerms, scrollToTerms } = useScrollTerms({ headerHeight: 34 });

  return (
    <>
      {!webview && (
        <>
          <MobileHeader>
            <HeaderButtons position="left">
              <BackButton />
            </HeaderButtons>
            <HeaderTitle>이용약관</HeaderTitle>
            <HeaderButtons position="right">
              <DeliveryLocationContainer />
              <CartButtonContainer />
            </HeaderButtons>
          </MobileHeader>
          <UserMenu isGutter={false} />
        </>
      )}
      <ScrollButtons>
        {termsArray.map(({ title, id }) => (
          <button className={activeTerms === id ? 'active' : ''} onClick={scrollToTerms(id)} key={id}>
            {title}
          </button>
        ))}
      </ScrollButtons>
      <Container>
        {termsArray.map(({ title, id }) => {
          const child =
            id === TermsMap.User ? (
              <UserTermsView isMobile html={details ?? ''} />
            ) : (
              <KurlyMembersTermsView isMobile html={kurlyMembersTerms} />
            );

          return (
            <AgreementLayout id={id} key={id}>
              <ViewTitle>{title}</ViewTitle>
              {child}
            </AgreementLayout>
          );
        })}
        <SelectBoxLayout>
          <SelectBox name="agreement" value={value ?? ''} options={options} onChange={handleChange} />
        </SelectBoxLayout>
      </Container>
    </>
  );
}
