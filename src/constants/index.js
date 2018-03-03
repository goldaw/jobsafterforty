//import articles from './articles';
import auth from './auth';
import feedback from './feedback';
import firebase from './firebase';
import leftmenu from './leftmenu';
export default {
  //...articles,
  ...auth,
  ...feedback,
  ...firebase,
  ...leftmenu
};