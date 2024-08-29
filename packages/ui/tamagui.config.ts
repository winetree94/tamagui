import { config as configBase } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

export const config = createTamagui(configBase);

export default config;

export type Conf = typeof config;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}
