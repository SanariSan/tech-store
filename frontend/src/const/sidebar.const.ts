import { QuestionIcon, SettingsIcon } from '@chakra-ui/icons';
import { BoxIcon, HeartIcon, HomeIcon } from '../components/icons';
import type { TSidebarTemplate } from './const.type';

export const SIDEBAR_TEMPLATE: TSidebarTemplate = [
  {
    title: 'Home',
    icon: HomeIcon,
    pathname: '/',
    subCategory: null,
  },
  {
    title: 'Discover',
    icon: BoxIcon,
    pathname: '/catalogue',
    subCategory: 'catalogue',
  },
  {
    title: 'Liked',
    icon: HeartIcon,
    pathname: '/liked',
    subCategory: null,
  },
  {
    title: 'Settings',
    icon: SettingsIcon,
    pathname: '/settings',
    subCategory: null,
  },
  {
    title: 'Help',
    icon: QuestionIcon,
    pathname: '/help',
    subCategory: null,
  },
];
