import React, { Component } from 'react'
// import rd3 from 'react-d3-library'
import { Line } from 'react-chartjs-2'
import { Async } from 'react-async'
import axios from 'axios'
import './ProfilePage.scss'

class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: undefined
        }
        this.loadUserData = this.loadUserData.bind(this)
    }
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
            <div className="userProfileInfo">
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
                <Async promiseFn={this.loadUserData}>
                    {({data, error, isLoading}) => {
                        if (isLoading) return "Loading..."
                        if (data) {
                            return (
                                <Line width={400} height={350} data={this.state.data}/>
                            )
                        }
                    }}
                </Async>
                {/* <AsyncStats/> */}
            </div>
        )
    }
    async loadUserData() {
        let _this = this
        return await new Promise((resolve, reject) => {
            axios.get('/user/data').then(async (response) => {
                const data = response.data
                const steps = data.steps.data
                const calories = data.calories.data
                const heartRate = data.heartRate.data
                const labels = []
                const stepsData = []
                const caloriesData = []
                const heartRateData = []
                steps.forEach(a => labels.push(a.time))
                steps.forEach(a => stepsData.push(a.value))
                calories.forEach(a => caloriesData.push(a.value))
                heartRate.forEach(a => heartRateData.push(a.value))
                await _this.setState({
                    data: {
                        labels,
                        datasets: [
                            {
                                label: 'Steps in last 10 minutes',
                                fill: false,
                                lineTension: .1,
                                borderColor: 'grey',
                                data: stepsData
                            },
                            {
                                label: 'Calories burned in last 10 minutes',
                                fill: false,
                                lineTension: .1,
                                borderColor: 'teal',
                                data: caloriesData
                            },
                            {
                                label: 'Heart rate in last 10 minutes',
                                fill: false,
                                lineTension: .1,
                                borderColor: 'red',
                                data: heartRateData
                            }
                        ]
                    }
                })
                resolve(_this.state.data)
            })
        })
    }
}

export default ProfilePage