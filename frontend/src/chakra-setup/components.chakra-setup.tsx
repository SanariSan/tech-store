// import chakraTheme from '@chakra-ui/theme';
// const { Input } = chakraTheme.components.Input;

const Text = {
  variants: {
    base: {
      fontSize: '14px',
    },
    sm: {
      fontSize: '16px',
    },
    md: {
      fontSize: '18px',
    },
    lg: {
      fontSize: '20px',
    },
  },
  defaultProps: {
    variant: 'base',
  },
};

// const Input = {
//   variants: {
//     base: {
//       fontSize: '14px',
//       color: 'green.500',
//     },
//     sm: {
//       fontSize: '16px',
//       color: 'red.500',
//     },
//   },
//   defaultProps: {
//     variant: 'base',
//   },
// };
// const InputGroup = {
//   variants: {
//     base: {
//       fontSize: '14px',
//       color: 'green.500',
//     },
//     sm: {
//       fontSize: '16px',
//       color: 'red.500',
//     },
//   },
//   defaultProps: {
//     variant: 'base',
//   },
// };

export { Text };
