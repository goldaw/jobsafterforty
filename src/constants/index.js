// import articles from './articles';
import auth from './auth';
import feedback from './feedback';
import firebase from './firebase';
import leftmenu from './leftmenu';
import jobs from './jobs';
import regions from './regions';
import jobfields from './jobfields';

export default {
  ...jobs,
  ...auth,
  ...feedback,
  ...firebase,
  ...leftmenu,
  ...regions,
  ...jobfields,
};
