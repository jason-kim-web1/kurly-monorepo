import { css } from '@emotion/react';

import { hiddenScrollBar } from '../../src/shared/utils/hidden-scrollbar';

export const pcEventBannerStyles = css`
  .bnr_viewevent {
    position: relative;
    width: 814px;
    padding: 0 0 48px;
    margin: 0 auto;
    text-align: center;
  }
  .bnr_viewevent img {
    vertical-align: top;
  }
  .bnr_viewevent .bnr_thumb {
    display: block;
    margin: 0 auto;
  }
  .bnr_viewevent .btn {
    overflow: hidden;
    position: absolute;
    top: 75px;
    right: 48px;
    width: 33px;
    height: 20px;
    background: url(/shop/data/images/icon/ico_view_bnr_event.png) no-repeat 0 0;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }
  .bnr_viewevent .btn_close {
    background-position: 0 -50px;
  }
  .bnr_viewevent .view_event {
    width: 810px;
    margin-left: 4px;
    border: 2px solid #c4c4c4;
    font-family: 'Noto Sans KR';
    font-weight: 300;
    text-align: center;
    border-top: 0 none;
    color: #2f2f2f;
    text-align: center;
    transition-property: height, min-height, opacity;
    transition-duration: 0.5s, 0.5s, 0.2s;
    transition-timing-function: ease-out;
    height: 0;
    min-height: 0;
    opacity: 0;
  }
  .view_event.open {
    transition-property: height, min-height, opacity;
    transition-duration: 0.5s, 0.5s, 0.2s;
    transition-timing-function: ease-out;
    height: auto;
    min-height: 470px;
    opacity: 1;
  }
  .bnr_viewevent .view_event b,
  .bnr_viewevent .view_event em {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-style: normal;
  }
  .bnr_viewevent .view_event .tit {
    padding-top: 48px;
    margin-bottom: -3px;
    font-size: 20px;
    line-height: 29px;
    letter-spacing: -1px;
  }
  .bnr_viewevent .view_event .time {
    width: 674px;
    margin: 0 auto 48px;
    padding: 13px 0 14px;
    border-top: 1px solid #ceced0;
    border-bottom: 1px solid #ceced0;
    font-size: 19px;
    line-height: 25px;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    letter-spacing: -1px;
  }
  .bnr_viewevent .view_event .event_notice {
    padding: 36px 64px 30px;
    background-color: #e0e0e0;
    text-align: left;
  }
  .bnr_viewevent .view_event .event_notice span {
    padding-left: 10px;
    text-indent: -10px;
  }
  .bnr_viewevent .view_event .tit_notice {
    display: block;
    overflow: hidden;
    width: 129px;
    height: 28px;
    margin: 0 0 9px 4px;
    background: url(/shop/data/images/icon/ico_view_bnr_event.png) no-repeat 0 -100px;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }
  .bnr_viewevent .view_event .desc {
    font-size: 15px;
    line-height: 27px;
    letter-spacing: -1px;
  }
  .bnr_viewevent .view_event .desc i {
    display: inline-block;
    padding-left: 10px;
    text-indent: -10px;
    text-decoration: none;
    font-style: normal;
  }
  .bnr_viewevent .view_event .desc b {
    font-family: 'Noto Sans KR';
    font-weight: 500;
  }
  .bnr_viewevent .view_event font {
    font-size: 20px;
  }
  .bnr_viewevent .view_event font[size='1'] {
    font-size: 11px;
  }
  .bnr_viewevent .view_event font[size='2'] {
    font-size: 12px;
  }
  .bnr_viewevent .view_event font[size='3'] {
    font-size: 13px;
  }
  .bnr_viewevent .view_event font[size='4'] {
    font-size: 14px;
  }
  .bnr_viewevent .view_event font[size='5'] {
    font-size: 15px;
  }
  .bnr_viewevent .view_event font[size='6'] {
    font-size: 16px;
  }
  .bnr_viewevent .view_event font[size='7'] {
    font-size: 17px;
  }
  .bnr_goodsview {
    padding-top: 74px;
  }
  .bnr_goodsview .bnr_viewnotice {
    width: 810px;
    padding-bottom: 120px;
    margin: 0 auto;
    text-align: center;
    margin-top: -14px;
  }
  .view_recipe {
    padding: 150px 10px 10px;
  }
  .btn_exchange {
    margin-top: 23px;
  }

  /* KMF-1446 선물하기 이미지 고정노출 */
  .bnr_goodsview + .bnr_goodsview {
    padding-top: 0;
  }
  .bnr_goodsview .notice_gift {
    width: 810px;
    padding-bottom: 120px;
    margin: 0 auto;
    text-align: center;
    margin-top: -14px;
  }
  .bnr_goodsview .notice_gift img {
    display: block;
    margin: 0 auto;
  }
`;

