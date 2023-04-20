import { QuestionIcon, SettingsIcon } from '@chakra-ui/icons';
import { BoxIcon, HeartIcon, HomeIcon } from '../../components/icons';
import { changeRoute } from '../history-catcher';

export const SIDEBAR_TEMPLATE = [
  {
    title: 'Home',
    icon: HomeIcon,
    pathname: '/',
    sideAction: () => {
      changeRoute('/');
    },
    sub: null,
  },
  {
    title: 'Discover',
    icon: BoxIcon,
    pathname: '/catalogue',
    sideAction: () => {
      changeRoute('/catalogue');
    },
    sub: [
      {
        title: 'Laptops',
        sideAction: () => {
          console.log('Laptops side action');
        },
      },
      {
        title: 'Phones',
        sideAction: () => {
          console.log('Phones side action');
        },
      },
      {
        title: 'Accessories',
        sideAction: () => {
          console.log('Accessories side action');
        },
      },
    ],
  },
  {
    title: 'Liked',
    icon: HeartIcon,
    pathname: '/liked',
    sideAction: () => {
      changeRoute('/liked');
    },
    sub: null,
  },
  {
    title: 'Settings',
    icon: SettingsIcon,
    pathname: '/settings',
    sideAction: () => {
      changeRoute('/settings');
    },
    sub: null,
  },
  {
    title: 'Help',
    icon: QuestionIcon,
    pathname: '/help',
    sideAction: () => {
      changeRoute('/help');
    },
    sub: null,
  },
];
