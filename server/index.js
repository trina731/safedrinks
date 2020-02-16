const express = require('express')
const axios = require('axios')

const app = express()

const PORT = 3000

const fitbit = axios.create({
    baseURL: 'https://api.fitbit.com',
    timeout: 1000,
    headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkJMM0ciLCJzdWIiOiI4OUpDRzQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTgxODQ0NTQ5LCJpYXQiOjE1ODE4MTU3NDl9.p_sqWnFydR8hPY-pNEveE7iseTATc6eNl7QXe-btto8'}
})

const lastData = undefined
const lastTime = Date.now()

const getUserData = async () => {
    if (lastData === undefined || Date.now() - lastTime > 60000) {
        const user = {}
        user.steps = await new Promise((resolve, reject) => {
            fitbit.get('/1/user/-/activities/steps/date/2020-02-15/1d.json').then((response) => {
                const data = response.data['activities-steps-intraday'].dataset
                const res = {total: 0, data: []}
                let cnt = 0
                for (let i = Math.max(0, data.length - 10); i < data.length; i++) {
                    cnt += data[i].value
                    res.data.push(data[i])
                }
                res.total = cnt
                resolve(res)
            }).catch((error) => {
                console.log(error)
                reject('Request failed')
            })
        })
        user.calories = await new Promise((resolve, reject) => {
            fitbit.get('/1/user/-/activities/calories/date/2020-02-15/1d.json').then((response) => {
                const data = response.data['activities-calories-intraday'].dataset
                const res = {total: 0, data: []}
                let cnt = 0
                for (let i = Math.max(0, data.length - 10); i < data.length; i++) {
                    cnt += data[i].value
                    res.data.push(data[i])
                }
                res.total = cnt
                resolve(res)
            }).catch((error) => {
                console.log(error)
                reject('Request failed')
            })
        })

        // ((-55.0969 + (0.6309 x HR) + (0.1988 x W) + (0.2017 x A))/4.184) x 60 x T
        // user.heartRate =

        return user
    }
    else {
        return lastData
    }
}

app.get('/user/data', async (req, res) => {
    const data = await getUserData()
    res.send(data)
})

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))