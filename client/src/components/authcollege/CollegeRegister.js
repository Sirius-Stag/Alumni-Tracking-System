import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { collegeregister } from "../../actions/authcollege";
import PropTypes from "prop-types";
import '../styles/Register.scss';

const CollegeRegister = ({ setAlert, collegeregister, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeId: "",
    password: "",
    password2: ""
  });

  const { name, email, collegeId, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      collegeregister({ name, email, collegeId, password });
    }
  };

  // if authticatd it will redirect to dashboard

  if (isAuthenticated) {
    return <Redirect to="/college/dashboard" />;
  }

  return (
    <Fragment>
        <div className="Register">
                <div className="RegisterLeft" style={{backgroundColor: '#333300'}}>
                    <section className="backbtn">
                        <Link to="/" className="backbtn-link"><i className="fas fa-arrow-circle-left"></i> Back To Home</Link>
                    </section>
                </div>

                <div className="RegisterRight">
                    <section className="tabbtngrp">
                        <Link to="/college/register" className="tablink"><button id="active" className="tabbtn">Sign Up</button></Link>
                        <Link to="/college/login" className="tablink"><button className="tabbtn">Login</button></Link>
                    </section>
                    <section className="formBox">
                        <p style={{marginTop: '60px', marginBottom: "20px" }}>College Sign Up</p>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="">
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="College Name"
                                    onChange={e => onChange(e)}
                                />
                            </div>
                            <div className="">
                                <input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="College Email"
                                onChange={e => onChange(e)}
                                />
                            </div>
                            <div className="">
                                <input
                                    type="text"
                                    name="collegeId"
                                    value={collegeId}
                                    placeholder="College Id"
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
                                <button type="submit" className="btn">Create An Account</button>
                            </div>

                            <div className="Registerform">
                                <p>Already Registered ? <Link to="/college/login">Login Now</Link></p>
                            </div>

                        </form>
                    </section>

                </div>
            </div >

    </Fragment>
      );
    };
    
    CollegeRegister.propTypes = {
      setAlert: PropTypes.func.isRequired,
      collegeregister: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool
    };
    
    const mapStateToProps = state => ({
      isAuthenticated: state.authcollege.isAuthenticated
    });
    
    export default connect(mapStateToProps, { setAlert, collegeregister })(CollegeRegister);
    