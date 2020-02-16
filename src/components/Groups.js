import React, { Component } from 'react'
import './Groups.scss'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import BarChart from './BarChart.js';

const min = 10000000;
const max = 99999999;
const rand = Math.floor(min + Math.random() * (max - min));

class Groups extends Component{ 
    render(){
    return (
      <div className="profileContainer">
        <Router>
          <div>
            <nav className="groupNav teal lighten-3">
              <ul>
                <li>
                  <Link className="groupLink" to="/">Current Session</Link>
                </li>
                <li>
                  <Link className="groupLink" to="/create">Create Group</Link>
                </li>
                <li>
                  <Link className="groupLink" to="/join">Join Group</Link>
                </li>
              </ul>
            </nav>
    
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/join">
                <Join />
              </Route>
              <Route path="/">
                <span className="notification orange lighten-2">Have you checked on Maruth?<i className="close-icon tiny material-icons">close</i></span>
                <h5>Your Group</h5>
                {this.renderGroup()}
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
        </div>
      );
    }

    renderGroup() {
      return (
          <div className="userInfo collection">
            <div className="person collection-item">
              <div className="nameAvatar">
                <img className="avatar" alt="avatar" src="https://randomuser.me/api/portraits/men/75.jpg">
                </img>
                <h6 className="name">Calvin</h6>
              </div>
              <span>BAC: 0.11</span>
            </div>
            <div className="person collection-item">
              <div className="nameAvatar">
                <img className="avatar" alt="avatar" src="https://randomuser.me/api/portraits/women/75.jpg">
                </img>
                <h6 className="name">Isil</h6>
              </div>
              <span>BAC: 0.09</span>
            </div>
            <div className="person collection-item">
              <div className="nameAvatar">
                <img className="avatar" alt="avatar" src="https://randomuser.me/api/portraits/men/32.jpg">
                </img>
                <h6 className="name">Maruth</h6>
              </div>
              <span>BAC: 0.24</span>
            </div>
          </div>
      )
  }
}  
function Home() {
  return (<BarChart />);
}

function Create() {
  return(<div>
      <h4> Your group ID is: {rand}</h4>
      <p>You have been added to this group. Go back to the current session to see who has joined your group.</p>
  </div>);
}

function Join() {
    return(<div>
        <h4>Join group: </h4>
        <input
        type="text"
      />
    </div>);
}
    
    
export default Groups;