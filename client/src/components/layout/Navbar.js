import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/alumni/recommended'>Recommended Users</Link>
      </li>
      <li>
        <Link to='/alumni/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/alumni/dashboard'>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
       <li>
        <Link to='/alumni/register'>Register</Link>
      </li>
      <li>
        <Link to='/alumni/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav style={{backgroundColor: '#006666', padding: '10px 30px'}} className='navbar bg-dark'>
      <h1>
        <Link to='/'>
        PALUMNI
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
