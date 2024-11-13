import {
  CertifyPageContent,
  ImageContent,
  IntroduceContent,
  PackagingMaterials,
  ProductSelection,
  TextContent,
} from '../interfaces';
import { imgUrl } from './index';
import { INTRODUCE_PATH } from '../../shared/constant';

// 컬리의 생각
export const GMO_FOOD: IntroduceContent[] = [
  {
    id: 0,
    title: 'GMO란?',
    text: `
      <p>GMO(유전자 재조합 또는 변형 식품)는 유전공학기술을 이용해 자연적으로는 발생할 수 없는 형태로 유전자를 변형한 농산물을 의미합니다. GMO 농산물은 통상적으로 해충 및 질병에 강한 형태로 변형됩니다. 식약처에서 식용으로 허가한 GMO 농산물에는 대두, 카놀라, 면화, 옥수수, 알파파, 사탕무 총 6가지 종류가 있습니다.</p>
    `,
  },
  {
    id: 1,
    title: 'GMO에 대한 컬리의 생각',
    text: `
      <p>컬리는 소비자가 식품에 포함된 다양한 원재료에 대해 정확히 알고 소비했을 때 가장 현명한 소비가 이루어진다고 믿습니다. GMO 또한 마찬가지입니다. 논란의 여지가 있고, 아직 검증되지 않은 부분이 있기에 최대한 조심스럽게 접근하고, 투명하게 정보를 공개하려고 노력합니다.</p>
      <p>신선 식품의 경우, 한국은 GMO 농산물의 재배를 금지하고 있고, 원물 상태로 GMO가 수입되는 경우는 매우 드뭅니다. 하지만 가공 식품의 경우, 국내법상 식품제조사가 GMO 사용 여부를 표기할 의무가 없어 소비자가 모든 정보를 파악하기는 어려운 것이 현실입니다.</p>
      <p>컬리는 고객님이 상품을 믿고 구매하실 수 있도록 식품의 원재료를 꼼꼼하게 검토하고 제조사에 GMO 여부를 개별적으로 확인하고 있습니다. 컬리가 판매하는 신선, 가공식품 선택 시 참고하실 수 있는 GMO 관련 내용을 아래와 같이 알려드립니다.</p>
      <ul>
        <li>
          <strong>· 채소, 과일, 곡류 : </strong>
          컬리는 GMO 종자로 재배된 신선 농산물은 판매하지 않으며, 유기농 재배된 농산물은 GMO와 무관합니다.
        </li>
        <li>
          <strong>· 축산물 : </strong>
          상품명에 ‘유기농’이 표시된 소고기와 달걀 상품은 유기농 사료를 급여한 동물에게 얻은 것으로, 유기농 사료에는 GMO 원재료가 포함되지 않습니다.
        </li>
        <li>
          <strong>· 가공식품 : </strong>
          Non-GMO 표기된 상품 이외에도 유기가공식품(유기농 인증을 받은 식품)은 GMO와 무관합니다.
        </li>
      </ul>
    `,
  },
  {
    id: 2,
    title: 'GMO 식품 표기법',
    text: `
      <strong>Q. 모든 식품에는 GMO 원재료 포함 여부가 표기되고 있나요? </strong>
      <p>그렇지 않습니다. 국내법 상 국내에서 생산되는 모든 상품은 GMO를 포함했다 하더라도 이를 표기할 의무가 없습니다. 해외 수입 상품의 경우 아래와 같이 GMO 여부를 표기할 수 있습니다.</p>
      <ul>
        <li>
          <span>1)</span>
          유전자변형식품을 사용하지 않은 식품 중 대두, 옥수수, 면화, 카놀라(유채), 사탕무, 알파파 6종의 원재료 함량이 50% 이상이거나 함량이 1순위인 경우 ‘NON-GMO’를 표시할 수 있습니다.
        </li>
        <li>
          <span>2)</span>
          식품 취급과정에서 유전자변형식품과 구분하여 관리하였음을 증명하는 서류를 구비한 경우 또는 고도의 정제과정을 거쳐 유전자변형 DNA·단백질이 남아있지 않은 당류, 유지류의 경우 GMO 표시 대상에서 면제됩니다.
        </li>
      </ul>
      <strong>Q. 패키지 뒷면 한글표시사항의 “유전자 변형 포함 가능성이 있을 수 있음” 이라는 문구는 GMO를 뜻하는 건가요?</strong>
      <p>꼭 그렇지는 않습니다. GMO 농산물 6종이 원재료로 포함된 해외 수입 상품의 경우 국내 확인 서류를 받지 않았다면 해외 인증 여부와는 상관없이 위의 문구가 표시될 수 있습니다.</p>
    `,
  },
];

