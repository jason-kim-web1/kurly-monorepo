import { z } from 'zod';
declare const AppleScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Apple">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Apple";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Apple";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const ArrowBottomScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ArrowBottom">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ArrowBottom";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "ArrowBottom";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const ArrowBottomSmallScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ArrowBottomSmall">;
    ratio: z.ZodLiteral<"2:3">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ArrowBottomSmall";
    ratio: "2:3";
    fill?: string | undefined;
}, {
    size: number;
    type: "ArrowBottomSmall";
    ratio: "2:3";
    fill?: string | undefined;
}>;
declare const ArrowLeftScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ArrowLeft">;
    ratio: z.ZodUnion<[z.ZodLiteral<"1:1">, z.ZodLiteral<"1:2">]>;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ArrowLeft";
    ratio: "1:1" | "1:2";
    fill?: string | undefined;
}, {
    size: number;
    type: "ArrowLeft";
    ratio: "1:1" | "1:2";
    fill?: string | undefined;
}>;
declare const ArrowLeftSmallScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ArrowLeftSmall">;
    ratio: z.ZodUnion<[z.ZodLiteral<"1:1">, z.ZodLiteral<"1:2">]>;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ArrowLeftSmall";
    ratio: "1:1" | "1:2";
    fill?: string | undefined;
}, {
    size: number;
    type: "ArrowLeftSmall";
    ratio: "1:1" | "1:2";
    fill?: string | undefined;
}>;
declare const ArrowRightScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ArrowRight">;
    ratio: z.ZodUnion<[z.ZodLiteral<"1:1">, z.ZodLiteral<"1:2">]>;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ArrowRight";
    ratio: "1:1" | "1:2";
    fill?: string | undefined;
}, {
    size: number;
    type: "ArrowRight";
    ratio: "1:1" | "1:2";
    fill?: string | undefined;
}>;
declare const ArrowRightSmallScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ArrowRightSmall">;
    ratio: z.ZodUnion<[z.ZodLiteral<"1:1">, z.ZodLiteral<"1:2">]>;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ArrowRightSmall";
    ratio: "1:1" | "1:2";
    fill?: string | undefined;
}, {
    size: number;
    type: "ArrowRightSmall";
    ratio: "1:1" | "1:2";
    fill?: string | undefined;
}>;
declare const ArrowTopScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ArrowTop">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ArrowTop";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "ArrowTop";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const ArrowTopSmallScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ArrowTopSmall">;
    ratio: z.ZodLiteral<"2:3">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ArrowTopSmall";
    ratio: "2:3";
    fill?: string | undefined;
}, {
    size: number;
    type: "ArrowTopSmall";
    ratio: "2:3";
    fill?: string | undefined;
}>;
declare const ArrowUpScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ArrowUp">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ArrowUp";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "ArrowUp";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const BasketScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Basket">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Basket";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Basket";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const BellScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Bell">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Bell";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Bell";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const BlankScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Blank">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Blank";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Blank";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const CalendarScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Calendar">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Calendar";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Calendar";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const CartScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Cart">;
    ratio: z.ZodLiteral<"1:1">;
    style: z.ZodLiteral<"stroke">;
    stroke: z.ZodUnion<[z.ZodLiteral<"regular">, z.ZodLiteral<"light">]>;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Cart";
    style: "stroke";
    stroke: "regular" | "light";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Cart";
    style: "stroke";
    stroke: "regular" | "light";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const CellIndicatorScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"CellIndicator">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "CellIndicator";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "CellIndicator";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const CloseScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Close">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Close";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Close";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const CloseCircleScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"CloseCircle">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "CloseCircle";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "CloseCircle";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const CopyScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Copy">;
    style: z.ZodUnion<[z.ZodLiteral<"stroke">, z.ZodLiteral<"fill">]>;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Copy";
    style: "fill" | "stroke";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Copy";
    style: "fill" | "stroke";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const DeleteScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Delete">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Delete";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Delete";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const ErrorCircleScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ErrorCircle">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ErrorCircle";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "ErrorCircle";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const ErrorCircleRedScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ErrorCircle_red">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ErrorCircle_red";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "ErrorCircle_red";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const ErrorTriangleScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"ErrorTriangle">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "ErrorTriangle";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "ErrorTriangle";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const FilterScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Filter">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Filter";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Filter";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const FreezeScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Freeze">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Freeze";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Freeze";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const GiftScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Gift">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Gift";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Gift";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const HeartScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Heart">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Heart";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Heart";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const InfoCircleScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"InfoCircle">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "InfoCircle";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "InfoCircle";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const KakaoScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Kakao">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Kakao";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Kakao";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const LocationScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Location">;
    ratio: z.ZodLiteral<"1:1">;
    style: z.ZodUnion<[z.ZodLiteral<"stroke">, z.ZodLiteral<"fill">]>;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Location";
    style: "fill" | "stroke";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Location";
    style: "fill" | "stroke";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const MenuScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Menu">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Menu";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Menu";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const MinusScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Minus">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Minus";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Minus";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const MoreScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"More">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "More";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "More";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const MoreInfoScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"MoreInfo">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "MoreInfo";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "MoreInfo";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const PauseScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Pause">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Pause";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Pause";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const PersonScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Person">;
    ratio: z.ZodLiteral<"1:1">;
    style: z.ZodUnion<[z.ZodLiteral<"stroke">, z.ZodLiteral<"fill">]>;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Person";
    style: "fill" | "stroke";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Person";
    style: "fill" | "stroke";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const PlayScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Play">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Play";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Play";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const PlusScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Plus">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Plus";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Plus";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const QRCodeScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"QRCode">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "QRCode";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "QRCode";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const QuestionCircleScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"QuestionCircle">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "QuestionCircle";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "QuestionCircle";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const RefreshScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Refresh">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Refresh";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Refresh";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const SearchScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Search">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Search";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Search";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const SoundOffScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"SoundOff">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "SoundOff";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "SoundOff";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const SoundOnScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"SoundOn">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "SoundOn";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "SoundOn";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const SunScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Sun">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Sun";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Sun";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const TextBubbleScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"TextBubble">;
    ratio: z.ZodLiteral<"1:1">;
    style: z.ZodLiteral<"fill">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "TextBubble";
    style: "fill";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "TextBubble";
    style: "fill";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const TextBubbleStrokeScheme: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"TextBubble">;
    ratio: z.ZodLiteral<"1:1">;
    style: z.ZodLiteral<"fill">;
}>, {
    style: z.ZodLiteral<"stroke">;
    stroke: z.ZodUnion<[z.ZodLiteral<"regular">, z.ZodLiteral<"light">]>;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "TextBubble";
    style: "stroke";
    stroke: "regular" | "light";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "TextBubble";
    style: "stroke";
    stroke: "regular" | "light";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const WaterDropScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"WaterDrop">;
    ratio: z.ZodUnion<[z.ZodLiteral<"1:1">, z.ZodLiteral<"2:3">]>;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "WaterDrop";
    ratio: "1:1" | "2:3";
    fill?: string | undefined;
}, {
    size: number;
    type: "WaterDrop";
    ratio: "1:1" | "2:3";
    fill?: string | undefined;
}>;
declare const WarnCircleScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"WarnCircle">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "WarnCircle";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "WarnCircle";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const CheckCircleScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"CheckCircle">;
    ratio: z.ZodLiteral<"1:1">;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "CheckCircle";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "CheckCircle";
    ratio: "1:1";
    fill?: string | undefined;
}>;
declare const PhotoScheme: z.ZodObject<z.objectUtil.extendShape<{
    size: z.ZodNumber;
    fill: z.ZodOptional<z.ZodString>;
}, {
    type: z.ZodLiteral<"Photo">;
    ratio: z.ZodLiteral<"1:1">;
    style: z.ZodLiteral<"stroke">;
    stroke: z.ZodUnion<[z.ZodLiteral<"regular">, z.ZodLiteral<"light">]>;
}>, "strip", z.ZodTypeAny, {
    size: number;
    type: "Photo";
    style: "stroke";
    stroke: "regular" | "light";
    ratio: "1:1";
    fill?: string | undefined;
}, {
    size: number;
    type: "Photo";
    style: "stroke";
    stroke: "regular" | "light";
    ratio: "1:1";
    fill?: string | undefined;
}>;
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
type IconProps = AppleProps | ArrowBottomProps | ArrowBottomSmallProps | ArrowLeftProps | ArrowLeftSmallProps | ArrowRightProps | ArrowRightSmallProps | ArrowTopProps | ArrowTopSmallProps | ArrowUpProps | BasketProps | BellProps | BlankProps | CalendarProps | CartProps | CellIndicatorProps | CloseProps | CloseCircleProps | CopyProps | DeleteProps | ErrorCircleProps | ErrorCircleRedScheme | ErrorTriangleProps | FilterProps | FreezeProps | GiftProps | HeartProps | InfoCircleProps | KakaoProps | LocationProps | MenuProps | MinusProps | MoreProps | MoreInfoProps | PauseProps | PersonProps | PlayProps | PlusProps | QRCodeProps | QuestionCircleProps | RefreshProps | SearchProps | SoundOffProps | SoundOnProps | SunProps | TextBubbleProps | WaterDropProps | WarnCircleProps | CheckCircleProps | PhotoProps;
export type { IconProps };
