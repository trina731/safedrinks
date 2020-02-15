import React, { Component } from 'react'
import rd3 from 'react-d3-library'
import './ProfilePage.scss'

class ProfilePage extends Component {
    render() {
        return (
            <div className="profileContainer">
                {this.renderUser()}
                {this.renderStats()}
            </div>
        )
    }
    renderUser() {
        return (
            <div className="userInfo">
                <img className="avatar" alt="avatar" src="https://randomuser.me/api/portraits/men/86.jpg">

                </img>
                <h5 className="name">Devon Marshall</h5>
                <i className="editUser tiny material-icons">edit</i>
                <ul className="userData">
                    <li>Weight: 145 lbs / 66 kg</li>
                    <li>Height: 6'1" / 185 cm</li>
                    <li>Phone: (251)-964-1575</li>
                </ul>
            </div>
        )
    }
    renderStats() {
        return (
            <div className="statsContainer">
                <h5>Statistics</h5>
                {/* <RD3Component data={}/> */}
            </div>
        )
    }
}

export default ProfilePage