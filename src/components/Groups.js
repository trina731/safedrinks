import React, { Component } from 'react'
import './Groups.scss'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const min = 10000000;
const max = 99999999;
const rand = Math.floor(min + Math.random() * (max - min));

class Groups extends Component{ 
    render(){
    return (
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
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
}  
    function Home() {
      return <h4>Current Session</h4>;
    }
    
    function Create() {
    return(<div>
        <h4> Your group ID is: {rand}</h4>
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