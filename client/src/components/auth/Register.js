import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import '../styles/Register.scss';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeName: "",
    collegeNo: "",
    password: "",
    password2: ""
  });

  const { name, email, collegeName, collegeNo, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, collegeName, collegeNo, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/alumni/dashboard" />;
  }

  return (
    <Fragment>
      <div className="Register">
        <div className="RegisterLeft">
          <section className="backbtn">
            <Link to="/" className="backbtn-link">
            <i class="fas fa-arrow-circle-left"></i> Back
              To Home
            </Link>
          </section>
        </div>

        <div className="RegisterRight">
          <section className="tabbtngrp">
            <Link to="/alumni/register" className="tablink">
              <button id="active" className="tabbtn">
                Sign Up
              </button>
            </Link>
            <Link to="/alumni/login" className="tablink">
              <button className="tabbtn">Login</button>
            </Link>
          </section>
          <section className="formBox">
            <p style={{ marginTop: "60px", marginBottom: "20px" }}>Alumni Sign Up</p>
            <form onSubmit={e => onSubmit(e)}>
              <div className="">
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  name="collegeName"
                  value={collegeName}
                  placeholder="College Name"
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  name="collegeNo"
                  value={collegeNo}
                  placeholder="College Enrollment No."
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="">
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="">
                <input
                  type="password"
                  name="password2"
                  value={password2}
                  placeholder="Confirm Password"
                  onChange={e => onChange(e)}
                />
              </div>

              <div className="">
                <button type="submit" className="btn">
                  Create An Account
                </button>
              </div>

              <div className="Registerform">
                <p>
                  Already Have An Account ?{" "}
                  <Link to="/alumni/login">Login Now</Link>
                </p>
              </div>
            </form>
          </section>
        </div>
      </div>
      
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
