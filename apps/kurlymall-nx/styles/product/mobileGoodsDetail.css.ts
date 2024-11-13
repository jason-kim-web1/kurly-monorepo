import { css } from '@emotion/react';

import { RESOURCE_URL } from '../../src/shared/configs/config';

import COLOR from '../../src/shared/constant/colorset';

export const mobileEventBannerStyles = css`
  // 신규 증정 서비스지만 앱 구버전을 지원하기 위한 css 입니다.
  .banner_view_event {
    margin: -4px 10px -20px;
    border: 1px solid ${COLOR.kurlyGray250};

    p {
      font-size: 13px;
      font-weight: 400;
      display: flex;
      align-items: center;
      line-height: 18px;
      flex-wrap: wrap;
      word-break: break-all;
    }

    .ql-size-large {
      font-size: 16px;
      line-height: 22px;
    }

    .ql-size-small {
      font-size: 11px;
      line-height: 14px;
    }

    strong {
      font-weight: 600;
    }
  }

  .banner_view_event .banner {
    position: relative;
    width: 100%;
    display: flex;
    height: 98px;
  }

  .banner_view_event .banner_event_icon {
    position: absolute;
    left: -2px;
    top: -2px;
    width: 78px;
    height: 78px;
    background: url(${RESOURCE_URL}/kurly/img/2023/img_contents_box_event_mobile.svg) no-repeat 0 0;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }

  .banner_view_event .banner_content {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: 0px 40px;
    gap: 12px;
  }

  .banner_view_event .banner_content .banner_text {
    overflow: hidden;
    max-width: 146px;
    max-height: 88px;
  }

  .banner_view_event .banner_content p {
    display: block;
    width: 100%;
    height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .banner_view_event .banner_image {
    width: 96px;
    height: 96px;
  }

  .banner_view_event .arrow_button {
    overflow: hidden;
    position: absolute;
    top: 40%;
    right: 16px;
    width: 24px;
    height: 24px;
    background: url(${RESOURCE_URL}/kurly/img/2023/icon_arrow_bottom.svg) no-repeat 0 0;
    background-size: 24px 24px;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }

  .banner_view_event .content {
    display: flex;
    flex-direction: column;
    max-height: 0;
    border-top: 1px solid ${COLOR.kurlyWhite};
    opacity: 0;
    transition: border 0.3s, max-height 0.3s ease-in-out, opacity 0.5s ease-in-out;
    overflow: hidden;
  }

  .banner_view_event .content.open {
    border-top: 1px solid ${COLOR.kurlyGray250};
    max-height: 9999px;
    opacity: 1;
    transition: border 0.3s, max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  .banner_view_event .btn_close {
    background: url(${RESOURCE_URL}/kurly/img/2023/icon_arrow_bottom.svg) no-repeat 0 0;
    transform: rotate(180deg);
  }

  .banner_view_event .content .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 32px 16px 0px;

    p {
      justify-content: center;
      text-align: center;
    }
  }

  .banner_view_event .main .main_image {
    margin: 16px 0 12px;
  }

  .banner_view_event .main .term {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    border-top: 1px solid ${COLOR.kurlyGray350};
    border-bottom: 1px solid ${COLOR.kurlyGray350};
    margin: 16px 0 32px;
    padding: 6px 0;
    font-size: 13px;
    line-height: 18px;
    word-break: break-all;
  }

  .banner_view_event .event_notice {
    background-color: ${COLOR.kurlyGray150};
    padding: 16px 15px 23px;
  }

  .banner_view_event .event_notice .title_notice:before {
    content: '';
    background: url(${RESOURCE_URL}/kurly/img/2023/icon_info_fill.svg) no-repeat 0 0;
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    margin: 0px 4px;
  }

  .banner_view_event .event_notice .title_notice {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: fit-content;
    height: 24px;
    margin-bottom: 12px;
    padding-right: 8px;
    background-color: ${COLOR.kurlyGray500};
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    color: ${COLOR.kurlyWhite};
  }

  // 구 증정 서비스 관련 스타일입니다.
  .bnr_viewevent {
    margin-bottom: 13px;
    padding: 0 3px 0 1.5px;
    text-align: center;
  }
  .bnr_viewevent .inner_viewevent {
    position: relative;
    width: 100%;
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
    top: 46%;
    right: 7%;
    width: 20px;
    height: 12px;
    background: url(https://res.kurly.com/images/common/old/goods/common/btn_view_event_on.png) no-repeat 0 0;
    background-size: 20px 12px;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }
  .bnr_viewevent .btn_close {
    background: url(https://res.kurly.com/images/common/old/goods/common/btn_view_event_off.png) no-repeat 0 0;
    background-size: 20px 12px;
  }
  .bnr_viewevent .view_event {
    margin-left: 2px;
    padding: 0 1px;
    background: url(https://res.kurly.com/images/common/old/goods/common/bg_view_event.png) repeat-y 0 0;
    background-size: 100% 100%;
    border-bottom: 1px solid #c4c4c4;
    font-family: 'Noto Sans KR';
    font-weight: 300;
    color: #2f2f2f;
    text-align: center;
    transition: all 0.8s ease-in-out;
    height: 0;
    min-height: 0;
    opacity: 0;
  }
  .bnr_viewevent .view_event.open {
    transition: all 0.7s ease-in-out;
    height: auto;
    min-height: 470px;
    opacity: 1;
  }
  .bnr_viewevent .view_event b,
  .bnr_viewevent .view_event em {
    font-weight: 500;
    font-family: 'Noto Sans KR';
    font-style: normal;
  }
  .bnr_viewevent .view_event .tit {
    padding-top: 25px;
    margin-bottom: -3px;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -1px;
    font-family: 'Noto Sans KR';
  }
  .bnr_viewevent .view_event .time {
    margin: 0 23px 24px;
    padding: 4px 0;
    border-top: 1px solid #ceced0;
    border-bottom: 1px solid #ceced0;
    font: 13px/20px 'Noto Sans KR';
    font-weight: 500;
    letter-spacing: -1px;
  }
  .bnr_viewevent .view_event .event_notice {
    padding: 24px 20px 21px 15px;
    background-color: #f7f7f7;
    text-align: left;
  }
  .bnr_viewevent .view_event .tit_notice {
    display: block;
    overflow: hidden;
    width: 89px;
    height: 20px;
    margin: 0 0 7px 7px;
    background: url(https://res.kurly.com/images/common/old/goods/common/tit_view_event_notice.png) no-repeat 0 0;
    background-size: 89px 20px;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }
  .bnr_viewevent .view_event .desc {
    font-size: 11px;
    line-height: 17px;
    letter-spacing: -1px;
  }
  .bnr_viewevent .view_event .desc i {
    display: inline-block;
    padding-left: 10px;
    text-indent: -5px;
    text-decoration: none;
    font-style: normal;
    font-family: 'Noto Sans KR';
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
  @media only screen and (max-width: 320px) {
    /* 아이폰5이하 */
    .bnr_viewevent .view_event .tit {
      font-size: 12px;
      line-height: 18px;
    }
    .bnr_viewevent .view_event .time {
      font-size: 12px;
      line-height: 18px;
    }
    .bnr_viewevent .view_event .desc {
      font-size: 10px;
      line-height: 16px;
    }
  }
  .bnr_goodsview {
    padding-top: 4px;
  }
  .bnr_goodsview .bnr_viewnotice {
    padding: 26px 3px 50px;
    margin: 0 auto;
    text-align: center;
  }
  .bnr_goodsview .bnr_viewnotice img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
`;

