import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import '../styles/AddSomething.scss'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProject } from "../../actions/profile";

const AddProject = ({ addProject, history }) => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectField: "",
    projectSkill: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    projectTitle,
    projectField,
    projectSkill,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className="AddSomething">
      <h3>Add Your Project</h3>
      <form
        className="Addform"
        onSubmit={e => {
          e.preventDefault();
          addProject(formData, history);
        }}
      >
        <div className="formgroup">
          <input
            type="text"
            placeholder="Project Title"
            name="projectTitle"
            value={projectTitle}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="formgroup">
          <input
            type="text"
            placeholder="Project Field"
            name="projectField"
            value={projectField}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="formgroup">
          <input
            type="text"
            placeholder="Project Skill"
            name="projectSkill"
            value={projectSkill}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="formgroup">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="formgroup">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            I am currently working on this
          </p>
        </div>
        <div className="formgroup">
          <h4>To Date</h4>
          <input
            className={toDateDisabled ? "disabled": ""}
            type="date"
            name="to"
            value={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div className="formgroup">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Project Description"
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input
          type="submit"
          className="Submitbtn"
          value="Save Project"
        />
        <Link className="Cancelbtn" to="/alumni/dashboard">
          Cancel
        </Link>
      </form>
      </div>
    </Fragment>
  );
};

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired
};

export default connect(null, { addProject })(withRouter(AddProject));
