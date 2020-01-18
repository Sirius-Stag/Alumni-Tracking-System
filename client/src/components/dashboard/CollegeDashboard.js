import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import '../styles/Dashboard.scss';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const CollegeDashboard = ({
  getCurrentProfile,
  deleteAccount,
   authcollege: { college },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  

  return loading && profile === null ? (
    <Spinner />
  ) : (
      <Fragment>
        <div className="Dashboard">
          <h3>College Profile</h3>
          <p>Welcome, <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#006666' }}>{college && college.name}</span></p>
          <Link to="/alumni/profiles" style={{fontSize: '18px', fontWeight: 'bold', padding: '20px', backgroundColor: 'yellow', color: 'black', margin: '40px 0'}}>Dashboard</Link>
          {profile !== null ?
            <div>
              <p>Address: {profile.address}</p>
              <p>Dean Name: {profile.deanname}</p>
              <p>Dean Contact: {profile.deanContact}</p>
              <div>
                  <Link to="/college/edit-profile"  className="Editbtn">Edit Profile</Link>
                  
              </div>
            </div> : null
          }
        </div>

        {profile !== null ? (
          <Fragment>
             <div className="DelDash">
              <button className="Deletebtn" onClick={() => deleteAccount()}>
                <i className="fas fa-trash-alt"></i> Delete Account
            </button>
            
            </div>
          </Fragment>
        ) : (
            <Fragment>
              <div className="AltDash">
                <p>You have not yet setup a profile, please add some info</p>
                <Link to='/college/create-profile' className='Createbtn'>Create Profile</Link>
              </div>
            </Fragment>
          )}
      </Fragment>
    );
};

CollegeDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
   authcollege: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authcollege: state.authcollege,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(CollegeDashboard);
