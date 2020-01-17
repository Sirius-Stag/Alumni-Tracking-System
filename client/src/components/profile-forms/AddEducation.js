import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import '../styles/AddSomething.scss'
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
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
      <h3>Add Your Education</h3>
      <form
        className="Addform"
        onSubmit={e => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div className="formgroup">
          <input
            type="text"
            placeholder="School or College"
            name="school"
            value={school}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="formgroup">
          <input
            type="text"
            placeholder="Course Name"
            name="degree"
            value={degree}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="formgroup">
          <input
            type="text"
            placeholder="Branch Name"
            name="fieldofstudy"
            value={fieldofstudy}
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
            I currently study here
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
            placeholder="Course Description"
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input
          type="submit"
          className="Submitbtn"
          value="Save Education"
        />
        <Link className="Cancelbtn" to="/alumni/dashboard">
          Cancel
        </Link>
      </form>
      </div>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
