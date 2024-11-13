export class SearchAddressError extends Error {
  err;

  constructor(err: Error) {
    super(
      '주소지의 상세 정보를 가져올 수 없습니다. \n상세한 내용은 배송 공지사항을 확인해주세요. \n배송지 저장 및 주문에는 영향이 없습니다.',
    );
    this.err = err;
  }
}
