import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import '../styles/Profiles.scss';
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
          <Fragment>
            <div className="AllProfile">
              <h2>Dashboard</h2>
              <p>Search and filter Alumnies and connect with them</p>
             
                <div className="Profiles">
                  {profiles.length > 0 ? (
                    profiles.map(profile => (
                      <ProfileItem key={profile._id} profile={profile} />
                    ))
                  ) : (
                      <h4
                        style={{
                          backgroundColor: "rgb(212, 140, 140)",
                          padding: "30px",
                          fontSize: "30px",
                          textAlign: "center",
                          fontFamily: "verdana",
                          borderRadius: "5px",
                          marginTop: '40px'
                        }}
                      >
                        Sorry, No Alumni Found...!
              </h4>
                    )}
                </div>
              </div>
        </Fragment>
            )}
    </Fragment>
        );
    };
    
Profiles.propTypes = {
        getProfiles: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired
    };
    
const mapStateToProps = state => ({
        profile: state.profile
    });
    
export default connect(mapStateToProps, {getProfiles})(Profiles);
