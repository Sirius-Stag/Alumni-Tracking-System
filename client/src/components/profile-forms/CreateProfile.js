import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import '../styles/EditProfile.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const CreateProfile = ({
	createProfile,
	getCurrentProfile,
	profile: { profile, loading },
	history
}) => {
	const [formData, setFormData] = useState({
		admission: "",
		website: "",
		passout: "",
		branch: "",
		skills: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: ""
	});
	const [displaySocialInputs, toggleSocialInputs] = useState(false);
	const {
		admission,
		website,
		passout,
		branch,
		skills,
		bio,
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
	return loading && profile === null ? (
		<Redirect to='/dashboard' />
	) : (
		<Fragment>
			<div className="EditProfile">
			<h1>Create Your Profile</h1>
			<p>Let's add some information to make your profile stand out</p>
			<form className="Editform" onSubmit={e => onSubmit(e)}>
          <div className="formgroup">
            <select name="branch" value={branch} onChange={e => onChange(e)}>
              <option>Select College Branch</option>
              <option value="Computer Science Engineering">Computer Science Engineering</option>
              <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
              <option value="Electrical engineering">Electrical engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Information Technology Engineering">Information Technology Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Architectural Engineering">Architectural Engineering</option>
              <option value="Aeronautical Engineering">Aeronautical Engineering</option>
              <option value="Agricultural engineering">Agricultural engineering</option>
              <option value="Mining engineering">Mining engineering</option>
              <option value="Biochemical engineering">Biochemical engineering</option>
              <option value="Electrical and Instrumentation Engineering">Electrical and Instrumentation Engineering</option>
              <option value="Metallurgical Engineering">Metallurgical Engineering</option>
              <option value="Other">Other</option>
            </select>
            <small className="formtext">
              In which branch did you study
          </small>
          </div>
          <div className="formgroup">
            <input
              type="text"
              placeholder="Admission Year (YYYY)"
              name="admission"
              value={admission}
              onChange={e => onChange(e)}
            />
            <small className="formtext">
              In which year you took admission
          </small>
          </div>
          <div className="formgroup">
            <input
              type="text"
              placeholder="Passout Year (YYYY)"
              name="passout"
              value={passout}
              onChange={e => onChange(e)}
            />
            <small className="formtext">
              In which year you passed out
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
              Could be your own or a company website
          </small>
          </div>
          
          <div className="formgroup">
            <input
              type="text"
              placeholder="Skills like VLSI, AutoCAD, IoT etc."
              name="skills"
              value={skills}
              onChange={e => onChange(e)}
            />
            <small className="formtext">
              Use comma separated values (eg. NodeJS, VLSI, IoT, Singing etc.)
          </small>
          </div>
  
          <div className="formgroup">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              cols="30"
              rows="5"
              onChange={e => onChange(e)}
            />
            <small className="formtext">Tell us a little about yourself</small>
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
          <Link className="SocialCancelbtn" to="/alumni/dashboard">
            Cancel
        </Link>
        </form>
			</div>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(CreateProfile)
);
