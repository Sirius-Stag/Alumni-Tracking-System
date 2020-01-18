import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CollegeRoute= ({
  component: Component,
  authcollege: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to='/college/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

CollegeRoute.propTypes = {
  authcollege: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authcollege: state.authcollege
});

export default connect(mapStateToProps)(CollegeRoute);