export const JAPANESE_FOOD: IntroduceContent[] = [
  {
    id: 0,
    title: `
      일본산 식품에 대한<br />
      컬리의 생각
    `,
    text: `
      <p>컬리는 사람이 섭취하는 식품에서 가장 중요한 것은 안전성이라는 믿음을 기반으로 이를 확보하기 위해 다양한 노력을 기울이고 있습니다. 컬리에서 판매하는 모든 제품은 국내·외 기관에서 안전성이 입증된 제품이며, 일본산 제품도 예외는 아닙니다.</p>
    `,
  },
  {
    id: 1,
    title: '방사능 검사 관련 내용',
    text: `
      <p>식품의약품안전처에서는 일본 15개 현 27개 품목 농산물과 8개 현 모든 수산물의 수입을 금지하고 있습니다. 금지 품목 이외의 식품은 수입될 때마다 방사성 세슘(134Cs, 137Cs) 및 요오드(131I) 2개 항목에 대한 검사를 실시합니다.</p>
      <strong>1. 국내 수입 금지 일본 농수산물</strong>
      <span>[15개 현 농산물 27개 품목]</span>
      <table>
        <caption>국내 수입 금지 일본 농수산물 안내표</caption>
        <colgroup>
        </colgroup>
        <thead>
        <tr>
        <th>지역</th>
        <th>농산물</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <th>후쿠시마</th>
        <td>결구 엽채류*, 엽채류, 순무, 죽순, 청나래고사리, 매실, 유자, 밤, 쌀, 버섯류, 키위, 고추냉이, 두릅, 오가피, 고비, 고사리, 대두, 팥, 땅두릅(독활)</td>
        </tr>
        <tr>
        <th>도치기</th>
        <td>시금치, 카키나, 차, 버섯류, 두릅, 죽순, 밤, 청나래고사리, 산초, 오가피, 고비, 고사리</td>
        </tr>
        <tr>
        <th>이와테</th>
        <td>버섯류, 오가피, 메밀, 대두, 고비, 고사리, 미나리, 죽순</td>
        </tr>
        <tr>
        <th>미야기</th>
        <td>버섯류, 청나래고사리, 죽순, 고비, 오가피, 메밀, 대두, 쌀, 고사리</td>
        </tr>
        <tr>
        <th>이바라키</th>
        <td>시금치, 카키나, 파슬리, 차, 버섯류, 죽순, 오가피</td>
        </tr>
        <tr>
        <th>치바</th>
        <td>엽채류, 엽경채류, 버섯류, 죽순, 차</td>
        </tr>
        <tr>
        <th>군마</th>
        <td>시금치, 카키나, 오가피, 두릅, 버섯류, 차</td>
        </tr>
        <tr>
        <th>가나가와</th>
        <td>차</td>
        </tr>
        <tr>
        <th>사이타마</th>
        <td>버섯류</td>
        </tr>
        <tr>
        <th>야마나시</th>
        <td>버섯류</td>
        </tr>
        <tr>
        <th>시즈오카</th>
        <td>버섯류</td>
        </tr>
        <tr>
        <th>아오모리</th>
        <td>버섯류</td>
        </tr>
        <tr>
        <th>야마가타</th>
        <td>버섯류</td>
        </tr>
        <tr>
        <th>나가노</th>
        <td>오가피, 버섯류</td>
        </tr>
        <tr>
        <th>니가타</th>
        <td>오가피(오갈피나무)</td>
        </tr>
        </tbody>
      </table>
      <span>*결구 엽채류 : 채소 잎이 여러 겹으로 겹쳐셔 둥글게 속이 드는 채소 (배추, 양배추, 브로콜리 등)</span>
      <p>[8개 현 수산물 전 품목]<br />후쿠시마, 도치기, 이와테, 미야기, 이바라키, 치바, 군마, 아오모리</p>
      <strong>2. 대한민국 방사능 검사</strong>
      <ul>
        <li><span>·</span>가공식품에 위 지역의 농수산물이 주재료 혹은 부재료로 사용될 경우 일본, 한국 각 1회씩 총 2회의 방사능 검사를 통해 안전성이 확인되어야 수입이 가능합니다.</li>
        <li><span>·</span>금지 품목 이외의 식품에 대해 수산물은 전량을, 일반 신선식품, 가공식품 등은 무작위로 시료를 채취해 방사능 검사를 진행합니다. 검사에서 위 2개 항목의 불검출이 확인되어야 국내 수입 및 판매가 가능합니다.</li>
      </ul>
      <strong>3. 일본 방사능 검사</strong>
      <ul>
        <li><span>·</span>아래 13개 현에서 최종 제조되는 모든 식품은 수출 전 일본 해사검정협회의 방사능 핵종분석을 거쳐야 합니다.</li>
        <li><span>·</span>수출 상품과 동일한 유통기한의 상품으로 약 1kg의 샘플 검사를 진행하며, 위 2개 항목의 불검출 검사 결과를 토대로 한국의 식품의약품안전처에 해당하는 농림수산성에서 증명서를 발급받습니다.</li>
      </ul>
      <p>[필수 검사 대상 13개 현]<br />후쿠시마, 도치기, 이와테, 미야기, 이바라키, 치바, 군마, 가나가와, 사이타마, 야마나시, 시즈오카, 아오모리, 나가노 (14년 7월 ~ 현재)</p>
    `,
  },
];

export const INFANT_FOOD: IntroduceContent[] = [
  {
    title: '유아식에 대한 컬리의 생각',
    text: `
      <p>아이를 위한 상품을 검토할 때만큼은 컬리의 팀 모두가 부모의 마음이 되어보려 노력합니다. 내 아이에게 먹일 유아식을 고른다는 생각으로 원재료와 가공 과정을 살펴보고, 아이들에게, 부모님에게 얼마나 유용한 상품인지를 봅니다. 또한 안전성 측면에서 더욱 세심하게 검토되어야 하기에, 일반 가공식품보다 더 엄격한 기준을 적용합니다.</p>
      <ul class="sub_list">
        <li><span>·</span>원료의 원산지를 꼼꼼하게 확인합니다.</li>
        <li><span>·</span>유해성 논란이 있었던 첨가물이 포함된 유아식은 판매하지 않으며, 알레르기를 유발할 수 있는 성분은 사전에 정확하게 고지합니다.</li>
        <li><span>·</span>한국, 미국, 유럽 등 식품 안전을 엄격한 기준으로 관리하는 국가가 제조한 상품만을 판매하며, 일본에서 제조한 유아식은 판매하지 않습니다.</li>
        <li><span>·</span>위생 기준을 위반한 이력이 한 번이라도 있는 곳의 상품은 판매하지 않습니다.</li>
        <li><span>·</span>좋은 상품은 바른 마음에서 시작되기에, 윤리적 경영을 위해 노력하는 기업과 생산자의 상품을 판매합니다.</li>
      </ul>
    `,
  },
];

export const FOOD_ADDITIVE: IntroduceContent[] = [
  {
    title: `
      식품첨가물에 대한<br />
      컬리의 생각
    `,
    text: `
      <p>컬리는 식품첨가물이 어떤 목적으로 왜 사용되었는지를 검토합니다. 때로는 첨가물이 식품의 안정성이나 맛에서 자연 재료보다 긍정적인 역할을 해주기 때문이죠. 물론 공인된 기관에서 장기간의 연구 끝에 사람에게 유해하다고 판명된 성분들은 배제합니다. 진짜 재료의 맛과 색을 가리고 가짜 맛, 가짜 색을 내기 위한 첨가물도, 사용된 목적이 불분명한 첨가물도 배제합니다.</p>
      <p>지금 이 순간에도 식품첨가물에 대한 다양한 연구가 진행중이고, 매일같이 새로운 연구결과가 나오기에 하나의 기준을 일괄적으로 적용할 수는 없습니다. 그래서 이 문제 앞에서는 더 겸손하고 신중해집니다. 식품의 안정성을 최우선으로 생각하는 컬리인만큼 끊임없이 공부하고 최선을 다해 노력하겠습니다.</p>
    `,
  },
];

