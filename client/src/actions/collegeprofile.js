import axios from 'axios';
import { setAlert } from './alert';

import {
  COLLEGE_GET_PROFILE,
  COLLEGE_GET_PROFILES,
  COLLEGE_PROFILE_ERROR,
  COLLEGE_CLEAR_PROFILE,
  COLLEGE_ACCOUNT_DELETED
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/college/profile/me');

    dispatch({
      type: COLLEGE_GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COLLEGE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: COLLEGE_CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/college/profile');

    dispatch({
      type: COLLEGE_GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COLLEGE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = collegeId => async dispatch => {
  try {
    const res = await axios.get(`/api/college/profile/college/${collegeId}`);

    dispatch({
      type: COLLEGE_GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COLLEGE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/college/profile', formData, config);

    dispatch({
      type: COLLEGE_GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/college/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COLLEGE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/college/profile');

      dispatch({ type: COLLEGE_CLEAR_PROFILE });
      dispatch({ type: COLLEGE_ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: COLLEGE_PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