export const mobileProductDetailStyles = css`
  .after:after {
    content: ' ';
    display: block;
    height: 0;
    clear: both;
  }
  .clearb {
    clear: both;
  }
  .no_write {
    padding: 60px;
    text-align: center;
    font-weight: 500;
  }
  .add-input {
    width: 100%;
    height: 35px;
    border: 1px solid #cfcfcf;
    border-bottom: 0;
    border-radius: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-indent: 5px;
  }
  #dimmed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 210;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
  }
  .txt_red {
    color: red;
  }

  #goodsNotice {
    position: relative;
    margin-top: 30px;
    padding-bottom: 50px;
    font-family: 'Noto Sans KR';
    font-weight: 400;
    letter-spacing: 0;
  }
  #goodsNotice .goods_notice {
    margin: 0 10px;
    padding: 24px 24px 29px;
    border: 1px solid #b9b9b9;
  }
  #goodsNotice .tit {
    overflow: hidden;
    position: absolute;
    left: 26px;
    top: -12px;
    padding: 0 9px;
    background-color: #fff;
    font-weight: 700;
    font-size: 16px;
    color: #666;
    line-height: 20px;
    white-space: nowrap;
  }
  #goodsNotice .desc {
    font-size: 14px;
    color: #333;
    line-height: 21px;
  }
  #goodsNotice .thumb {
    display: block;
    width: 38%;
    margin: 6px auto 10px;
    background-color: #d8d8d8;
  }
  #goodsNotice .thumb_item {
    display: block;
    width: 100%;
  }

  /* 데일리 메인 */
  .goods_wrap {
    margin: 0 auto;
    padding: 0 10px;
    font-family: 'Noto Sans KR';
    font-weight: 300;
    letter-spacing: 0;
  }
  .goods_wrap .context {
    margin: 0 0 90px;
    font-size: 14px;
    line-height: 23px;
    color: #373737;
  }
  .goods_wrap .context h3 {
    font-family: 'Noto Sans KR', 'AppleGothic';
    font-weight: 500;
    letter-spacing: -1px;
  }
  .goods_wrap .context .words {
    margin: 36px 0;
    letter-spacing: 0;
  }
  .goods_wrap .context .words img {
    width: 100%;
  }
  .goods_wrap .context h3,
  .goods_wrap .context strong,
  .goods_wrap .context b {
    font-weight: 500;
  }

  .goods_wrap .bnr_viewnotice {
    padding: 26px 3px 50px;
    margin: 0 auto;
    text-align: center;
  }
  .goods_wrap .bnr_viewnotice img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }

  .goods_wrap iframe {
    width: 100%;
    max-height: 202px;
  }

  /*intro*/
  .goods_wrap .goods_intro .context h3 {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    display: block;
    margin-top: 48px;
    padding-bottom: 24px;
    font-size: 26px;
    line-height: 32px;
    text-align: center;
    border-bottom: 1px solid #c1c1c1;
    color: #666;
  }
  .goods_wrap .goods_intro .context h3 small {
    display: block;
    font-size: 20px;
    margin-bottom: 7px;
    line-height: 22px;
  }
  .goods_wrap .goods_intro .context .words {
    margin-top: 24px;
  }
  .goods_wrap .goods_checklist {
    margin-top: 140px;
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
    background: url(https://res.kurly.com/images/common/old/etc/kurly_fied/ico_check.jpg) no-repeat;
  }
  .goods_wrap .info_list p {
    float: left;
    width: 834px;
  }

  /*btn event area*/
  .bnr_viewevent {
    margin-bottom: 70px;
    text-align: center;
  }
  .bnr_viewevent img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
  .bnr_viewevent .view_event {
    display: none;
  }

  /*tip*/
  .goods_wrap .goods_tip {
    margin-left: 1px;
    margin-right: 1px;
    margin-bottom: 100px;
  }
  .goods_wrap .goods_tip h3 {
    display: inline-block;
    position: relative;
    z-index: 10;
    font-size: 30px;
    padding-left: 12px;
    font-weight: 500;
    font-family: 'Noto Sans KR';
    color: #666;
    letter-spacing: -0.5px;
    text-shadow: 1px 0;
  }
  .goods_wrap .goods_tip h3 span {
    position: relative;
    z-index: 10;
    display: inline-block;
    padding: 0 10px;
    font-size: 18px;
    background: #fff;
    letter-spacing: -0.5px;
  }
  .goods_wrap .goods_tip .tip_box {
    margin-top: -9px;
    border: 1px solid #b9b9b9;
  }
  .goods_wrap .goods_tip .tip_box .context {
    margin: 30px 20px 20px;
  }
  .goods_wrap .goods_tip .tip_box .words + .words {
    margin-top: 25px;
  }
  .goods_wrap .tip_box strong {
    font-family: 'Noto Sans KR';
    display: block;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 5px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  .goods_wrap .tip_box .context .words {
    margin: 0;
    font-size: 14px;
    line-height: 23px;
    word-break: normal;
  }
  .goods_wrap .tip_box .context .pic {
    margin-top: 30px;
  }
  .goods_wrap .tip_box .context .words i {
    display: inline-block;
    padding-left: 10px;
    font-style: normal;
    text-indent: -11px;
  }
  .goods_wrap .tip_box .context .words b {
    font-weight: 400;
    font-family: 'Noto Sans KR';
  }

  /*pick*/
  /*goods point*/
  .goods_wrap .goods_pick h3,
  .goods_point h3 {
    display: inline-block;
    position: relative;
    z-index: 10;
    font-size: 22.5px;
    width: 100%;
    margin-bottom: 50px;
    font-weight: 500;
    font-family: 'Noto Sans KR';
    color: #666;
    text-align: center;
  }
  .goods_wrap .goods_pick h3 span,
  .goods_point h3 span {
    position: relative;
    z-index: 10;
    display: inline-block;
    padding: 0 10px;
    background: #fff;
    text-align: center;
    letter-spacing: -1px;
    text-shadow: 1px 0;
  }
  .goods_wrap .goods_pick h3:before,
  .goods_point h3:before {
    content: ' ';
    position: absolute;
    z-index: 1;
    top: 13px;
    height: 1px;
    background: #b9b9b9;
    left: 0;
    right: 0;
  }
  .goods_wrap .goods_pick .sub_tit {
    line-height: 24px;
  }
  .goods_wrap .goods_pick .pick_items {
    display: block;
    margin-top: 16px;
  }
  .goods_wrap .goods_pick .context .words + .pic {
    margin-top: 50px;
  }

  /*recipe*/
  .goods_wrap .goods_recipe h3 {
    display: block;
    font-family: 'Noto Sans KR';
    padding-bottom: 50px;
    font-size: 50px;
    font-weight: 500;
    text-align: center;
    color: #666;
  }
  .goods_wrap .goods_recipe .recipe_tit {
    display: block;
    font-size: 22.5px;
    font-weight: 500;
    text-shadow: 1px 0;
    line-height: 33px;
    padding-bottom: 10px;
  }
  .goods_wrap .goods_recipe .recipe_tit .txt_up {
    position: relative;
    padding-right: 6px;
  }
  .goods_wrap .goods_recipe .recipe_tit .txt_up:after {
    content: '’';
    position: absolute;
    right: -1px;
    top: 4px;
  }
  .goods_wrap .goods_recipe .recipe_product {
    display: inline-block;
    border-top: 1px solid #b1b1b1;
    padding-top: 10px;
    min-width: 153px;
  }
  .goods_wrap .goods_recipe h3 small.recipe_product {
    font-size: 18px;
    line-height: 24px;
    vertical-align: top;
  }
  .goods_wrap .goods_recipe .context .words {
    margin-top: 36px;
  }
  .goods_wrap .goods_recipe .context .words + .words {
    margin-top: 30px;
  }
  .goods_wrap .goods_recipe .context .recipe_item_tit {
    display: block;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 500;
    font-family: 'Noto Sans KR';
    color: #666;
    text-shadow: 1px 0;
  }
  .goods_wrap .recipe_area .recipe_item {
    display: inline-block;
    margin-top: 30px;
    color: #666;
    font-size: 16px;
    font-family: 'Noto Sans KR';
  }
  .recipe-view-wrapper.goods_wrap .goods_recipe {
    padding-top: 50px;
  }
  /*note*/
  .goods_wrap .goods_point h3 {
    letter-spacing: -1px;
  }
  .goods_wrap .goods_note h3 {
    display: inline-block;
    position: relative;
    z-index: 10;
    font-size: 22.5px;
    width: 100%;
    margin-bottom: 50px;
    font-weight: 500;
    font-family: 'Noto Sans KR';
    color: #666;
    padding: 0 4px;
  }
  .goods_wrap .goods_note h3 span {
    position: relative;
    z-index: 10;
    display: inline-block;
    padding-right: 10px;
    padding-left: 0;
    background: #fff;
  }
  .goods_wrap .goods_note h3:before {
    content: ' ';
    position: absolute;
    z-index: 1;
    top: 13px;
    height: 1px;
    background: #b9b9b9;
    left: 15px;
    right: 0;
  }
  .goods_wrap .goods_note .words {
    margin: 0;
  }
  .goods_wrap .goods_note .pic {
    margin-bottom: 36px;
  }

  /*brand*/
  .goods_wrap .about_brand h3 {
    display: inline-block;
    position: relative;
    z-index: 10;
    font-size: 22.5px;
    width: 100%;
    margin-bottom: 50px;
    font-weight: 500;
    font-family: 'Noto Sans KR';
    color: #666;
    text-align: center;
  }
  .goods_wrap .about_brand h3 span {
    position: relative;
    z-index: 10;
    display: inline-block;
    padding: 0 10px;
    background: #fff;
    text-align: center;
    letter-spacing: -1px;
  }
  .goods_wrap .about_brand h3:before {
    content: ' ';
    position: absolute;
    z-index: 1;
    top: 13px;
    height: 1px;
    background: #b9b9b9;
    left: 0;
    right: 0;
  }
  .goods_wrap .sub_tit {
    font-family: 'Noto Sans KR';
    display: block;
    margin-bottom: 16px;
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
  }
  .goods_wrap .about_brand .context .pic {
    margin-bottom: 36px;
  }
  .goods_wrap .about_brand .context .words {
    margin: 0 0 54px;
  }

  .context {
    margin-bottom: 70px;
  }
  .context.last {
    margin-bottom: 100px;
  }
  .event_item_tit {
    display: block;
    margin: 13px 0 4px;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    line-height: 1.2;
  }
  .event_item_desc {
    margin-bottom: 15px;
    font-size: 12px;
    line-height: 16px;
  }
  .event_term {
    font-size: 12px;
    line-height: 16px;
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
    font-family: 'Noto Sans KR';
    display: block;
    padding: 0;
    font-size: 13px;
    font-weight: 500;
    line-height: 17px;
  }
  .event_term dd {
    display: block;
    padding: 0;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 16px;
  }

  /*certification button*/
  .goods_wrap .certification_area {
    margin: 40px 0 70px;
  }
  .goods_wrap .button_area .showSingle {
    padding: 10px;
    background-color: #fff;
    color: #5f0080;
    border: 1px solid #5f0080;
    text-align: center;
  }
  .goods_wrap .button_area .showSingle.selected {
    background-color: #5f0080;
    color: #fff;
  }
  .goods_wrap .certification_area .button_area .showSingle {
    display: block;
    padding: 6px;
    margin: 0 auto;
    margin-bottom: 6px;
    font-family: 'Noto Sans KR';
    font-weight: 300;
    font-size: 12px;
  }
  .goods_wrap .certification_area .button_area {
    text-align: center;
  }
  .goods_wrap .button_area {
    display: block;
    text-align: center;
  }
  .goods_wrap .certification_area .document_box {
    width: 100%;
  }

  /*video*/
  .goods_wrap .goods_video {
    margin: 0px auto;
    display: block;
    margin-bottom: 90px;
  }

  /* 상품상세_시험성적서 */
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
    padding: 11px 11px 13px;
  }
  #showCertify .tit_certify .ico {
    float: left;
    width: 26px;
    height: 18px;
    margin-top: 1px;
    background: url(https://res.kurly.com/mobile/service/goods/1903/ico_certify_v2.png) no-repeat 50% 50%;
    background-size: 26px 18px;
  }
  #showCertify .tit_certify .txt {
    display: block;
    overflow: hidden;
    padding: 0 10px 0 9px;
    font-weight: 500;
    font-size: 14px;
    color: #333;
    line-height: 18px;
  }
  #showCertify .tit_certify .btn {
    position: absolute;
    right: 6px;
    top: 14px;
    width: 14px;
    height: 14px;
    background: url(https://res.kurly.com/mobile/service/goods/1903/btn_certify.png) no-repeat 50% 50%;
    background-size: 14px 14px;
    -webkit-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
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
    padding: 18px 15px 8px;
    background-color: #f7f7f7;
  }
  #showCertify .view_certify {
    text-align: center;
  }
  #showCertify .view_certify .thumb {
    display: none;
  }
  #showCertify .view_certify .thumb.on {
    padding: 2px 5px 0;
    background-color: #f7f7f7;
    display: block;
  }
  #showCertify .view_certify .thumbZoom {
    width: 100%;
  }
  #showCertify .view_certify .ico_zoom {
    display: block !important;
    overflow: hidden;
    position: absolute;
    right: 5px;
    top: 2px;
    width: 14.4%;
    pointer-events: none;
  }
  #showCertify .view_certify .swiper-slide-active img {
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);
  }
  #showCertify .page_certify {
    display: inline-block;
    position: relative;
    z-index: 1;
    top: -9px;
    width: auto;
    margin: 0 auto;
  }
  #showCertify .page_certify .count {
    font-weight: 500;
    font-size: 12px;
    color: #666;
    line-height: 16px;
  }
  #showCertify .page_certify .page {
    display: none;
  }
  #showCertify .page_certify .btn {
    overflow: hidden;
    position: absolute;
    bottom: -4px;
    width: 40px;
    height: 30px;
    border: 0;
    background: url(https://res.kurly.com/mobile/service/goods/1903/ico_certify_page.png) no-repeat 50% 50%;
    background-size: 16px 16px;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }
  #showCertify .page_certify .btn_prev {
    left: -45px;
  }
  #showCertify .page_certify .btn_next {
    right: -47px;
    -webkit-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
  }

  // swiper
  .swiper-container {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
  }
`;