export const PESTICIDE_USE: IntroduceContent[] = [
  {
    title: `
      농약 및 비료 사용에 대한<br />
      컬리의 생각
    `,
    text: `
      <strong>땅에 이로운 것이 사람에게도 이롭다</strong>
      <p>컬리가 신선 식품의 안정성을 판단하는 기준이 단순히 ‘유기농’만은 아닙니다. 최대한 원래 자연 상태에 가까운 방식으로 생산된, 그래서 사람에게도 자연스러운 상품을 소개하려고 하죠. 사실 사람에게 해가 될만한 농약 성분을 지닌 과일과 채소는 국내에서 판매 자체가 불가능합니다. 잔류 농약 검사가 법적으로 규정되어 있고, 기준치에 충족되지 않으면 유통 자체가 불가능하니까요.</p>
      <p>그럼에도 컬리가 굳이 유기농 상품을 소개하는 이유는 농약과 비료로 재배된 작물이 인체에 미치는 영향이 아직 명확하지 않고, 땅에게도 사람에게도 자연스러운 방식으로 생산된 상품이 아니기 때문입니다. 그럼 ‘유기농’이 최선일까요? 꼭 그렇지는 않습니다. 요즘 채소는 유기농도 높은 신선도를 자랑하지만 과일은 당도와 크기, 가격면에서 유기농 상품으로 최대의 만족을 드리기는 힘든 것이 사실입니다.</p>
      <strong>맛과 안정성 그 접점을 찾는 일</strong>
      <p>그래서 컬리의 과일담당 MD는 사무실에 있는 시간보다 전국 방방곡곡의 과수원에 있는 시간이 더 깁니다. 무농약, 유기농이면서 최상의 당도를 내는 과일, 친환경이나 무농약이 아니어도 재배 초기에만 농약을 사용해서 잔류 농약은 남지 않은 과일을 찾기 위해서죠. 이와 더불어 입고되는 과일의 표본조사를 통해 파괴당도계로 직접 Brix를 체크하고 있습니다. 수입 과일의 경우 수입 과정에 필요한 약품 처리로 유기농을 선보일 수는 없지만 재배 과정과 품질 관리의 안정성을 보장할 수 있는 수입사 또는 브랜드의 상품으로 선별하고 있습니다.</p>
    `,
  },
];

export const PET_FOOD: IntroduceContent[] = [
  {
    title: `
      반려동물 식품에 대한<br />
      컬리의 생각
    `,
    text: `
      <p>컬리의 시작에는 음식으로 건강하고 행복한 삶에 기여하고 싶다는 의지가 있었습니다. 컬리가 반려동물 식품을 선보이며 가지는 마음가짐도 사람의 음식을 대할 때와 같습니다. 인생을 함께하는 반려동물의 삶을 책임지는 식품이기에, 어떤 재료로 어떻게 만들었는지 책임감을 가지고 깐깐히 검증합니다. 사람의 식품에 비해 안전성을 보장할 규제와 기준이 미비하기 때문에 보호자의 올바른 선택을 돕기 위해 컬리가 원재료와 제조 업체, 제조 환경을 더 면밀히 검토하는 것이죠.</p>
      <p>안전성도 중요하지만 반려동물이 얼마나 잘 먹는지도 중요하기에 안전성이 검증된 상품은 컬리 직원이 키우는 반려동물에게 직접 먹여봅니다. 뿐만 아니라 사람이 먹어도 안전한 반려동물 식품이라면 MD 및 상품위원회가 직접 시식 후 판매 여부를 결정합니다. 반려동물 식품의 안전성을 판단하는 더 자세한 기준은 아래를 참고해주세요.</p>
      <strong>원재료</strong>
      <ul>
        <li><span>·</span>성분의 안전성을 꼼꼼히 검토하고, 명확한 원재료를 알 수 없는 상품은 판매하지 않습니다.</li>
      </ul>
    `,
  },
];

// 인증서 검토
export const DOMESTIC = '국내';
export const FOREIGN = '해외';

export const ECO_ORGANIC_TEXT =
  '농약과 화학비료 없이 키운 농산물부터 유기농 원료로 정직하게 만든 가공식품까지. 컬리가 판매하는 유기농 제품은 모두 국내 혹은 해외에서 공인하는 최소 1 개 이상의 유기농 인증을 획득한 것들입니다. 해외에서 인증받은 유기농 식품이라 하더라도, 국내에서 법적으로 인정받을 수 없기에 국내의 유기농 인증 획득 여부를 함께 확인합니다.';

