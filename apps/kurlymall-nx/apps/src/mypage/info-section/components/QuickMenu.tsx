import styled from '@emotion/styled';

import { MyKurlyCoupon, MyKurlyFrequentPurchase, MyKurlyOrderHistory, MyKurlyPick } from '../../../shared/icons';
import COLOR from '../../../shared/constant/colorset';
import NewBadge from '../../../shared/icons/NewBadge';
import { Menu } from '../../menu-section/interfaces';
import { MenuTitleTextMap } from '../../menu-section/constants';
import { useMenuAmplitude } from '../hooks/useMenuAmplitude';
import MainTitle from '../../menu-section/components/MainTitle';
import { isPC } from '../../../../util/window/getDevice';
import { useMenuActive } from '../../menu-section/hooks/useMenuActive';
import { CLASS_NAME_DEVICE } from '../../membership/shared/constants';

const Container = styled.div`
  .menu-wrap {
    display: flex;
    justify-content: space-between;
  }
  .menu-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    min-width: 56px;
    font-weight: 600;
    line-height: 18px;
    cursor: pointer;

    > svg {
      margin: 0 0 8px;
    }
  }
  .number-text {
    font-size: 14px;
    letter-spacing: -0.5px;
    color: ${COLOR.loversLavender};
  }

  &.mobile {
    padding: 0 16px 20px;
    margin-bottom: 8px;

    .badge-wrap {
      position: absolute;
      top: -3px;
      right: 7px;
    }
  }

  &.pc {
    margin: 0;
    padding: 20px 25px 20px;

    .menu-wrap {
      flex-direction: column;
      align-items: flex-start;
    }
    .menu-link {
      flex-direction: row;
      min-width: 100%;
      font-weight: 500;
      height: 54px;
      padding: 16px 0;
      font-size: 16px;

      > svg {
        margin: 0 8px 0 0;
      }
    }
    .number-text {
      position: absolute;
      top: 20px;
      right: 0;
      font-weight: 700;
      font-size: 16px;
      color: ${COLOR.kurlyGray800};
    }
    .badge-wrap {
      padding-left: 4px;
    }
  }
`;

const MenuText = styled.div`
  display: flex;
  gap: 2px;

  &.active,
  &.active span {
    color: ${COLOR.kurlyPurple};
  }
`;

interface Props {
  mainTitle?: string;
  menu: Menu[];
}

export default function QuickMenu({ mainTitle, menu }: Props) {
  const { handleClickLink } = useMenuAmplitude();

  const { activeName } = useMenuActive(menu);

  const renderIcon = (isActive: boolean, title: string) => {
    const MYKURLY_QUICKMENU_ICON = isActive
      ? {
          [MenuTitleTextMap.order]: <MyKurlyOrderHistory stroke={COLOR.kurlyPurple} />,
          [MenuTitleTextMap.coupon]: <MyKurlyCoupon fill={COLOR.kurlyPurple} />,
          [MenuTitleTextMap.pick]: <MyKurlyPick stroke={COLOR.kurlyPurple} />,
          [MenuTitleTextMap.favorite]: <MyKurlyFrequentPurchase stroke={COLOR.kurlyPurple} />,
        }
      : {
          [MenuTitleTextMap.order]: <MyKurlyOrderHistory />,
          [MenuTitleTextMap.coupon]: <MyKurlyCoupon />,
          [MenuTitleTextMap.pick]: <MyKurlyPick />,
          [MenuTitleTextMap.favorite]: <MyKurlyFrequentPurchase />,
        };
    return MYKURLY_QUICKMENU_ICON[title];
  };

  return (
    <Container className={CLASS_NAME_DEVICE}>
      {mainTitle && <MainTitle title={mainTitle} />}
      <div className="menu-wrap">
        {menu.map(({ title, text, link, badge }) => (
          <button className="menu-link" key={title} onClick={() => handleClickLink(title, link ?? '')}>
            {renderIcon(isPC ? activeName === title : false, title)}
            <MenuText className={isPC && activeName === title ? 'active' : undefined}>
              {title}
              {text && <span className="number-text">{text}</span>}
            </MenuText>
            {badge && (
              <div className="badge-wrap">
                <NewBadge />
              </div>
            )}
          </button>
        ))}
      </div>
    </Container>
  );
}
