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
            <nav>
              <ul>
                <li>
                  <Link to="/">Current Session</Link>
                </li>
                <li>
                  <Link to="/create">Create Group</Link>
                </li>
                <li>
                  <Link to="/join">Join Group</Link>
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
                <Home />
                {this.renderGroup()}
              </Route>
            </Switch>
          </div>
        </Router>
        </div>
      );
    }

    renderGroup() {
      return (
          <div className="userInfo">
            <div className="person">
              <img className="avatar" alt="avatar" src="https://randomuser.me/api/portraits/men/75.jpg">
              </img>
              <h5 className="name">Calvin</h5>
              </div>
              <div className="person">
              <img className="avatar" alt="avatar" src="https://randomuser.me/api/portraits/women/75.jpg">
              </img>
              <h5 className="name">Isil</h5>
              </div>
              <div className="person">
              <img className="avatar" alt="avatar" src="https://randomuser.me/api/portraits/men/32.jpg">
              </img>
              <h5 className="name">Maruth</h5>
              </div>
              <div className="person">
              <img className="avatar" alt="avatar" src="https://randomuser.me/api/portraits/men/21.jpg">
              </img>
              <h5 className="name">Aditya</h5>
              </div>
              <div className="person">
              <img className="avatar" alt="avatar" src="https://randomuser.me/api/portraits/men/4.jpg">
              </img>
              <h5 className="name">Michael</h5>
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