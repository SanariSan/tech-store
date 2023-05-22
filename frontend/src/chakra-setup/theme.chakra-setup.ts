import type { ThemeConfig } from '@chakra-ui/theme';
import { getLSValue } from '../helpers/browser';

type TColorOptions = Array<Exclude<ThemeConfig['initialColorMode'], 'system'>>;

const lsValue = getLSValue('chakra-ui-color-mode') as TColorOptions[number];
const options: TColorOptions = ['light', 'dark'];

const THEME_CONFIG: ThemeConfig = {
  initialColorMode: lsValue !== undefined && options.includes(lsValue) ? lsValue : 'light',
  useSystemColorMode: false,
  disableTransitionOnChange: false,
};

export { THEME_CONFIG };
