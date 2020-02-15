import React, { Component } from 'react'
import './Nav.scss'

class Nav extends Component {
    render() {
        return (
            <div className="navContainer">
                <div className="navContent col s10 offset-s1 m8 offset-m2 l6 offset-l3">
                    {this.props.children}
                </div>
                <nav className="bottomNav teal lighten-1">
                    <ul className="center">
                        <li>
                            <a href="/groups">
                                <i className="large material-icons">group</i>
                            </a>
                        </li>
                        <li>
                            <a href="/map">
                                <i className="large material-icons">map</i>
                            </a>
                        </li>
                        <li>
                            <a href="/me">
                                <i className="large material-icons">person</i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Nav