import React from "react";
import { Link } from "react-router-dom";
import '../styles/ProfileItem.scss';
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar, collegeName },
    branch,
    admission,
    passout
  }
}) => {
  return ( 
    <div className="AlumniCard">
      <img src={avatar} alt='' className="Profilepic" />
      <div className="AlumniDetail">
        <h3>{name}</h3>
        <p><span style={{ fontSize: '18px', fontWeight: 'bold', color: '#006666' }}> {collegeName}</span></p>

        {branch !== null ?
            <div style={{marginBottom: '20px'}}>
              <p><span style={{ color: '#252830' }}>{branch}</span></p>
              <p><span style={{ color: 'gray', fontWeight: 'bold'}}>{admission} - {passout}</span></p>
            </div> : null
          }

        <Link to={`/alumni/profile/${_id}`}  className="Viewbtn">
          View Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
