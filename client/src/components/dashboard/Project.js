import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import '../styles/Info.scss';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/profile';

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


const Project = ({ project, deleteProject }) => {
  const projects = project.map(pro => (
    <div className="Info" key={pro._id}>
      <section className="Container">
        <button className="deletebtn" onClick={() => deleteProject(pro._id)}><i className='fas fa-trash' aria-hidden='true'></i></button>
        <p style={style1}>Project</p>
        <h2 style={style2}>{pro.projectTitle}</h2>
        <p style={style5}>{pro.projectField}</p>
        <p style={style4}>{pro.projectSkill}</p>
        <p style={style3}><Moment format="DD/MM/YYYY">{moment.utc(pro.from)}</Moment> -{' '}
          {pro.to === null ? (
            ' Present'
          ) : (
              <Moment format="DD/MM/YYYY">{moment.utc(pro.to)}</Moment>
            )}</p>
        <p style={style4}>{pro.description}</p>
      </section>
    </div>
    
  ));

  return (
    <Fragment>
     {projects}
    </Fragment>
  );
};

Project.propTypes = {
  project: PropTypes.array.isRequired,
  deleteProject: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteProject }
)(Project);