export const ECO_ORGANIC_DOMESTIC: CertifyPageContent[] = [
  {
    id: 0,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic1.jpg`,
    title: '유기농산물',
    text: '유기합성농약, 화학비료를 사용하지 않고 인증 기준을 지켜 재배한 농산물임을 인증합니다.(다년생 작물은 3 년, 그 외 작물은 2 년을 전환 기준으로 삼음)',
  },
  {
    id: 1,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic2.jpg`,
    title: '유기축산물',
    text: '유기농산물의 재배 및 생산 기준에 맞게 생산한 유기사료를 먹고 자란 축산물임을 인증합니다.',
  },
  {
    id: 2,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic3.jpg`,
    title: '유기식품',
    text: '유기합성농약, 화학비료를 사용하지 않고 인증 기준을 지켜 양식한 수산물임을 인증합니다. 대표 유기수산물로는 김, 굴, 홍합, 미역, 다시마 등이 있습니다.',
  },
  {
    id: 3,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic4.jpg`,
    title: '유기가공식품 (농림축산식품부)',
    text: '유기농 인증을 받은 원료를 95% 이상 사용한 농축산물 관련 가공식품임을 인증합니다. 원료의 보관, 취급, 제조설비, 공정, 위생, 포장, 사후관리 등 모든 제조 과정이 인증 기준에 부합해야 합니다.',
  },
  {
    id: 4,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic5.jpg`,
    title: '유기가공식품 (해양수산부)',
    text: '유기농 인증을 받은 원료를 95% 이상 사용한 수산물 관련 가공식품임을 인증합니다. 원료의 보관, 취급, 제조설비, 공정, 위생, 포장, 사후관리 등 모든 제조 과정이 인증 기준에 부합해야 합니다.',
  },
];

export const ECO_ORGANIC_FOREIGN: CertifyPageContent[] = [
  {
    id: 5,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas1.jpg`,
    imgWidth: 89,
    imgHeight: 59,
    imgWidthMo: 63,
    imgHeightMo: 42,
    title: 'USDA ORGANIC (USDA 오가닉)',
    text: '미국 농무부(USDA)가 부여하는 유기농 인증으로 세계적으로 공신력을 인정받고 있습니다. 농산물의 경우 3 년간 화학비료와 농약을 사용하지 않고 재배할 경우 인증을 획득할 수 있습니다. 동등성 인정 협정을 통해 국내의 유기농 인증과 동등한 효력을 가집니다.',
  },
  {
    id: 6,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas2.jpg`,
    imgWidth: 80,
    imgHeight: 54,
    imgWidthMo: 56,
    imgHeightMo: 38,
    title: 'EU 유기농',
    text: '12 개의 유럽 국가들이 연합해 만든 인증입니다. 전성분의 95% 이상을 유기농 원료로 사용하며 GMO 식품을 원료로 사용하지 않습니다. 동등성 인정 협정을 통해 국내의 유기농 인증과 동등한 효력을 가집니다.',
  },
  {
    id: 7,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas3.png`,
    imgWidth: 78,
    imgHeight: 78,
    imgWidthMo: 55,
    imgHeightMo: 55,
    title: 'ECOCERT(에코서트)',
    text: '1991 년 프랑스에서 설립된 유기농 인증기관이 부여하는 인증입니다. 전성분의 95% 이상이 천연 성분이거나, 10% 이상이 유기농 성분임을 인증합니다.',
  },
  {
    id: 8,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas4.png`,
    imgWidth: 80,
    imgHeight: 66,
    imgWidthMo: 56,
    imgHeightMo: 46,
    title: 'Bio-Sigel (바이오 시겔)',
    text: '독일 정부에서 유기농산물 및 유기가공식품을 대상으로 발급하는 인증으로 인증 절차가 까다롭기로 유명합니다.',
  },
  {
    id: 9,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas5.png`,
    imgWidth: 87,
    imgHeight: 43,
    imgWidthMo: 61,
    imgHeightMo: 30,
    title: 'demeter(데메테르)',
    text: '독일의 데메테르 협동조합이 바이오 다이내믹 방식으로 생산된 제품에 부여합니다. 원료는 물론 생산 방식도 강도 높은 데메테르의 기준을 따를 것을 권고하고 있습니다.',
  },
  {
    id: 10,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas6.png`,
    imgWidth: 62,
    imgHeight: 66,
    imgWidthMo: 44,
    imgHeightMo: 46,
    title: 'OTCO',
    text: '미국농무부 산하 오레곤틸스의 유기농 인증입니다. 농약, 합성인공비료 등을 사용하지 않고 최소 3 년 이상 유기농 생산을 지속한 작물임을 인증합니다.',
  },
  {
    id: 11,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas7.png`,
    imgWidth: 91,
    imgHeight: 91,
    imgWidthMo: 64,
    imgHeightMo: 64,
    title: 'JAS',
    text: '일본의 농림 규격에 맞는 유기농 방식으로 재배한 유기농산물 및 유기가공식품임을 인증합니다.',
  },
  {
    id: 12,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas8.png`,
    imgWidth: 53,
    imgHeight: 64,
    imgWidthMo: 38,
    imgHeightMo: 45,
    title: 'AB(아베)',
    text: '프랑스 정부에서 유럽연합이 지정한 농산물 및 가공식품 기준에 부합하는 상품임을 인증합니다. 성분의 95% 이상이 유럽연합 지역 내에서 재배된 유기농 원료여야 합니다. 단 유럽 내 생산이 어려운 열대 작물 및 커피, 코코아 등 일부는 제외됩니다.',
  },
];

export const ECO_PLANTATION_TEXT =
  '컬리는 농림축산식품부의 친환경 인증을 받은 농산물과 해양수산부의 기준을 지켜 어획 혹은 양식한 수산물을 우선적으로 엄선합니다.';

export const ECO_PLANTATION_DOMESTIC: CertifyPageContent[] = [
  {
    id: 0,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic6.jpg`,
    title: '무농약',
    text: '유기합성농약을 사용하지 않으며 화학비료는 권장 시비량의 1/3 이내를 사용하여 기른 농산물임을 인증합니다.',
  },
  {
    id: 1,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic8.jpg`,
    title: '무항생제 (해양수산부)',
    text: '항생제, 합성향균제, 호르몬제를 첨가하지 않고 기른 수산물임을 인증합니다.',
  },
];

export const PRODUCTION_PROCESS_TEXT =
  '우리가 먹는 농수산물 및 육류와 달걀은 어떻게 생산되는 걸까요? 생산 과정을 직접 눈으로 확인하기 위해 컬리는 논밭과 바다를 직접 찾아가기도 합니다. 하지만 이것만으론 부족합니다. 고통받지 않고 자란 동물인지, 먼 미래를 바라보며 새로운 기술과 품질 관리 기법을 적용했는지 여러 인증을 통해 확인하고 있습니다.';

export const PRODUCTION_PROCESS_DOMESTIC: CertifyPageContent[] = [
  {
    id: 0,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic9.jpg`,
    imgWidth: 83,
    imgHeight: 74,
    imgWidthMo: 67,
    imgHeightMo: 59,
    title: '동물복지',
    text: '인도적으로 동물을 생산하는 농가임을 인증합니다. 동물복지 농장은 동물을 좁은 우리에 강제로 가둬 키우지 않고, 비위생적인 사료를 급여하지 않습니다. 소, 돼지, 닭, 오리를 비롯해 달걀 또한 인증 대상입니다.',
  },
  {
    id: 1,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic10.jpg`,
    title: '저탄소',
    text: '저탄소 농업기술을 적용하여 농축산물을 생산하는 전 과정에서 필요한 에너지, 농자재 투입량을 줄인 제품임을 인증합니다. 이 인증을 받은 과일과 채소 등을 구입할 경우 온실가스 배출 줄이기에 동참할 수 있습니다.',
  },
  {
    id: 2,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic11.jpg`,
    title: '품질인증',
    text: '철저한 생산 관리 기준에 따라 생산된 수산물이나 수산 특산물임을 인증합니다. 건어물부터 수산물, 해조류, 냉동 수산물이 해당됩니다.',
  },
];

export const PRODUCTION_PROCESS_FOREIGN: CertifyPageContent[] = [
  {
    id: 3,
    imgUrl: `${imgUrl}/200714/m/mark_msc.jpg`,
    imgWidth: 64,
    imgHeight: 80,
    imgWidthMo: 54,
    imgHeightMo: 76,
    title: 'MSC 인증 (Marine Stewardship Council)',
    text: '수산물을 고갈시키는 남획·불법 어획·혼획을 방지하고 해양 환경 파괴를 최소화하는 지속가능어업에서 생산한 수산물임을 인증합니다.',
  },
  {
    id: 4,
    imgUrl: `${imgUrl}/200714/m/mark_asc.jpg`,
    imgWidth: 64,
    imgHeight: 80,
    imgWidthMo: 54,
    imgHeightMo: 76,
    title: 'ASC 인증 (Aquaculture Stewardship Council)',
    text: '양식의 과밀화로 인한 해양오염과 생태계 파괴를 최소화하는 책임 있는 양식장에서 생산한 수산물임을 인증합니다.',
  },
];

