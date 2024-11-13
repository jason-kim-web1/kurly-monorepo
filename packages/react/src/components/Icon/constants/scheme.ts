import { z } from 'zod';
import { ICON_TYPE_ENUM } from './index';

const IconPropsScheme = z.object({
  size: z.number(),
  fill: z.string().optional(),
});

const AppleScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Apple),
  ratio: z.literal('1:1'),
});

const ArrowBottomScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ArrowBottom),
  ratio: z.literal('1:1'),
});

const ArrowBottomSmallScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ArrowBottomSmall),
  ratio: z.literal('2:3'),
});

const ArrowLeftScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ArrowLeft),
  ratio: z.union([z.literal('1:1'), z.literal('1:2')]),
});

const ArrowLeftSmallScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ArrowLeftSmall),
  ratio: z.union([z.literal('1:1'), z.literal('1:2')]),
});

const ArrowRightScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ArrowRight),
  ratio: z.union([z.literal('1:1'), z.literal('1:2')]),
});

const ArrowRightSmallScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ArrowRightSmall),
  ratio: z.union([z.literal('1:1'), z.literal('1:2')]),
});

const ArrowTopScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ArrowTop),
  ratio: z.literal('1:1'),
});

const ArrowTopSmallScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ArrowTopSmall),
  ratio: z.literal('2:3'),
});

const ArrowUpScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ArrowUp),
  ratio: z.literal('1:1'),
});

const BasketScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Basket),
  ratio: z.literal('1:1'),
});

const BellScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Bell),
  ratio: z.literal('1:1'),
});
const BlankScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Blank),
  ratio: z.literal('1:1'),
});
const CalendarScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Calendar),
  ratio: z.literal('1:1'),
});

const CartScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Cart),
  ratio: z.literal('1:1'),
  style: z.literal('stroke'),
  stroke: z.union([z.literal('regular'), z.literal('light')]),
});
const CellIndicatorScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.CellIndicator),
  ratio: z.literal('1:1'),
});
const CloseScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Close),
  ratio: z.literal('1:1'),
});
const CloseCircleScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.CloseCircle),
  ratio: z.literal('1:1'),
});

const CopyScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Copy),
  style: z.union([z.literal('stroke'), z.literal('fill')]),
  ratio: z.literal('1:1'),
});
const DeleteScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Delete),
  ratio: z.literal('1:1'),
});
const ErrorCircleScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ErrorCircle),
  ratio: z.literal('1:1'),
});
const ErrorCircleRedScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ErrorCircle_red),
  ratio: z.literal('1:1'),
});
const ErrorTriangleScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.ErrorTriangle),
  ratio: z.literal('1:1'),
});
const FilterScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Filter),
  ratio: z.literal('1:1'),
});
const FreezeScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Freeze),
  ratio: z.literal('1:1'),
});
const GiftScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Gift),
  ratio: z.literal('1:1'),
});
const HeartScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Heart),
  ratio: z.literal('1:1'),
});
const InfoCircleScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.InfoCircle),
  ratio: z.literal('1:1'),
});
const KakaoScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Kakao),
  ratio: z.literal('1:1'),
});
const LocationScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Location),
  ratio: z.literal('1:1'),
  style: z.union([z.literal('stroke'), z.literal('fill')]),
});

const MenuScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Menu),
  ratio: z.literal('1:1'),
});
const MinusScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Minus),
  ratio: z.literal('1:1'),
});
const MoreScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.More),
  ratio: z.literal('1:1'),
});
const MoreInfoScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.MoreInfo),
  ratio: z.literal('1:1'),
});
const PauseScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Pause),
  ratio: z.literal('1:1'),
});
const PersonScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Person),
  ratio: z.literal('1:1'),
  style: z.union([z.literal('stroke'), z.literal('fill')]),
});
const PlayScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Play),
  ratio: z.literal('1:1'),
});
const PlusScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Plus),
  ratio: z.literal('1:1'),
});
const QRCodeScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.QRCode),
  ratio: z.literal('1:1'),
});
const QuestionCircleScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.QuestionCircle),
  ratio: z.literal('1:1'),
});
const RefreshScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Refresh),
  ratio: z.literal('1:1'),
});
const SearchScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Search),
  ratio: z.literal('1:1'),
});
const SoundOffScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.SoundOff),
  ratio: z.literal('1:1'),
});
const SoundOnScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.SoundOn),
  ratio: z.literal('1:1'),
});
const SunScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Sun),
  ratio: z.literal('1:1'),
});
const TextBubbleScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.TextBubble),
  ratio: z.literal('1:1'),
  style: z.literal('fill'),
});

const TextBubbleStrokeScheme = TextBubbleScheme.extend({
  style: z.literal('stroke'),
  stroke: z.union([z.literal('regular'), z.literal('light')]),
});

const WaterDropScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.WaterDrop),
  ratio: z.union([z.literal('1:1'), z.literal('2:3')]),
});
const WarnCircleScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.WarnCircle),
  ratio: z.literal('1:1'),
});
const CheckCircleScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.CheckCircle),
  ratio: z.literal('1:1'),
});
const PhotoScheme = IconPropsScheme.extend({
  type: z.literal(ICON_TYPE_ENUM.enum.Photo),
  ratio: z.literal('1:1'),
  style: z.literal('stroke'),
  stroke: z.union([z.literal('regular'), z.literal('light')]),
});

type AppleProps = z.infer<typeof AppleScheme>;
type ArrowBottomProps = z.infer<typeof ArrowBottomScheme>;
type ArrowBottomSmallProps = z.infer<typeof ArrowBottomSmallScheme>;
type ArrowLeftProps = z.infer<typeof ArrowLeftScheme>;
type ArrowLeftSmallProps = z.infer<typeof ArrowLeftSmallScheme>;
type ArrowRightProps = z.infer<typeof ArrowRightScheme>;
type ArrowRightSmallProps = z.infer<typeof ArrowRightSmallScheme>;
type ArrowTopProps = z.infer<typeof ArrowTopScheme>;
type ArrowTopSmallProps = z.infer<typeof ArrowTopSmallScheme>;
type ArrowUpProps = z.infer<typeof ArrowUpScheme>;
type BasketProps = z.infer<typeof BasketScheme>;
type BellProps = z.infer<typeof BellScheme>;
type BlankProps = z.infer<typeof BlankScheme>;
type CalendarProps = z.infer<typeof CalendarScheme>;
type CartProps = z.infer<typeof CartScheme>;
type CellIndicatorProps = z.infer<typeof CellIndicatorScheme>;
type CloseProps = z.infer<typeof CloseScheme>;
type CloseCircleProps = z.infer<typeof CloseCircleScheme>;
type CopyProps = z.infer<typeof CopyScheme>;
type DeleteProps = z.infer<typeof DeleteScheme>;
type ErrorCircleProps = z.infer<typeof ErrorCircleScheme>;
type ErrorCircleRedScheme = z.infer<typeof ErrorCircleRedScheme>;
type ErrorTriangleProps = z.infer<typeof ErrorTriangleScheme>;
type FilterProps = z.infer<typeof FilterScheme>;
type FreezeProps = z.infer<typeof FreezeScheme>;
type GiftProps = z.infer<typeof GiftScheme>;
type HeartProps = z.infer<typeof HeartScheme>;
type InfoCircleProps = z.infer<typeof InfoCircleScheme>;
type KakaoProps = z.infer<typeof KakaoScheme>;
type LocationProps = z.infer<typeof LocationScheme>;
type MenuProps = z.infer<typeof MenuScheme>;
type MinusProps = z.infer<typeof MinusScheme>;
type MoreProps = z.infer<typeof MoreScheme>;
type MoreInfoProps = z.infer<typeof MoreInfoScheme>;
type PauseProps = z.infer<typeof PauseScheme>;
type PersonProps = z.infer<typeof PersonScheme>;
type PlayProps = z.infer<typeof PlayScheme>;
type PlusProps = z.infer<typeof PlusScheme>;
type QRCodeProps = z.infer<typeof QRCodeScheme>;
type QuestionCircleProps = z.infer<typeof QuestionCircleScheme>;
type RefreshProps = z.infer<typeof RefreshScheme>;
type SearchProps = z.infer<typeof SearchScheme>;
type SoundOffProps = z.infer<typeof SoundOffScheme>;
type SoundOnProps = z.infer<typeof SoundOnScheme>;
type SunProps = z.infer<typeof SunScheme>;
type TextBubbleProps = z.infer<typeof TextBubbleScheme> | z.infer<typeof TextBubbleStrokeScheme>;
type WaterDropProps = z.infer<typeof WaterDropScheme>;
type WarnCircleProps = z.infer<typeof WarnCircleScheme>;
type CheckCircleProps = z.infer<typeof CheckCircleScheme>;
type PhotoProps = z.infer<typeof PhotoScheme>;

type IconProps =
  | AppleProps
  | ArrowBottomProps
  | ArrowBottomSmallProps
  | ArrowLeftProps
  | ArrowLeftSmallProps
  | ArrowRightProps
  | ArrowRightSmallProps
  | ArrowTopProps
  | ArrowTopSmallProps
  | ArrowUpProps
  | BasketProps
  | BellProps
  | BlankProps
  | CalendarProps
  | CartProps
  | CellIndicatorProps
  | CloseProps
  | CloseCircleProps
  | CopyProps
  | DeleteProps
  | ErrorCircleProps
  | ErrorCircleRedScheme
  | ErrorTriangleProps
  | FilterProps
  | FreezeProps
  | GiftProps
  | HeartProps
  | InfoCircleProps
  | KakaoProps
  | LocationProps
  | MenuProps
  | MinusProps
  | MoreProps
  | MoreInfoProps
  | PauseProps
  | PersonProps
  | PlayProps
  | PlusProps
  | QRCodeProps
  | QuestionCircleProps
  | RefreshProps
  | SearchProps
  | SoundOffProps
  | SoundOnProps
  | SunProps
  | TextBubbleProps
  | WaterDropProps
  | WarnCircleProps
  | CheckCircleProps
  | PhotoProps;

export type { IconProps };
