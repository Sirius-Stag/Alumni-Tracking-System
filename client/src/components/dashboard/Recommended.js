import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../styles/ProfileItem.scss';
import Axios from 'axios';


class Recommended extends Component {
    state = {
        user: {
            name: "Anu",
            username: "9",
            college: "IIM BENGALORE",
            year: "2016",
            company: "AMAZON",
            position: "ANALYST",
            location: "NOIDA",
            gender: "M",
            branch: "ECE"
        },
        recommend: []
    }
    componentDidMount() {
        // const userData = { ...this.state.user };
     Axios.post('/api/getRecommendation', this.state.user)
            .then(response => {
                this.setState({recommend: response.data});
            })


    }
    render() {
        const {name, college, year, position, location, gender,branch } = this.state.user;
        let recommend = null;
        if(this.state.recommend.length !== 0){
        recommend = this.state.recommend.map(r => {
            return( 
            <div className="AlumniCard" style={{textAlign: "center"}}>
                {/* <img src={avatar} alt='' className="Profilepic" /> */}
                <div className="AlumniDetail" style={{textAlign: "center"}}>
                    <h3>{r.name}</h3>
                    <p>College: <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#006666' }}>{r.college}</span></p>

                
                        <div style={{ marginBottom: '20px' }}  style={{textAlign: "center"}}>
                            <p>Branch: <span style={{ color: '#006666' }}>{r.branch}</span></p>
                            <p>Admission Year: <span style={{ color: '#006666', fontWeight: 'bold' }}> {r.year}</span></p>
                            {/* <p>Company: <span style={{ color: '#006666', fontWeight: 'bold' }}>{r.company}</span></p> */}
                            <p>Location: <span style={{ color: '#006666', fontWeight: 'bold' }}>{r.location}</span></p>
                            <p>Position: <span style={{ color: '#006666', fontWeight: 'bold' }}> {r.position}</span></p>
                            <p>Gender: <span style={{ color: '#006666', fontWeight: 'bold' }}>{r.gender}</span></p>
                        </div> 
                </div>
            </div>
            )
        })
    } else recommend = null;
        return (
            <div>
                <h1>My Profile</h1>
                <div>
                <div className="AlumniCard" style={{textAlign: "center"}}>
                {/* <img src={avatar} alt='' className="Profilepic" /> */}
                <div className="AlumniDetail" style={{textAlign: "center"}}>
                    <h3>{name}</h3>
                    <p>College: <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#006666' }}>{college}</span></p>

                
                        <div style={{ marginBottom: '20px' }}  style={{textAlign: "center"}}>
                            <p>Branch: <span style={{ color: '#006666' }}>{branch}</span></p>
                            <p>Admission Year: <span style={{ color: '#006666', fontWeight: 'bold' }}> {year}</span></p>
                            {/* <p>Company: <span style={{ color: '#006666', fontWeight: 'bold' }}>{company}</span></p> */}
                            <p>Location: <span style={{ color: '#006666', fontWeight: 'bold' }}>{location}</span></p>
                            <p>Position: <span style={{ color: '#006666', fontWeight: 'bold' }}> {position}</span></p>
                            <p>Gender: <span style={{ color: '#006666', fontWeight: 'bold' }}>{gender}</span></p>
                        </div> 
                </div>
            </div>
                </div>
            <h1>Recommended Alumni</h1>
            <div style={{textAlign: "center"}}>{recommend}</div>
            </div>
        )
    }
}

export default Recommended;