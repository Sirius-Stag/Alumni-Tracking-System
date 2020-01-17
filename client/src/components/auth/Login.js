import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import "../styles/Login.scss";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/alumni/dashboard" />;
  }

  return (
    <Fragment>
      <div className="Login">
        <div className="LoginLeft">
          <section className="backbtn">
            <Link to="/" className="backbtn-link">
              <i className="fas fa-arrow-circle-left"></i> Back To Home
            </Link>
          </section>
        </div>

        <div className="LoginRight">
          <section className="tabbtngrp">
            <Link to="/alumni/register" className="tablink">
              <button className="tabbtn">Sign Up</button>
            </Link>
            <Link to="/alumni/login" className="tablink">
              <button id="active" className="tabbtn">
                Login
              </button>
            </Link>
          </section>
          <section className="formBox">
            <p style={{ marginTop: "60px", marginBottom: "20px" }}>
              Alumni Login
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
                  New User ? <Link to="/alumni/register">Register Now</Link>
                </p>
              </div>
            </form>
          </section>
        </div>
      </div>
      {/* <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p> */}
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
