import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import '../styles/Dashboard.scss';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Project from './Project';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const skills = profile === null ? null : profile.skills.map((skill, index) => (
    <div key={index} className="Skill">
      {skill}
    </div>
  ));


  return loading && profile === null ? (
    <Spinner />
  ) : (
      <Fragment>
        <div className="Dashboard">
          <h3>Profile</h3>
          <p>Welcome, <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#006666' }}>{user && user.name}</span></p>
          <p>Alumni of <span style={{ fontSize: '18px', fontWeight: 'bold', }}><i className="fas fa-university"></i> {user && user.collegeName}</span></p>
          {profile !== null ?
            <div>
              <p>Student of <span style={{ fontSize: '18px', fontWeight: 'bold', }}><i className="fas fa-tools"></i> {profile.branch}</span></p>
              <p>Batch of <span style={{ fontSize: '18px', fontWeight: 'bold', }}><i className="far fa-calendar-alt"></i> {profile.admission} - {profile.passout}</span></p>
            </div> : null
          }
        </div>

        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <div className="Skills">
              <p>Skills</p>
              {skills}
            </div>
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <Project project={profile.project} />

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
                <Link to='/alumni/create-profile' className='Createbtn'>Create Profile</Link>
              </div>
            </Fragment>
          )}
      </Fragment>
    );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
