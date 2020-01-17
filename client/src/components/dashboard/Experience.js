import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import '../styles/Info.scss';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const style1 = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#006666',
  textDecoration: 'underline'
}
const style2 = {
  fontSize: '22px',
  color: 'rgb(73, 72, 72)',
  fontFamily: 'Verdana'
}
const style3 = {
  fontSize: '17px',
  fontWeight: 'lighter',
  color: '#282828'
}
const style4 = {
  fontSize: '16px',
  fontWeight: 'lighter',
  color: 'gray'
}
const style5 = {
  fontSize: '17.5px',
  fontWeight: 'lighter',
  color: '#004040'
}


const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <div className="Info" key={exp._id}>
      <section className="Container">
        <button className="deletebtn" onClick={() => deleteExperience(exp._id)}><i className='fas fa-trash' aria-hidden='true'></i></button>
        <p style={style1}>Work Experience</p>
        <h2 style={style2}>{exp.title}</h2>
        <p style={style5}>{exp.company}</p>
        <p style={style4}>{exp.location}</p>
        <p style={style3}><Moment format="DD/MM/YYYY">{moment.utc(exp.from)}</Moment> -{' '}
          {exp.to === null ? (
            ' Present'
          ) : (
              <Moment format="DD/MM/YYYY">{moment.utc(exp.to)}</Moment>
            )}</p>
        <p style={style4}>{exp.description}</p>
      </section>
    </div>

  ));

  return (
    <Fragment>
      {experiences}
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
