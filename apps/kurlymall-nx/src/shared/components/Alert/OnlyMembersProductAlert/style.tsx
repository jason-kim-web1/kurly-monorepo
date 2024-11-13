import { isPC } from '../../../../../util/window/getDevice';

export const membersAlertInnerStyle = isPC
  ? `
    .popup-content {
      height: auto;
      min-width: 440px;
      overflow-x: hidden;
      padding: 30px;
      border-radius: 12px;
      box-shadow: none;
      text-align: left;
      background-color: white;
    }
    `
  : `
    .popup-content {
      width: 100%;
      overflow-x: hidden;
      padding: 16px;
      border-radius: 12px;
      box-shadow: none;
      &.MuiPaper-root {
        margin: 20px;
      }
    }
    `;
