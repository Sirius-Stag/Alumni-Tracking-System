import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import authcollege from './authcollege';
import profile from './profile';
import collegeprofile from './collegeprofile';
import post from './post';

export default combineReducers({
  alert,
  auth,
  authcollege,
  profile,
  collegeprofile,
  post
});
