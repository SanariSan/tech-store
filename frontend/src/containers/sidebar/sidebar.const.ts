import { QuestionIcon, SettingsIcon } from '@chakra-ui/icons';
import { BoxIcon, HeartIcon, HomeIcon } from '../../components/icons';
import { changeRoute } from '../history-catcher';
import { CATALOGUE_TEMPLATE } from '../catalogue';
import { Store, setSelectedCategory, setSelectedModifier, setSelectedSection } from '../../store';

export const SIDEBAR_TEMPLATE = [
  {
    title: 'Home',
    icon: HomeIcon,
    pathname: '/',
    sideAction: () => {
      changeRoute('/');

      Store.dispatch(setSelectedSection({ section: 'Home' }));
    },
    sub: null,
  },
  {
    title: 'Discover',
    icon: BoxIcon,
    pathname: '/catalogue',
    sideAction: () => {
      changeRoute('/catalogue');

      Store.dispatch(setSelectedSection({ section: 'Discover' }));
      Store.dispatch(setSelectedCategory({ category: undefined }));
      Store.dispatch(setSelectedModifier({ modifier: undefined }));
    },
    sub: CATALOGUE_TEMPLATE,
  },
  {
    title: 'Liked',
    icon: HeartIcon,
    pathname: '/liked',
    sideAction: () => {
      changeRoute('/liked');

      Store.dispatch(setSelectedSection({ section: 'Liked' }));
    },
    sub: null,
  },
  {
    title: 'Settings',
    icon: SettingsIcon,
    pathname: '/settings',
    sideAction: () => {
      changeRoute('/settings');

      Store.dispatch(setSelectedSection({ section: 'Settings' }));
    },
    sub: null,
  },
  {
    title: 'Help',
    icon: QuestionIcon,
    pathname: '/help',
    sideAction: () => {
      changeRoute('/help');

      Store.dispatch(setSelectedSection({ section: 'Help' }));
    },
    sub: null,
  },
];