export const SAFETY_HYGIENE_TEXT =
  '좋은 재료로 제품을 생산하는 것만큼 생산 및 가공 환경에 위해 요소가 없도록 유지하는 것도 중요합니다. 첨단 시스템을 도입함으로써 안전 관리를 철두철미하게 하거나 정보를 투명하게 공개함으로써 품질을 제대로 관리하는 업체들이 있습니다. 컬리는 안전 및 위생을 중요하게 생각하는 업체인지 확인하고 알립니다.';

export const SAFETY_HYGIENE_DOMESTIC: CertifyPageContent[] = [
  {
    id: 0,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic12.jpg`,
    title: 'GAP (우수관리인증)',
    text: '농산물을 수확하거나 유통할 시 위해 요소를 방지할 수 있도록 투명하게 관리했음을 인증합니다.',
  },
  {
    id: 1,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic13.jpg`,
    imgWidth: 72,
    imgHeight: 72,
    imgWidthMo: 61,
    imgHeightMo: 63,
    title: 'HACCP (안전관리인증)',
    text: '식품의 안전을 위해하는 요인을 차단할 수 있는 청결한 위생관리체계를 갖춘 업체임을 인증합니다.',
  },
  {
    id: 2,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic14.jpg`,
    imgWidth: 72,
    imgHeight: 72,
    imgWidthMo: 62,
    imgHeightMo: 62,
    title: '이력추적 (식품의약품안전처)',
    text: '식품의 생산, 가공, 유통과 관련된 정보를 투명하게 공개할 경우 인증합니다.',
  },
  {
    id: 3,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic15.jpg`,
    imgWidth: 72,
    imgHeight: 69,
    imgWidthMo: 58,
    imgHeightMo: 55,
    title: '이력추적 (해양수산부)',
    text: '식품의 생산, 가공, 유통과 관련된 정보를 투명하게 공개할 경우 인증합니다.',
  },
  {
    id: 4,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic16.jpg`,
    imgWidth: 72,
    imgHeight: 72,
    imgWidthMo: 60,
    imgHeightMo: 60,
    title: '이력추적 (농림축산식품부)',
    text: '식품의 생산, 가공, 유통과 관련된 정보를 투명하게 공개할 경우 인증합니다.',
  },
];

export const AREA_PRODUCER_TEXT =
  '한국에 고추장, 된장과 같은 전통식품이 있다면 외국에는 치즈, 와인과 같은 발효식품이 있습니다. 이런 제품은 대개 특정 지역에서 특별한 인물 및 집단의 노하우를 바탕으로 생산됩니다. 컬리는 식품의 특수성, 생산 지역, 생산자와 관련된 인증을 확인합니다.';

export const AREA_PRODUCER_DOMESTIC: CertifyPageContent[] = [
  {
    id: 0,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic17.png`,
    title: '전통식품 (농림축산식품부)',
    text: '국산 농수산물 및 축산물을 주원료로 사용하여 우리의 맛을 지킨 우수한 전통식품임을 인증합니다.',
  },
  {
    id: 1,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic19.jpg`,
    title: '식품명인',
    text: '전통식품명인과 일반식품명인으로 나누어 인증합니다. 이 인증을 받은 사람은 식품과 제조, 가공 분야의 전문가이자 명예로운 사람으로 인정받습니다.',
  },
  {
    id: 2,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic20.jpg`,
    title: '지리적표시 (PGI) (농림축산식품부)',
    text: '특정 지역에서 생산되는 농산물 및 가공품의 지리적인 특수성을 인증합니다.',
  },
  {
    id: 3,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic21.jpg`,
    title: '지리적표시 (PGI) (해양수산부)',
    text: '특정 지역에서 생산되는 수산물 및 가공품의 지리적인 특수성을 인증합니다.',
  },
];

export const AREA_PRODUCER_FOREIGN: CertifyPageContent[] = [
  {
    id: 4,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas9.jpg`,
    imgWidth: 65,
    imgHeight: 65,
    imgWidthMo: 52,
    imgHeightMo: 52,
    title: 'AOP',
    text: '프랑스의 특정 지역에서 자신들의 노하우를 지키며 엄격하게 생산한 제품을 인증합니다.',
  },
  {
    id: 5,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas10.jpg`,
    imgWidth: 65,
    imgHeight: 65,
    imgWidthMo: 52,
    imgHeightMo: 52,
    title: 'DOP',
    text: '이탈리아의 특정 지역에서 자신들의 노하우를 지키며 엄격하게 생산한 제품을 인증합니다.',
  },
  {
    id: 2,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas11.jpg`,
    imgWidth: 65,
    imgHeight: 65,
    imgWidthMo: 52,
    imgHeightMo: 52,
    title: 'PDO',
    text: '유럽의 특정 지역에서 자신들의 노하우를 지키며 엄격하게 생산한 제품을 인증합니다.',
  },
];

export const HEALTH_FOOD_TEXT =
  '건강은 우리의 생명을 좌지우지하는 중요한 요소입니다. 건강 관리를 위해 꾸준히 자주 섭취하는 건강기능식품은 그래서 더 중요하게 관리돼야 합니다. 컬리는 건강기능식품 관련 인증을 세밀하게 확인하며 식품이 우리 몸에 어떤 영향을 미치는지를 정확하고 상세하게 제시합니다.';

export const HEALTH_FOOD_DOMESTIC: CertifyPageContent[] = [
  {
    id: 0,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic22.jpg`,
    imgWidth: 68,
    imgHeight: 68,
    imgWidthMo: 55,
    imgHeightMo: 55,
    title: '건강기능식품',
    text: '인체에 유용한 기능을 가진 원료나 성분을 사용하여 건강기능식품의 관련 규정을 따라 제조했음을 인증합니다. 질병의 직접적인 치료나 예방을 목적으로 하는 상품이 아니라 신체의 정상적인 기능을 유지하는 등 건강 개선에 이바지한 상품에 부여합니다.',
  },
  {
    id: 1,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic23.jpg`,
    imgWidth: 77,
    imgHeight: 77,
    imgWidthMo: 62,
    imgHeightMo: 62,
    title: 'GMP(우수건강기능식품제조기준)',
    text: '우수건강기능식품의 제조 기준을 준수하는 시설에서 제조된 건강기능식품임을 인증합니다.',
  },
  {
    id: 2,
    imgUrl: `${imgUrl}/0720/mobile/ico_domestic24.jpg`,
    imgWidth: 84,
    imgHeight: 84,
    imgWidthMo: 67,
    imgHeightMo: 61,
    title: 'KHSA(표시광고사전심의)',
    text: '식품의약품안전처가 인정한 기능을 벗어나지 않는 정보를 전달하고 있음을 증명합니다. 건강기능식품에 대한 매체 및 인터넷 광고 내용이 적합함을 뜻합니다.',
  },
];

