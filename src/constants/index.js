// import articles from './articles';
import auth from './auth';
import feedback from './feedback';
import firebase from './firebase';//firebaseConfig
//import firebase from './firebase';
import leftmenu from './leftmenu';
import jobs from './jobs';
import searchJobs from './jobs';

export default {
  ...jobs,
  ...searchJobs,
  ...auth,
  ...feedback,
  ...firebase,
  ...leftmenu,
};
