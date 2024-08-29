import { config as configBase } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';
import * as themes from './theme';

export const config = createTamagui({
  ...configBase,
  themes: themes,
});

export default config;
