import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/AddSomething.scss";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className="AddSomething">
        <h1>Add Work Experience</h1>
        <form
          className="Addform"
          onSubmit={e => {
            e.preventDefault();
            addExperience(formData, history);
          }}
        >
          <div className="formgroup">
            <input
              type="text"
              placeholder="Job Title"
              name="title"
              value={title}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="formgroup">
            <input
              type="text"
              placeholder="Company Name"
              name="company"
              value={company}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="formgroup">
            <input
              type="text"
              placeholder="Job Location"
              name="location"
              value={location}
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
              I currently work here
            </p>
          </div>
          <div className="formgroup">
            <h4>To Date</h4>
            <input
              className={toDateDisabled ? "disabled" : ""}
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
              placeholder="Job Description"
              value={description}
              onChange={e => onChange(e)}
            />
          </div>
          <input
            type="submit"
            className="Submitbtn"
            value="Save Experience"
          />
          <Link className="Cancelbtn" to="/alumni/dashboard">
            Cancel
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(AddExperience));
