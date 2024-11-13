import { parseTrackingHtml } from './parseTrackingHtml';

describe('parse tracking html test', () => {
  const hrefWithWebjars = `<title>스마트택배 배송조회</title>
  <link rel="stylesheet" href="/webjars/github-com-twbs-bootstrap/v3.3.7/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="/webjars/github-com-twbs-bootstrap/v3.3.7/dist/css/bootstrap-theme.css" />`;

  const hrefWithRelative = `<div class="col-xs-15 text-center">
    <img src="https://info.sweettracker.co.kr/static/images/sky/ic_sky_delivery_step1_off.png" class="parcel-img" />
    <div class="info-parcel-text-none">상품인수</div>
  </div>

  <div class="col-xs-15 text-center">
    <img src="https://info.sweettracker.co.kr/static/images/sky/ic_sky_delivery_step2_off.png" class="parcel-img" />
    <div class="info-parcel-text-none">상품이동중</div>
  </div>`;

  context('webjars로 시작하는 주소인 경우', () => {
    given('html', () => hrefWithWebjars);

    it('webjars 앞에 스윗 트래커 주소가 포함된 경로로 변경된다.', () => {
      const { parsedHtml } = parseTrackingHtml(given.html);

      expect(parsedHtml).toBe(
        `<title>스마트택배 배송조회</title>
  <link rel="stylesheet" href="https://info.sweettracker.co.kr/webjars/github-com-twbs-bootstrap/v3.3.7/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://info.sweettracker.co.kr/webjars/github-com-twbs-bootstrap/v3.3.7/dist/css/bootstrap-theme.css" />`,
      );
    });
  });

  context('../../로 시작하는 주소인 경우', () => {
    given('html', () => hrefWithRelative);

    it('상대 경로(../../)가 스윗 트래커 주소로 변경된 경로로 변경된다.', () => {
      const { parsedHtml } = parseTrackingHtml(given.html);

      expect(parsedHtml).toBe(`<div class="col-xs-15 text-center">
    <img src="https://info.sweettracker.co.kr/static/images/sky/ic_sky_delivery_step1_off.png" class="parcel-img" />
    <div class="info-parcel-text-none">상품인수</div>
  </div>

  <div class="col-xs-15 text-center">
    <img src="https://info.sweettracker.co.kr/static/images/sky/ic_sky_delivery_step2_off.png" class="parcel-img" />
    <div class="info-parcel-text-none">상품이동중</div>
  </div>`);
    });
  });
});
