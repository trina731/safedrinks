import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home.js'
import Nav from './Nav.js'
import MapPage from './MapPage.js'
import ProfilePage from './ProfilePage.js'
import './App.scss'

class App extends Component {
    render() {
        return (
            <div className="app">
                <Router>
                    <Nav>
                        <div className="content">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/map" component={MapPage}/>
                                <Route exact path="/me" component={ProfilePage}/>
                                <Redirect to="/404"/>
                            </Switch>
                        </div>
                    </Nav>
                </Router>
            </div>
        )
    }
}

export default App