export const SPECIAL_PRODUCT_TEXT =
  '종교적인 문제나 건강상 및 개인의 신념을 위해 특별 관리된 식품을 찾는 분들이 있습니다. 다양성을 존중하는 컬리는 코셔, 할랄, 비건, 글루텐프리 인증을 받은 식품의 인증 사실을 안내합니다. 4가지 인증의 공통점은 원재료의 안전성을 따지는 동시에 위생을 중시한다는 것입니다. 특수한 계층을 보호하기 위해 발달한 인증이지만, 현재는 전세계적으로 안전과 위생을 판가름하는 인증으로 재평가받는 추세입니다.';

export const SPECIAL_PRODUCT_FOREIGN: CertifyPageContent[] = [
  {
    id: 0,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas12.jpg`,
    imgWidth: 67,
    imgHeight: 67,
    imgWidthMo: 57,
    imgHeightMo: 57,
    title: 'Kosher(코셔)',
    text: '유대교의 율법에 어긋나는 원재료(돼지를 비롯해 갑각류와 지느러미와 비늘이 없는 생선류 등)를 제외하고 유대교의 율법을 따라 생산한 제품임을 인증합니다. 율법에 따라 엄격하게 제품을 생산하기에 식품의 안전과 위생을 뒷받침하는 하나의 근거가 됩니다.',
  },
  {
    id: 1,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas13.jpg`,
    imgWidth: 60,
    imgHeight: 60,
    imgWidthMo: 50,
    imgHeightMo: 50,
    title: 'Halal(할랄)',
    text: '이슬람의 율법에 어긋나는 원재료(돼지, 알코올, 동물의 피 등)를 제외하고 이슬람교의 율법을 따라 생산한 제품임을 인증합니다. 이슬람의 율법에 따라 엄격하게 제품을 생산하기에 식품의 안전과 위생을 뒷받침하는 하나의 근거가 됩니다.',
  },
  {
    id: 2,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas14.png`,
    imgWidth: 81,
    imgHeight: 63,
    imgWidthMo: 66,
    imgHeightMo: 52,
    title: 'Vegan(비건)',
    text: '영국의 베지테리언 소사이어티(Vegetarian Society)에서 부여하는 인증입니다. 우유, 달걀을 포함한 일체의 동물 성분을 포함하지 않으며 GMO 원료도 사용하지 않은 식품에 부여합니다.',
  },
  {
    id: 3,
    imgUrl: `${imgUrl}/0720/mobile/ico_overseas15.jpg`,
    imgWidth: 66,
    imgHeight: 66,
    imgWidthMo: 54,
    imgHeightMo: 54,
    title: '글루텐 프리',
    text: '10ppm 이하의 글루텐을 함유한 제품임을 인증합니다.',
  },
];

export const JOINT_GROWTH = [
  {
    id: 0,
    title: '1. 생산자와의 공정하고 투명한 거래',
    text: `
      <ul>
        <li>컬리는 사전에 예측한 판매 수량만큼 생산자로부터 미리 상품을 매입합니다. 이러한 직거래 매입 방식으로 컬리의 재고 보유 및 폐기 비용 부담은 높아지지만 그만큼 생산자의 비용 부담은 줄어들 수 있습니다.</li>
        <li>생산자에게 상품의 품질에 합당한 대가를 제공하고, 생산자가 부담해야 하는 제반 비용 및 관련 정보를 투명하게 공개합니다.</li>
      </ul>
    `,
    urlText: '가격 정책 및 직거래 매입 방식 더 알아보기',
    url: INTRODUCE_PATH.pricePolicy.uri,
  },
  {
    id: 1,
    title: '2. 위험 관리 및 품질 관리 컨설팅',
    text: `
      <ul>
        <li>좋은 상품을 기획, 생산하고 있지만 규모가 작아 체계적인 관리가 어려운 공급사의 경우, 보다 안정적으로 상품을 판매할 수 있도록 컬리 공정 관리 전문 팀이 컨설팅을 제공합니다.</li>
        <li>상품 품질 관리와 관련 법규에 대해 일시적인 자문을 제공하는 것에 그치지 않고, 공급사와 지속적으로 소통하며 함께 품질을 개선해 나갑니다.</li>
      </ul>
    `,
  },
  {
    id: 2,
    title: '3. 브랜드 가치 상승을 위한 지원',
    text: `
      <ul>
        <li>컬리 입점이 곧 상품의 브랜드 가치 상승과 동반 성장으로 이어질 수 있도록, 입점 여부를 결정할 때부터 상품 기획자, 마케터, 에디터 등 각 분야의 전문 팀이 꼼꼼히 상품을 검토합니다.</li>
        <li>입점이 결정된 후에도 컬리의 팀이 상품 기획 및 브랜딩 측면에서 더 나은 방향성을 함께 고민하고, 소비자에게 상품을 매력적으로 홍보하는 콘텐츠를 자체 제작합니다.</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: '4. 생산자 발굴 및 신상품 공동 기획',
    text: `
      <ul>
        <li>지속적으로 새로운 생산자를 발굴하기 위해 컬리의 입점 기회는 언제나 활짝 열려 있습니다. 홈페이지 하단의 입점 문의 메일로 편안하게 제안해주세요.</li>
        <li>시장에는 없지만 고객님께 꼭 필요할 만한 상품은 컬리가 생산자를 먼저 찾아가 상품 공동 기획을 제안하기도 합니다.</li>
      </ul>
    `,
  },
];

