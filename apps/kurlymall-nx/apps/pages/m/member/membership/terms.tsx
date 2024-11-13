import { useEffect, useState } from 'react';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import Terms from '../../../../src/shared/components/layouts/Terms';
import { getFile } from '../../../../src/shared/api';
import { Agreed, termsArray } from '../../../../src/member/membership/shared/constants';
import CloseButton from '../../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import { useWebviewTitle } from '../../../../src/shared/hooks/useWebviewTitle';

const headerTitle = '컬리멤버스 서비스 이용약관';

export default function MembershipTermsPage() {
  const [html, setHtml] = useState<string>('');

  const { webview } = useWebviewTitle({ headerTitle });

  const handleCloseButton = () => {
    window.history.back();
  };

  useEffect(() => {
    const loadHtmlFile = async () => {
      const termsObject = termsArray.find(({ id }) => id === Agreed.terms);

      if (termsObject) {
        const response = await getFile(termsObject.link);

        setHtml(response as string);
      }
    };

    loadHtmlFile();
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <CloseButton onClick={handleCloseButton} />
          </HeaderButtons>
          <HeaderTitle>{headerTitle}</HeaderTitle>
        </MobileHeader>
      )}
      <Terms html={html} />
    </>
  );
}
