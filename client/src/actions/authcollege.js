import axios from 'axios';
import { setAlert } from './alert';
import {
  COLLEGE_REGISTER_SUCCESS,
  COLLEGE_REGISTER_FAIL,
  COLLEGE_USER_LOADED,
  COLLEGE_AUTH_ERROR,
  COLLEGE_LOGIN_SUCCESS,
  COLLEGE_LOGIN_FAIL,
  COLLEGE_LOGOUT,
  COLLEGE_CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthTokenCollege';

// Load User
export const loadCollege = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/college/authcollege');

    dispatch({
      type: COLLEGE_USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COLLEGE_AUTH_ERROR
    });
  }
};

// Register User
export const collegeregister = ({ name, email, collegeId, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, collegeId, password });

  try {
    // const res = await axios.post('/api/college/colleges', body, config);
    const res = await axios.post('/api/college/colleges', body, config);
    dispatch({
      type: COLLEGE_REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadCollege());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COLLEGE_REGISTER_FAIL
    });
  }
};

// Login User
export const collegelogin = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/college/authcollege', body, config);

    dispatch({
      type: COLLEGE_LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadCollege());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COLLEGE_LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: COLLEGE_CLEAR_PROFILE });
  dispatch({ type: COLLEGE_LOGOUT });
};
