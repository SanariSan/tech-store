import type { IconProps } from '@chakra-ui/react';
import { CustomIcon } from './custom.icon';

export const CartIcon = (props: IconProps) => (
  <CustomIcon
    viewBox={'0 0 20 18'}
    d={
      'M8.44097 0.204333C8.85069 0.416138 9.00694 0.919611 8.79514 1.32933L5.96181 6.77725H14.0382L11.2049 1.32933C10.9931 0.919611 11.1528 0.416138 11.559 0.204333C11.9653 -0.00747275 12.4688 0.152249 12.684 0.558499L15.9167 6.77725H18.8889C19.5035 6.77725 20 7.27378 20 7.88836C20 8.50294 19.5035 8.99947 18.8889 8.99947L17.0868 16.2043C16.8403 17.1939 15.9514 17.8884 14.9306 17.8884H5.06944C4.04861 17.8884 3.15972 17.1939 2.91319 16.2043L1.11111 8.99947C0.496528 8.99947 0 8.50294 0 7.88836C0 7.27378 0.496528 6.77725 1.11111 6.77725H4.08333L7.31597 0.558499C7.52778 0.148777 8.03125 -0.00747275 8.44097 0.204333ZM5 10.3884C5.46181 10.3884 5.83333 10.0168 5.83333 9.55503C5.83333 9.09322 5.46181 8.72169 5 8.72169C4.53819 8.72169 4.16667 9.09322 4.16667 9.55503C4.16667 10.0168 4.53819 10.3884 5 10.3884ZM15.8333 9.55503C15.8333 9.09322 15.4618 8.72169 15 8.72169C14.5382 8.72169 14.1667 9.09322 14.1667 9.55503C14.1667 10.0168 14.5382 10.3884 15 10.3884C15.4618 10.3884 15.8333 10.0168 15.8333 9.55503Z'
    }
    {...props}
  />
);
