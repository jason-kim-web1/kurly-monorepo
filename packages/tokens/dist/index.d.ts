import { Spacing } from './spacing';
import { Font, FontSize, FontWeight, LineHeight } from './font';
import { Radius } from './radius';
import { Shadow } from './shadow';
import { lightThemeColor, darkThemeColor } from './color';
declare const Color: {
    system: {
        $dim: string;
        $dimUniversal: string;
        $bright: string;
        $brightUniversal: string;
        $dimAlphaLight: string;
        $dimAlphaLightUniversal: string;
        $dimAlphaRegular: string;
        $dimAlphaRegularUniversal: string;
        $dimAlphaBold: string;
        $dimAlphaBoldUniversal: string;
        $brightAlphaLight: string;
        $brightAlphaLightUniversal: string;
        $brightAlphaRegular: string;
        $brightAlphaRegularUniversal: string;
        $brightAlphaBold: string;
        $brightAlphaBoldUniversal: string;
    };
    main: {
        $primary: string;
        $primaryContainer: string;
        $secondary: string;
        $secondaryContainer: string;
        $tertiary: string;
        $tertiaryContainer: string;
        $danger: string;
        $dangerContainer: string;
        $complete: string;
        $completeContainer: string;
    };
    text: {
        $primary: string;
        $secondary: string;
        $tertiary: string;
        $quaternary: string;
        $disabled: string;
        $inverse: string;
        $inverseUniversal: string;
    };
    background: {
        $background6: string;
        $background5: string;
        $background4: string;
        $background3: string;
        $background2: string;
        $background1: string;
        $background1Universal: string;
    };
    line: {
        $line2: string;
        $line1: string;
    };
    point: {
        $point1: string;
        $point2: string;
    };
    brand: {
        $kakao: string;
    };
    member: {
        $members: string;
        $vip: string;
        $vvip: string;
    };
    $kakaoYellow950: string;
    $kakaoYellow900: string;
    $kakaoYellow850: string;
    $kakaoYellow800: string;
    $kakaoYellow700: string;
    $kakaoYellow600: string;
    $kakaoYellow500: string;
    $kakaoYellow400: string;
    $kakaoYellow300: string;
    $kakaoYellow200: string;
    $kakaoYellow100: string;
    $kakaoYellow50: string;
    $brown950: string;
    $brown900: string;
    $brown850: string;
    $brown800: string;
    $brown700: string;
    $brown600: string;
    $brown500: string;
    $brown400: string;
    $brown300: string;
    $brown200: string;
    $brown100: string;
    $brown50: string;
    $yellow950: string;
    $yellow900: string;
    $yellow850: string;
    $yellow800: string;
    $yellow700: string;
    $yellow600: string;
    $yellow500: string;
    $yellow400: string;
    $yellow300: string;
    $yellow200: string;
    $yellow100: string;
    $yellow50: string;
    $blue950: string;
    $blue900: string;
    $blue850: string;
    $blue800: string;
    $blue700: string;
    $blue600: string;
    $blue500: string;
    $blue400: string;
    $blue300: string;
    $blue200: string;
    $blue100: string;
    $blue50: string;
    $mint950: string;
    $mint900: string;
    $mint850: string;
    $mint800: string;
    $mint700: string;
    $mint600: string;
    $mint500: string;
    $mint400: string;
    $mint300: string;
    $mint200: string;
    $mint100: string;
    $mint50: string;
    $green950: string;
    $green900: string;
    $green850: string;
    $green800: string;
    $green700: string;
    $green600: string;
    $green500: string;
    $green400: string;
    $green300: string;
    $green200: string;
    $green100: string;
    $green50: string;
    $red950: string;
    $red900: string;
    $red850: string;
    $red800: string;
    $red700: string;
    $red600: string;
    $red500: string;
    $red400: string;
    $red300: string;
    $red200: string;
    $red100: string;
    $red50: string;
    $violet950: string;
    $violet900: string;
    $violet850: string;
    $violet800: string;
    $violet700: string;
    $violet600: string;
    $violet500: string;
    $violet400: string;
    $violet300: string;
    $violet200: string;
    $violet100: string;
    $violet50: string;
    $orange950: string;
    $orange900: string;
    $orange850: string;
    $orange800: string;
    $orange700: string;
    $orange600: string;
    $orange500: string;
    $orange400: string;
    $orange300: string;
    $orange200: string;
    $orange100: string;
    $orange50: string;
    $purple950: string;
    $purple900: string;
    $purple850: string;
    $purple800: string;
    $purple700: string;
    $purple600: string;
    $purple500: string;
    $purple400: string;
    $purple300: string;
    $purple200: string;
    $purple100: string;
    $purple50: string;
    $gray950: string;
    $gray900: string;
    $gray850: string;
    $gray800: string;
    $gray700: string;
    $gray600: string;
    $gray500: string;
    $gray400: string;
    $gray300: string;
    $gray200: string;
    $gray100: string;
    $gray50: string;
    $black: string;
    $blackUniversal: string;
    $white: string;
    $whiteInverse: string;
    $whiteUniversal: string;
    $blackAlphaLight: string;
    $blackAlphaLightUniversal: string;
    $blackAlphaRegular: string;
    $blackAlphaRegularUniversal: string;
    $blackAlphaBold: string;
    $blackAlphaBoldUniversal: string;
    $whiteAlphaLight: string;
    $whiteAlphaLightUniversal: string;
    $whiteAlphaRegular: string;
    $whiteAlphaRegularUniversal: string;
    $whiteAlphaBold: string;
    $whiteAlphaBoldUniversal: string;
};
export { Color, lightThemeColor, darkThemeColor, Spacing, Font, FontSize, FontWeight, LineHeight, Radius, Shadow };