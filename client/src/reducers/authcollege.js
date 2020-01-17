import {
    COLLEGE_REGISTER_SUCCESS,
    COLLEGE_REGISTER_FAIL,
    COLLEGE_USER_LOADED,
    COLLEGE_AUTH_ERROR,
    COLLEGE_LOGIN_SUCCESS,
    COLLEGE_LOGIN_FAIL,
    COLLEGE_LOGOUT,
    COLLEGE_ACCOUNT_DELETED
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    college: null
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case COLLEGE_USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          college: payload
        };
      case COLLEGE_REGISTER_SUCCESS:
      case COLLEGE_LOGIN_SUCCESS:
        localStorage.setItem('token', payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case COLLEGE_REGISTER_FAIL:
      case COLLEGE_AUTH_ERROR:
      case COLLEGE_LOGIN_FAIL:
      case COLLEGE_LOGOUT:
      case COLLEGE_ACCOUNT_DELETED:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false
        };
      default:
        return state;
    }
  }
  