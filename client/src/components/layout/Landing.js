import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import homepage from './homepage.svg';
import '../styles/Landing.scss';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/alumni/dashboard' />;
  }

  return (
    <div className="Landing">
    <div className="LeftLanding">
        <div className="LandingHeading">
            <h1>Connecting alumnies with their greate colleges.</h1>
        </div>
        <div className="userpanel">
            <div className="signup">
                <h3>For Colleges</h3>
                <p>Register and track all the information about alumnies and their professional activities.</p>
                <Link to="/college/register" className="collegesignup">Register</Link>
            </div>
            <div className="signup">
                <h3>For Alumnies</h3>
                <p>Create account and stay connected with your batchmates, juniors, seniors and college.</p>
                <Link to="/alumni/register" className="alumnisignup">Sign Up</Link>
            </div>
        </div>
    </div>
    <div className="RightLanding">
        <div className="LandingPic">
            <img src={homepage} alt="homepagepic"/>
        </div>
    </div>
</div>
    
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
