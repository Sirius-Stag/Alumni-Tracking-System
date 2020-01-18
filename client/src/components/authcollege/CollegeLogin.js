import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { collegelogin } from "../../actions/authcollege";
import "../styles/Login.scss";

const CollegeLogin = ({ collegelogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    collegelogin(email, password);
  };
 
// redirect if login

  if (isAuthenticated) {
    return <Redirect to="/college/dashboard" />;
  }

  return (
    <Fragment>
      <div className="Login">
        <div className="LoginLeft" style={{backgroundColor: '#333300'}}>
          <section className="backbtn">
            <Link to="/" className="backbtn-link">
            <i className="fas fa-arrow-circle-left"></i> Back To Home
            </Link>
          </section>
        </div>

        <div className="LoginRight">
          <section className="tabbtngrp">
            <Link to="/college/register" className="tablink">
              <button className="tabbtn">Sign Up</button>
            </Link>
            <Link to="/college/login" className="tablink">
              <button id="active" className="tabbtn">
                Login
              </button>
            </Link>
          </section>
          <section className="formBox">
            <p style={{ marginTop: "60px", marginBottom: "20px" }}>
              College Login
            </p>
            <form onSubmit={e => onSubmit(e)}>
              <div className="">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
              </div>

              <div className="">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                  minLength="6"
                />
              </div>

              <div className="">
                <button type="submit" className="btn">
                  Login
                </button>
              </div>

              <div className="Loginform">
                <p>
                  New User ? <Link to="/college/register">Register Now</Link>
                </p>
              </div>
            </form>
          </section>
        </div>
      </div>
        </Fragment>
  );
};

CollegeLogin.propTypes = {
  collegelogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
// here we convert state.auth.isAuthenticated to state.authcollege.isAuthenticated
const mapStateToProps = state => ({
  isAuthenticated: state.authcollege.isAuthenticated
});

export default connect(mapStateToProps, { collegelogin })(CollegeLogin);
