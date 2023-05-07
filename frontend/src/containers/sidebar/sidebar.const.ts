import { QuestionIcon, SettingsIcon } from '@chakra-ui/icons';
import { BoxIcon, HeartIcon, HomeIcon } from '../../components/icons';
import { changeRoute } from '../history-catcher';
import { CATALOGUE_TEMPLATE } from '../catalogue';
import { Store, setSelectedCategory, setSelectedSubCategory } from '../../store';

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
      Store.dispatch(setSelectedCategory({ category: undefined }));
      Store.dispatch(setSelectedSubCategory({ subCategory: undefined }));
    },
    sub: CATALOGUE_TEMPLATE,
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