export const JOINT_GROWTH_THUMB: IntroduceContent[] = [
  {
    id: 0,
    title: 'Andante Dairy | 아티장 김소영',
    text: '한국에 좋은 치즈에 대해 제대로 알리고 정직하게 만든 치즈를 온전히 유통해 줄 파트너를 찾다가 마켓컬리를 만나게 되었어요. 소비자의 관점에서 더 좋은 먹거리를 고민하고, 최대한 있는 그대로 신선하고 정직하게 식재료를 유통하고자 하는 철학이 제 생각과 같았어요.',
    imgUrl: `${imgUrl}/200714/pc/img_list_1_1.jpg`,
    imgUrlMo: `${imgUrl}/200714/m/img_slide_joint.png`,
  },
  {
    id: 1,
    title: '다담미트 | 대표 손성호',
    text:
      '마켓컬리를 만나 한우에 가려졌던 국내산 육우의 진정한 가치를 세상에 알릴 수 있었어요. 일면식도 없던 컬리 MD를 믿고 PB를 만들게 된 건 ‘육우 사육 농장부터 볼 수 있을까요?’ 라는 첫 한 마디였습니다. 소비자에게 더 좋은 상품을' +
      '고민하는 컬리의 진심과 함께합니다.',
    imgUrl: `${imgUrl}/200714/pc/img_list_1_2.jpg`,
    imgUrlMo: `${imgUrl}/200714/m/img_slide_joint2.png`,
  },
  {
    id: 2,
    title: '삼삼해물 | 대표 이현호',
    text: '첫 만남에서 ‘소비자가 컬리를 통해 진짜 좋은 음식을 경험하게 되었으면 좋겠다’는 컬리의 철학을 믿고 함께 하게 되었습니다. 생산자, 소비자, 판매자 모두의 행복을 추구하는 컬리의 진심을 소비자분들도 느끼실 수 있도록 삼삼해물도 함께 발맞추어 가고 싶습니다.',
    imgUrl: `${imgUrl}/200714/pc/img_list_1_3.jpg`,
    imgUrlMo: `${imgUrl}/200714/m/img_slide_joint3.png`,
  },
  {
    id: 3,
    title: '샐러드판다 | 대표 김성학',
    text: '공급사에서 발생한 문제를 단순히 지적하고 개선을 요구하는 유통 업체와 달리 개선 방법을 함께 고민하고, 상품의 미래와 방향성까지 조언해주신 덕분에 함께 발전하고 있습니다. 감사합니다, 컬리. 앞으로 닥칠 문제들도 함께 극복하며 같이 더 성장하길 바랍니다.',
    imgUrl: `${imgUrl}/200714/pc/img_list_1_4.jpg`,
    imgUrlMo: `${imgUrl}/200714/m/img_slide_joint4.png`,
  },
];

export const PRODUCT_SELECTION: ProductSelection[] = [
  {
    id: 0,
    title: '1. 관련 인증을 받은 상품 ',
    info: [
      {
        id: 0,
        title: '친환경 인증',
        text: '농·축·수산물의 생산부터 유통 과정에서 유해물질의 사용을 최소화해 상품의 안전성을 확보하고, 토양 및 수질 환경을 보전하는데 기여하는 상품임을 인증합니다.',
        url: INTRODUCE_PATH.qualityStandard.uri,
        urlText: '관련 인증 더 알아보기',
        imgUrl: `${imgUrl}/200714/pc/img_mark.jpg`,
        imgUrlMo: `${imgUrl}/200714/m/img_mark.jpg`,
      },
      {
        id: 1,
        title: '동물복지 인증',
        text: '사육 과정에서 동물이 과도한 스트레스를 받지 않도록 좁은 우리에 강제로 가둬 키우지 않고, 비위생적인 사료를 급여하지 않는 축산 농가임을 인증합니다.',
        url: 'https://www.kurly.com/shop/event/kurlyEvent.php?htmid=event/2019/deal/egg_190902',
        urlText: '컬리 동물복지 달걀 더 알아보기',
        imgUrl: `${imgUrl}/200714/pc/img_mark2.jpg`,
        imgUrlMo: `${imgUrl}/200714/m/img_mark2.jpg`,
      },
      {
        id: 2,
        title: 'MSC 인증',
        text: '해양 관리 협의회(Marine Stewardship Council)가 수산물을 고갈시키는 남획·불법 어획·혼획을 방지하고 해양 환경 파괴를 최소화하는 지속가능어업에서 생산한 수산물임을 인증합니다.',
        imgUrl: `${imgUrl}/200714/pc/img_mark3.jpg`,
        imgUrlMo: `${imgUrl}/200714/m/img_mark3.jpg`,
      },
      {
        id: 3,
        title: 'ASC 인증',
        text: '세계 양식 책임 관리회(Aquaculture Stewardship Council)가 양식의 과밀화로 인한 해양 오염과 생태계 파괴를 최소화하는, 책임 있는 양식 수산업에서 생산한 수산물임을 인증합니다.',
        imgUrl: `${imgUrl}/200714/pc/img_mark4.jpg`,
        imgUrlMo: `${imgUrl}/200714/m/img_mark4.jpg`,
      },
    ],
  },
  {
    id: 1,
    title: '2. 인증 외 지속 가능한 상품',
    text: `
      <strong>환경과 사회에 선한 영향을 주는 상품</strong>
      <ul>
        <li>유기농법, 자연 순환 농법 등 환경에 영향을 덜 주는 방식으로 생산되는 농·축·수산물 상품</li>
        <li>음식, 포장재 등의 폐기물량을 줄이는 데 기여하는 상품</li>
        <li>환경에 영향을 덜 주는 재활용ㆍ친환경 소재를 활용한 상품</li>
        <li>생산자의 경제적 자립과 노동자의 생활 및 근무 조건을 개선하는 데에 기여하는 상품</li>
        <li>상품의 수익금이 산지 후원에 쓰여 지역사회 환경 개선에 기여하는 상품</li>
        <li>상품의 구매가 환경, 사회, 특정 사회적 약자 그룹에 긍정적인 영향을 주는 상품</li>
      </ul>
    `,
  },
];

export const PACKAGING_MATERIALS_LIST: PackagingMaterials[] = [
  {
    id: 0,
    title: '2017.04 | ECO BOX V1',
    text: `
      <strong class="tit">냉동ㆍ냉장 스티로폼 박스 → 냉장 박스만 종이 박스로 변경</strong>
      <ul>
        <li>박스 내부 은박 비닐로 보냉력 유지</li>
        <li>외부 종이와 내부 비닐로 분리해 배출</li>
      </ul>
    `,
    imgUrl: `${imgUrl}/210801/pc/img_list3_1.jpg`,
    imgUrlMo: `${imgUrl}/200714/m/img_package.jpg`,
  },
  {
    id: 1,
    title: '2019.01 | ECO BOX V2ㆍV3',
    text: `
      <strong class="tit">외부 종이, 내부 비닐 냉장 박스 → 재생지 냉장 박스</strong>
      <ul>
        <li>이중 골판지 공기층 구조로 보냉력 유지</li>
        <li>발수 코팅으로 품질 유지</li>
        <li>종이로 분리배출</li>
      </ul>
    `,
    imgUrl: `${imgUrl}/210801/pc/img_list3_2.jpg`,
    imgUrlMo: `${imgUrl}/200714/m/img_package2.jpg`,
  },
  {
    id: 2,
    title: '2019.09 | All Paper Challenge',
    text: `
      <strong class="tit">재생지 냉장 박스 → 모든 배송 포장재를 종이로 변경</strong>
      <ul>
        <li>신선함을 지키는 보냉력과 내구성은 그대로 유지</li>
        <li>비닐 파우치/지퍼백, 박스 테이프, 비닐 완충 포장재까지<br> 종이 소재로 변경</li>
        <li>지속 가능한 산림 경영을 위한 FSC 인증 종이 사용 </li>
        <li>연간 비닐 사용량 약 831톤, 스티로폼 사용량 약 4,000톤<br> 감소 효과 (2019-2020)</li>
      </ul>
    `,
    imgUrl: `${imgUrl}/210801/pc/img_list3_3.jpg`,
    imgUrlMo: `${imgUrl}/210801/m/img_package3.jpg`,
  },
  {
    id: 3,
    title: '2021.05 | Kurly Purple Box',
    text: `
      <strong class="tit">종이 포장재 → 지속적으로 재사용 가능한 포장재</strong>
      <p>
        상품을 신선하고, 안전하게 전하면서도 오래 사용할 수 있는 포장
        재를 고심한 끝에 컬리는 종이 박스를 대신할 수 있는 퍼플 박스를
        개발했습니다.
      </p>
    `,
    subText: `
      <div class="info_box">
        <strong class="tit_sub">컬리 퍼플 박스가 좋은 이유</strong>
        <ul class="list_sub">
          <li>일회용 포장재 양이 줄어드는 <span>친환경 배송</span></li>
          <li>100% 워터 아이스팩으로 약 11시간 유지되는 <span>보냉력</span></li>
          <li>디바이더로 <span>냉장, 냉동 상품을 분리해 배송</span></li>
          <li>세척이 쉬운 소재로 만들어 <span>위생적이고 편리한 사용</span></li>
        </ul>
      </div>
    `,
    imgUrl: `${imgUrl}/210801/pc/img_list3_4.jpg`,
    imgUrlMo: `${imgUrl}/210801/m/img_package4.jpg`,
  },
];

