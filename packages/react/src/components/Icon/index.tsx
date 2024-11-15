import { IconStyles } from '@thefarmersfront/kpds-css';

import { ICON_TYPE_ENUM, ACTUAL_ICON_MAP, ActualIconType, IconProps } from '@/components/Icon/constants';

const getOption = (props: IconProps, key: string): string =>
  (props as unknown as { [key: string]: string })[key] || 'DEFAULT';

const Icon = (props: IconProps) => {
  const { size, type, ratio, fill } = props;
  const style = getOption(props, 'style');
  const stroke = getOption(props, 'stroke');
  const actualIconType = `${type}_${ratio.replace(':', 'x')}_${style}_${stroke}`;
  const IconComponent = ACTUAL_ICON_MAP.get(actualIconType as ActualIconType);

  if (!IconComponent) {
    throw new Error(`[KPDS > Icon] Cannot found : ${actualIconType} : ${type} ${ratio} ${style} ${stroke}`);
  }

  const { BASE_WIDTH, BASE_HEIGHT } = IconComponent;

  return (
    <i
      className={IconStyles.root}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <IconComponent width={BASE_WIDTH * size} height={BASE_HEIGHT * size} fill={fill} />
    </i>
  );
};

export { Icon, ICON_TYPE_ENUM };
export type { IconProps };
