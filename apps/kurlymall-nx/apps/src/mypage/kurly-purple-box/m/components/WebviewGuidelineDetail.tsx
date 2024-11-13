import styled from '@emotion/styled';

import Button from '../../../../shared/components/Button/Button';
import MobileFooter from '../../../../shared/components/layouts/MobileFooter';
import appService from '../../../../shared/services/app.service';
import PersonalInfo from './PersonalInfo';

const Wrapper = styled.div``;

export default function WebviewGuidelineDetail() {
  const handleClickClose = () => {
    appService.closeWebview();
  };
  return (
    <Wrapper>
      <PersonalInfo />
      <MobileFooter transparent={true}>
        <Button text="확인" radius={6} onClick={handleClickClose} />
      </MobileFooter>
    </Wrapper>
  );
}