export const pcProductDetailStyles = css`
  /* 상품상세 */
  .goods_wrap {
    width: 1010px;
    margin: 0 auto;
    font-family: 'Noto Sans KR';
    font-weight: 300;
    letter-spacing: 0;
  }
  .goods_wrap .context .words {
    margin-top: 55px;
    font-size: 18px;
    line-height: 32px;
    color: #373737;
  }
  .goods_wrap .context h3,
  .goods_wrap .context strong,
  .goods_wrap .context b {
    font-weight: 500;
  }

  .goods_wrap .bnr_viewnotice {
    width: 100%;
    max-width: 810px;
    padding-bottom: 120px;
    margin: 0 auto;
    text-align: center;
  }

  .goods_wrap iframe {
    width: 100%;
  }

  .goods_wrap .pic {
    text-align: center;
  }

  /*intro*/
  .goods_wrap .goods_intro .context h3 {
    display: block;
    margin: 75px 0 0 0;
    padding-bottom: 35px;
    font-size: 38px;
    line-height: 46px;
    text-align: center;
    border-bottom: 1px solid #c1c1c1;
    color: #666;
  }
  .goods_wrap .goods_intro .context h3 small {
    display: block;
    font-size: 24px;
    margin-bottom: 14px;
    line-height: 15px;
  }
  .goods_wrap .goods_intro .context .words {
    margin-top: 28px;
  }
  .goods_wrap .goods_checklist {
    margin-top: 130px;
  }
  .goods_wrap .goods_checklist h3 {
    display: inline-block;
    position: relative;
    z-index: 10;
    font-size: 30px;
    width: 100%;
    font-weight: 500;
    font-family: 'Noto Sans KR';
    color: #666;
  }
  .goods_wrap .goods_checklist h3 span {
    position: relative;
    z-index: 10;
    display: inline-block;
    padding-right: 15px;
    background: #fff;
  }
  .goods_wrap .goods_checklist h3:before {
    content: ' ';
    position: absolute;
    z-index: 1;
    top: 20px;
    width: 100%;
    height: 1px;
    background: #b9b9b9;
  }
  .goods_wrap .info_list {
    margin-top: 28px;
  }
  .goods_wrap .info_list li {
    overflow: hidden;
    margin-top: 25px;
    overflow: hidden;
    margin-top: 25px;
    padding-left: 30px;
  }
  .goods_wrap .info_list strong {
    float: left;
    position: relative;
    display: inline-block;
    width: 100%;
  }
  .goods_wrap .info_list strong:before {
    content: ' ';
    position: absolute;
    top: 3px;
    left: -30px;
    display: block;
    width: 26px;
    height: 26px;
    background: url(/shop/data/images/kurly_fied/ico_check.jpg) no-repeat;
  }
  .goods_wrap .info_list p {
    float: left;
    width: 834px;
  }

  /*tip*/
  .goods_wrap .goods_tip {
    margin-bottom: 170px;
  }
  .goods_wrap .goods_tip h3 {
    display: inline-block;
    position: relative;
    z-index: 10;
    font-size: 30px;
    padding-left: 48px;
    font-weight: 500;
    font-family: 'Noto Sans KR';
    color: #666;
    letter-spacing: 1px;
  }
  .goods_wrap .goods_tip h3 span {
    position: relative;
    z-index: 10;
    display: inline-block;
    padding: 0 10px;
    font-size: 36px;
    background: #fff;
    text-shadow: 2px 0;
  }
  .mac_os .goods_wrap .goods_tip h3 span {
    text-shadow: 0 0;
  }
  .goods_wrap .goods_tip .tip_box {
    margin-top: -15px;
    border: 1px solid #b9b9b9;
  }
  .goods_wrap .goods_tip .tip_box .context {
    margin: 60px 62px;
  }
  .goods_wrap .goods_tip .pic:first-of-type {
    margin-top: 0;
  }
  .goods_wrap .tip_box strong {
    display: block;
    font-size: 25px;
    line-height: 38px;
    margin-bottom: 10px;
  }
  .goods_wrap .tip_box .context .words {
    margin: 0;
    font-size: 18px;
    line-height: 32px;
  }
  .goods_wrap .tip_box .context .words .bullet {
    font-size: 18px;
    line-height: 32px;
  }
  .goods_wrap .tip_box .context .pic {
    margin: 66px 0;
  }
  .goods_wrap .tip_box .context .words i {
    display: inline-block;
    padding-left: 10px;
    font-style: normal;
    text-indent: -14px;
  }
  .goods_wrap .tip_box .context .words b {
    font-weight: 400;
    font-family: 'Noto Sans KR';
  }

  /*pick*/
  /*special point*/
  .goods_wrap .goods_pick h3,
  .goods_point h3 {
    display: inline-block;
    position: relative;
    z-index: 10;
    font-size: 50px;
    width: 100%;
    margin-bottom: 70px;
    font-weight: 400;
    font-family: 'Noto Sans KR';
    color: #666;
  }
  .goods_point h3 span {
    position: relative;
    z-index: 10;
    display: inline-block;
    margin-left: 260px;
    padding: 0 15px;
    background: #fff;
    text-shadow: 2px 0px;
  }
  .mac_os .goods_point h3 span {
    text-shadow: 0 0;
  }
  .goods_wrap .goods_pick h3 span {
    position: relative;
    z-index: 10;
    display: inline-block;
    margin-left: 354px;
    padding: 0 15px;
    background: #fff;
    text-shadow: 2px 0px;
  }
  .mac_os .goods_wrap .goods_pick h3 span {
    text-shadow: 0 0;
  }
  .goods_wrap .goods_pick h3:before,
  .goods_point h3:before {
    content: ' ';
    position: absolute;
    z-index: 1;
    top: 28px;
    width: 100%;
    height: 1px;
    background: #b9b9b9;
  }
  .goods_point h3:before {
    width: 1010px;
  }
  .goods_wrap .goods_pick .context {
    margin-bottom: 130px;
  }
  .goods_wrap .goods_pick .pick_items {
    display: block;
    margin-top: 24px;
  }
  .goods_wrap .goods_pick .words + .pic {
    margin-top: 80px;
  }

  /* recipe */
  .goods_wrap .goods_recipe h3 {
    display: block;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    padding-bottom: 70px;
    font-size: 50px;
    line-height: 46px;
    text-align: center;
    color: #666;
  }
  .goods_wrap .goods_recipe .recipe_tit {
    display: block;
    padding-bottom: 30px;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    color: #666;
    text-shadow: 2px 0px;
  }
  .mac_os .goods_wrap .goods_recipe .recipe_tit {
    text-shadow: 0 0;
  }
  .goods_wrap .goods_recipe .recipe_item_tit {
    display: block;
    padding-bottom: 20px;
    font-size: 24px;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    color: #666;
    text-shadow: 1px 0px;
  }
  .mac_os .goods_wrap .goods_recipe .recipe_item_tit {
    text-shadow: 0 0;
  }
  .goods_wrap .goods_recipe .recipe_product {
    display: inline-block;
    border-top: 1px solid #b1b1b1;
    padding-top: 30px;
    min-width: 342px;
    font-size: 34px;
    line-height: 38px;
    font-weight: 400;
    text-shadow: 1px 0px;
  }
  .mac_os .goods_wrap .goods_recipe .recipe_product {
    text-shadow: 0 0;
  }
  .goods_wrap .goods_recipe .context h3 small.recipe_product {
    font-weight: 400;
    font-size: 34px;
    margin-bottom: 14px;
    line-height: 15px;
  }
  .goods_wrap .recipe_area .recipe_item {
    display: block;
    margin-top: 60px;
    color: #666;
    font-size: 24px;
    font-family: 'Noto Sans KR';
  }

  /*note*/
  .goods_wrap .goods_note h3 {
    display: inline-block;
    position: relative;
    z-index: 10;
    font-size: 50px;
    width: 100%;
    margin-bottom: 70px;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    color: #666;
    text-shadow: 2px 0px;
  }
  .mac_os .goods_wrap .goods_note h3 {
    text-shadow: 0 0;
  }
  .goods_wrap .goods_note h3 span {
    position: relative;
    z-index: 10;
    display: inline-block;
    padding-right: 8px;
    background: #fff;
  }
  .goods_wrap .goods_note h3:before {
    content: ' ';
    position: absolute;
    z-index: 1;
    top: 28px;
    width: 100%;
    height: 1px;
    background: #b9b9b9;
  }
  .goods_wrap .goods_note .sub_tit {
    line-height: 38px;
  }
  .goods_wrap .goods_note .context {
    margin-bottom: 130px;
  }
  .goods_wrap .goods_note .words {
    margin-top: 0;
  }
  .goods_wrap .goods_note .pic {
    margin-bottom: 55px;
  }

  /* about brand 170222*/
  .goods_wrap .about_brand h3 {
    display: inline-block;
    position: relative;
    z-index: 10;
    width: 100%;
    margin-bottom: 70px;
    font-size: 50px;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    color: #666;
  }
  .goods_wrap .about_brand h3 span {
    position: relative;
    z-index: 10;
    display: inline-block;
    margin-left: 341px;
    padding: 0 15px;
    background: #fff;
    text-shadow: 2px 0px;
  }
  .mac_os .goods_wrap .about_brand h3 span {
    text-shadow: 0 0;
  }
  .goods_wrap .about_brand h3:before {
    content: ' ';
    position: absolute;
    z-index: 1;
    top: 28px;
    width: 100%;
    height: 1px;
    background: #b9b9b9;
  }
  .about_brand h3:before {
    width: 1010px;
  }
  .goods_wrap .about_brand .context {
    margin-bottom: 130px;
  }
  .goods_wrap .about_brand .context.last {
    margin-bottom: 170px;
  }
  .goods_wrap .about_brand .context .pic {
    margin-bottom: 60px;
  }
  .goods_wrap .about_brand .context .words {
    margin: 0 0 100px;
  }
  .goods_wrap .pic + .pic {
    margin-top: 40px;
  }
  .goods_wrap .sub_tit {
    display: block;
    margin-bottom: 20px;
    font-size: 30px;
    line-height: 38px;
  }
  .goods_wrap .order_num {
    display: table-cell;
    width: 50px;
  }
  .goods_wrap .option_tit {
    display: table-cell;
  }
  .goods_wrap .context {
    margin-bottom: 130px;
  }
  .goods_wrap .context.last {
    margin-bottom: 170px;
  }
  .goods_wrap .goods_desc .context .words + .words {
    margin-top: 40px;
  }
  .goods_wrap .goods_tip .tip_box .words + .words {
    margin-top: 30px;
  }
  .goods_wrap .goods_recipe .context .words + .words {
    margin-top: 60px;
  }

  /* ???? */
  .event_item_tit {
    display: block;
    margin: 10px 0 6px 0;
    font-family: 'Noto Sans KR';
    font-size: 20px;
    line-height: 1.4;
  }
  .event_item_desc {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 20px;
  }
  .event_term {
    font-size: 14px;
    line-height: 20px;
  }
  .event_caution li::before {
    content: '';
  }
  .event_term dl.event_term {
    width: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
    font-size: 12px;
  }
  .event_term dt {
    display: block;
    font-family: 'Noto Sans KR';
    padding-top: 3px;
    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
  }
  .event_term dd {
    display: inline-block;
    font-family: 'Noto Sans KR';
    font-weight: 300;
    padding: 0;
    margin-bottom: 6px;
  }

  /*certification*/
  .button_area .showSingle {
    padding: 10px;
    text-align: center;
    background-color: #fff;
    color: #5f0080;
    border: 1px solid #5f0080;
  }
  .button_area .showSingle.selected {
    background-color: #5f0080;
    color: #fff;
  }
  .certification_area {
    display: block;
    margin: 0 46px 20px;
  }
  .certification_area .button_area {
    text-align: center;
  }
  .certification_area .button_area button {
    padding: 10px;
    text-align: center;
    background-color: #fff;
    color: #5f0080;
    border: 1px solid #5f0080;
    font-family: 'Noto Sans KR';
    font-weight: 300;
  }

  /*video*/
  .goods_wrap .goods_video {
    margin: 0 auto 170px;
    display: block;
  }

  /* 상품상세_신설고지 */
  #goodsNotice {
    position: relative;
    width: 740px;
    margin: 51px auto 0;
    padding-bottom: 120px;
    font-family: 'Noto Sans KR';
    letter-spacing: 0;
  }
  #goodsNotice .goods_notice {
    padding: 28px 56px 33px;
    border: 1px solid #b9b9b9;
  }
  #goodsNotice .goods_notice:after {
    content: '';
    display: block;
    overflow: hidden;
    clear: both;
  }
  #goodsNotice .tit {
    overflow: hidden;
    position: absolute;
    left: 48px;
    top: -17px;
    max-width: 90%;
    padding: 0 10px 0 9px;
    background-color: #fff;
    font-size: 28px;
    color: #666;
    line-height: 32px;
    white-space: nowrap;
  }
  #goodsNotice .desc {
    overflow: hidden;
    padding-top: 7px;
    font-size: 16px;
    color: #333;
    line-height: 26px;
  }
  #goodsNotice .thumb {
    float: left;
    margin: 1px 50px 0 0;
    background-color: #eee;
  }
  #goodsNotice .thumb_item {
    display: block;
    width: 170px;
  }
  #goodsNotice .no_thumb .desc {
    padding-top: 3px;
  }

  /* 상품상세_인증서 */
  #showCertify {
    padding: 22px 0 20px;
  }
  #showCertify img {
    display: block;
  }
  #showCertify .inner_certify {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  #showCertify .tit_certify {
    display: block;
    overflow: hidden;
    position: relative;
    padding: 18px 20px;
  }
  #showCertify .tit_certify .ico {
    float: left;
    width: 40px;
    height: 28px;
    background: url(https://res.kurly.com/pc/service/goods/1904/ico_certify_x2.png) no-repeat 50% 50%;
    background-size: 40px 28px;
  }
  #showCertify .tit_certify .txt {
    display: block;
    overflow: hidden;
    padding: 3px 66px 0 19px;
    font-weight: 500;
    font-size: 16px;
    color: #333;
    line-height: 20px;
    letter-spacing: -0.3px;
  }
  #showCertify .tit_certify .btn {
    position: absolute;
    right: 0;
    top: -1px;
    width: 66px;
    height: 66px;
    background: url(https://res.kurly.com/pc/service/goods/1904/btn_certify_x2.png) no-repeat 50% 50%;
    background-size: 66px 66px;
    -webkit-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
    transition: transform ease 0.5s;
  }
  #showCertify .on .tit_certify .btn {
    transition: transform ease 0.5s;
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  #showCertify .thumb_certify {
    overflow: hidden;
    background-color: #f7f7f7;
    transition: height ease 0.5s;
  }
  #showCertify .thumb_certify.close {
    height: 0 !important;
    transition: height ease 0.5s;
  }
  #showCertify .view_certify {
    float: left;
    width: 718px;
    margin: 39px 0;
    padding-left: 20px;
  }
  #showCertify .view_certify .thumb {
    display: block;
    width: 698px;
    opacity: 1;
    padding: 2px 5px 0;
    background-color: #f7f7f7;
  }
  #showCertify .view_certify .thumb.off {
    display: none;
  }
  #showCertify .page_certify {
    position: relative;
    float: right;
    width: 154px;
    padding: 35px 56px 40px 0;
  }
  #showCertify .page_certify .page {
    ${hiddenScrollBar({ y: 'auto' })}
    position: relative;
    width: 100%;
  }
  #showCertify .page_certify .list {
    position: absolute;
    right: 0;
    top: 4px;
    transition: top 0.5s;
  }
  #showCertify .page_certify li {
    display: block;
    width: 92px;
    margin: 0 auto 10px;
    border: 1px solid #ddd;
  }
  #showCertify .page_certify li a {
    display: block;
    overflow: hidden;
    width: 100%;
  }
  #showCertify .page_certify .on {
    width: 98px;
    margin: -3px auto 7px;
    border: 4px solid #5f0080;
    box-shadow: 1px 1px 4px 0 rgba(81, 39, 114, 0.5);
  }
  #showCertify .page_certify .btn {
    overflow: hidden;
    position: absolute;
    left: 3px;
    width: 92px;
    height: 40px;
    background: url(https://res.kurly.com/pc/service/goods/1904/ico_certify_page_x2.png) no-repeat 50% 50%;
    background-size: 92px 40px;
    border: 0;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }
  #showCertify .page_certify .btn_prev {
    top: 0;
  }
  #showCertify .page_certify .btn_next {
    bottom: -1px;
    -webkit-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
  }
`;