export const CLASSROOM_FOREST_TEXT = `
  어린이의 폐는 성인에 비해 초미세먼지에 4배 이상 취약하지만 아직 초등학교 내에 미세먼지 방지를 위한 시설은 부족합니다.<br /><br />
  그래서 컬리는 샛별배송에서 회수한 종이 박스 재활용 수익금으로 미세먼지에 취약한 지역 사회 어린이들이 학교에서 마음 편히 숨 쉴 수 있도록 교실 숲을 조성했습니다.<br /><br />
  소셜 벤처 트리플래닛과 함께 전국 초등학교 교실마다 공급한 10그루의 공기 정화 식물로, 컬리는 아이들에게 미세먼지 걱정 없는 환경과 반려 식물로 높아지는 환경 감수성까지 선물할 수 있었습니다.
`;

export const CLASSROOM_FOREST_LIST: TextContent[] = [
  {
    id: 0,
    text: `
      <strong>2019.10 <span class="bar">|</span> 서울 월곡초등학교</strong>
      <p><span class="text">학급 수 : 30학급</span> 학생 수 : 496명</p>
    `,
  },
  {
    id: 1,
    text: `
      <strong>2020.06 <span class="bar">|</span> 인천 청라초등학교</strong>
      <p><span class="text">학급 수 : 25학급</span> 학생 수 : 650명</p>
    `,
  },
  {
    id: 2,
    text: `
      <strong>2020.07 <span class="bar">|</span> 서울 신북초등학교</strong>
      <p><span class="text">학급 수 : 37학급</span> 학생 수 : 893명</p>
    `,
  },
  {
    id: 3,
    text: `
      <strong>2020.08 <span class="bar">|</span> 아산 탕정미래초등학교</strong>
      <p><span class="text">학급 수 : 48학급</span> 학생 수 : 880명</p>
    `,
  },
];

export const CLASSROOM_FOREST_THUMB: ImageContent[] = [
  {
    id: 0,
    imgUrl: `${imgUrl}/210801/pc/img_slide1.jpg`,
    imgUrlMo: `${imgUrl}/210801/m/img_slide_tree1.png`,
  },
  {
    id: 1,
    imgUrl: `${imgUrl}/210801/pc/img_slide2.jpg`,
    imgUrlMo: `${imgUrl}/210801/m/img_slide_tree2.png`,
  },
  {
    id: 2,
    imgUrl: `${imgUrl}/210801/pc/img_slide3.jpg?ver=2`,
    imgUrlMo: `${imgUrl}/210801/m/img_slide_tree3.png`,
  },
  {
    id: 3,
    imgUrl: `${imgUrl}/210801/pc/img_slide4.jpg`,
    imgUrlMo: `${imgUrl}/210801/m/img_slide_tree4.png`,
  },
  {
    id: 4,
    imgUrl: `${imgUrl}/210801/pc/img_slide5.jpg`,
    imgUrlMo: `${imgUrl}/210801/m/img_slide_tree5.png`,
  },
];

export const STAR_FOREST_TEXT = `
  아이들을 위한 교실 숲보다 더 많은 분들께 깨끗한 공기를 선물하고 싶은 마음을 담아 컬리는 2021년 도심 속 샛별숲 조성으로 프로젝트를 확대했습니다.
  <div class="box">
    <strong>도심 속 샛별숲 조성 효과</strong>
    <ul>
      <li>도심 내 미세먼지 26% 저감</li>
      <li>산소 공급 &amp; 분진 흡착 효과</li>
      <li>여름 한낮 평균 기온 3~7℃ 완화</li>
    </ul>
    <p>*출처: 산림청 및 국립산림과학원</p>
  </div>
`;

export const STAR_FOREST_LIST: TextContent[] = [
  {
    id: 0,
    text: `
      <strong>2021.04 <span class="bar">|</span>서울 마포구 성산동 문화비축기지 유아숲 체험원</strong>
    `,
  },
  {
    id: 1,
    text: `
      <strong>2022.04 <span class="bar">|</span>서울 성동구 뚝섬로 273 서울숲 물놀이터 옆, 호수 남쪽 산책로</strong>
    `,
  },
];

export const STAR_FOREST_THUMB: ImageContent[] = [
  {
    id: 0,
    imgUrl: `${imgUrl}/210801/pc/img_slide6.jpg?ver=2`,
    imgUrlMo: `${imgUrl}/210801/m/img_slide_tree6.png`,
  },
  {
    id: 1,
    imgUrl: `${imgUrl}/210801/pc/img_slide7.jpg?ver=2`,
    imgUrlMo: `${imgUrl}/210801/m/img_slide_tree7.png`,
  },
  {
    id: 2,
    imgUrl: `${imgUrl}/210801/pc/img_slide8.jpg?ver=2`,
    imgUrlMo: `${imgUrl}/210801/m/img_slide_tree8.png`,
  },
  {
    id: 3,
    imgUrl: `${imgUrl}/210801/pc/img_slide9.jpg?ver=2`,
    imgUrlMo: `${imgUrl}/210801/m/img_slide_tree9.png`,
  },
];
