import SectionWrapper from '../components/SectionWrapper';
import ProductInquiryListContainer from '../../../board/inquiry/m/ProductInquiryListContainer';

interface Props {
  productNo: number;
  productName: string;
}

export default function InquiryContainer({ productNo, productName }: Props) {
  return (
    <SectionWrapper hasBottomLine={false}>
      <ProductInquiryListContainer productNo={productNo} productName={productName} />
    </SectionWrapper>
  );
}
