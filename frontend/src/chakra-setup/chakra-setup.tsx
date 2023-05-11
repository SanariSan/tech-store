import { extendTheme /* extendBaseTheme */ } from '@chakra-ui/react';
import { COLORS } from './colors.chakra-setup';
import { Text } from './components.chakra-setup';

const THEME = extendTheme({
  colors: COLORS,
  fonts: {
    body: `'Poppins Regular', sans-serif`,
  },
  components: {
    Text,
    // Input,
    // InputGroup,
  },
});

export { THEME };
