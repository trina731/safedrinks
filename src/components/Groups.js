import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button} from 'react-bootstrap';
import './Groups.scss'

class Groups extends Component{
    render(){
        return(
            <div>
                <font size = "6">Welcome! Create or join a group. </font>
            <Button className="create-button">Create Group</Button>
            <Button className="join-button">Join Group</Button>
            </div>
        )
    }
}

export default Groups