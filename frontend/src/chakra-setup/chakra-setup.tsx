import { extendTheme /* extendBaseTheme */ } from '@chakra-ui/react';
import { COLORS } from './colors.chakra-setup';
import { Button } from './components.chakra-setup';

const THEME = extendTheme({
  colors: COLORS,
  fonts: {
    body: `'Poppins Regular', sans-serif`,
    // h1: `'Poppins Bold', sans-serif`,
  },
  components: {
    Button,
  },
});

export { THEME };
