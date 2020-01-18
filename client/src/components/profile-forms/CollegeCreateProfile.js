import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import '../styles/EditProfile.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/collegeprofile';

const CollegeCreateProfile = ({
	createProfile,
	getCurrentProfile,
	 profile: { profile, loading },
	history
}) => {
	const [formData, setFormData] = useState({
		address: "",
		deanname: "",
		deanContact: "",
		website: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: ""
	});
	const [displaySocialInputs, toggleSocialInputs] = useState(false);
	const {
		website,
		address,
		deanname,
		deanContact,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram
	} = formData;
	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = e => {
		e.preventDefault();
		createProfile(formData, history);
	};
	useEffect(() => {
		getCurrentProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getCurrentProfile]);
	return loading &&  profile === null ? (
		<Redirect to='/college/dashboard' />
	) : (
		<Fragment>
			<div className="EditProfile">
			<h1>Create Your Profile</h1>
			<p>Let's add some information to make your  collegeprofile stand out</p>
			<form className="Editform" onSubmit={e => onSubmit(e)}>
           <div className="formgroup">
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={e => onChange(e)}
            />
            <small className="formtext">
              Where this college is situated
          </small>
          </div>
          <div className="formgroup">
            <input
              type="text"
              placeholder="Dean Name"
              name="deanname"
              value={deanname}
              onChange={e => onChange(e)}
            />
            <small className="formtext">
              What is Dean Name
          </small>
          </div>
          <div className="formgroup">
            <input
              type="text"
              placeholder="Dean Contact"
              name="deanContact"
              value={deanContact}
              onChange={e => onChange(e)}
            />
            <small className="formtext">
              Contact of Dean
          </small>
          </div>
          <div className="formgroup">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={e => onChange(e)}
            />
            <small className="formtext">
              College website
          </small>
          </div>
          
        
         
          <div className="ToggleForm">
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
              className="Togglebtn"
            > {!displaySocialInputs ? <i class="fas fa-plus"></i> : <i class="fas fa-minus"></i>}  Add Social Profile Links</button>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className="Socialform">
                <i className="fab fa-twitter" />
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className="Socialform">
                <i className="fab fa-facebook" />
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className="Socialform">
                <i className="fab fa-youtube" />
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className="Socialform">
                <i className="fab fa-linkedin " />
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className="Socialform">
                <i className="fab fa-instagram" />
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={e => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <input type="submit" className="SocialSubmitbtn" />
          <Link className="SocialCancelbtn" to="/college/dashboard">
            Cancel
        </Link>
        </form>
			</div>
		</Fragment>
	);
};

CollegeCreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	 profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	 profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(CollegeCreateProfile)
);
