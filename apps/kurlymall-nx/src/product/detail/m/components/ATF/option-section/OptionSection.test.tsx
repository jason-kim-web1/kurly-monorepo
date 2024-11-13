import { render } from '@testing-library/react';

import { ContentType, GroupProduct } from '../../../../types';
import OptionSection from './OptionSection';

describe('MW OptionSection 테스트', () => {
  const renderOptionSection = ({
    contentType,
    productNo,
    groupProduct,
  }: {
    contentType: ContentType;
    productNo: number;
    groupProduct: GroupProduct;
  }) => render(<OptionSection productNo={productNo} contentType={contentType} groupProduct={groupProduct} />);

  it('싱글형 콘텐츠는 옵션이 없다.', () => {
    const { container } = renderOptionSection({
      contentType: 'SINGLE',
      productNo: 0,
      groupProduct: {
        groupKeys: [],
        groupMembers: [],
      },
    });

    expect(container).toHaveTextContent('');
  });

  it('멀티형 콘텐츠는 옵션이 없다.', () => {
    const { container } = renderOptionSection({
      contentType: 'MULTI',
      productNo: 0,
      groupProduct: {
        groupKeys: [],
        groupMembers: [],
      },
    });

    expect(container).toHaveTextContent('');
  });

  it.skip('옵션형 콘텐츠는 OptionContent를 보여준다.', () => {
    const { container } = renderOptionSection({
      contentType: 'OPTION',
      productNo: 0,
      groupProduct: {
        groupKeys: [],
        groupMembers: [],
      },
    });

    expect(container).toHaveTextContent('용량(3)');
    expect(container).toHaveTextContent('색상(3)');
  });
});
