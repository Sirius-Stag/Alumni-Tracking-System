import React, { Component } from 'react';
import '../styles/Info.scss';

class Info extends Component {
 
    handleDelete = () => {
      this.props.onDelete(this.props.item);
    }

    render(){
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
        
        return(
            <div className="Info">
                <section className="Container">
                    <button className="deletebtn" onClick={this.handleDelete}><i className='fas fa-trash' aria-hidden='true'></i></button>
                    <p style={style1}>{this.props.title}</p>
                    <h2 style={style2}>{this.props.name}</h2>
                    <p  style={style5}>{this.props.course}</p>
                    <p style={style4}>{this.props.location}</p>
                    <p style={style3}>{this.props.post}</p>
                    <p style={style4}>{this.props.duration}</p>
                </section>
            </div>
        );
    }
}

export default Info;