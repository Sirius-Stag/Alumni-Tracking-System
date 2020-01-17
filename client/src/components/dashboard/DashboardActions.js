import React from "react";
import { Link } from "react-router-dom";
import '../styles/DashboardActions.scss';

const DashboardActions = () => {
  return (
    <div className="DashboardButtons">
      <Link to="/alumni/edit-profile" className="Editbtn">
        Edit Profile
      </Link>
      <Link to="/alumni/add-experience" className="Addbtn">
        <i className="fas fa-plus-circle"></i> Add Experience
      </Link>
      <Link to="/alumni/add-education" className="Addbtn">
        <i className="fas fa-plus-circle"></i> Add Education
      </Link>
      <Link to="/alumni/add-project" className="Addbtn">
        <i className="fas fa-plus-circle"></i> Add Project
      </Link>
    </div>
  );
};

export default DashboardActions;
