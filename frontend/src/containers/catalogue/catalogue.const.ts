import { Store, setSelectedCategory } from '../../store';

export const CATALOGUE_TEMPLATE = [
  {
    title: 'Laptops',
    sideAction: () => {
      Store.dispatch(setSelectedCategory({ category: 'laptops' }));
      console.log('Laptops side action');
    },
  },
  {
    title: 'Phones',
    sideAction: () => {
      Store.dispatch(setSelectedCategory({ category: 'phones' }));
      console.log('Phones side action');
    },
  },
  {
    title: 'Accessories',
    sideAction: () => {
      Store.dispatch(setSelectedCategory({ category: 'accessories' }));
      console.log('Accessories side action');
    },
  },
];
