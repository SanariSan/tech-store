import { BoxIcon, HeartIcon, HomeIcon } from '../icons';

export const SIDEBAR_TEMPLATE = [
  {
    title: 'Home',
    icon: HomeIcon,
    location: '/home',
    sub: null,
  },
  {
    title: 'Discover',
    icon: BoxIcon,
    location: '/catalogue',
    sub: [
      {
        title: 'Laptops',
      },
      {
        title: 'Phones',
      },
      {
        title: 'Accessories',
      },
    ],
  },
  {
    title: 'Liked',
    icon: HeartIcon,
    location: '/liked',
    sub: null,
  },
];
