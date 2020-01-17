import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import '../styles/Info.scss';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

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

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
      <div className="Info" key={edu._id}>
      <section className="Container">
        <button className="deletebtn" onClick={() => deleteEducation(edu._id)}><i className='fas fa-trash' aria-hidden='true'></i></button>
        <p style={style1}>Education</p>
        <h2 style={style2}>{edu.school}</h2>
        <p style={style5}>{edu.degree}</p>
        <p style={style4}>{edu.fieldofstudy}</p>
        <p style={style3}><Moment format="DD/MM/YYYY">{moment.utc(edu.from)}</Moment> -{' '}
          {edu.to === null ? (
            ' Present'
          ) : (
              <Moment format="DD/MM/YYYY">{moment.utc(edu.to)}</Moment>
            )}</p>
        <p style={style4}>{edu.description}</p>
      </section>
    </div>


  ));

  return (
    <Fragment>
      {educations}
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
