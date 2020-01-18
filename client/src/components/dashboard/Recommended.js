import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfileItem.scss';
import Axios from 'axios';
import { getProfileById } from '../../actions/profile';

const Profile = ({
    getProfileById,
    profile: { profile, loading },
    auth,
    match
  }) => {
    useEffect(() => {
      getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);
    console.log('[Profile.js]', loading, profile);
  
    return (
        <div>Hello</div>
     
    );
  };

  Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { getProfileById }
  )(Profile);
  