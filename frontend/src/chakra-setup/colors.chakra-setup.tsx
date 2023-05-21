const COLORS = {
  yellow: {
    // hover
    300: '#ffd666',
    // dark button, accent, notif, selected sub-category, price
    400: '#ffc831',
    // unused for now
    500: '#ffbb00',
  },
  blue: {
    // 25: '#f9fafb',
    300: '#dfe3e8',
    // dark font secondary / unselected
    400: '#c4cdd5',
    // dark icon hower
    500: '#919eab',
    // dark icon default
    600: '#637381',
    // dark menu bg hower
    800: '#212b36',
  },
  white: {
    200: '#fafafd',
    300: '#eff2f5',
    400: '#f3f5f7',
    900: '#ffffff',
  },
  darkBlue: {
    200: '#2d2a3f',
    300: '#201e2c',
    400: '#1c1a27',
    500: '#191922',
    600: '#15141B',
  },
  red: {
    400: '#F56565',
    600: '#C53030',
  },
};

type TColorsMap = {
  bg: string;
  secondary: string;
  inactiveAlt: string;
  inactive: string;
  secondaryAlt: string;
  accent: string;
  cardBg: string;
  wrapBg: string;
  border: string;
  hover: string;
  bgAlt: string;
  impactActive: string;
  impact: string;
  impactHover: string;
  liked: string;
};

const COLORS_MAP_LIGHT: TColorsMap = {
  bg: COLORS.white[200],
  secondary: COLORS.blue[300],
  inactiveAlt: COLORS.blue[400],
  inactive: COLORS.blue[500],
  secondaryAlt: COLORS.blue[600],
  accent: COLORS.blue[800],
  cardBg: COLORS.white[200],
  wrapBg: COLORS.white[300],
  border: COLORS.white[300],
  hover: COLORS.white[300],
  bgAlt: COLORS.white[900],
  impactActive: COLORS.yellow[300],
  impact: COLORS.yellow[400],
  impactHover: COLORS.yellow[500],
  liked: COLORS.red[400],
};

const COLORS_MAP_DARK: TColorsMap = {
  bg: COLORS.darkBlue[500],
  secondary: COLORS.darkBlue[200],
  inactiveAlt: COLORS.blue[600],
  inactive: COLORS.blue[600],
  secondaryAlt: COLORS.blue[500],
  accent: COLORS.white[900],
  cardBg: COLORS.darkBlue[500],
  wrapBg: COLORS.darkBlue[300],
  border: COLORS.darkBlue[200],
  hover: COLORS.darkBlue[400],
  bgAlt: COLORS.darkBlue[600],
  impactActive: COLORS.yellow[300],
  impact: COLORS.yellow[400],
  impactHover: COLORS.yellow[500],
  liked: COLORS.red[600],
};

export { COLORS, COLORS_MAP_LIGHT, COLORS_MAP_DARK };
