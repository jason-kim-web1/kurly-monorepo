import { createGlobalTheme, createThemeContract } from '@vanilla-extract/css';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import {
  darkThemeColor,
  Font,
  FontSize,
  FontWeight,
  lightThemeColor,
  LineHeight,
  Radius,
  Shadow,
  Spacing,
} from '@thefarmersfront/kpds-tokens';

const baseTokens = {
  font: {
    body: Font.pretendard,
  },
  fontSize: {
    ...FontSize,
  },
  fontWeight: { ...FontWeight },
  lineHeight: { ...LineHeight },
  spacing: {
    ...Spacing,
  },
  radius: {
    ...Radius,
  },
  shadow: {
    ...Shadow,
  },
  color: {
    ...lightThemeColor,
  },
};

export const vars = createThemeContract(baseTokens);

createGlobalTheme('[data-theme="light"]', vars, baseTokens);
createGlobalTheme('[data-theme="dark"]', vars, {
  ...baseTokens,
  color: {
    ...darkThemeColor,
  },
});

// Atomic CSS
const fontProperties = defineProperties({
  properties: {
    fontSize: FontSize,
    fontWeight: FontWeight,
    lineHeight: LineHeight,
  },
});

const { system, main, text, background, line, point, brand, member, ...baseColorSet } = vars.color;

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { '@media': '(prefers-color-scheme: dark)' },
  },
  defaultCondition: 'lightMode',
  properties: {
    color: baseColorSet,
    background: baseColorSet,
    backgroundColor: baseColorSet,
    borderColor: baseColorSet,
  },
});

const spacingProperties = defineProperties({
  properties: {
    width: Spacing,
    height: Spacing,
    paddingTop: Spacing,
    paddingBottom: Spacing,
    paddingLeft: Spacing,
    paddingRight: Spacing,
    marginTop: Spacing,
    marginBottom: Spacing,
    marginLeft: Spacing,
    marginRight: Spacing,
    borderWidth: Spacing,
    left: Spacing,
    right: Spacing,
    top: Spacing,
    bottom: Spacing,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
});

const roundProperties = defineProperties({
  properties: {
    borderRadius: Radius,
    borderWidth: Spacing,
  },
});

export const sprinkles = createSprinkles(fontProperties, colorProperties, spacingProperties, roundProperties);
