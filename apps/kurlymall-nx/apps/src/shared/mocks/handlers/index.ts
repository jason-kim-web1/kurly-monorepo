// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import sign from 'jwt-encode';

import { API_URL } from '../../configs/config';

import { getStaticDataByFileName, getStaticDataByPathName } from '../data';

const getCurrentUnixEpoch = () => Date.now();
const getHourOfUnixEpoch = () => 1000 * 60 * 60;
const getHostPrefixedUrl = (host: string) => (path: string) => `${host}${path}`;
const getApiUrl = getHostPrefixedUrl(API_URL);

const generateMockGuestToken = () => {
  const MOCK_JWT_TOKEN_SECRET = 'mock';
  const now = getCurrentUnixEpoch();
  const tokenInfo = {
    cart_id: '45bd37cb-c580-4e17-bcad-fe5779745f1f',
    is_quest: true,
    uuid: null,
    m_no: null,
    m_id: null,
    level: null,
    sub: null,
    iss: 'https://api.dev.kurly.com/v3/auth/guest',
    iat: now,
    exp: now + getHourOfUnixEpoch(),
    nbf: now,
    jti: 'utpxUPS9nbB3D6Bi',
  };
  return sign(tokenInfo, MOCK_JWT_TOKEN_SECRET);
};

const getNxApiSession: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const token = generateMockGuestToken();
  return res(
    ctx.status(200),
    ctx.json({
      token,
      isGuest: true,
      uid: '4bgA612CPwHjQd8zNrhTK',
    }),
  );
};

const getV3AuthGuest: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const token = generateMockGuestToken();
  return res(
    ctx.status(200),
    ctx.json({
      data: {
        access_token: token,
        token_type: 'bearer',
        expires_in: getHourOfUnixEpoch(),
      },
    }),
  );
};

const jsonResponse =
  (fileName: string): Parameters<typeof rest.get>[1] =>
  (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getStaticDataByFileName(fileName)));

const getJSONResponseByPathname: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const {
    url: { pathname },
  } = req;
  return res(ctx.status(200), ctx.json(getStaticDataByPathName(pathname)));
};

const getProductByProductCode: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getStaticDataByFileName('__product__v1__:productCode')));
};

const getShowroomV2ShareByProductCode: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getStaticDataByFileName('__showroom__v2__share__:productCode')));
};

const getBannerV1DownloadCouponProductDetailByProductCode: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json(getStaticDataByFileName('__banner__v1__download-coupon__product-detail__:productCode')),
  );
};

const getBoardV1ProductInquiryContentProductsByProductCode: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json(getStaticDataByFileName('__board__v1__product-inquiry__content-products__:productCode__posts')),
  );
};

export function handlers() {
  return [
    rest.get('/nx/api/session', getNxApiSession),

    // NOTE: Kurly API
    rest.get(getApiUrl('/product/v1/:productCode'), getProductByProductCode),
    rest.get(getApiUrl('/collection/v1/home/categories'), getJSONResponseByPathname),
    rest.get(getApiUrl('/v1/mypage/asks/confirm/kakao'), getJSONResponseByPathname),
    rest.get(getApiUrl('/banner/v1/top-bar'), getJSONResponseByPathname),
    rest.get(getApiUrl('/cart/v1/cart'), getJSONResponseByPathname),
    rest.get(getApiUrl('/showroom/v2/share/:productCode'), getShowroomV2ShareByProductCode),
    rest.get(getApiUrl('/board/v1/product-inquiry/notices'), getJSONResponseByPathname),
    rest.get(
      getApiUrl('/banner/v1/download-coupon/product-detail/:productCode'),
      getBannerV1DownloadCouponProductDetailByProductCode,
    ),
    rest.get(
      getApiUrl('/board/v1/product-inquiry/content-products/:productCode/posts'),
      getBoardV1ProductInquiryContentProductsByProductCode,
    ),

    // 상품상세 server side
    rest.post(getApiUrl('/v3/auth/guest'), getV3AuthGuest),
    rest.get(getApiUrl('/showroom/v2/products/:productCode'), getJSONResponseByPathname),

    // 메인
    rest.get(getApiUrl('/main/v3/sites/market/sections'), jsonResponse('__main__v3__sites__market__sections')),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/main-banner'),
      jsonResponse('__main__v3__sites__market__sections__:id__main-banner'),
    ),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/main-banner-carousel'),
      jsonResponse('__main__v3__sites__market__sections__:id__main-banner-carousel'),
    ),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/closing-sale'),
      jsonResponse('__main__v3__sites__market__sections__:id__closing-sale'),
    ),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/random-collection'),
      jsonResponse('__main__v3__sites__market__sections__:id__random-collection'),
    ),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/today-recommendation'),
      jsonResponse('__main__v3__sites__market__sections__:id__today-recommendation'),
    ),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/md-choice'),
      jsonResponse('__main__v3__sites__market__sections__:id__md-choice'),
    ),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/group-collection-circle'),
      jsonResponse('__main__v3__sites__market__sections__:id__group-collection-circle'),
    ),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/md-choices/:subId/products'),
      jsonResponse('__main__v3__sites__market__sections__:id__md-choices__:subId__products'),
    ),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/kurly-recipe'),
      jsonResponse('__main__v3__sites__market__sections__:id__kurly-recipe'),
    ),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/random-collection-article'),
      jsonResponse('__main__v3__sites__market__sections__:id__random-collection-article'),
    ),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/random-line-banner'),
      jsonResponse('__main__v3__sites__market__sections__:id__random-line-banner'),
    ),
    rest.get(getApiUrl('/main/v1/main/instagram-reviews'), jsonResponse('__main__v1__main__instagram-reviews')),
    rest.get(
      getApiUrl('/main/v3/sites/market/sections/:id/special-deal'),
      jsonResponse('__main__v3__sites__market__sections__:id__special-deal'),
    ),

    rest.get(getApiUrl('/v3/home/notices'), getJSONResponseByPathname),
    rest.get(
      getApiUrl('/collection/v2/home/sites/market/category-groups'),
      jsonResponse('__collection__v2__home__sites__market__category-groups'),
    ),
    rest.get(
      getApiUrl('/search/v4/sites/market/normal-search'),
      jsonResponse('__search__v4__sites__market__normal-search'),
    ),
    rest.get(
      getApiUrl('/recommend/v1/related-products/product-detail/:id'),
      jsonResponse('recommend__v1__related-products__product-detail'),
    ),
  ];
}
