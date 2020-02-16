const express = require('express')
const axios = require('axios')
const app = express()

const PORT = 8000

const azure_uri = "http://13.87.230.119/api/v1/service/hr-prediction2/score";
const azure_apiKey = "uV9vFguDxaHw6szpb1nIGgbBqRJgsa5A";

const azure = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + azure_apiKey,
    }
})

const getBAC = async (test_sample) => {
    const data = []
    test_sample.data.forEach(key => {
        data.push([
            (key.value - 60) / 40
        ])
    })
    const response = await azure.post(azure_uri, { data })
    const res = []
    response.data.forEach(key => {
        res.push(key / 20 - .005)
    })
    return res
}

const fitbit = axios.create({
    baseURL: 'https://api.fitbit.com',
    timeout: 1000,
    headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkJMM0ciLCJzdWIiOiI4OUpDRzQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTgyNDU2NTM4LCJpYXQiOjE1ODE4NTE3NjN9.r9VzMufMWfvy_8G0dJFsUdhsDTrCGBtaxQokYTZc4iA'}
})

let lastData = undefined
let lastTime = Date.now()

const getUserData = async () => {
    if (lastData === undefined || Date.now() - lastTime > 60000) {
        const user = {}
        user.steps = await new Promise((resolve, reject) => {
            fitbit.get('/1/user/-/activities/steps/date/2020-02-16/1d.json').then((response) => {
                const data = response.data['activities-steps-intraday'].dataset
                const res = {total: 0, data: []}
                let cnt = 0
                for (let i = Math.max(0, data.length - 20); i < data.length; i++) {
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
            fitbit.get('/1/user/-/activities/calories/date/2020-02-16/1d.json').then((response) => {
                const data = response.data['activities-calories-intraday'].dataset
                const res = {total: 0, data: []}
                let cnt = 0
                for (let i = Math.max(0, data.length - 20); i < data.length; i++) {
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

        const A = 24
        const W = 70
        // ((-55.0969 + (0.6309 x HR) + (0.1988 x W) + (0.2017 x A))/4.184) x 60
        user.heartRate = { data: [] }
        for (let i = 0; i < user.calories.data.length; i++) {
            user.heartRate.data.push({
                time: user.calories.data[i].time,
                value: (Number(user.calories.data[i].value) * 8 / 4.184 + 55.0969 - 0.1988 * W - 0.2017 * A) / 0.6309 + (Math.random() - .3) * 12 + 10
            })
        }
        user.bac = await getBAC(user.heartRate)

        lastData = user
        lastTime = Date.now()
        return user
    }
    else {
        // console.log('have data already')
        return lastData
    }
}

app.get('/user/data', async (req, res) => {
    const data = await getUserData()
    res.send(data)
})

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))