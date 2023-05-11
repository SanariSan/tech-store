import { Store, setSelectedCategory, setSelectedModifier } from '../../store';

// ideally all of this should compose from api response
// MAYBE i'll do that, just maybe.
// SIDEBAR_TEMPLATE is pure front thing, but all of these come from backend
export const CATALOGUE_TEMPLATE = [
  {
    title: 'Laptops',
    sideAction: () => {
      Store.dispatch(setSelectedCategory({ category: 'laptops' }));
      Store.dispatch(setSelectedModifier({ modifier: undefined }));
      console.log('Laptops side action');
    },
  },
  {
    title: 'Phones',
    sideAction: () => {
      Store.dispatch(setSelectedCategory({ category: 'phones' }));
      Store.dispatch(setSelectedModifier({ modifier: undefined }));
      console.log('Phones side action');
    },
  },
  {
    title: 'Accessories',
    sideAction: () => {
      Store.dispatch(setSelectedCategory({ category: 'accessories' }));
      Store.dispatch(setSelectedModifier({ modifier: undefined }));
      console.log('Accessories side action');
    },
  },
];
