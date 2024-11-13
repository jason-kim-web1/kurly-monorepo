import { AmplitudeEvent } from '../../AmplitudeEvent';
import { ProductDetailState } from '../../../../product/detail/slice';
import { getPackageInfo } from './getPackageInfo';

interface Payload {
  productDetailState: ProductDetailState;
  cancelType: string;
}

/**
 * 상품 상세 화면 - 상품 문의 서브탭에서 문의 게시글 선택
 * @extends AmplitudeEvent
 */
export class SelectBackButton extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_back_button', payload);
  }

  getPayload() {
    const {
      productDetailState: {
        no,
        name,
        contentType,
        isGroupProduct,
        deliveryTypeNames,
        sellerName,
        defaultContentId,
        inquiry: {
          form: {
            values: { subject, content, isSecret },
          },
        },
      },
      cancelType,
    } = this.payload;

    const deliveryTypeName = deliveryTypeNames.join(',');

    const { packageId, packageName } = getPackageInfo({
      isGroupProduct,
      no,
      name,
    });

    return {
      content_id: no, // 콘텐츠의 번호 (CMS 기준의 콘텐츠 ID)
      content_name: name, // 콘텐츠의 이름 (CMS 기준의 콘텐츠 이름)
      content_type: contentType, // 콘텐츠의 유형에 대한 정보
      default_content_id: isGroupProduct ? defaultContentId : null, // 옵션 변경이 발생하기 전의 유입 콘텐츠 번호, (*optional : 콘텐츠그룹에서만 발생)
      delivery_type: deliveryTypeName, // 상품상세화면 내 콘텐츠 기준의 배송 유형 정보
      subject_exist: !!subject, // 문의 제목 유무 여부
      seller: sellerName, // 콘텐츠 기준의 판매자 정보
      content_exist: !!content, // content_exist
      is_secret: isSecret, // 상품 문의 글의 비밀글 여부
      package_id: packageId, // 패키지 번호, (*단, (1)패키지 번호 정보 없거나 (2) 상품개편 배포 이후에 등록되었거나 (3)콘텐츠그룹인 경우 값 발생하지 않음)
      package_name: packageName, // 패키지 이름, (*단, (1)패키지 이름 정보 없거나 (2) 상품개편 배포 이후에 등록되었거나 (3)콘텐츠그룹인 경우 값 발생하지 않음)
      selection_type: cancelType, // 클릭 유형, (1) (MW) 뒤로가기(<) 버튼 : back_button (2) (WEB) X 버튼 : X (3) (WEB) 취소 버튼 : cancel
    };
  }
}
