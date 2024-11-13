const VipLevels = {
  VVIP: 'vvip',
  VIP: 'vip',
} as const;

type VipLevelType = typeof VipLevels[keyof typeof VipLevels];

const VipLevelArray = Object.values(VipLevels);

export { VipLevels, VipLevelArray };

export type { VipLevelType };
