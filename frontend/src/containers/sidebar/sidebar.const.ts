import { QuestionIcon, SettingsIcon } from '@chakra-ui/icons';
import { BoxIcon, HeartIcon, HomeIcon } from '../../components/icons';

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
  {
    title: 'Settings',
    icon: SettingsIcon,
    location: '/settings',
    sub: null,
  },
  {
    title: 'Help',
    icon: QuestionIcon,
    location: '/help',
    sub: null,
  },
];
