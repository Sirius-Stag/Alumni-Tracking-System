import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import '../styles/ProfileActivity.scss';
import moment from 'moment';

const ProfileProject = ({
  project: { projectTitle, projectField, projectSkill, current, to, from, description }
}) => (
  <div className="ProfileActivity">
    <h3>{projectTitle}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
      {!to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
    </p>
    <p>
      <strong>Project Field: </strong> {projectField}
    </p>
    <p>
      <strong>Project Skill: </strong> {projectSkill}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileProject.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProfileProject;
